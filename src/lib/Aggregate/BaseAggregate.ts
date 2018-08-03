import { v4 as uuid } from 'uuid';
import { IAggregate } from './IAggregate';
import { IEvent } from '../Events/IEvent';

export abstract class BaseAggregate implements IAggregate {
    private readonly _id: string = '';
    get id(): string { return this._id };
    
    protected _name: string = '';
    get name(): string { return this._name };
    
    protected _expectedVersion: number = -1;
    /**
     * Expected version number of this Aggregate
     * in the event store. 0 based.
     * New Aggregates will be -1.
     *
     * @returns Returns the expected version number
     */
    get expectedVersion(): number { return this._expectedVersion };
    
     /**
     * Sets the expected version number of this Aggregate. 0 based.
     *
     * @returns Returns the expected version number
     */
    set expectedVersion(versionNumber: number) { this._expectedVersion = versionNumber };
    
    private _version: number;
    
    /**
     * Current version number of the Aggregate. 0 based.
     *
     * @returns Returns the version number
     */
    get version(): number { return this._version };
    
    private _pendingEvents: IEvent[] = [];
    
    /**
     * Unique name of aggreagate used for persistence.
     * Concatenation of aggregate `this._name` and `this._id`
     *
     * @returns Return stream's name.
     */
    get streamName(): string { return `${this._name}-${this._id}` };
    
    /**
     * Aggregates should extend this class.
     */
    constructor() {
        this._id = uuid();
        this._version = this._expectedVersion;
    }
    
    /**
     * Commands in subclassed Aggregates should call this to record events to be saved
     * @param IEvent event event to be recorded
     */
    protected raise(event: IEvent) {
        this._pendingEvents.push(event);
        this._version++;
    }
    
    /**
     * Takes pending events to save and resets pending events to empty.
     * @returns IEvent events to save
     */
    public takePendingEvents(): IEvent[] {
        const events = this._pendingEvents;
        this._pendingEvents = [];
        return events;
    }
}
