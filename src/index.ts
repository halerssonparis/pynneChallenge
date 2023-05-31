import Bank1AccountSource from "./api/bank1/integration/Bank1AccountSource";
import Bank2AccountSource from "./api/bank2/integration/Bank2AccountSource";
import BankController from "./controllers/BankController";
import Bank1DataProvider from "./domains/Bank1DataProvider";
import Bank2DataProvider from "./domains/Bank2DataProvider";
import { BankDataProvider } from "./types/BankDataProvider";

const bankAPI1 = new Bank1AccountSource();
const bankAPI2 = new Bank2AccountSource();

const bank1: BankDataProvider = new Bank1DataProvider(bankAPI1);
const bank2: BankDataProvider = new Bank2DataProvider(bankAPI2);

const bankController = new BankController([
  bank1,
  bank2
]);

bankController.printBalances();
bankController.printTransactions();