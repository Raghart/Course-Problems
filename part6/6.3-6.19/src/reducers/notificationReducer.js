import { createSlice } from "@reduxjs/toolkit"

const notifSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification: (state, action) => action.payload,
        clearNotification: () => null
    }
})

const { setNotification, clearNotification } = notifSlice.actions;

export const showNotification = (message, timeout) => {
    return dispatch => {
        dispatch(setNotification(message));
        setTimeout(() => {
            dispatch(clearNotification());
        }, timeout)
    }
}

export default notifSlice.reducer;