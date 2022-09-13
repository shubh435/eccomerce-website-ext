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
import { Cart, EcommerceContext } from "../Contexts/Ecomerce";

export default class Cards extends Component<Cart, any> {
  static contextType?: any = EcommerceContext;
  render() {
    const { handleAddToCart }: any = this.context;
    const { description, id, image, price, title } = this.props;
    return (
      <Card
        sx={{
          maxWidth: 345,
          mt: 2,
          mb: 2,
          ml: 1,
          mr: 1,
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {title[0]}
            </Avatar>
          }
          action={<IconButton aria-label="settings">${price}</IconButton>}
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
            px: 5,
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleAddToCart(id)}
          >
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
