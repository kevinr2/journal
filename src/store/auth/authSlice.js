import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
       name: 'auth',
       initialState: {
           status:'no-Checking',//'no-autenticado y autenticado
           uid: null,
           email:null,
           displayName:null,
           phothoUrl:null,
           errorMessage:null,
       },
       reducers: {
           login: (state,  {payload}  ) => {
            state.status='authenticated'//'no-autenticado y autenticado
            state.uid= payload.uid
            state.email=payload.email
            state.displayName=payload.displayName
            state.phothoUrl=payload.phothoUrl
            state.errorMessage=null
              
           },
           logout: (state,  {payload} ) => {
            state.status='no-Checking'//'no-autenticado y autenticado
            state.uid= null
            state.email=null
            state.displayName=null
            state.phothoUrl=null
            state.errorMessage=payload?.errorMessage
              
           },
           checkingCredentials: (state  ) => {
              state.status= 'checking'
           },
       }
});


// Action creators are generated for each case reducer function
export const { login,logout, checkingCredentials } = authSlice.actions;