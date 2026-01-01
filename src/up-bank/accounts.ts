import * as App from "-/constants.ts"

export async function AccountSummary(): Promise<string[]> {
  // deno-lint-ignore prefer-const
  let FinalOutput: string[] = [];

  // Get a list of all open accounts
  const ApiResponse = await fetch(
    App.ApiUrl + "/accounts",
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
    const AccountInfo = ApiResponseJsonData[index].attributes;

    // Remove all emojis from account names
    const AccountDisplayName = AccountInfo.displayName.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      "",
    ).trim();

    FinalOutput.push(AccountDisplayName + ": " + App.CurrencySymbol + AccountInfo.balance.value);
  }

  return FinalOutput;
}

export async function MainAccount(): Promise<string> {
  // Get a list of all open accounts
  const ApiResponse = await fetch(
    App.ApiUrl + "/accounts",
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
    const AccountInfo = ApiResponseJsonData[index].attributes;
    if (AccountInfo.accountType == "TRANSACTIONAL" && AccountInfo.ownershipType == "INDIVIDUAL") {
      // This is the main individual debit account, use this ID
      return ApiResponseJsonData[index].id;
    }
  }

  return "";
}
