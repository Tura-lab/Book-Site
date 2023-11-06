"use client"

import { Book } from "@/app/types/book";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import useBooksStore from "@/app/zustand/books";
import { useToast } from "./ui/use-toast";
import { useThemeStore } from "@/app/zustand/theme";

interface BookRowProps {
  index: number;
  book: Book;
}

const apiUrl = "http://127.0.0.1:8000/books"

export const BookRow = ({ index, book }: BookRowProps) => {

  const { toast } = useToast()

  const themeStore = useThemeStore();

  const bookStore = useBooksStore();

  const handleDelete = async () => {
    try{
      const book_id = book.id;
      const response = await axios.delete(`${apiUrl}/${book_id}`);
      bookStore.removeBook(book_id);
  
      // show toast
      toast({
        title: "Book deleted",
        variant: "default"
      });

    }
    catch(err){
      toast({
        title: "Error deleting book",
        variant: "destructive"
      });
    }
  }

  const handleStatusChange = (new_status: "completed" | "to-read" | "in-progress") => {
    try {
      const book_id = book.id;
      const response = axios.put(`${apiUrl}/${book_id}`, {status: new_status});
      bookStore.updateBookStatus(book_id, new_status)
  
      // show toast
      toast({
        title: "Status updated",
        variant: "default"
      });
    }
    catch(err){
      toast({
        title: "Error updating status",
        variant: "destructive"
      });
    }
  }

  // status options to change to - meaning the ones that are not the current status
  const statusOptions = ["completed", "to-read", "in-progress"].filter(
    (status) => status !== book.status
  );

  return (
    <div className={`
      w-full 
      p-4 
      flex 
      flex-row 
      justify-between 
      text-start 
      items-center
      ${index % 2 === 0 && themeStore.theme == "light" && "bg-neutral-100"}
      ${index % 2 === 0 && themeStore.theme == "dark" && "bg-neutral-900"}
    `}>
      <div className="flex flex-row gap-2">
        <div>{index + 1}.</div>
        <div>{book.title}</div>
      </div>
      <div className={"flex flex-row gap-2 items-center"}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <BsThreeDotsVertical />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Book</DropdownMenuLabel>
            <DropdownMenuGroup>
              {statusOptions.map((item: string) => <DropdownMenuItem key={item}>
                <span
                 className="cursor-pointer"
                 onClick={() => handleStatusChange(item as "completed" | "to-read" | "in-progress")}
                >{item}</span>
              </DropdownMenuItem>)}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span className="text-red-600 cursor-pointer" onClick={handleDelete}>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
