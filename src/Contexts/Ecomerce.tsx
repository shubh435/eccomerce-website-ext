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
  amount: number;
}
export interface Cart {
  id: string;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
  quantity?: number;
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
      amount: JSON.parse(localStorage.getItem("amount")!) || 0,
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
    if (newProduct) {
      if (this.state.porductCart.some((cartItem) => cartItem.id === id)) {
        this.handleAddButton(id);
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify([
            ...this.state.porductCart,
            { ...newProduct, quantity: 1 },
          ])
        );
      }
      this.setState({
        porductCart: JSON.parse(localStorage.getItem("cart")!),
        cartValue: this.state.porductCart.length,
      });

      this.handleUpdateAmount();
    }
  };

  handleUpdateAmount = async () => {
    const { porductCart } = this.state;
    let tamount = 0;
    for (let i = 0; i < porductCart.length; i++) {
      tamount += porductCart[i].quantity! * porductCart[i].price;
      localStorage.setItem("amount", JSON.stringify(tamount));
      await this.setState({
        amount: JSON.parse(localStorage.getItem("amount")!),
      });
    }
  };
  // handleSubstractButton = (id: string | number) => {
  //   const { porductCart } = this.state;
  //   const newProducts: Cart[] = porductCart.filter(
  //     (product: Cart) => product.id !== id
  //   );
  //   const newData = porductCart.map(async (product: Cart) => {
  //     if (product.id === id) {
  //       if (product.quantity! < 1) {
  //         this.setState({ porductCart: newProducts });
  //       }
  //       product.quantity! -= 1;
  //     }
  //     return { ...product };
  //   });
  //   localStorage.setItem("cart", JSON.stringify(newData));
  //   this.setState({
  //     porductCart: JSON.parse(localStorage.getItem("cart")!),
  //     cartValue: this.state.porductCart.length,
  //   });

  //   this.handleUpdateAmount();
  // };
  handleAddButton = (id: string | number) => {
    console.log(id);
    localStorage.setItem(
      "cart",
      JSON.stringify(
        this.state.porductCart.map((product: Cart) => {
          if (product.id === id) {
            product.quantity! += 1;
          }
          return { ...product };
        })
      )
    );
    this.setState({
      porductCart: JSON.parse(localStorage.getItem("cart")!),
      cartValue: this.state.porductCart.length,
    });
    this.handleUpdateAmount();
  };
  render() {
    const { children } = this.props;
    return (
      <EcommerceContext.Provider
        value={{
          state: this.state,
          handleFetchApi: this.handleFetchApi,
          handleAddToCart: this.handleAddToCart,
          handleAddButton: this.handleAddButton,
          // handleSubstractButton: this.handleSubstractButton,
        }}
      >
        {children}
      </EcommerceContext.Provider>
    );
  }
}

export { EcommerceContext };
export default WithRoutes(MyContextProvider);
