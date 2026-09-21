// import type { User } from "@/types/auth.types";
// export async function login(_email: string, _password: string): Promise<User> {
//     return { id: "1", name: "Administrator", role: "admin" };
// }
import type { User } from "@/types/auth.types";

type LegacyLoginRow = {
  empid: number;
  empname: string;
  locationid: number;
  locationname: string;
  proftypeid: number;
  proftype: string;
  loginid: string;
  pwd: string;
  isdoctor: boolean;
};

type LegacyLoginResponse = {
  Table: LegacyLoginRow[];
  Table1?: {
    otpnumber: string;
  }[];
};

function parseLegacyResponse(value: unknown): LegacyLoginResponse {
  let parsed = value;

  // The backend returns JSON encoded inside a JSON string.
  if (typeof parsed === "string") {
    parsed = JSON.parse(parsed);
  }

  if (typeof parsed === "string") {
    parsed = JSON.parse(parsed);
  }

  return parsed as LegacyLoginResponse;
}

function getCurrentFinancialYear() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const startYear = month >= 3 ? year : year - 1;
  const endYear = startYear + 1;

  return `${String(startYear).slice(-2)}${String(endYear).slice(-2)}`;
}

export async function login(
  username: string,
  password: string,
): Promise<User> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("Backend API URL is not configured");
  }

  const loginBody = new URLSearchParams({
    loginid: username,
    pwd: password,
    otpnumber: "0",
    publicipd: "",
    logintime: new Date().toLocaleDateString("en-GB"),
  });

  const loginResponse = await fetch(
    `${apiUrl}/frmUserLog/GetUserLogin`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: loginBody.toString(),
    },
  );

  if (!loginResponse.ok) {
    throw new Error("Unable to connect to the backend");
  }

  const rawResult = await loginResponse.json();
  if (
    rawResult === "0" ||
    rawResult === "-1" ||
    !rawResult
  ) {
    throw new Error("Invalid username or password");
  }

  if (
    typeof rawResult === "string" &&
    rawResult.startsWith("-2")
  ) {
    throw new Error("Backend login error");
  }

  const result = parseLegacyResponse(rawResult);
  const employee = result.Table?.[0];

  if (!employee) {
    throw new Error("Invalid username or password");
  }

  const saveBody = new URLSearchParams({
    entempid: String(employee.empid),
    loginid: employee.loginid,
    pwd: employee.pwd,
    financialyear: getCurrentFinancialYear(),
    userlogindetailrowid: "0",
    loginstatus: "In",
    sessionlimit: "60",
    locationid: String(employee.locationid),
    logoutdatetime: "00/00/0000 00:00:00",
    otpnumber: result.Table1?.[0]?.otpnumber ?? "0",
    empname: employee.empname,
    locationname: employee.locationname,
    proftype: employee.proftype,
    proftypeid: String(employee.proftypeid),
    isdoctor: employee.isdoctor ? "1" : "0",
  });

  const saveResponse = await fetch(
    `${apiUrl}/frmUserLog/Save`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: saveBody.toString(),
    },
  );

  if (!saveResponse.ok) {
    throw new Error("Unable to create login session");
  }

  return {
    id: String(employee.empid),
    name: employee.empname,
    role: employee.proftype,
    locationId: String(employee.locationid),
    locationName: employee.locationname,
    isDoctor: employee.isdoctor,
  };
}

export async function logout(): Promise<void> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return;
  }

  await fetch(`${apiUrl}/frmUserLog/Index`, {
    method: "GET",
    credentials: "include",
  });
}
