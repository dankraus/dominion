import { v4 as uuid } from 'uuid';
import { IEvent } from './IEvent';

export abstract class Event implements IEvent {
    private readonly _eventId: string;
    
    /**
     * The UUID of the event
     */
    get eventId(): string { return this._eventId };

    protected _name: string = '';
    
    /**
     * The name of the event
     */
    get name(): string { return this._name };

    /**
     * Base event class. Your custom events should extend this.
     */
    constructor() {
        this._eventId = uuid();
    }
}
