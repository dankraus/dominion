import { Event } from "../Events/Event";

export class TestEvent extends Event {
    public testVal: number;

    constructor(testVal: number) {
        super();
        this._name = 'testEvent';
        
        this.testVal = testVal;
    }
}