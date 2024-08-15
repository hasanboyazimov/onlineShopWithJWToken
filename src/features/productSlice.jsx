import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = "https://json-api.uz/api/project/onlineshopuz/products";

export const getData = createAsyncThunk("product/getData", async () => {
  const req = await fetch(url);
  const { data } = await req.json();
  return data;
});

const initialState = {
  allProducts: [],
  ordered: [],
  orderTotal: 0,
  totalPrice: 0,
  isLoading: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addAllProducts: (state, { payload }) => {
      state.allProducts = payload;
    },
    incrementOrder: (state, { payload }) => {
      const item = state.allProducts.find((product) => product.id == payload);

      if (!item.amount) {
        item.amount = 1;
      } else {
        item.amount += 1;
      }

      productSlice.caseReducers.calculateTotal(state);
    },
    decrementOrder: (state, { payload }) => {
      const item = state.allProducts.find((product) => product.id == payload);
      item.amount -= 1;

      productSlice.caseReducers.calculateTotal(state);
    },
    delateOrder: (state, { payload }) => {
      const data = state.allProducts.find((product) => product.id == payload);
      if (data) {
        data.amount = 0;
      }
      productSlice.caseReducers.calculateTotal(state);
    },
    clearOrder: (state) => {},
    calculateTotal: (state) => {
      state.ordered = state.allProducts.filter((product) => product.amount);

      let allOrderAmount = 0;
      let allOrderPrice = 0;
      state.ordered.forEach((order) => {
        allOrderAmount += order.amount;
        allOrderPrice += order.amount * order.price;
      });

      state.orderTotal = allOrderAmount;
      state.totalPrice = allOrderPrice;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.allDeserts = payload;
      })
      .addCase(getData.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  clearOrder,
  decrementOrder,
  incrementOrder,
  addAllProducts,
  delateOrder,
} = productSlice.actions;

export default productSlice.reducer;
