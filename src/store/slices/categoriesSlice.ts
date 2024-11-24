import constructUrlWithPagination from "@/utils/constructUrlWithPagination";
import customFetch from "@/utils/customFetch";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction } from "react";

interface CategoriesData {
  id: string;
  categoryName: string;
  categoryPriority: string;
  balance: number;
  deleted: boolean;
  currency: number;
  icon: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoriesStorage {
  categoriesData: CategoriesData[] | null;
  pending: boolean;
  error: string | null;
}

export interface UpdateCategoryData {
  text: string;
  image: string;
}

const initialState: CategoriesStorage = {
  categoriesData: null,
  pending: false,
  error: null,
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchCategoriesByUserId = createAsyncThunk(
  "categories/fetchCategories",
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
        url: `${API_URL}/categories/user-id/${id}`,
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
      return rejectWithValue(error.message || "Failed to fetch categories");
    }
  }
);

export const updateCategoryById = createAsyncThunk(
  "categories/updateCategoriesById",
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
        url: `${API_URL}/categories/id/${id}`,
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

const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearCategories(state) {
      state.categoriesData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCategoriesByUserId
      .addCase(fetchCategoriesByUserId.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(fetchCategoriesByUserId.fulfilled, (state, action) => {
        state.categoriesData = action.payload;
        state.pending = false;
      })
      .addCase(fetchCategoriesByUserId.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload as string;
      })

      // updateProfileById
      .addCase(updateCategoryById.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(updateCategoryById.fulfilled, (state, action) => {
        state.categoriesData = action.payload;
        state.pending = false;
      })
      .addCase(updateCategoryById.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload as string;
      });
  },
});

export default categories.reducer;
