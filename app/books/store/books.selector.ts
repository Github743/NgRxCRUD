import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Book } from "./book";

export const selectBooks = createFeatureSelector<Book[]>("myBooks");

export const selectBookById = (bookId: number) => {
    return createSelector(
        selectBooks,
        (books: Book[]) => {
            var bookById = books.filter(_ => _.id == bookId);
            if (bookById.length == 0) {
                return null;
            }
            return bookById[0];
        }
    )
}
