import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favorites: [],
};

const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            const product = action.payload;
            if (!state.favorites.some((item) => item.id === product.id)) {
                state.favorites.push(product);
            }
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter((item) => item.id !== action.payload);
        },
    },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
