import { createSlice } from "@reduxjs/toolkit";
import requestService from "../services/services"

const LoginSlice = createSlice({
    name: 'login',
    initialState: null,
    reducers: {
        Login: (state, action) => action.payload,
        Logout: () => null
    }
})

export const { Login, Logout } = LoginSlice.actions

export const LogoutUser = () => {
    return dispatch => {
        window.localStorage.removeItem("loggedNoteappUser");
        dispatch(Logout());
    }
};

export const RememberUser = () => {
    return dispatch => {
        const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(Login(user))
            requestService.setToken(user.token);
        }
    }
}


export default LoginSlice.reducer