import React from "react";
import { AppBar, Toolbar, Typography, Grid } from "@material-ui/core";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid item xs={12}>
          <Typography variant="h6" style={{ textAlign: "center" }}>
            BlueSky React Task
          </Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
