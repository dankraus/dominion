import * as EventStore from 'event-store-client';
import { IAggregate } from './Aggregate/IAggregate';
import { IEvent } from './Event/IEvent';

export class Repository {
    private connection: EventStore.Connection;
    private credentials: EventStore.ICredentials;
    /**
     * Initializes a new EventStore repository
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

    private serializeEvents(events: IEvent[]): EventStore.Event[] {
        const serializedEvents: EventStore.Event[] = events.map(event => {
            // Event properties prefixed with _ are protected
            // the other are public properties which are
            // the event's data to store
            const eventObj = event as any;
            const eventData: any = {};

            Object.keys(event)
                .filter(key => key.charAt(0) !== '_')
                .forEach(eventProp => { eventData[eventProp] = eventObj[eventProp]; })

            const serializedEvent: EventStore.Event = {
                data: eventData,
                eventId: event.eventId,
                eventType: event.name,
                metadata: {}
            };

            return serializedEvent;
        });

        return serializedEvents;
    }

    /**
     * Saves an Aggregate to EventStore.
     * 
     * @param IAggregate aggregate the aggregate to save
     */
    public async save(aggregate: IAggregate) {
        return new Promise((resolve, reject) => {
            this.connection.writeEvents(
                aggregate.streamName,
                aggregate.expectedVersion,
                false,
                this.serializeEvents(aggregate.takePendingEvents()),
                this.credentials,
                (completed: EventStore.IWriteEventsCompleted) => {
                    // handle the different completed 'OperationResult'
                    if (completed.result === EventStore.OperationResult.Success) {
                        aggregate.expectedVersion = completed.lastEventNumber;
                        resolve(completed);
                    } else {
                        reject(completed);
                    }
                }
            );
        });
    }

    public async getById<T extends IAggregate>(aggregateType: new (id: string) => T, id: string): Promise<any> {
        const aggregate = new aggregateType(id);

        console.log('aggregate stream', aggregate);
        return new Promise((resolve, reject) => {
            this.connection.readStreamEventsForward(
                aggregate.streamName,
                0,
                500,
                false,
                false,
                (event: EventStore.StoredEvent) => {
                    // console.log('got event', event);
                    event
                },
                this.credentials,
                (completed: EventStore.IReadStreamEventsCompleted) => {
                    console.log('completed', completed);
                    // handle the different completed 'OperationResult'
                    if (completed.result === EventStore.ReadStreamResult.Success) {
                        aggregate.expectedVersion = completed.lastEventNumber;
                        resolve(aggregate);
                    } else {
                        reject(completed);
                    }
                })
        });
    }
}
