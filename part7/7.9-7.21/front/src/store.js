import { configureStore } from "@reduxjs/toolkit";
import NotificationSlice from "./slices/NotifSlices"
import Blogslice from "./slices/BlogSlices"
import LoginSlice from "./slices/LoginSlice"

const store = configureStore({
    reducer: {
        blogs: Blogslice,
        notification: NotificationSlice,
        login: LoginSlice
    }
})

export default store