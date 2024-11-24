import constructUrlWithPagination from "@/utils/constructUrlWithPagination";
import customFetch from "@/utils/customFetch";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction } from "react";

interface walletData {
  id: string;
  balance: number;
  walletType: string;
  walletName: string;
  deleted: boolean;
  userId: string;
  currency: number;
  updatedAt: string;
}

interface walletStorage {
  walletData: walletData[] | null;
  pending: boolean;
  error: string | null;
}

export interface UpdateCategoryData {
  text: string;
  image: string;
}

const initialState: walletStorage = {
  walletData: null,
  pending: false,
  error: null,
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchWalletByUserId = createAsyncThunk(
  "wallet/fetchWallet",
  async (
    {
      id,
      token,
      authSensitiveSwitcher,
      unauthorizedAction,
    }: {
      id: string;
      token: string;
      authSensitiveSwitcher: Dispatch<SetStateAction<boolean>>;
      unauthorizedAction: () => void;
    },
    { rejectWithValue }
  ) => {
    try {
      const requestUrl = constructUrlWithPagination({
        url: `${API_URL}/wallets/user-id/${id}`,
      });

      console.log("here1");

      if (requestUrl instanceof Error) {
        throw requestUrl;
      }

      const response = await customFetch({
        url: requestUrl,
        expectedStatusCode: 200,
        options: {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // credentials: 'include',
        },
        authSensitiveSwitcher,
        unauthorizedAction,
      });

      if (response instanceof Error) {
        throw response;
      } else {
        return response.data;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch wallet");
    }
  }
);

export const updateCategoryById = createAsyncThunk(
  "wallet/updateWalletById",
  async (
    {
      id,
      updatedCategory,
      authSensitiveSwitcher,
      unauthorizedAction,
    }: {
      id: string;
      updatedCategory: UpdateCategoryData;
      authSensitiveSwitcher: Dispatch<SetStateAction<boolean>>;
      unauthorizedAction: () => void;
    },
    { rejectWithValue }
  ) => {
    try {
      const requestUrl = constructUrlWithPagination({
        url: `${API_URL}/wallet/id/${id}`,
      });

      if (requestUrl instanceof Error) {
        throw requestUrl;
      }

      const response = await customFetch({
        url: requestUrl,
        expectedStatusCode: 201,
        options: {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: updatedCategory,
          credentials: "include",
        },
        authSensitiveSwitcher,
        unauthorizedAction,
      });

      if (response instanceof Error) {
        throw response;
      } else {
        return response.data;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update category");
    }
  }
);

const wallet = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    clearWallet(state) {
      state.walletData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchWalletByUserId
      .addCase(fetchWalletByUserId.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(fetchWalletByUserId.fulfilled, (state, action) => {
        state.walletData = action.payload;
        state.pending = false;
      })
      .addCase(fetchWalletByUserId.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload as string;
      })

      // updateProfileById
      .addCase(updateCategoryById.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(updateCategoryById.fulfilled, (state, action) => {
        state.walletData = action.payload;
        state.pending = false;
      })
      .addCase(updateCategoryById.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload as string;
      });
  },
});

export default wallet.reducer;
