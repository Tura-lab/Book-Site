import sqlite3

def seed_db():
    db = sqlite3.connect("database.db")
    cursor = db.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY, title TEXT, status TEXT)")

    cursor.execute("SELECT * FROM books")
    books = cursor.fetchall()

    if len(books) == 0:
        cursor.execute("INSERT OR IGNORE INTO books (title, status) VALUES (?, ?)", ("The Alchemist", "to-read"))
        cursor.execute("INSERT OR IGNORE INTO books (title, status) VALUES (?, ?)", ("The Activist", "in-progress"))
        cursor.execute("INSERT OR IGNORE INTO books (title, status) VALUES (?, ?)", ("The Proffesor", "completed"))

    db.commit()
    db.close()