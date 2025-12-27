import {
  Link as RouterLink
} from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box
} from "@mui/material";

import CrumbNav from './CrumbNav'

export default function Layout({ children }) {
  return (
    <>
      <AppBar position="sticky" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component={RouterLink} to="/" style={{ color: "inherit", textDecoration: "none" }}>
            Recipe Pokédex
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <CrumbNav />
        {children}
        <Box sx={{ py: 6 }} />
      </Container>
    </>
  );
}