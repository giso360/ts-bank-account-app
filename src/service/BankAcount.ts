import UuidGenerator from "uuid-wand";
import { BankAccountService } from "./BankAccountService";

// Add Lombok for typescript
export class BankAccount implements BankAccountService {
  static readonly interestLimit: number = 50000;
  static readonly mensualInterest: number = 0.01;

  private _accountUUID: string;
  private _availableFunds: number;
  private _favBankAccounts: BankAccount[] = [];

  constructor(initialDeposit: number) {
    this._accountUUID = UuidGenerator.v4();
    this._availableFunds = initialDeposit;
  }

  public getAvailableFunds(): number {
    return this._availableFunds;
  }
  public setAvailableFunds(value: number) {
    this._availableFunds = value;
  }

  public getAccountUUID(): string {
    return this._accountUUID;
  }

  public getFavBankAccounts(): BankAccount[] {
    return this._favBankAccounts;
  }

  public setFavBankAccounts(value: BankAccount[]) {
    this._favBankAccounts = value;
  }

  deposit(amount: number): void {
    this._availableFunds += amount;
  }

  withdraw(amount: number): void {
    if (amount > this._availableFunds) {
      throw Error(
        `Insufficient Funds ... You have requested to withdraw ${amount} but you only have ${this._availableFunds}`
      );
    }
    this._availableFunds -= amount;
  }

  balance(): number {
    return this.getAvailableFunds();
  }

  transfer(amount: number, bankAccount: BankAccount): void {
    if (amount > this._availableFunds) {
      throw Error(
        `Insufficient Funds ... You have requested to transfer ${amount} but you only have ${this._availableFunds}`
      );
    }
    this._availableFunds -= amount;
    bankAccount.deposit(amount);
  }

  calculateMensualInterest(): number {
    if (this._availableFunds > BankAccount.interestLimit) {
      return 50000 * BankAccount.mensualInterest;
    }
    return this._availableFunds * BankAccount.mensualInterest;
  }

  removeBankAccountFromFavs(bankAccount: BankAccount): void {
    let newFavAcounts: BankAccount[] = [];
    const bankAccountUUID: string = bankAccount.getAccountUUID();
    this._favBankAccounts.forEach((account) => {
      if (account.getAccountUUID() !== bankAccountUUID) {
        newFavAcounts.push(account);
      }
    });
    this.setFavBankAccounts(newFavAcounts);
  }

  toString(): string {
    return `{ account-uuid: ${this._accountUUID}, available-funds: ${this._availableFunds}, fav-accounts: ${this._favBankAccounts} }`;
  }
}
