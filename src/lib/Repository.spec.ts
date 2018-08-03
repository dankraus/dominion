import { test } from 'ava';
import * as sinon from 'sinon';
import * as EventStore from 'event-store-client';
import { Repository } from './Repository';
import { TestAggregate } from './Aggregate/TestAggregate.fixture';



let sandbox: sinon.SinonSandbox;

let stubbedESConnection: sinon.SinonStubbedInstance<EventStore.Connection>;
const stubbedESCredentials = { username: 'test', password: 'password' };
const testAggregate = new TestAggregate();

test.beforeEach(() => {
  sandbox = sinon.createSandbox();
  stubbedESConnection = sandbox.createStubInstance(EventStore.Connection)
  stubbedESConnection.writeEvents.yields({result: EventStore.OperationResult.Success});
});

test.afterEach(() => {
  sandbox.restore();
});

test('new Repository', async t => {
  const repo = new Repository(stubbedESConnection, stubbedESCredentials);
  t.deepEqual(typeof repo, 'object');
});

test.serial('Repository saves to Event Store', async t => {
  stubbedESConnection.writeEvents.yields({result: EventStore.OperationResult.Success});

  const repo = new Repository(stubbedESConnection, stubbedESCredentials);
  
  await repo.save(testAggregate);

  t.true(stubbedESConnection.writeEvents.calledOnce);
});

test.serial('saves to the correct stream', async t => {
  stubbedESConnection.writeEvents.yields({result: EventStore.OperationResult.Success});

  const repo = new Repository(stubbedESConnection, stubbedESCredentials);
  await repo.save(testAggregate);
  t.true(stubbedESConnection.writeEvents.calledWith(
    testAggregate.streamName,
    sinon.match.any,
    sinon.match.any,
    sinon.match.any,
    sinon.match.any,
    sinon.match.any));
});

test.serial('save throws error when it\'s not an ES Success result', async t => {
  stubbedESConnection.writeEvents.yields({result: EventStore.OperationResult.AccessDenied});
  const repo = new Repository(stubbedESConnection, stubbedESCredentials);
  const error = await t.throws(repo.save(testAggregate));
  t.deepEqual(error, {result: EventStore.OperationResult.AccessDenied});
});

test.serial('save successfully when ES accepts writing the events with Success result', async t => {
  stubbedESConnection.writeEvents.yields({result: EventStore.OperationResult.Success});
  const repo = new Repository(stubbedESConnection, stubbedESCredentials);
  const error = await repo.save(testAggregate);
  t.deepEqual(error, {result: EventStore.OperationResult.Success});
});

test.serial('saves with correct expected version', async t => {
  const repo = new Repository(stubbedESConnection, stubbedESCredentials);
  await repo.save(testAggregate);
  t.true(stubbedESConnection.writeEvents.calledWith(
    sinon.match.any,
    testAggregate.version,
    sinon.match.any,
    sinon.match.any,
    sinon.match.any,
    sinon.match.any));
});

test.serial('saves without requiring master on Event Store', async t => {
  const repo = new Repository(stubbedESConnection, stubbedESCredentials);
  await repo.save(testAggregate);
  t.true(stubbedESConnection.writeEvents.calledWith(
    sinon.match.any,
    sinon.match.any,
    false,
    sinon.match.any,
    sinon.match.any,
    sinon.match.any));
});

test.serial('saves serialized events Event Store', async t => {
    testAggregate.test(10);
    testAggregate.test(3.23);
    
    const serializedEvents = [
        { 
            data: { testVal: 10 },
            eventId: sinon.match.any,
            eventType: 'testEvent',
            metadata: {} },
        { 
            data: { testVal: 3.23 },
            eventId: sinon.match.any,
            eventType: 'testEvent',
            metadata: {} 
        }
    ]

    const repo = new Repository(stubbedESConnection, stubbedESCredentials);
    await repo.save(testAggregate);
    
    t.true(stubbedESConnection.writeEvents.calledWith(
        sinon.match.any,
        sinon.match.any,
        sinon.match.any,
        serializedEvents,
        sinon.match.any,
        sinon.match.any));
});

test.only('successful save sets expected version', async t => {
    testAggregate.test(10);
    testAggregate.test(3.23);
    
    stubbedESConnection.writeEvents.yields({
        result: EventStore.OperationResult.Success, 
        lastEventNumber: 1
    });

    const repo = new Repository(stubbedESConnection, stubbedESCredentials);
    await repo.save(testAggregate);
    // versions are zero based
    t.deepEqual(testAggregate.expectedVersion, 1);
});
