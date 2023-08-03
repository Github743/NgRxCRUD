import { createReducer, on } from "@ngrx/store";
import { Book, BookState } from "./book";
import { booksFetchAPISuccess, deleteBookAPISuccess, resetBooks, saveBookAPISuccess, setData, updateBookAPISuccess } from "./books.action";

export const initialState: BookState = {
    books: [],
    expired: true
};
// [{
//     "id": 1,
//     "title": "Angular in Action",
//     "author": "Jeremy Wilken",
//     "cost": 2095
// }];
export const bookReducer = createReducer(

    initialState,
    on(setData, (state, { data }) => ({ ...state, data })),

    on(booksFetchAPISuccess, (state, { allBooks }) => {
        return {
            ...state,
            books: allBooks,
            expired: false
        };
    }),

    on(saveBookAPISuccess, (state, { response }) => {
        // let newState = state.books;
        // newState.unshift(response);
        return { ...state };
    }),

    on(updateBookAPISuccess, (state, { response }) => {
        let newState = state.books.filter(_ => _.id !== response.id)
        newState.unshift(response);
        return { ...state, books: newState };
    }),

    on(deleteBookAPISuccess, (state, { id }) => {
        let newState = state.books.filter(_ => _.id !== id)
        return { ...state, books: newState };
    }),

    on(resetBooks, (state) => {
        return {
            ...state,
            expired: true
        }
    }),
)