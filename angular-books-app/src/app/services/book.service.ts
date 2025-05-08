import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
    }
  }
`;

const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $author: String!) {
    createBook(createBookInput: { title: $title, author: $author }) {
      id
      title
      author
    }
  }
`;

const UPDATE_BOOK = gql`
  mutation UpdateBook($id: Int!, $title: String!, $author: String!) {
    updateBook(updateBookInput: { id: $id, title: $title, author: $author }) {
      id
      title
      author
    }
  }
`;

const DELETE_BOOK = gql`
  mutation DeleteBook($id: Int!) {
    removeBook(id: $id)
  }
`;

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private apollo: Apollo) { }

  getBooks(): Observable<any> {
    return this.apollo.watchQuery({
      query: GET_BOOKS,
    }).valueChanges;
  }

  createBook(title: string, author: string): Observable<any> {
    return this.apollo.mutate({
      mutation: CREATE_BOOK,
      variables: { title, author },
    });
  }

  updateBook(id: number, title: string, author: string): Observable<any> {
    return this.apollo.mutate({
      mutation: UPDATE_BOOK,
      variables: { id, title, author },
    });
  }

  deleteBook(id: number): Observable<any> {
    return this.apollo.mutate({
      mutation: DELETE_BOOK,
      variables: { id },
    });
  }
}
