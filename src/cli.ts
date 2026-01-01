import { AccountSummary } from "-/up-bank/account-summary.ts";
import { MainAccount } from "-/up-bank/account-main.ts";
import { AccountTransactions } from "-/up-bank/transactions.ts";

// Get a summary of all account balances

const BankAccountsSummary = await AccountSummary();

console.log("\nAccount Summary:\n");

for (const BankAccountSummary of BankAccountsSummary) {
  console.log(BankAccountSummary);
}

// Get a list of the 10 most recent transactions on the main debit account

const MainBankAccountId = await MainAccount();
const MainBankAccountTransactions = await AccountTransactions(MainBankAccountId);

console.log("\nRecent Transactions:\n");

for (const MainBankAccountTransaction of MainBankAccountTransactions) {
  console.log(MainBankAccountTransaction);
}
