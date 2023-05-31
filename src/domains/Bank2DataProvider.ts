import Bank2AccountSource from "../api/bank2/integration/Bank2AccountSource";
import Bank2AccountTransaction from "../api/bank2/integration/Bank2AccountTransaction";
import { BankDataProvider } from "../types/BankDataProvider";
import { BankTransaction } from "../types/BankTransaction";

export default class Bank2DataProvider implements BankDataProvider {
  private bank: Bank2AccountSource;

  constructor(bank: Bank2AccountSource) {
    this.bank = bank;
  }

  public getBalances(account: number) {
    try {
      const accountBalance = this.bank.getBalance(account);

      return accountBalance.getBalance();
    } catch (error) {
      throw error; //Sentry call to AWS
    }
  }

  public getTransactions(
    accountNum: number,
    fromDate: Date,
    toDate: Date
  ): BankTransaction[] {
    try {
      const transactions: Bank2AccountTransaction[] = this.bank.getTransactions(
        accountNum,
        fromDate,
        toDate
      );

      return transactions.map((transaction: Bank2AccountTransaction) => {
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
