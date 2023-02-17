import { ITransactionTag } from "./ITransactionTag";

export interface ITransaction {
  amount: number;
  date: Date;
  transactionType: string;
  category: string | null;
  labels: string[];
  tags: ITransactionTag
}
