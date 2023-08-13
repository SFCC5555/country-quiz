import { createSlice } from "@reduxjs/toolkit"


// Initial state of the 'score' slice, which holds information related to scores
const initialState = {
  // Current player's score, initially set to 0
  currentScore: { value: 0 },

  // Local highscore stored in localStorage or value 0 and no name if not present

  localHighscore: localStorage.getItem('localHighscore')
    ? JSON.parse(localStorage.getItem('localHighscore'))
    : { value: 0, name: '' },

  // Default global highscore if the fetch is not successful
  globalHighscore: localStorage.getItem('localHighscore')
  ? JSON.parse(localStorage.getItem('localHighscore'))
  : { value: 0, name: '' }
};

export const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    updateScore: (state, action) => {
      // Update the 'score' state to the ..... provided in the action's payload
      state = action.payload;
      return state;
    }
  }
});

export const { updateScore } = scoreSlice.actions;
export default scoreSlice.reducer;