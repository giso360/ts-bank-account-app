import { BankAccount } from "./service/BankAcount";

const story = () => {
  console.log("================");
  console.log("STEP#1: Create 2 bank accounts (40K & 100K)");
  let accountA: BankAccount = new BankAccount(40000);
  let accountB: BankAccount = new BankAccount(100000);
  console.log(accountA.toString());
  console.log(accountB.toString());
  console.log("STEP#2: Add BankAccountB to favs of BankAccountA");
  accountA.setFavBankAccounts([accountB]);
  console.log(accountA.toString());
  console.log("STEP#3: Transfer 20K from BankAccountA to BankAccountB...");
  try {
    accountA.transfer(20000, accountB);
  } catch (error) {
    console.log((error as Error).message);
  }
  console.log(accountA.toString());
  console.log(accountB.toString());
  console.log("STEP#4: Withdraw 25K from BankAccountA ...");
  try {
    accountA.withdraw(25000);
  } catch (error) {
    console.log((error as Error).message);
  }
  console.log(accountA.toString());
  console.log("STEP#5: Calculate interest for BankAccountA ...");
  console.log(accountA.calculateMensualInterest());
  console.log("STEP#6: Get Balance for BankAccountA ...");
  console.log(accountA.balance());
  console.log("STEP#7: Remove BankAccountB from favs of BankAccountA ...");
  console.log(accountA.toString());
  accountA.removeBankAccountFromFavs(accountB);
  console.log(accountA.toString());
};

story();
