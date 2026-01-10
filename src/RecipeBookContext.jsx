import { createContext } from "react"

export const RecipeBookContext = createContext({
  "categories": {},
  "byId" : {},
  "recipes": []
})