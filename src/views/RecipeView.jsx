import {
  useContext
} from "react"
import {
  Link as RouterLink,
  useParams
} from "react-router-dom"
import {
  Typography,
  Link,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
  Box,
  Divider
} from "@mui/material"

import titleCase from '../helpers/titleCase'
import Layout from '../components/Layout'
import { RecipeBookContext } from "../RecipeBookContext";

export default function RecipeView() {
  const { categorySlug, recipeId } = useParams()
  const { categories, byId } = useContext(RecipeBookContext)
  const recipe = byId.get(recipeId)

  const category = categories.find((c) => c.slug === categorySlug)
  const inCategory = recipe && category?.recipes?.some((r) => r.id === recipe.id)

  if (!recipe || !category || !inCategory) {
    return (
      <Layout>
        <Typography variant="h5" gutterBottom>
          Recipe not found
        </Typography>
        <Link component={RouterLink} to="/categories" underline="hover">
          Back to categories
        </Link>
      </Layout>
    )
  }

  return (
    <Layout>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h3" sx={{ lineHeight: 1.1 }}>
            {recipe.name}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
            <Chip label={titleCase(recipe.category)} size="small" />
            {recipe.description ? <Chip label={recipe.description} size="small" variant="outlined" /> : null}
          </Stack>
        </Box>

        <Card variant="outlined" sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Ingredients
            </Typography>
            <List dense>
              {(recipe.ingedients || []).map((i) => {
                const qty = [i.quantity, i.measurement].filter(Boolean).join(" ").trim()
                return (
                  <ListItem key={i.id} disableGutters>
                    <ListItemText primary={i.name} secondary={qty ? qty : undefined} />
                  </ListItem>
                )
              })}
            </List>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Steps
            </Typography>
            <Stack spacing={2}>
              {(recipe.steps || []).map((s, idx) => (
                <Box key={s.id}>
                  <Stack direction="row" spacing={1} alignItems="baseline">
                    <Typography variant="subtitle1">{idx + 1}.</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {s.name || ""}
                    </Typography>
                    {s.time_required ? <Chip label={s.time_required} size="small" variant="outlined" /> : null}
                  </Stack>
                  <Typography sx={{ mt: 0.5 }}>{s.content}</Typography>
                  {idx < (recipe.steps?.length || 0) - 1 ? <Divider sx={{ mt: 2 }} /> : null}
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {(recipe.notes || []).length ? (
          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Notes
              </Typography>
              <Stack spacing={1}>
                {recipe.notes.map((n) => (
                  <Typography key={n.id} color="text.secondary">
                    • {n.description}
                  </Typography>
                ))}
              </Stack>
            </CardContent>
          </Card>
        ) : null}
      </Stack>
    </Layout>
  )
}