import Bank1AccountSource from "../api/bank1/integration/Bank1AccountSource";
import { Bank1Transaction } from "../api/bank1/integration/Bank1Transaction";
import { BankDataProvider } from "../types/BankDataProvider";
import { BankTransaction } from "../types/BankTransaction";

export default class Bank1DataProvider implements BankDataProvider {
  private bank: Bank1AccountSource;

  constructor(bank: Bank1AccountSource) {
    this.bank = bank;
  }

  public getBalances(account: number): number {
    try {
      const balance = this.bank.getAccountBalance(account);

      return balance;
    } catch (error) {
      throw error; //Sentry call to AWS
    }
  }

  public getTransactions(accountId: number, fromDate: Date, toDate: Date) {
    try {
      const transactions: Bank1Transaction[] = this.bank.getTransactions(
        accountId,
        fromDate,
        toDate
      );
  
      return transactions.map((transaction) => {
        const bankTransaction: BankTransaction = {
          amount: transaction.getAmount(),
          text: transaction.getText(),
          type: transaction.getType(),
        };
  
        return bankTransaction;
      }); 
    } catch (error) {
      throw error; //Sentry call to AWS
    }
  }
}
