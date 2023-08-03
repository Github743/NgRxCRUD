import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BooksService } from "../books.service";
import {
    booksFetchAPISuccess, deleteBookAPISuccess, invokeBooksAPI,
    invokeDeleteBookAPI, invokeSaveBookAPI, invokeUpdateBookAPI,
    saveBookAPISuccess, updateBookAPISuccess, resetBooks, setData
} from "./books.action";
import { delay, filter, map, switchMap, tap, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { Appstate } from "src/app/shared/store/appstate";
import { setAPIStatus } from "src/app/shared/store/app.action";
import { isExpired, selectBooks } from '../store/books.selector';

@Injectable()
export class BooksEffects {
    constructor(private actions$: Actions, private bookService: BooksService,
        private appStore: Store<Appstate>) {

    }
    // refreshBookEveryFiveMinutes$ = createEffect(() => {
    //     return interval(1000 * 60 * 1).pipe(map(() => invokeBooksAPI()))
    // })

    //     loadData$ = createEffect(() =>
    //     this.actions$.pipe(
    //       ofType(invokeBooksAPI), // Replace with your action type
    //       switchMap(() =>
    //         this.bookService.get().pipe(
    //           map((data) => setData({ data }))
    //         )
    //       )
    //     )
    //   );
    loadAllBooks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(invokeBooksAPI),
            withLatestFrom(this.appStore.select(isExpired)),
            tap(([action, isExpired]) => console.log(isExpired)),
            filter(([action, isExpired]) => isExpired),
            switchMap(() => {
                return this.bookService.get()
                    .pipe(map((data) => booksFetchAPISuccess({ allBooks: data })
                    ))
            }
            ),
        ),
    );

    booksFetchSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(booksFetchAPISuccess),
            delay(60000),
            map(() => {
                return resetBooks()
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
