import { Event } from "./lib/Events/Event";

export class AccountCreated extends Event {
    public id: string;
    
    /**
     *
     */
    constructor(id: string) {
        super();
        this._name = 'accountCreated';
        
        this.id = id;
    }
}