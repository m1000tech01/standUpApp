import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import defaultImage from "../../images/DefaultImage.png";

export default function CardThumbnail(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      {props.encodedImg.length === 0 ? (
        <CardMedia
          component="img"
          alt="your note is not working"
          height="140"
          image={defaultImage}
        />
      ) : (
        <CardMedia
          component="img"
          alt="your note is working"
          height="140"
          src={`data:image/png;base64, ${props.encodedImg}`}
        />
      )}
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
