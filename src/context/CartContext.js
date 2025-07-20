import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

const CART_ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
  LOAD_CART: "LOAD_CART",
  ADD_CUSTOM_BURGER: "ADD_CUSTOM_BURGER",
  REMOVE_CUSTOM_BURGER: "REMOVE_CUSTOM_BURGER",
  UPDATE_CUSTOM_BURGER_QUANTITY: "UPDATE_CUSTOM_BURGER_QUANTITY",
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }

    case CART_ACTIONS.ADD_CUSTOM_BURGER: {
      const newCustomBurger = {
        id: Date.now() + Math.random(),
        ingredients: action.payload.ingredients,
        quantity: action.payload.quantity || 1,
        createdAt: new Date().toISOString(),
      };

      return {
        ...state,
        customBurgers: [...(state.customBurgers || []), newCustomBurger],
      };
    }

    case CART_ACTIONS.REMOVE_CUSTOM_BURGER: {
      return {
        ...state,
        customBurgers: (state.customBurgers || []).filter(
          (burger) => burger.id !== action.payload
        ),
      };
    }

    case CART_ACTIONS.UPDATE_CUSTOM_BURGER_QUANTITY: {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        return {
          ...state,
          customBurgers: (state.customBurgers || []).filter(
            (burger) => burger.id !== id
          ),
        };
      }

      return {
        ...state,
        customBurgers: (state.customBurgers || []).map((burger) =>
          burger.id === id ? { ...burger, quantity } : burger
        ),
      };
    }

    case CART_ACTIONS.CLEAR_CART: {
      return {
        ...state,
        items: [],
        customBurgers: [],
      };
    }

    case CART_ACTIONS.LOAD_CART: {
      return {
        ...state,
        items: action.payload.items || [],
        customBurgers: action.payload.customBurgers || [],
      };
    }

    default:
      return state;
  }
};

const initialState = {
  items: [],
  customBurgers: [],
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        const cartData = {
          items: parsedCart.items || parsedCart || [],
          customBurgers: parsedCart.customBurgers || [],
        };
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: cartData });
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        "cart",
        JSON.stringify({
          items: state.items,
          customBurgers: state.customBurgers,
        })
      );
    }
  }, [state.items, state.customBurgers, isLoaded]);

  const addItem = (product) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product });
  };

  const removeItem = (productId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id: productId, quantity },
    });
  };

  const addCustomBurger = (ingredients, quantity = 1) => {
    dispatch({
      type: CART_ACTIONS.ADD_CUSTOM_BURGER,
      payload: { ingredients, quantity },
    });
  };

  const removeCustomBurger = (burgerId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_CUSTOM_BURGER, payload: burgerId });
  };

  const updateCustomBurgerQuantity = (burgerId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_CUSTOM_BURGER_QUANTITY,
      payload: { id: burgerId, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const getCustomBurgerPrice = (burger) => {
    return burger.ingredients.reduce((total, ingredient) => {
      return total + parseFloat(ingredient.price || 0);
    }, 0);
  };

  const getCartTotal = () => {
    const itemsTotal = state.items.reduce((total, item) => {
      return total + parseFloat(item.price) * item.quantity;
    }, 0);

    const customBurgersTotal = (state.customBurgers || []).reduce(
      (total, burger) => {
        const burgerPrice = getCustomBurgerPrice(burger);
        return total + burgerPrice * burger.quantity;
      },
      0
    );

    return itemsTotal + customBurgersTotal;
  };

  const getCartItemsCount = () => {
    const itemsCount = state.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const customBurgersCount = (state.customBurgers || []).reduce(
      (total, burger) => total + burger.quantity,
      0
    );
    return itemsCount + customBurgersCount;
  };

  const getCartItem = (productId) => {
    return state.items.find((item) => item.id === productId);
  };

  const contextValue = {
    items: state.items,
    customBurgers: state.customBurgers || [],
    addItem,
    removeItem,
    updateQuantity,
    addCustomBurger,
    removeCustomBurger,
    updateCustomBurgerQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    getCartItem,
    getCustomBurgerPrice,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;
