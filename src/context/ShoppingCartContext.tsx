import React, { ReactNode, createContext, useContext } from 'react';
import { useState } from 'react';
import ShoppingCart from '../components/ShoppingCart';

type shoppingCartProviderType = {
  children: ReactNode;
};

type cartItemType = {
  id: number;
  quantity: number;
};

type shoppingCartContextType = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  IncreaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeItemQuantity: (id: number) => void;
  cartQuantity: number;
  cartItems: cartItemType[];
};

const ShoppingCartContext = createContext({} as shoppingCartContextType);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: shoppingCartProviderType) {
  const [cartItems, setCartItems] = useState<cartItemType[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  const cartQuantity = cartItems.reduce((quantity, item) => {
    return item.quantity + quantity;
  }, 0);

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function IncreaseItemQuantity(id: number) {
    setCartItems((prevCartItems) => {
      // if item not found
      if (prevCartItems.find((item) => item.id === id) == null) {
        return [...prevCartItems, { id, quantity: 1 }];
      } else {
        // if item found

        return prevCartItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseItemQuantity(id: number) {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      });
    });
  }

  function removeItemQuantity(id: number) {
    setCartItems((prevCartItems) => {
      return prevCartItems.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        openCart,
        closeCart,
        getItemQuantity,
        IncreaseItemQuantity,
        decreaseItemQuantity,
        removeItemQuantity,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
