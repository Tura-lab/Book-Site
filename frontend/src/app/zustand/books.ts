import { create } from "zustand";
import { Book } from "../types/book";

type BooksState = {
  books: Book[];
  addBook: (book: Book) => void;
  setBooks: (books: Book[]) => void;
  updateBookStatus: (id:number, new_status: "completed" | "to-read" | "in-progress") => void;
  removeBook: (id: number) => void;
};

const useBooksStore = create<BooksState>((set) => ({
  books: [],
  setBooks: (books: Book[]) => set(() => ({ books })),
  addBook: (book) => set((state) => ({ books: [book, ...state.books] })),
  updateBookStatus: (id: number, newStatus) => {
    set((state) => {
        const book = state.books.find((book) => book.id === id);
        if (book) {
            book.status = newStatus;
        }
        return { books: [...state.books] };
    });
  },
  removeBook: (id) =>
    set((state) => ({ books: state.books.filter((book) => book.id !== id) })),
}));

export default useBooksStore;
