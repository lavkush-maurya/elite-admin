import React, { useEffect, useReducer } from "react";
import { initialState } from "./State";
import { reducer } from "./Reducer";
import { Context } from "./Context";

const ContextProvider = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, initialState);
   const { authToken, darkMood } = state;
   // console.log(authToken)
   useEffect(() => {
      localStorage.setItem("admin", JSON.stringify(authToken))
      localStorage.setItem("darkMood", JSON.stringify(darkMood))
      // console.log("USE_EFFECT_RUNS")
   }, [authToken, darkMood]);

   const value = { state, dispatch };
   return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ContextProvider;
