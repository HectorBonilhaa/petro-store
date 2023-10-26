"use client";

import { ProductsWithTotalPrice } from "@/helpers/product";
import { createContext, useState, ReactNode, useEffect, useMemo } from "react";

export interface CartProduct extends ProductsWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartBasePrice: number;
  cartTotalPrice: number;
  cartTotalDiscount: number;
  total: number;
  subTotal: number;
  totalDiscount: number;
  addProductToCart: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  total: 0,
  subTotal: 0,
  totalDiscount: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    setProducts(
      JSON.parse(localStorage.getItem("@fsw-store/cart-products") || "[]"),
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("@fsw-store/cart-products", JSON.stringify(products));
  }, [products]);

  // Total sem descontos
  const subTotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.basePrice);
    }, 0);
  }, [products]);

  // Total com descontos
  const total = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.totalPrice;
    }, 0);
  }, [products]);

  const totalDiscount = subTotal - total;

  //Método totalDiscount utilizando useMemo
  // const totalDiscount = useMemo(() => {
  //   return subTotal - total;
  // }, [total, subTotal]);

  const addProductToCart = (product: CartProduct) => {
    // Se o produto já estiver no carrinho, apenas aumente a sua quantidade

    const productIsAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (productIsAlreadyOnCart) {
      setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }
          return cartProduct;
        }),
      );
      return;
    }
    // Se não, adicione o produto á lista
    setProducts((prev) => [...prev, product]);
  };

  const decreaseProductQuantity = (productId: string) => {
    // se a quantidade for 1, remova o produto do carrinho
    setProducts((prev) =>
      prev
        .map((cartProduct) => {
          if (cartProduct.id === productId) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity - 1,
            };
          }
          return cartProduct;
        })
        .filter((cartProduct) => cartProduct.quantity > 0),
    );
    // se não diminua a quantidade em 1
  };
  const increaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }
        return cartProduct;
      }),
    );
  };

  const removeProductFromCart = (productId: string) => {
    setProducts((prev) =>
      prev.filter((CartProduct) => CartProduct.id !== productId),
    );
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
        total,
        subTotal,
        totalDiscount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
