import { useMemo, useState } from "react"

import slugifyCategory from '../helpers/slugifyCategory'

// const SAMPLE_DATA = [
// {
// id: "allys-mac-n-cheese",
// name: "ally’s famous mac n cheese",
// category: "pasta",
// description: "",
// ingedients: [
// { id: "two-tablespoons-butter", name: "butter", quantity: "two", measurement: "tablespoons" },
// { id: "two-cups-milk", name: "milk", quantity: "two", measurement: "cups" },
// ],
// steps: [
// { id: "s1", name: "", time_required: "", content: "preheat oven to 350 degrees f" },
// { id: "s2", name: "", time_required: "30 minutes", content: "bake until hot and bubbly" },
// ],
// notes: [{ id: "n1", name: "", description: "bread crumb mixture optional" }],
// },
// {
// id: "basque-bread",
// name: "basque bread",
// category: "basque",
// description: "",
// ingedients: [{ id: "seven-cups-flour", name: "flour", quantity: "seven", measurement: "cups" }],
// steps: [{ id: "s1", name: "", time_required: "", content: "bake at 425 until tops turn gold" }],
// notes: [{ id: "n1", name: "", description: "brush with melted butter" }],
// },
// ]

export default function useRecipes() {
  const [resolved, setResolved] = useState(false)
  const [recipes, setRecipes] = useState([])

  if (recipes.length == 0) {
    fetch('/recipes.json').then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // console.log({response})
      return response.json()
    }).then(json => {
      // console.log({json})
      setResolved(true)
      setRecipes(json)
    })
  }

// console.log({recipes})

return useMemo(() => {
  if (recipes !== undefined && recipes !== null && recipes && resolved) {
    // console.log({recipes})
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
  }, [recipes, resolved])
}

// export default async function useRecipes() {
//   const defaults = { recipes: [], byId: new Map(), categories: new Map() }
//   try {
//     const response = await fetch('/recipes.json')
//     const recipes = await response.json()
//     // const recipes = SAMPLE_DATA

//     if (recipes != null) {
//       const byId = new Map(recipes.map((r) => [r.id, r]))

//       const categories = new Map()
//       for (const r of recipes) {
//         const cat = r.category || "uncategorized"
//         const catSlug = slugifyCategory(cat) || "uncategorized"
//         if (!categories.has(catSlug)) categories.set(catSlug, { slug: catSlug, name: cat, recipes: [] })
//         categories.get(catSlug).recipes.push(r)
//       }

//       // Sort
//       const cats = Array.from(categories.values()).sort((a, b) => a.name.localeCompare(b.name))
//       for (const c of cats) c.recipes.sort((a, b) => a.name.localeCompare(b.name))

//       return { recipes, byId, categories: cats }
//     } else {
//       return defaults
//     }

//   } catch (e) {
//     console.log(`fetch error ${e}`)
//     return defaults
//   }
// }