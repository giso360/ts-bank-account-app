import { BankAccount } from "./BankAcount";

export interface BankAccountService {
  deposit(amount: number): void;
  withdraw(amount: number): void;
  balance(): number;
  transfer(amount: number, bankAccount: BankAccount): void;
  calculateMensualInterest(): number;
}
