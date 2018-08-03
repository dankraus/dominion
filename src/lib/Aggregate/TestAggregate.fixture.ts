import { BaseAggregate } from "./BaseAggregate";
import { TestEvent } from "../Events/TestEvent.fixture";

export class TestAggregate extends BaseAggregate {
    /**
     *
     */
    constructor() {
      super();
      this._name = 'testAggregate';
    }
    
    public test(testVal: number) {
      this.raise(new TestEvent(testVal));
    }
  }