import { BaseAggregate } from "./BaseAggregate";
import { TestEvent } from "../Event/TestEvent.fixture";

export class TestAggregate extends BaseAggregate {
    /**
     *
     */
    constructor(id: string = '') {
        super(id);
        this._name = 'testAggregate';
    }

    public test(testVal: number) {
        this.raise(new TestEvent(testVal));
    }
}