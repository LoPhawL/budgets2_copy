import { ITransactionTag } from "./ITransactionTag";

export interface ITransaction {
  id: string;
  note: string;
  amount: number;
  date: Date;
  transactionType: string;
  category: string | null;
  labels: string[];
  tags: ITransactionTag
}

export interface ITransactionsMap {
  [key:string]: Partial<ITransaction>;
}
