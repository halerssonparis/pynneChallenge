import Bank2AccountBalance from "../api/bank2/integration/Bank2AccountBalance";
import Bank2AccountSource from "../api/bank2/integration/Bank2AccountSource";
import Bank2AccountTransaction, { TRANSACTION_TYPES } from "../api/bank2/integration/Bank2AccountTransaction";
import Bank2DataProvider from "../domains/Bank2DataProvider";
import { BankTransaction } from "../types/BankTransaction";

const BankInstance = new Bank2AccountSource();

jest.spyOn(BankInstance, "getBalance").mockReturnValue(
  new Bank2AccountBalance(512.5, "USD")
);

jest
  .spyOn(BankInstance, "getTransactions")
  .mockReturnValue([
    new Bank2AccountTransaction(100, TRANSACTION_TYPES.CREDIT, "Check deposit"),
    new Bank2AccountTransaction(25.5, TRANSACTION_TYPES.DEBIT, "Debit card purchase"),
    new Bank2AccountTransaction(225, TRANSACTION_TYPES.DEBIT, "Rent payment"),
  ]);

const bank = new Bank2DataProvider(BankInstance);

const ACCOUNT_ID = 123;
const FROM_DATE = new Date();
const TO_DATE = new Date();

describe("Bank 2 DataProvider Test", () => {
  test("should get the Balances", () => {
    const balances = bank.getBalances(ACCOUNT_ID);

    expect(balances).toBe(512.5);
  });

  test("should get all the transactions", () => {
    const transactions = bank.getTransactions(ACCOUNT_ID, FROM_DATE, TO_DATE);
    const resultToBe = [
      {
        amount: 100,
        type: TRANSACTION_TYPES.CREDIT,
        text: "Check deposit",
      },
      {
        amount: 25.5,
        type: TRANSACTION_TYPES.DEBIT,
        text: "Debit card purchase",
      },
      {
        amount: 225,
        type: TRANSACTION_TYPES.DEBIT,
        text: "Rent payment",
      },
    ] as BankTransaction[];

    expect(transactions).toStrictEqual(resultToBe);
  });

  test("should throw an error when get Account Balance", () => {
    jest.spyOn(BankInstance, "getBalance").mockImplementation(() => {
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
