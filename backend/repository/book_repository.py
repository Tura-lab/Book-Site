from fastapi import HTTPException
from database.models import Book

class BookRepository:
    def __init__(self, db):
        self.db = db
        self.cursor = db.cursor()
        
        # Create the books table if it doesn't exist
        self.cursor.execute("CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY, title TEXT, status TEXT)")
        self.db.commit()

    def create_book(self, book: Book):
        # Create book in the database
        self.cursor.execute("INSERT INTO books (title, status) VALUES (?, ?)", (book.title, book.status))
        self.db.commit()
        # return the created book not the message
        return {"id": self.cursor.lastrowid, "title": book.title, "status": book.status}


    def get_books(self):
        # Get all books from the database
        # get the books as dictionaries
        res = self.cursor.execute("SELECT * FROM books")
        books = res.fetchall()
        # return as a list of dictionaries
        return [{"id": book[0], "title": book[1], "status": book[2]} for book in books]

    def get_book(self, book_id: int):
        # Get a book with the di
        res = self.cursor.execute("SELECT * FROM books WHERE id = (?)", (book_id,))
        book = res.fetchone()
        if book is None:
            raise HTTPException(status_code=404, detail="Book not found")
        return {"id": book[0], "title": book[1], "status": book[2]}

    def update_book(self, book_id:int, book: dict):
        # Update book in the database
        new_status = book["status"]
        self.cursor.execute("UPDATE books SET status = (?) WHERE id = (?)", (new_status, book_id))
        self.db.commit()
        # return the book
        return {"message": "Book updated successfully"}

    def delete_book(self, book_id: int):
        # Delete book from the database

        self.cursor.execute("DELETE FROM books WHERE id = (?)", (book_id,))

        self.db.commit()
        return {"message": "Book deleted successfully"}