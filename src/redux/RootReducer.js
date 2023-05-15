import { createReducer } from '@reduxjs/toolkit'

const initialState = {
  mode: 'light',
  data: {},
  cart: {},
  cartQtyUpdate: "",
  searchFilterSortBy: {},
  searchFilterSortByTemporary: {},
  searchFilterPriceBy: {},
  searchFilterPriceByTemporary: {},
  searchOffset:0,
  searchProductList:[],
  NoOfCartItem: ""
};

const RootReducer = createReducer(initialState, (builder) => {
  builder.addCase('THEME_CHANGE', (state, action) => {
    state.mode = action.payload;
  })

  builder.addCase('ADD_DATA', (state, action) => {
    state.data[action.payload[0]] = action.payload[1];
  })

  builder.addCase('DEL_DATA', (state, action) => {
    delete state.data[action.payload[0]]
  })

  builder.addCase('ADD_CART', (state, action) => {
    state.cart[action.payload[0]] = action.payload[1];
  })

  builder.addCase('DEL_CART', (state, action) => {
    delete state.cart[action.payload[0]]
  })
  builder.addCase('ALL_DEL_CART', (state, action) => {
    state.cart =new Object();
  })

  builder.addCase('ADD_CART_QTY_UPDATE', (state, action) => {
    state.cartQtyUpdate = action.payload;
  })

  builder.addCase('REMOVE_CART_QTY_UPDATE', (state, action) => {
    state.cartQtyUpdate = '';
  })


  builder.addCase('ADD_SEARCH_FILTER_SORT_BY', (state, action) => {
    state.searchFilterSortBy = {};
    state.searchFilterSortBy[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_SEARCH_FILTER_SORT_BY', (state, action) => {
    state.searchFilterSortBy = new Object();
  })

  builder.addCase('ADD_SEARCH_FILTER_SORT_BY_TEMPORARY', (state, action) => {
    state.searchFilterSortByTemporary = {};
    state.searchFilterSortByTemporary[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_SEARCH_FILTER_SORT_BY_TEMPORARY', (state, action) => {
    state.searchFilterSortByTemporary = new Object();
  })



  builder.addCase('ADD_SEARCH_FILTER_PRICE_BY', (state, action) => {
    state.searchFilterPriceBy = {};
    state.searchFilterPriceBy[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_SEARCH_FILTER_PRICE_BY', (state, action) => {
    state.searchFilterPriceBy = new Object();
  })

  builder.addCase('ADD_SEARCH_FILTER_PRICE_BY_TEMPORARY', (state, action) => {
    state.searchFilterPriceByTemporary = {};
    state.searchFilterPriceByTemporary[action.payload[0]] = action.payload[1];
  })
  builder.addCase('REMOVE_SEARCH_FILTER_PRICE_BY_TEMPORARY', (state, action) => {
    state.searchFilterPriceByTemporary = new Object();
  })


  builder.addCase('SEARCH_OFFSET', (state, action) => {
    state.searchOffset = action.payload;
  })
  
  builder.addCase('ADD_SEARCH_PRODUCT_LIST', (state, action) => {
    state.searchProductList =[];
    state.searchProductList = action.payload;
  })
  builder.addCase('REMOVE_SEARCH_PRODUCT_LIST', (state, action) => {
    state.searchProductList = '';
  })

  builder.addCase('ADD_NO_OF_CART_ITEM', (state, action) => {
    state.NoOfCartItem = action.payload;
  })

  builder.addCase('REMOVE_ADD_NO_OF_CART_ITEM', (state, action) => {
    state.NoOfCartItem = '';
  })


});
export default RootReducer;