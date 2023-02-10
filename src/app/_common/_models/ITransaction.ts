import { ITransactionTag } from "./ITransactionTag";

export interface ITransaction {
  date: Date;
  transactionType: string;
  category: string;
  labels: string[];
  tags: ITransactionTag
}
