import { ITransactionTag } from "./ITransactionTag";

export interface ITransaction {
  amount: number;
  date: Date;
  transactionType: string;
  category: string;
  labels: string[];
  tags: ITransactionTag
}
