// tslint:disable:no-expression-statement no-object-mutation
import { test } from 'ava';
import * as sinon from 'sinon';

import * as EventStore from 'event-store-client';

import { Repository } from './Repository';

test('new Repository', async t => {
  const stubbedESConnection = sinon.createStubInstance(EventStore.Connection);
  const stubbedESCredentials = { username: 'test', password: 'password' };
  const repo = new Repository(stubbedESConnection, stubbedESCredentials);
  t.deepEqual(typeof repo, 'object');
});

test('Repository saves', async t => {
  const stubbedESConnection = sinon.createStubInstance(EventStore.Connection);
  const stubbedESCredentials = { username: 'test', password: 'password' };
  // const writeEventSpy = sinon.spy(stubbedESConnection, 'writeEvents');
  
  const repo = new Repository(stubbedESConnection, stubbedESCredentials);
  await repo.save();
  t.true(stubbedESConnection.writeEvents.called);
});
