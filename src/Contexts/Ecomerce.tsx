import React from "react";
import axios from "axios";
import { WithRoutes } from "../HOC/WithRoutes";
interface MyContextProviderProps {
  children: React.ReactNode;
}

const EcommerceContext = React.createContext({});
interface MyContextProviderState {
  cartValue: string | number;
  cartEle: Cart[];
  porductCart: Cart[];
}
export interface Cart {
  id: string;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}

class MyContextProvider extends React.Component<
  MyContextProviderProps,
  MyContextProviderState
> {
  constructor(props: MyContextProviderProps) {
    super(props);
    this.state = {
      cartValue: 0,
      cartEle: JSON.parse(localStorage.getItem("products")!) || [],
      porductCart: JSON.parse(localStorage.getItem("cart")!) || [],
    };
  }

  handleFetchApi = async () => {
    if (this.state.cartEle.length > 0) {
      return false;
    } else {
      const res = await axios.get("https://fakestoreapi.com/products");
      console.log({ res });

      if (res.status === 200) {
        await localStorage.setItem("products", JSON.stringify(res.data));

        this.setState({
          cartEle: JSON.parse(localStorage.getItem("products")!),
        });
      }
    }
  };

  handleAddToCart = async (id: string) => {
    const newProduct = this.state.cartEle.find(
      (product: Cart) => product.id === id
    );
    await localStorage.setItem(
      "cart",
      JSON.stringify([...this.state.porductCart, newProduct])
    );
    this.setState({
      porductCart: JSON.parse(localStorage.getItem("cart")!),
      cartValue: this.state.porductCart.length,
    });
  };
  render() {
    const { children } = this.props;
    return (
      <EcommerceContext.Provider
        value={{
          state: this.state,
          handleFetchApi: this.handleFetchApi,
          handleAddToCart: this.handleAddToCart,
        }}
      >
        {children}
      </EcommerceContext.Provider>
    );
  }
}

export { EcommerceContext };
export default WithRoutes(MyContextProvider);
