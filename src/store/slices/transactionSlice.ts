import { createSlice } from "@reduxjs/toolkit";

export interface ITransaction {
  id: string;
  amount: number;
  mony: string;
  type: string;
}

export const initialState: ITransaction[] = [];

const transaction = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
});

export default transaction.reducer;
