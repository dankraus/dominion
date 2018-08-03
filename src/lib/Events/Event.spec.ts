import { test } from 'ava';
import { TestEvent } from './TestEvent.fixture';

test('new Event inits with uuid', t => {
   const event = new TestEvent(2);
   t.notDeepEqual(event.eventId, '');
   t.regex(event.eventId, /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
});

test('new Event have new uuid', t => {
    const event = new TestEvent(2);
    const event2 = new TestEvent(2);
    t.notDeepEqual(event.eventId, event2.eventId);
 });
 
 test('new Event have new uuid', t => {
    const event = new TestEvent(2);
    const event2 = new TestEvent(2);
    t.notDeepEqual(event.eventId, event2.eventId);
 });
 
 test('new Event has a name', t => {
    const event = new TestEvent(2);
    t.deepEqual(event.name, 'testEvent');
 });