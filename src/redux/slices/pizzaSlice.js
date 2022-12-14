import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('users/fetchPizzasStatus', async (params, thunkApi) => {
  const { sortBy, order, category, search, currentPage } = params;
  const { data } = await axios.get(
    `https://62e7897793938a545bd3a4cc.mockapi.io/api/v1/tasks?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,
  );

  console.log(data, "data")

  // console.log(thunkApi) //смотри внизу
  return data;
});



//s lice

const initialState = {
  items: [],
  status: 'loading', //loading | success | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload; //console.log(action)//{type: 'pizza/setItems', payload: Array(4)}
    },
  },

  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },

    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    },

    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const selectPizzaData = (state) => state.pizza; //selector

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;

//
/*

// console.log(thunkApi)

{extra: undefined, requestId: 'BnFS2pMnSu-mRi9CdLjgU', signal: AbortSignal, dispatch: ƒ, getState: ƒ, …}

dispatch: ƒ dispatch()
extra: undefined
fulfillWithValue: ƒ (value, meta)
getState: ƒ i()
rejectWithValue: ƒ (value, meta)
requestId: "YL6p6jUs_3T1HmntSAuuM"
signal: AbortSignal {aborted: false, reason: undefined, onabort: null}
[[Prototype]]: Object
* */
