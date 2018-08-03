import { BaseAggregate } from './lib/Aggregate/BaseAggregate'
import { IAggregate } from './lib/Aggregate/IAggregate';
import { Debit } from './Debit';
import { AccountCreated } from './AccountCreated';

export class Account extends BaseAggregate implements IAggregate {
    /**
     * Account
     */
    constructor() {
        super();
        this._name = 'account';
        
        this.raise(new AccountCreated(this.id));
    }
    
    public debit(amount: number) {
        this.raise(new Debit(amount));
    }
    
}