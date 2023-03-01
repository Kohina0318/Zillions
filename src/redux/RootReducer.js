import { createReducer } from '@reduxjs/toolkit'

const initialState = {
  mode: 'light',
  
};

const RootReducer = createReducer(initialState, (builder) => {
  builder.addCase('THEME_CHANGE', (state, action) => {
    // console.log('THEME_CHANGE in redux...', action);
    state.mode = action.payload;
  })
  
  
});
export default RootReducer;