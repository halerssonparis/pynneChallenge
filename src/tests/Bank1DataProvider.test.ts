import Bank1AccountSource from "../api/bank1/integration/Bank1AccountSource";
import { Bank1Transaction } from "../api/bank1/integration/Bank1Transaction";
import Bank1DataProvider from "../domains/Bank1DataProvider";
import { BankTransaction } from "../types/BankTransaction";

const BankInstance = new Bank1AccountSource();

jest.spyOn(BankInstance, "getAccountBalance").mockReturnValue(215.5);
jest
  .spyOn(BankInstance, "getTransactions")
  .mockReturnValue([
    new Bank1Transaction(100, Bank1Transaction.TYPE_CREDIT, "Check deposit"),
    new Bank1Transaction(25.5, Bank1Transaction.TYPE_DEBIT, "Debit card purchase"),
    new Bank1Transaction(225, Bank1Transaction.TYPE_DEBIT, "Rent payment"),
  ]);

const bank = new Bank1DataProvider(BankInstance);

const ACCOUNT_ID = 123;
const FROM_DATE = new Date();
const TO_DATE = new Date();

describe("Bank 1 DataProvider Test", () => {
  test("should get the Balances", () => {
    const balances = bank.getBalances(ACCOUNT_ID);

    expect(balances).toBe(215.5);
  });

  test("should get all the transactions", () => {
    const transactions = bank.getTransactions(ACCOUNT_ID, FROM_DATE, TO_DATE);
    const resultToBe = [
      {
        amount: 100,
        type: Bank1Transaction.TYPE_CREDIT,
        text: "Check deposit",
      },
      {
        amount: 25.5,
        type: Bank1Transaction.TYPE_DEBIT,
        text: "Debit card purchase",
      },
      {
        amount: 225,
        type: Bank1Transaction.TYPE_DEBIT,
        text: "Rent payment",
      },
    ] as BankTransaction[];

    expect(transactions).toStrictEqual(resultToBe);
  });

  test("should throw an error when get Account Balance", () => {
    jest.spyOn(BankInstance, "getAccountBalance").mockImplementation(() => {
      throw new Error("Couldn't fetch account balance");
    });
  
    try {
      bank.getBalances(ACCOUNT_ID);
    } catch (error: any) {
      expect(error.message).toBe("Couldn't fetch account balance");
    }
  });

  test("should throw an error when get Transactions", () => {
    jest.spyOn(BankInstance, "getTransactions").mockImplementation(() => {
      throw new Error("Couldn't fetch transactions");
    });
  
    try {
      bank.getTransactions(ACCOUNT_ID, FROM_DATE, TO_DATE);
    } catch (error: any) {
      expect(error.message).toBe("Couldn't fetch transactions");
    }
  });
});
