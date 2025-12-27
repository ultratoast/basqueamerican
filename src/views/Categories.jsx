import { useMemo, useState } from "react"
import {
  Link as RouterLink
} from "react-router-dom"
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
  TextField,
  InputAdornment
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

import useRecipes from '../hooks/useRecipes'
import titleCase from '../helpers/titleCase'
import Layout from '../components/Layout'

export default function Categories() {
  const { categories } = useRecipes()
  const [q, setQ] = useState("")

  let filtered = categories

  filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    if (!needle) return categories
    return categories.filter(c => (
      (c.name || c.slug).toLowerCase().includes(needle) || 
      c.recipes.filter(r => r.name.toLowerCase().includes(needle)).length > 0
    ))
  }, [categories, q])

  return (
    <Layout>
      <Stack spacing={2}>
        <Typography variant="h4">Categories</Typography>
        <TextField
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search categories"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Grid container spacing={2}>
          {filtered.map((c) => (
            <Grid item xs={12} sm={6} key={c.slug}>
              <Card
                variant="outlined"
                sx={{ borderRadius: 3, height: "100%" }}
                component={RouterLink}
                to={`/categories/${c.slug}`}
                style={{ textDecoration: "none" }}
              >
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" color="text.primary">
                      {titleCase(c.name || c.slug.replace(/-/g, " "))}
                    </Typography>
                    <Chip label={`${c.recipes.length}`} size="small" />
                  </Stack>
                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    {c.recipes.length === 1 ? "1 recipe" : `${c.recipes.length} recipes`}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Layout>
  )
}
