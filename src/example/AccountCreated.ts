import { Event } from "../lib/Event/Event";

export class AccountCreated extends Event {
    public id: string;
    
    /**
     * AccountCreated event
     * 
     * @param string id UUID of the account created
     */
    constructor(id: string) {
        super();
        this._name = 'accountCreated';
        
        this.id = id;
    }
}