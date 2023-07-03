import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const baseURL = "https://react-redux-todo-app.onrender.com"

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    all: [],
    isLoading: ""
  },
  reducers: {
    clear(state) {
      state.all = []
    }
  },
  extraReducers: builder => {
    builder.addCase(getNotes.fulfilled, (state, action) => {
      state.isLoading = false
      state.all = action.payload.allNotes
    })

    builder.addCase(addNote.fulfilled, (state, action) => {
      state.all.push(action.payload.success)
    })

    builder.addCase(remNote.fulfilled, (state, action) => {
      state.all = state.all.filter(note => note._id !== action.payload.deleted)
    })

    builder.addCase(editNote.fulfilled, (state, action) => {
      state.all.find((note, i) => {
        if (note._id === action.payload.updated._id) {
          note[i] = action.payload.updated
        }
      })
    })
  }
})

export const getNotes = createAsyncThunk("note/all", async () => {
  const url = baseURL+"/note/all"
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
  const url = baseURL+"/note/add"
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
  const url = baseURL+`/note/rem`
  const res = await fetch(url, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "token": localStorage.getItem('token'),
      "id": id,
    }
  })
  const data = await res.json()
  return data
})

export const editNote = createAsyncThunk("note/edit", async (info) => {
  console.log('updating note...')
  const url = baseURL+`/note/edit`
  const res = await fetch(url, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "token": localStorage.getItem('token'),
      "id": info.id,
    },
    body: JSON.stringify({ text: info.text })
  })
  const data = await res.json()
  return data
})

export const { clear } = noteSlice.actions
export default noteSlice.reducer