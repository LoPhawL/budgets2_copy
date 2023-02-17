import { ITransactionTag } from "./ITransactionTag";

export interface ITransaction {
  note: string;
  amount: number;
  date: Date;
  transactionType: string;
  category: string | null;
  labels: string[];
  tags: ITransactionTag
}
