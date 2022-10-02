import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";

export default function AvatarChip() {
  return (
    <Chip
      sx={{ boxShadow: 3 }}
      avatar={
        <Avatar>
          <AddIcon />
        </Avatar>
      }
      label="New"
    />
  );
}
