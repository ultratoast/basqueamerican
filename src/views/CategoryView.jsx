import { useMemo, useState } from "react"
import {
  Link as RouterLink,
  useParams
} from "react-router-dom"
import {
  Typography,
  Link,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  InputAdornment
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

import useRecipes from "../hooks/useRecipes"
import titleCase from "../helpers/titleCase"
import Layout from '../components/Layout'

export default function CategoryView() {
  const { categorySlug } = useParams()
  const { categories } = useRecipes()
  const [q, setQ] = useState("")
  const category = categories.find((c) => c.slug === categorySlug)

  const filtered = useMemo(() => {
    const list = category?.recipes ?? []
    const needle = q.trim().toLowerCase()
    if (!needle) return list
    return list.filter((r) => r.name.toLowerCase().includes(needle))
  }, [category, q])

  if (!category) {
    return (
      <Layout>
        <Typography variant="h5" gutterBottom>
          Category not found
        </Typography>
        <Link component={RouterLink} to="/categories" underline="hover">
          Back to categories
        </Link>
      </Layout>
    )
  }

  return (
    <Layout>
      <Stack spacing={2}>
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "stretch", sm: "center" }} spacing={2}>
          <Typography variant="h4">{titleCase(category.name || category.slug.replace(/-/g, " "))}</Typography>
          <TextField
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search recipes"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Grid container spacing={2}>
          {filtered.map((r) => (
            <Grid item xs={12} sm={6} key={r.id}>
              <Card
                variant="outlined"
                sx={{ borderRadius: 3, height: "100%" }}
                component={RouterLink}
                to={`/categories/${category.slug}/recipes/${r.id}`}
                style={{ textDecoration: "none" }}
              >
                <CardContent>
                  <Typography variant="h6" color="text.primary">
                    {r.name}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    {r.ingedients?.length ? `${r.ingedients.length} ingredients` : ""}
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
