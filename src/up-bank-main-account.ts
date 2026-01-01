import * as App from "./constants.ts"

export async function UpBankGetMainAccount(): Promise<string> {
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
