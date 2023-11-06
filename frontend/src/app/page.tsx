"use client";

import { Toaster } from "@/components/ui/toaster";

import BookTabs from "@/components/book_tabs";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import useBooksStore from "./zustand/books";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "next-themes";

import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "./zustand/theme";

export default function Home() {
  const { setTheme } = useTheme();
  const themeStore = useThemeStore();

  const [title, setTitle] = useState("");
  const [addingBook, setAddingBook] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const bookStore = useBooksStore();

  const url = "http://127.0.0.1:8000/books";

  const getBooks = async () => {
    const response = await axios.get(url);
    const data = response.data;
    return JSON.stringify(data);
  };

  useEffect(() => {
    const cur_theme = localStorage.getItem("theme");
    if (cur_theme === "dark") themeStore.changeTheme("dark");

    setLoading(true);
    getBooks().then((data) => {
      const books = JSON.parse(data);
      bookStore.setBooks(books);
    }).catch((err) => {
      toast({
        title: "Error getting books",
        variant: "destructive"
      });
    });
    setLoading(false);
  }, []);

  // add a book
  const addBook = async () => {
    try {
      setLoading(true);
      // check if title is empty
      if (!title) {
        alert("Please add a book title");
      }
      const book = { title };
  
      const response = await axios.post(url, book);
      bookStore.addBook(response.data);
  
      // clear the input
      setTitle("");
      setAddingBook(false);
      setLoading(false);
  
      // show toast
      toast({
        title: "Added a book",
      });
    }
    catch(err){
      toast({
        title: "Error adding book",
        variant: "destructive"
      });
    }
  };

  const handleThemeChange = () => {
    if (themeStore.theme === "light") {
      setTheme("dark");
      themeStore.changeTheme("dark");
    } else {
      setTheme("light");
      themeStore.changeTheme("light");
    }
  };

  const handleAddClick = () => {
    if (addingBook) {
      addBook();
    }
    setAddingBook(!addingBook);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-2 md:p-5">
      <Toaster />
      <div className="w-[90%] md:w-3/4 lg:w-1/2 items-center justify-between flex flex-row">
        <div className="flex flex-row">
          {addingBook && (
            <input

              type="text"
              className="pl-2 md:pl-3 border w-full"
              placeholder="Title"
              onChange={handleTitleChange}
            />
          )}
          <Button className="mr-2" name="btn-1" id="btn-1" onClick={handleAddClick}>
            {!addingBook && <AiOutlinePlus className="mr-1" />}
            {addingBook ? "Publish" : "Add a Book"}
          </Button>
        </div>
        <div>
          <Button variant={"outline"} size={"icon"} onClick={handleThemeChange}>
            {themeStore.theme === "light" && <Moon />}
            {themeStore.theme === "dark" && <Sun />}
          </Button>
        </div>
      </div>

      <div className="w-full flex justify-center items-center mt-5">
        <BookTabs books={bookStore.books} />
      </div>
    </div>
  );
}
