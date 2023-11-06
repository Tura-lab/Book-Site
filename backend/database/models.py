from dataclasses import dataclass

@dataclass
class Book:
    # auto UUID for each book
    title: str
    status: str = "to-read"
