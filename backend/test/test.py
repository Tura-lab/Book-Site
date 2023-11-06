import requests
import unittest
import json

class Book:
    def __init__(self, title):
        self.title = title
        self.status = "to-read"


class APITest(unittest.TestCase):
    def setUp(self) -> None:
        self.url = "http://127.0.0.1:8000/books"
    def test_get_all_books(self):
        
        response = requests.get(self.url)
        self.assertEqual(response.status_code, 200)

        res = response.json()
        
        # make sure that it contains title field
        self.assertIn("title", res[0])

    def test_post_book(self):
        data = {"title": "The Alchemist"}

        data = json.dumps(data)
        
        response = requests.post(self.url, data=data)
        self.assertEqual(response.status_code, 200)

        res = response.json()

# Run the tests
if __name__ == "__main__":
    unittest.main() # run all tests