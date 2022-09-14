import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import React, { Component } from "react";
import { Cart, EcommerceContext } from "../Contexts/Ecomerce";

export default class CardCarts extends Component<Cart> {
  static contextType?: any = EcommerceContext;

  render() {
    const { handleAddButton, handleSubstractButton }: any = this.context;
    const { id, price, title, quantity } = this.props;
    return (
      <Card
        sx={{
          display: "flex",
          my: 4,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <CardHeader title={title} sx={{ width: "40%" }} />
        <CardContent
          sx={{ width: "20%", display: "flex", justifyContent: "space-evenly" }}
        >
          <Typography variant="h6" color="text.secondary">
            ${price}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {quantity}units
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexGrow: 1 / 2,
            px: 5,
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleAddButton(id)}
          >
            +
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleSubstractButton(id)}
          >
            -
          </Button>
        </CardActions>
      </Card>
    );
  }
}
