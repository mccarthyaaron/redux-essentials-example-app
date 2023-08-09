import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";



const initialState = [
    // { id: 'zAQq516EK2j7YY60VtRm5', name: 'Tianna Jenkins' },
    // { id: 'bn9N6EkBRYTyxwQpGpwEJ', name: 'Kevin Grant' },
    // { id: 'yXyRh_tatWEgwVovDgFUJ', name: 'Madison Price' },
] 

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await client.get('/fakeApi/users');
    return response.data
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers (builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export default usersSlice.reducer