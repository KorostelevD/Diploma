import React, { createContext, useContext, useReducer, useEffect, useState } from "react";
import { 
  signUpUser, 
  signInUser, 
  signOutUser, 
  resetPassword, 
  onAuthStateChange,
  updateUserProfile,
  checkUserExists 
} from "../services/users-service";

const AuthContext = createContext();

const AUTH_ACTIONS = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT: "LOGOUT",
  SET_USER: "SET_USER",
  SET_LOADING: "SET_LOADING",
  CLEAR_ERROR: "CLEAR_ERROR"
};

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      };

    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };

    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        loading: false,
        error: null
      };

    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((userData) => {
      dispatch({ type: AUTH_ACTIONS.SET_USER, payload: userData });
      if (!authInitialized) {
        setAuthInitialized(true);
      }
    });

    return () => unsubscribe();
  }, [authInitialized]);

  const register = async (email, password, displayName, phone = "") => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    
    try {
      const result = await signUpUser(email, password, displayName, phone);
      
      if (result.success) {
        dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: result.user });
        return { success: true };
      } else {
        dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: result.error });
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = "Сталася помилка при реєстрації";
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const checkUser = async (email) => {
    try {
      const result = await checkUserExists(email);
      return result;
    } catch (error) {
      return { 
        success: false, 
        error: "Помилка при перевірці користувача",
        exists: false 
      };
    }
  };

  const login = async (email, password) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    
    try {
      const result = await signInUser(email, password);
      
      if (result.success) {
        dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: result.user });
        return { success: true };
      } else {
        dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: result.error });
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = "Сталася помилка при вході";
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await signOutUser();
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      return { success: true };
    } catch (error) {
      console.error("Error during logout:", error);
      return { success: false, error: "Помилка при виході" };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const result = await resetPassword(email);
      return result;
    } catch (error) {
      return { 
        success: false, 
        error: "Помилка при скиданні пароля" 
      };
    }
  };

  const updateProfile = async (userData) => {
    if (!state.user) {
      return { success: false, error: "Користувач не авторизований" };
    }

    try {
      const result = await updateUserProfile(state.user.uid, userData);
      
      if (result.success) {
        const updatedUser = { ...state.user, ...userData };
        dispatch({ type: AUTH_ACTIONS.SET_USER, payload: updatedUser });
        return { success: true };
      } else {
        return result;
      }
    } catch (error) {
      return { 
        success: false, 
        error: "Помилка при оновленні профілю" 
      };
    }
  };

  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  const hasRole = (role) => {
    return state.user?.role === role;
  };

  const isAdmin = () => {
    return hasRole('admin');
  };

  const isUser = () => {
    return hasRole('user');
  };

  const contextValue = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
    authInitialized,

    register,
    login,
    logout,
    forgotPassword,
    updateProfile,
    clearError,
    checkUser,
    hasRole,
    isAdmin,
    isUser
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext; 