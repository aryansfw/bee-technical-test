import { State } from "./api";

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};
export type UserState = State<{
  name?: string[];
  job?: string[];
}>;

export type DeleteUserState = State<undefined>;
