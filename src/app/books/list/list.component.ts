import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectBooks } from '../store/books.selector';
import { invokeBooksAPI, invokeDeleteBookAPI } from '../store/books.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Router } from '@angular/router';

declare var window: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private store: Store,
    private appStore: Store<Appstate>,
    private router: Router
  ) { }

  books$ = this.store.pipe(select(selectBooks));
  ngOnInit(): void {

    //this.store.dispatch(invokeBooksAPI());

  }

}
