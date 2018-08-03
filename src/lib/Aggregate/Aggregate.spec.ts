import { test } from 'ava';
import { TestAggregate } from './TestAggregate.fixture';

test('new Aggregate id should be a uuid', async t => {
    const testAggregate = new TestAggregate();
    t.regex(testAggregate.id, /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
});

test('new Aggregate should have expected version of -1', async t => {
    const testAggregate = new TestAggregate();
    t.deepEqual(testAggregate.expectedVersion, -1);
});

test('new Aggregate should have version of -1', async t => {
    const testAggregate = new TestAggregate();
    t.deepEqual(testAggregate.version, -1);
});

test('new Aggregate should have no events', async t => {
    const testAggregate = new TestAggregate();
    t.deepEqual(testAggregate.takePendingEvents().length, 0);
});

test('new Aggregate streamName should be name of aggreate and uuid', async t => {
    const testAggregate = new TestAggregate();
    t.regex(testAggregate.streamName, /testAggregate-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
});

test('Aggregate should have its version go up when events are raised', async t => {
    const testAggregate = new TestAggregate();
    testAggregate.test(12);
    testAggregate.test(1);
    t.deepEqual(testAggregate.version, 1);
});
