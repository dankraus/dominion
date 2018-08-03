import { IEvent } from "../Event/IEvent";

export interface IAggregate {
    id: string;
    name: string;
    streamName: string;
    version: number;
    expectedVersion: number;
    takePendingEvents(): IEvent[];
}
