
// Reducer
export const reducer = (state, action) => {
   switch (action.type) {
      case "TOGGLE_SHOW_PRODUCT":
         return {
            ...state,
            showProduct: action.payload
         };
      case "TOGGLE_SHOW_CATEGORY":
         return {
            ...state,
            showCategory: action.payload
         };
      case "TOGGLE_SHOW_SUB_CATEGORY":
         return {
            ...state,
            showSubCategory: action.payload
         }
      case "AUTH_TOKEN":
         return {
            ...state,
            authToken: action.payload
         }
      case "LOGOUT":
         return {
            ...state,
            authToken: action.payload || null
         }
      case "PRODUCT_DATA":
         return {
            ...state,
            products: action.payload
         }
      case "CATEGORY_DATA":
         return {
            ...state,
            category: action.payload
         }
      case "SELECTED_SUB_CATEGORY":
         return {
            ...state,
            subCategory: action.payload
         }
      case "SELECTED_ORDER":
         return {
            ...state,
            selectedOrder: action.payload
         }
      case "LOADING_STATE":
         return {
            ...state,
            isLoading: action.payload
         }
      case "UPDATE_STATE":
         return {
            ...state,
            isUpdated: action.payload
         }
      case "ERROR_STATE":
         return {
            ...state,
            error: action.payload
         }
      case "TOGGLE_SIDE_BAR":
         return {
            ...state,
            toggleSidebar: action.payload
         }
      case "SEARCH_MODAL":
         return {
            ...state,
            showSearchModal: action.payload
         }
      case "DARK_MOOD":
         return {
            ...state,
            darkMood: action.payload
         }
      default:
         return state;
   }
};