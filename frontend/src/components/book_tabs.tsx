"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookRow } from "./book_row";

import { Book } from "../app/types/book";
import { useState, useEffect } from "react";

type BookTabsProps = {
  books: Book[];
};

export const BookTabs = ({ books }: BookTabsProps) => {
  const completedBooks = books.filter((book) => book.status === "completed");
  const toReadBooks = books.filter((book) => book.status === "to-read");
  const inProgressBooks = books.filter((book) => book.status === "in-progress");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Tabs id="book-tab" defaultValue="in-progress" className="w-[90%] md:w-3/4 lg:w-1/2">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="in-progress">In Progress</TabsTrigger>
        <TabsTrigger value="to-read">To Read</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      <TabsContent value="completed">
        <div className="flex flex-col justify-center items-center">
          {loading && (
            <div className="text-lg text-center h-[200px] flex justify-center items-center">
              Loading...
            </div>
          )}
          {completedBooks.length === 0 && !loading && (
            <div className="text-lg text-center h-[200px] flex justify-center items-center">
              You haven't completed any books yet
            </div>
          )}
          {completedBooks.map((book, idx) => (
            <BookRow index={idx} book={book} key={idx} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="to-read">
        {loading && (
          <div className="text-lg text-center h-[200px] flex justify-center items-center">
            Loading...
          </div>
        )}
        {toReadBooks.length === 0 && !loading && (
          <div className="text-lg text-center h-[200px] flex justify-center items-center">
            You haven't added any books to read yet
          </div>
        )}
        <div className="flex flex-col justify-center items-center">
          {toReadBooks.map((book, idx) => (
            <BookRow index={idx} book={book} key={idx} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="in-progress">
        <div className="flex flex-col justify-center items-center">
          {loading && (
            <div className="text-lg text-center h-[200px] flex justify-center items-center">
              Loading...
            </div>
          )}
          {inProgressBooks.length === 0 && !loading && (
            <div className="text-lg text-center h-[200px] flex justify-center items-center">
              You haven't started reading any books yet
            </div>
          )}
          {inProgressBooks.map((book, idx) => (
            <BookRow index={idx} book={book} key={idx} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default BookTabs;
