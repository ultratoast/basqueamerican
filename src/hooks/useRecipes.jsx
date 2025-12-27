import { useMemo, useState } from "react"

import slugifyCategory from '../helpers/slugifyCategory'

export default function useRecipes() {
  const [recipes, setRecipes] = useState([])

  if (recipes.length == 0) {
    fetch('/recipes.json').then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json()
    }).then(json => {
      setRecipes(json)
    })
  }


  return useMemo(() => {
    if (recipes !== undefined && recipes !== null && recipes) {
      const byId = new Map(recipes.map((r) => [r.id, r]))


      const categories = new Map()
      for (const r of recipes) {
        const cat = r.category || "uncategorized"
        const catSlug = slugifyCategory(cat) || "uncategorized"
        if (!categories.has(catSlug)) categories.set(catSlug, { slug: catSlug, name: cat, recipes: [] })
        categories.get(catSlug).recipes.push(r)
      }


      // Sort
      const cats = Array.from(categories.values()).sort((a, b) => a.name.localeCompare(b.name))
      for (const c of cats) c.recipes.sort((a, b) => a.name.localeCompare(b.name))


      return { recipes, byId, categories: cats }
    }
    return { recipes: [], byId: new Map(), categories: []}
  }, [recipes])
}
