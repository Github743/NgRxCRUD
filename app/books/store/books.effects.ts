import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BooksService } from "../books.service";
import { booksFetchAPISuccess, deleteBookAPISuccess, invokeBooksAPI, invokeDeleteBookAPI, invokeSaveBookAPI, invokeUpdateBookAPI, saveBookAPISuccess, updateBookAPISuccess } from "./books.action";
import { filter, map, mergeMap, switchMap, timer, withLatestFrom } from "rxjs";
import { Store, select } from "@ngrx/store";
import { Appstate } from "src/app/shared/store/appstate";
import { setAPIStatus } from "src/app/shared/store/app.action";
import { selectAppState } from "src/app/shared/store/app.selector";

@Injectable()
export class BooksEffects {
    constructor(private actions$: Actions, private bookService: BooksService,
        private appStore: Store<Appstate>) {

    }

    loadData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(invokeBooksAPI),
            withLatestFrom(this.appStore.pipe(select(selectAppState))),
            filter(([_, loaded]) => !loaded), // Load data only if it's not already loaded
            switchMap(() =>
                timer(0, 1 * 60 * 1000).pipe( // Load data every 5 minutes
                    mergeMap(() =>
                        this.bookService.get().pipe(
                            map(data => booksFetchAPISuccess({ allBooks: data }))
                            //catchError(error => of(new LoadDataFailure(error)))
                        )
                    )
                )
            )
        )
    );

    loadAllBooks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(invokeBooksAPI),
            switchMap(() => {
                return this.bookService.get()
                    .pipe(map((data) => booksFetchAPISuccess({ allBooks: data })))
            })
        )
    );

    saveNewBook$ = createEffect(() =>
        this.actions$.pipe(
            ofType(invokeSaveBookAPI),
            switchMap((action) => {
                this.appStore.dispatch(setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } }))
                return this.bookService
                    .create(action.payLoad)
                    .pipe(map((data) => {
                        this.appStore.dispatch(setAPIStatus({ apiStatus: { apiResponseMessage: 'Book saved', apiStatus: 'Success' } }))
                        return saveBookAPISuccess({ response: data })
                    }));
            })
        )
    )

    updateBook$ = createEffect(() =>
        this.actions$.pipe(
            ofType(invokeUpdateBookAPI),
            switchMap((action) => {
                this.appStore.dispatch(setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } }))
                return this.bookService
                    .update(action.payLoad)
                    .pipe(map((data) => {
                        this.appStore.dispatch(setAPIStatus({ apiStatus: { apiResponseMessage: 'Book updated', apiStatus: 'Success' } }))
                        return updateBookAPISuccess({ response: data })
                    }));
            })
        )
    )

    deleteBook$ = createEffect(() =>
        this.actions$.pipe(
            ofType(invokeDeleteBookAPI),
            switchMap((action) => {
                this.appStore.dispatch(setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } }))
                return this.bookService
                    .delete(action.id)
                    .pipe(map((data) => {
                        this.appStore.dispatch(setAPIStatus({ apiStatus: { apiResponseMessage: 'Book deleted', apiStatus: 'Success' } }))
                        return deleteBookAPISuccess({ id: action.id })
                    }));
            })
        )
    )
}
