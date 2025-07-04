import { LoginRequest } from "../types/auth";

export const login = async (data: LoginRequest) => {
  console.log(data);
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/login", {
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });

  const json = await res.json();
  return json;
};
