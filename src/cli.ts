import { UpBankAccountSummary } from "./up-bank-account-summary.ts";
import { UpBankGetMainAccount } from "./up-bank-main-account.ts";
import { UpBankAccountGetTransactions } from "./up-bank-account-transactions.ts";

// Get a summary of all account balances

const BankAccountsSummary = await UpBankAccountSummary();

console.log("\nAccount Summary:\n");

for (const BankAccountSummary of BankAccountsSummary) {
  console.log(BankAccountSummary);
}

// Get a list of the 10 most recent transactions on the main debit account

const MainBankAccountId = await UpBankGetMainAccount();
const MainBankAccountTransactions = await UpBankAccountGetTransactions(MainBankAccountId);

console.log("\nRecent Transactions:\n");

for (const MainBankAccountTransaction of MainBankAccountTransactions) {
  console.log(MainBankAccountTransaction);
}
