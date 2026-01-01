import { AccountSummary, MainAccount } from "-/up-bank/accounts.ts";
import { TransactionsForAccount } from "-/up-bank/transactions.ts";

// Get a summary of all account balances

const BankAccountsSummary = await AccountSummary();

console.log("\nAccount Summary:\n");

for (const BankAccountSummary of BankAccountsSummary) {
  console.log(BankAccountSummary);
}

// Get a list of the 10 most recent transactions on the main debit account

const MainBankAccountId = await MainAccount();
const MainBankTransactionsForAccount = await TransactionsForAccount(MainBankAccountId);

console.log("\nRecent Transactions:\n");

for (const MainBankAccountTransaction of MainBankTransactionsForAccount) {
  console.log(MainBankAccountTransaction);
}
