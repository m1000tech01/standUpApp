import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

export default function AvatarChip() {
  return <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />;
}
