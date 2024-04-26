import { RootState } from "./UserSlice";

export interface UserSliceState {
  users: any[];
  currentPage: number;
  usersPerPage: number;
}

export type UserActionPayload = {
  id: string;
  data: any;
};

export interface UserSliceActions {
  addUser: (payload: UserActionPayload) => RootState;
  removeUser: (id: string) => RootState;
  updateUser: (payload: UserActionPayload) => RootState;
  setUsers: (users: any[]) => RootState;
  setCurrentPage: (page: number) => RootState;
}
