import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const NoteCard = (props) => {
  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="body2">
            {props.text.substring(0, 255)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Go To Note</Button>
          <ArrowRightAltIcon />
        </CardActions>
      </Card>
    </div>
  );
};

export default NoteCard;
