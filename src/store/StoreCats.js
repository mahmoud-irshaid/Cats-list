import { createSlice } from '@reduxjs/toolkit';

export const StoreCats = createSlice({
    name: 'StoreCats',
    initialState: {
        catsList: [
            {
                id: 1,
                name: 'lilly',
                breed: 'Scottish Fold',
                weight: '4',
                gender: 'Female',
                description: 'funny and cute'
            }
        ],
    },
    reducers: {
        addCat: (state, action) => {
            state.catsList = [...state.catsList, action.payload];
        },
        removeCat: (state, action) => {
            state.catsList = state.catsList.filter((i) => i.id !== action.payload);
        },
        editCat: (state, action) => {
            let objIndex = state.catsList.findIndex((obj => obj.id == action.payload.id));
            state.catsList[objIndex] = action.payload
        }
    },
});
export const { addCat, removeCat, editCat, } = StoreCats.actions;
export default StoreCats.reducer;