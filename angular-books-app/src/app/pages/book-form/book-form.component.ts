import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnInit {
  
  bookForm!: FormGroup;

  constructor(private fb: FormBuilder, private bookService: BookService) { }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
    });
  }

  submit() {
    if (this.bookForm.invalid) return;

    const { title, author } = this.bookForm.value;

    this.bookService.createBook(title!, author!).subscribe({
      next: (result) => {
        console.log('Libro creado:', result);
        this.bookForm.reset();
      },
      error: (err) => {
        console.error('Error al crear libro:', err);
      },
    });
  }
}
