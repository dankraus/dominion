import { IEvent } from "../Events/IEvent";

export interface IAggregate {
    id: string;
    name: string;
    streamName: string;
    version: number;
    expectedVersion: number;
    takePendingEvents(): IEvent[];
}
