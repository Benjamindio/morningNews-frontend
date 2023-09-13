import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    value: []
}


export const hiddenArticleSlice = createSlice({
    name: 'hiddenArticles', 
    initialState,
    reducers: {
        hideArticle: (state,action) => {
            state.value.push(action.payload); 
        },
        showArticles: (state) => {
            state.value = []
        }
    }
});

export const {hideArticle, showArticles} = hiddenArticleSlice.actions; 
export default hiddenArticleSlice.reducer