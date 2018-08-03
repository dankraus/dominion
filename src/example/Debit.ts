import { Event } from "./lib/Event/Event";

export class Debit extends Event {
    public amount: number;
    
    /**
     *
     */
    constructor(amount: number) {
        super();
        this._name = 'debit';
        
        this.amount = amount;
    }
}