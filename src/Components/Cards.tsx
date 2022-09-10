import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { Component } from "react";
import { Cart } from "../Contexts/Ecomerce";

export default class Cards extends Component<Cart, any> {
  render() {
    const expanded = true;
    const { category, description, id, image, price, rating, title } =
      this.props;
    return (
      <Card sx={{ maxWidth: 345, mt: 2, mb: 2, ml: 1, mr: 1 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {title[0]}
            </Avatar>
          }
          action={<IconButton aria-label="settings">{price}</IconButton>}
          title={title}
        />
        <CardMedia component="img" height="194" image={image} alt={title} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description.slice(0, 150)}...
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Button variant="contained" color="secondary">
            Add To Cart
          </Button>
          <Button variant="contained" color="success">
            Buy Now
          </Button>
        </CardActions>
      </Card>
    );
  }
}
