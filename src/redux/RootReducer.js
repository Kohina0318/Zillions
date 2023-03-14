import { createReducer } from '@reduxjs/toolkit'

const initialState = {
  mode: 'light',
  data:{},
  cart:{},
  
};

const RootReducer = createReducer(initialState, (builder) => {
  builder.addCase('THEME_CHANGE', (state, action) => {
    // console.log('THEME_CHANGE in redux...', action);
    state.mode = action.payload;
  })

  
  builder.addCase('ADD_DATA',(state,action)=>{
    state.data[action.payload[0]] = action.payload[1];
  })
  
    builder.addCase('DEL_DATA',(state,action)=>{
     delete state.data[action.payload[0]]
    })

    builder.addCase('ADD_CART',(state,action)=>{
      state.cart[action.payload[0]] = action.payload[1];
    })
    
      builder.addCase('DEL_CART',(state,action)=>{
       delete state.cart[action.payload[0]]
      })

  
  
});
export default RootReducer;