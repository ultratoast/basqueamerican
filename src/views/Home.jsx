import {
  Link as RouterLink
} from "react-router-dom"
import {
  Typography,
  Link,
  Card,
  CardContent,
  Box
} from "@mui/material"

import Layout from '../components/Layout'


export default function Home() {
  return (
    <Layout>
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Welcome
          </Typography>
          <Typography color="text.secondary">
            browse by category, then pick a recipe
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Link component={RouterLink} to="/categories" underline="hover">
              Go to Categories →
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Layout>
  )
}
