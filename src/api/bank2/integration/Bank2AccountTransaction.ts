export enum TRANSACTION_TYPES {
  DEBIT,
  CREDIT,
}

export default class Bank2AccountTransaction {
  private amount: number;
  private type: TRANSACTION_TYPES;
  private text: string;

  constructor(amount: number, type: TRANSACTION_TYPES, text: string) {
    this.amount = amount;
    this.type = type;
    this.text = text;
  }

  public getAmount(): number {
    return this.amount;
  }

  public getType(): TRANSACTION_TYPES {
    return this.type;
  }

  public getText(): string {
    return this.text;
  }
}
