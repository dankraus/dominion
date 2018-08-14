import { Event } from "../lib/Event/Event";

export class Debit extends Event {
    public amount: number;
    
    /**
     * Debit event
     * 
     * @param number amount The amount to debit.
     */
    constructor(amount: number) {
        super();
        this._name = 'debit';
        
        this.amount = amount;
    }
}