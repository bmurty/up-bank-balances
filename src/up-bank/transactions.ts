import * as App from "-/constants.ts"
import moment from "moment";

export async function TransactionsForAccount(BankAccountId: string): Promise<string[]> {
  // deno-lint-ignore prefer-const
  let TransactionList: string[] = [];

  const ApiResponse = await fetch(
    App.ApiUrl + "/accounts/" + BankAccountId + "/transactions?page[size]=20",
    {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + App.ApiToken,
      },
    },
  );

  const ApiResponseJson = await ApiResponse.json();
  const ApiResponseJsonData = ApiResponseJson.data;

  for (const index in ApiResponseJsonData) {
    const TransactionInfo = ApiResponseJsonData[index].attributes;
    const TransactionDate = moment(TransactionInfo.createdAt).fromNow();

    // Fix the output of debit transactions
    let TransactionAmount = (App.CurrencySymbol + TransactionInfo.amount.value).replace(
      App.CurrencySymbol + "-",
      "-" + App.CurrencySymbol,
    );

    if (TransactionAmount.indexOf("-" + App.CurrencySymbol) == -1) {
      // This transaction is a credit
      TransactionAmount = "+" + TransactionAmount;
    }

    const TransactionItem: string[] = [
      TransactionAmount + ": ",
      TransactionInfo.description.trim(),
      TransactionInfo.message ? ", " + TransactionInfo.message.trim() : "",
      " (" + TransactionDate + ")",
    ];

    TransactionList.push(
      TransactionItem.join(""),
    );
  }

  return TransactionList;
}
