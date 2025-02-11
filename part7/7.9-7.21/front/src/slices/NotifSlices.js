import { createSlice } from "@reduxjs/toolkit"

const NotificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        SetNotification: (state, action) => action.payload,
        ClearNotification: () => null
        }
    }
)

const { SetNotification, ClearNotification } = NotificationSlice.actions;

export const ShowNotification = (message, timeout) => {
    return dispatch => {
        dispatch(SetNotification(message));
        setTimeout(() => {
            dispatch(ClearNotification())
        }, timeout)
    }
}

export default NotificationSlice.reducer;