import React, { useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import GmailTreeView from "../components/googleStyleTreeView/GoogleStyleTreeView";
import AvatarChip from "../components/googleStyleNewButton/GoogleStyleNewButton";

export default function GoogleDriveDashboard() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="google-dashboard-container">
      <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item p={2} xs={12} md={12}>
          <Item>Top Bar</Item>
        </Grid>
        <Grid container rowSpacing={4} p={2} xs={3} md={3}>
          <Grid>
            <AvatarChip />
          </Grid>
          <Grid>
            <GmailTreeView />
          </Grid>
        </Grid>
        <Grid item p={2} xs={9} md={9}>
          <Item>Right Hand Side</Item>
        </Grid>
        <Grid item p={2} xs={12} md={12}>
          <Item>Footer</Item>
        </Grid>
      </Grid>
    </div>
  );
}
