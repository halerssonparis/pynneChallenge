import Bank1AccountSource from "../api/bank1/integration/Bank1AccountSource";
import { Bank1Transaction } from "../api/bank1/integration/Bank1Transaction";
import Bank2AccountBalance from "../api/bank2/integration/Bank2AccountBalance";
import Bank2AccountSource from "../api/bank2/integration/Bank2AccountSource";
import Bank2AccountTransaction, {
  TRANSACTION_TYPES,
} from "../api/bank2/integration/Bank2AccountTransaction";
import BankController from "../controllers/BankController";
import Bank1DataProvider from "../domains/Bank1DataProvider";
import Bank2DataProvider from "../domains/Bank2DataProvider";

const Bank2AccountSourceInstance = new Bank2AccountSource();

jest
  .spyOn(Bank2AccountSourceInstance, "getBalance")
  .mockReturnValue(new Bank2AccountBalance(512.5, "USD"));

jest
  .spyOn(Bank2AccountSourceInstance, "getTransactions")
  .mockReturnValue([
    new Bank2AccountTransaction(100, TRANSACTION_TYPES.CREDIT, "Check deposit"),
    new Bank2AccountTransaction(
      25.5,
      TRANSACTION_TYPES.DEBIT,
      "Debit card purchase"
    ),
    new Bank2AccountTransaction(225, TRANSACTION_TYPES.DEBIT, "Rent payment"),
  ]);

const Bank1AccountSourceInstance = new Bank1AccountSource();

jest
  .spyOn(Bank1AccountSourceInstance, "getAccountBalance")
  .mockReturnValue(215.5);
jest
  .spyOn(Bank1AccountSourceInstance, "getTransactions")
  .mockReturnValue([
    new Bank1Transaction(100, Bank1Transaction.TYPE_CREDIT, "Check deposit"),
    new Bank1Transaction(
      25.5,
      Bank1Transaction.TYPE_DEBIT,
      "Debit card purchase"
    ),
    new Bank1Transaction(225, Bank1Transaction.TYPE_DEBIT, "Rent payment"),
  ]);


const bank1 = new Bank1DataProvider(Bank1AccountSourceInstance);
const bank2 = new Bank2DataProvider(Bank2AccountSourceInstance);
const bankController = new BankController([bank1, bank2]);

jest.spyOn(bankController, "printBalances");
jest.spyOn(bankController, "printTransactions");

describe("BankController Test", () => {
  test("Should be called once", () => {
    bankController.printBalances();
    bankController.printTransactions();

    expect(bankController.printBalances).toBeCalledTimes(1);
    expect(bankController.printTransactions).toBeCalledTimes(1);
  });
});
