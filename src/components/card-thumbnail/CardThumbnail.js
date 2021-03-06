import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CardThumbnail(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" alt="your note" height="140" image="" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
          {console.log(props.name)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.text}
          {console.log(props.text)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
