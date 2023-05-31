import { BankTransaction } from "./BankTransaction";

export interface BankDataProvider {
  getBalances: (account: number) => number;
  getTransactions: (
    accountNum: number,
    fromDate: Date,
    toDate: Date
  ) => BankTransaction[];
}
