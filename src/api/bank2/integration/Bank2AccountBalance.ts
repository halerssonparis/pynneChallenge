export default class Bank2AccountBalance {
  private balance: number;
  private currency: string;

  constructor(balance: number, currency: string) {
    this.balance = balance;
    this.currency = currency;
  }

  public getBalance(): number {
    return this.balance;
  }

  public getCurrency(): string {
    return this.currency;
  }
}
