import * as dotenv from 'dotenv';
dotenv.config();
import * as EventStore from 'event-store-client';
import { Application } from './Application';

const eventStoreConnectionConfig = {
  debug: process.env.EVENT_STORE_DEBUG || false,
  host: process.env.EVENT_STORE_HOST || '127.0.0.1',
  onClose: () => {
    console.log('Disconnected from Event Store');
  },
  onConnect: () => {
    console.log('Connected to Event Store');
  },
  onError: (error: any) => {
    console.error('Error in Event Store', error);
  },
  port: process.env.EVENT_STORE_PORT || '1113'
};

const eventStoreCredentials = {
  password: process.env.EVENT_STORE_PASSWORD || '',
  username: process.env.EVENT_STORE_USERNAME || ''
};

const eventStoreConnection = new EventStore.Connection(
  eventStoreConnectionConfig
);

const app = new Application(eventStoreConnection, eventStoreCredentials);
console.log(app);
