import { BankDataProvider } from "../types/BankDataProvider";

const ACCOUNT_ID = 123;
const FROM_DATE = new Date();
const TO_DATE = new Date();

export default class BankController {
  private banks: BankDataProvider[];

  constructor(banks: BankDataProvider[]) {
    this.banks = banks;
  }

  public printBalances() {
    for (const bank of this.banks) {
      console.log("# BALANCES # ", bank.getBalances(ACCOUNT_ID));
    }
  }

  public printTransactions() {
    for (const bank of this.banks) {
      console.log("# TRANSACTIONS # ", bank.getTransactions(ACCOUNT_ID, FROM_DATE, TO_DATE));
    }
  }
}
