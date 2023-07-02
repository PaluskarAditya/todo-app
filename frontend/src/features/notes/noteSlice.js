import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    all: [],
    isLoading: ""
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getNotes.fulfilled, (state, action) => {
      state.isLoading = false
      state.all = action.payload.allNotes
    })
  }
})

export const getNotes = createAsyncThunk("note/all", async () => {
  const url = "http://localhost:8080/note/all"
  const res = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-type": "application/json",
      "token": localStorage.getItem('token')
    },
  })
  const data = await res.json()
  return data
})

export const addNote = createAsyncThunk("note/add", async (text) => {
  const url = "http://localhost:8080/note/add"
  const res = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-type": "application/json",
      "token": localStorage.getItem('token')
    },
    body: JSON.stringify({ text })
  })
  const data = await res.json()
  return data
})

export const remNote = createAsyncThunk("note/del", async (id) => {
  
})

export default noteSlice.reducer