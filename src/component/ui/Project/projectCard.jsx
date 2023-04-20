import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import { Grid } from "@mui/material";
import Items from "./items";
export default function ProjectCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Grid container spacing={3}>
        {
          <Grid item xs={2} md={2.4}>
            <Card variant="outlined">{<Items />}</Card>
          </Grid>
        }
      </Grid>
    </Box>
  );
}
