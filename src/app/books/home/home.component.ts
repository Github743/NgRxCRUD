import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getBooks, selectBooks } from '../store/books.selector';
import { invokeBooksAPI, invokeDeleteBookAPI } from '../store/books.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Router } from '@angular/router';
import { Book, BookState } from '../store/book';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store,
    private appStore: Store<BookState>,
    private router: Router
  ) { }

  books$ = this.store.pipe(select(getBooks));;
  deleteModal: any;
  idToDelete: number = 0;

  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById("deleteModal")
    );

    this.store.dispatch(invokeBooksAPI());
  }

  openDeleteModal(id: number) {
    this.idToDelete = id;
    this.deleteModal.show();
  }

  refresh() {
    this.router.navigateByUrl('/');
  }

  closeModal() {
    this.deleteModal.hide();
  }

  confrimDelete() {
    this.store.dispatch(invokeDeleteBookAPI({ id: this.idToDelete }));
    let appStatus$ = this.appStore.pipe(select(selectAppState));
    appStatus$.subscribe((data) => {
      if (data.apiStatus === 'Success') {
        this.appStore.dispatch(setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '' } }));
        this.deleteModal.hide();
      }
    })
  }

}
