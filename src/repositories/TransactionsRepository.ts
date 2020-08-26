import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: "income" | "outcome";
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (ammount: Balance, transaction: Transaction) => {
      if (transaction.type == "income") {
        ammount.income += transaction.value;
      }
      if (transaction.type == "outcome") {
        ammount.outcome += transaction.value;
      }

      return ammount;

      }, 
      {
        income: 0,
        outcome: 0,
        total: 0
      },
    );

    const total = income - outcome;
    
    return { income, outcome, total };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ 
      title, 
      value, 
      type 
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
