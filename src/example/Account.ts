import { BaseAggregate } from '../lib/Aggregate/BaseAggregate'
import { IAggregate } from '../lib/Aggregate/IAggregate';
import { Debit } from './Debit';
import { AccountCreated } from './AccountCreated';

export class Account extends BaseAggregate implements IAggregate {
    /**
     * Account
     */
    constructor()
    constructor(id: string)
    constructor(id?: string) {
        // console.log('newing with account id', id);
        // super(id);
        if(id) {
            super(id); 
            this.raise(new AccountCreated(this.id));
        } else {
            super();
        }
        this._name = 'account';
    }
    
    /**
     * Debits an account
     * 
     * @param number amount The amount to debit the account
     */
    public debit(amount: number) {
        this.raise(new Debit(amount));
    }
    
}