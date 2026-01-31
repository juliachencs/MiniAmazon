import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { createAsyncThunk, type GetThunkAPI } from "@reduxjs/toolkit";
import type { BasicErrorResponse } from "@/app/types";

// Use throughout the app instead of plain useDispath and useSelector for typescript
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

/**
 * A pre-typed version of createAsyncThunk.
 */

export type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: BasicErrorResponse;
};

export type ThunkAPI = GetThunkAPI<AsyncThunkConfig>;
export const createAppAsyncThunk =
  createAsyncThunk.withTypes<AsyncThunkConfig>();
// export type ThunkType = ReturnType<typeof createAppAsyncThunk>;
