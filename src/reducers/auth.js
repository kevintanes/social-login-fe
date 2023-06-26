import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",

    initialState: {
        username: "",
        email: ""
    },

    reducers: {
        authLoginAction: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;

            console.log('data username:', state.username);
            console.log('data email:', state.email);
        },
        authLogoutAction: (state, action) => {
            localStorage.removeItem("userLogin");
            console.log('data username:', state.username);
            console.log('data email:', state.email);
        },
    },
});

// Export action function nya
export const { authLoginAction, authLogoutAction } = authSlice.actions; // fungsi di dalam property reducers

// Export reducersnya
export default authSlice.reducer;
