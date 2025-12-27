import {
  Link as RouterLink,
  useLocation
} from "react-router-dom";
import {
  Typography,
  Breadcrumbs,
  Link,
  Box
} from "@mui/material";

import titleCase from '../helpers/titleCase'

export default function CrumbNav() {
  const location = useLocation();
  const parts = location.pathname.split("/").filter(Boolean);

  // HashRouter puts actual routes into location.pathname (after #)
  const crumbs = [{ label: "Home", to: "/" }];

  // Expected routes:
  // /categories
  // /categories/:categorySlug
  // /categories/:categorySlug/recipes/:recipeId
  if (parts[0] === "categories") {
    crumbs.push({ label: "Categories", to: "/categories" });

    if (parts[1]) {
      const categorySlug = parts[1];
      crumbs.push({ label: titleCase(categorySlug.replace(/-/g, " ")), to: `/categories/${categorySlug}` });

      if (parts[2] === "recipes" && parts[3]) {
        crumbs.push({ label: "Recipe", to: location.pathname });
      }
    }
  }

  return (
    <Box sx={{ py: 2 }}>
      <Breadcrumbs aria-label="breadcrumb">
        {crumbs.map((c, idx) => {
          const isLast = idx === crumbs.length - 1;
          return isLast ? (
            <Typography key={c.to} color="text.primary">
              {c.label}
            </Typography>
          ) : (
            <Link key={c.to} component={RouterLink} underline="hover" color="inherit" to={c.to}>
              {c.label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}
