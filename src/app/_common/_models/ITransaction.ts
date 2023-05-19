import { ITransactionTag } from "./ITransactionTag";

export interface ITransaction {
  id: string;
  note: string;
  amount: number;
  date: Date;
  transactionType: string;
  category: string | null;
  labels: string[];
  tags: ITransactionTag;
  accountsAsModifiedByRules: { accountId: string, currency: string }[];
}

export interface ITransactionsMap {
  [key:string]: Partial<ITransaction>;
}
