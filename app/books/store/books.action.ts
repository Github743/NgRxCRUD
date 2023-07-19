import { createAction, props } from "@ngrx/store";
import { Book } from "./book";

export const invokeBooksAPI = createAction(
    "[Books API] invoke books Fetch API"
);

export const booksFetchAPISuccess = createAction(
    "[Books API] book fetch api success",
    props<{ allBooks: Book[] }>()
);

export const invokeSaveBookAPI = createAction(
    "[Books API] invoke save book API",
    props<{ payLoad: Book }>()
);

export const saveBookAPISuccess = createAction(
    "[Books API] save book API success",
    props<{ response: Book }>()
);

export const invokeUpdateBookAPI = createAction(
    "[Books API] invoke update book API",
    props<{ payLoad: Book }>()
);

export const updateBookAPISuccess = createAction(
    "[Books API] update book API success",
    props<{ response: Book }>()
);

export const deleteBookAPISuccess = createAction(
    "[Books API] invoke Delete book API",
    props<{ id: number }>()
);

export const invokeDeleteBookAPI = createAction(
    "[Books API] Delete book API success",
    props<{ id: number }>()
);