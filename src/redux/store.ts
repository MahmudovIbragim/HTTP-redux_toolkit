import { reducerMovie } from "./tools/youTubeSlice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    reducerMovie,
  },
});

export type RootType = ReturnType<typeof store.getState>;

export type appDispach = typeof store.dispatch;

export const UseAppDispach = () => useDispatch<appDispach>()

export const useAppSelector: TypedUseSelectorHook<RootType> = useSelector;
