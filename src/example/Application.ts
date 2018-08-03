import * as EventStore from 'event-store-client';
import { Repository } from './lib/Repository';

export class Application {
  public repository: Repository;

  private eventStoreConnection: EventStore.Connection;
  private eventStoreCredentials: EventStore.ICredentials;

  /**
   *
   * @param eventStoreConnection EventStore.Connection event-store-client connection object
   * @param EventStore.ICredentials username and password to connect to Event Store streams
   */
  constructor(
    eventStoreConnection: EventStore.Connection,
    eventStoreCredentials: EventStore.ICredentials
  ) {
    this.eventStoreConnection = eventStoreConnection;
    this.eventStoreCredentials = eventStoreCredentials;
    this.repository = new Repository(
      this.eventStoreConnection,
      this.eventStoreCredentials
    );
  }
}
