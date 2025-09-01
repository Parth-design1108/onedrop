import { createSlice } from '@reduxjs/toolkit'

// Initial state for user authentication
const initialState = {
  currentUser: null,
  // Stores details of the logged-in user (null means no user logged in)
  error: null,
  // Stores any authentication error messages
}

// Creating a slice for user-related state and actions
export const userSlice = createSlice({
  name: 'user',            // Slice name (will be used in Redux store)
  initialState,            // Initial state defined above
  reducers: {              // Reducers (functions to update the state)

    // Reducer for successful sign-in
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;  // Save logged-in user data
      state.error = null;                  // Clear any previous errors
    },
        // Reducer for failed sign-in
    signInFailure: (state, action) => {
      state.currentUser = null;           // Reset user data
      state.error = action.payload;       // Store the error message
    },
    signOutSuccess: (state, action) => {
  state.currentUser = null;
  state.error = null;
},

signOutFailure: (state, action) => {
  state.error = action.payload;
},

userDeleteSuccess: (state, action) => {
  state.currentUser = null;
  state.error = null;
},

userDeleteFailure: (state, action) => {
  state.error = action.payload;
},
},
})

// Exporting actions for use in components (dispatching)
export const { signInSuccess, signInFailure, signOutSuccess, signOutFailure, userDeleteFailure, userDeleteSuccess } = userSlice.actions

// Exporting reducer to configure in Redux store
export default userSlice.reducer;

