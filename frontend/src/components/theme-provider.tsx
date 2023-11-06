"use client"

import  React,{useState, useEffect} from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {


const [client, setclient] = useState(false)

useEffect(() => {
  setclient(true)
},[])

  return client ? <NextThemesProvider {...props}>{children}</NextThemesProvider> : <>{children}</>
}
