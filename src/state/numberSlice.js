import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    noOfRequests : 0
}
const numberSlice = createSlice({
    name : "noOfRequests",
    initialState,
    reducers : {
        setNoOfRequests : (state,action) => {
            state.noOfRequests = action.payload.noOfFriendRequests + action.payload.noOfGroupRequests
        },
    }
})

export const {setNoOfRequests} = numberSlice.actions
export default numberSlice.reducer