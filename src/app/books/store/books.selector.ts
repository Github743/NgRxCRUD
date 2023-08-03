import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Book, BookState } from "./book";

export const selectBooks = createFeatureSelector<BookState>("myBooks");

// export const selectBookById = (bookId: number) => {
//     return createSelector(
//         selectBooks,
//         (books: Book[]) => {
//             var bookById = books.filter(_ => _.id == bookId);
//             if (bookById.length == 0) {
//                 return null;
//             }
//             return bookById[0];
//         }
//     )
// }

export const getBooks = createSelector(selectBooks, (state) => state.books);
export const selectBookById = (bookId: number) => createSelector(selectBooks, (state) => state.books?.filter(b => b.id == bookId)[0]);
export const isExpired = createSelector(selectBooks, (state) => state.expired);
