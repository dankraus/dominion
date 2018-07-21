import * as EventStore from 'event-store-client';

export class Repository {
  private connection: EventStore.Connection;
  private credentials: EventStore.ICredentials;
  /**
   *
   * @param eventStoreConnection EventStore.Connection event-store-client connection object
   * @param EventStore.ICredentials username and password to connect to Event Store streams
   */
  constructor(
    connection: EventStore.Connection,
    credentials: EventStore.ICredentials
  ) {
    this.connection = connection;
    this.credentials = credentials;
  }

  /**
   * save
   */
  public async save() {
    const streamId = 'foo';
    const expectedVersion = 1;
    const newEvents = [
      {
        data: {
          numericProperty: 42,
          textProperty: 'value'
        },
        eventId: EventStore.Connection.createGuid().toString(),
        eventType: 'TestEvent',
        metadata: {}
      }
    ];

    return new Promise(resolve => {
      this.connection.writeEvents(
        streamId,
        expectedVersion,
        false,
        newEvents,
        this.credentials,
        (completed: EventStore.IWriteEventsCompleted) => {
          resolve(completed);
        }
      );
    });
  }
}
