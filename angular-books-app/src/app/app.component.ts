import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookListComponent } from './pages/book-list/book-list.component';
import { BookFormComponent } from './pages/book-form/book-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BookListComponent, BookFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-books-app';
}
