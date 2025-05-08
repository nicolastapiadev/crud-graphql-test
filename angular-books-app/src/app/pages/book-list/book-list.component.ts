import { Component, OnInit } from '@angular/core';

import { BookService } from '../../services/book.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  imports: [ReactiveFormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  editandoId: number | null = null;
  editForm!: FormGroup

  books: any[] = [];
  loading = true;

  constructor(private fb: FormBuilder, private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: ({ data, loading }) => {
        this.books = data.books;
        this.loading = loading;
      },
      error: (err) => {
        console.error('Error al obtener libros:', err);
      },
    });
    this.editForm = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
  });
  }

  eliminarLibro(id: number) {
    if (!confirm('¿Estás seguro de que quieres eliminar este libro?')) return;

    this.bookService.deleteBook(id).subscribe({
      next: () => {
        console.log('Libro eliminado correctamente')
      },
      error: (err) => console.error('Error al eliminar libro:', err),
    });
  }

  editarLibro(book: any) {
    this.editandoId = book.id;
    this.editForm.setValue({
      title: book.title,
      author: book.author,
    });
  }

  cancelarEdicion() {
    this.editandoId = null;
  }

  guardarCambios(id: number) {
    if (this.editForm.invalid) return;

    const { title, author } = this.editForm.value;
    this.bookService.updateBook(id, title!, author!).subscribe({
      next: () => {
        this.editandoId = null;
      },
      error: (err) => console.error('Error al actualizar:', err),
    });
  }
}
