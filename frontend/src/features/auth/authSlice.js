import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const baseURL = "http://localhost:8080"

export const login = createAsyncThunk("auth/signin", async (cred) => {
  console.log('loggin in...', cred)
  const url =  baseURL+"/user/login"
  const res = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ uname: cred.uname, pass: cred.pass})
  })
  const data = await res.json()
  console.log(data)
  return data
})

export const register = createAsyncThunk("auth/signin", async (cred) => {
  const url = baseURL+"/user/signup"
  const res = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ uname: cred.uname, pass: cred.pass, email: cred.email})
  })
  const data = await res.json()
  console.log(data)
  return data
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem("user") ? localStorage.getItem("user") : null,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    isSuccess: "",
    isLoading: ""
  },
  reducers: {
    reset(state) {
      state.user = null
      state.isLoading = ""
      state.isSuccess = ""
      state.token = null
    },
    logout(state) {
      state.user = null
      state.isLoading = ""
      state.isSuccess = ""
      state.token = null
    }
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.user = action.payload.user
      state.token = action.payload.token
      localStorage.setItem('user', action.payload.user)
      localStorage.setItem('token', action.payload.token)
      reset()
    })

    builder.addCase(login.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(login.rejected, (state) => {
      state.isLoading = false
      state.isSuccess = false
    })
  }
})

export const { reset, logout } = authSlice.actions
export default authSlice.reducer