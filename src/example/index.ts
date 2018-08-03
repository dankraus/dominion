import * as dotenv from 'dotenv';
dotenv.config();
import * as EventStore from 'event-store-client';
import { Application } from './Application';
import { Account } from './Account';

const start = () => {
    const account = new Account();

    console.log('new empty account', account);
    console.log('saving...');
    app.repository.save(account)
        .then(result => {
            console.log('saved!');
            console.log(result);
            account.debit(10.2);
            app.repository.save(account).then(result => {
                console.log('saved 2!');
                console.log(result);

                account.debit(10.2);
                app.repository.save(account).then(result => {
                    console.log('saved 3!');
                    console.log(result);
                })
            })
        })
        .catch(err => {
            console.log(err);
        });


}

const eventStoreConnectionConfig = {
    debug: process.env.EVENT_STORE_DEBUG === 'true',
    host: process.env.EVENT_STORE_HOST || '127.0.0.1',
    onClose: () => {
        console.log('Disconnected from Event Store');
    },
    onConnect: start,
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
