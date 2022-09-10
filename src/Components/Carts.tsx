import { Box } from "@mui/system";
import React from "react";
import { Cart, EcommerceContext } from "../Contexts/Ecomerce";
import Cards from "./Cards";
interface CartsProps {}

interface CartsState {}

class Carts extends React.Component<CartsProps, CartsState> {
  static contextType?: any = EcommerceContext;
  render() {
    const { state }: any = this.context;
    return (
      <Box>
        {state.porductCart &&
          state.porductCart.map((product: Cart) => {
            return <Cards key={product.id} {...product} />;
          })}
      </Box>
    );
  }
}

export default Carts;
