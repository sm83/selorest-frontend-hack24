import constructUrlWithPagination from '@/utils/constructUrlWithPagination';
import customFetch from '@/utils/customFetch';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Dispatch, SetStateAction } from 'react';

interface ProfileData {
  id: string;
}

interface ProfileStorage {
  profileData: ProfileData | null;
  pending: boolean;
  error: string | null;
}

export interface UpdateProfileData {
  text: string;
  image: string;
}

const initialState: ProfileStorage = {
  profileData: null,
  pending: false,
  error: null,
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchProfileById = createAsyncThunk(
  'profile/fetchProfile',
  async (
    {
      id,
      authSensitiveSwitcher,
      unauthorizedAction,
    }: {
      id: string;
      authSensitiveSwitcher: Dispatch<SetStateAction<boolean>>;
      unauthorizedAction: () => void;
    },
    { rejectWithValue }
  ) => {
    try {
      const requestUrl = constructUrlWithPagination({
        url: `${API_URL}/profiles/user-id/${id}`,
      });

      if (requestUrl instanceof Error) {
        throw requestUrl;
      }

      const token = localStorage.getItem('token');
      
      const response = await customFetch({
        url: requestUrl,
        expectedStatusCode: 200,
        options: {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          // credentials: 'include',

        },
        authSensitiveSwitcher,
        unauthorizedAction,
      });

      console.log("res ");
      

      if (response instanceof Error) {
        throw response;
      } else {
        return response.data;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Failed to fetch profile'
      );
    }
  }
);

export const updateProfileById = createAsyncThunk(
  'profile/updateProfileById',
  async (
    {
      id,
      updatedProfile,
      authSensitiveSwitcher,
      unauthorizedAction,
    }: {
      id: string;
      updatedProfile: UpdateProfileData;
      authSensitiveSwitcher: Dispatch<SetStateAction<boolean>>;
      unauthorizedAction: () => void;
    },
    { rejectWithValue }
  ) => {
    try {
      const requestUrl = constructUrlWithPagination({
        url: `${API_URL}/profiles/user-id/${id}`,
      });

      if (requestUrl instanceof Error) {
        throw requestUrl;
      }

      const response = await customFetch({
        url: requestUrl,
        expectedStatusCode: 201,
        options: {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: updatedProfile,
          credentials: 'include',
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
      return rejectWithValue(
        error.message || 'Failed to update profile'
      );
    }
  }
);

const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile(state) {
      state.profileData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProfileById
      .addCase(fetchProfileById.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(fetchProfileById.fulfilled, (state, action) => {
        state.profileData = action.payload;
        state.pending = false;
      })
      .addCase(fetchProfileById.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload as string;
      })

      // updateProfileById
      .addCase(updateProfileById.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(updateProfileById.fulfilled, (state, action) => {
        state.profileData = action.payload;
        state.pending = false;
      })
      .addCase(updateProfileById.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload as string;
      });
  },
});

export default profile.reducer;
