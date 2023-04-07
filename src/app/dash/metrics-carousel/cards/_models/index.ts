import { AccountsBlanceCard } from "./AccountsBalanceCard"
import { TransactionMetaReferenceCard } from "./TransactionMetaReferenceCard"

export default {
    'accountsBalance': AccountsBlanceCard,
    'transactionMetaReference': TransactionMetaReferenceCard
  }

  export type TSupportedCards = AccountsBlanceCard | TransactionMetaReferenceCard;
