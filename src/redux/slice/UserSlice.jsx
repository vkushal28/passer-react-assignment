import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    currentPage: 1,
    usersPerPage: 10
};

export const UserSlice = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        removeUser: (state, action) => {
            state.users = state.users.filter((val) => val.id !== action.payload);
        },
        updateUser: (state, action) => {
            state.users = state.users.map((val) =>
                val.id === action.payload.id ? action.payload.data : val
            );
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
});

export const { addUser, removeUser, updateUser, setUsers, setCurrentPage } =
    UserSlice.actions;

export default UserSlice.reducer;
