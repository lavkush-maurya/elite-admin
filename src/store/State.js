//All the Initial States will be here 

export const initialState = {
   showProduct: false,
   showCategory: false,
   showSubCategory: false,
   authToken: JSON.parse(localStorage.getItem("admin")) || null,
   products: [],
   category: [],
   selectedOrder: [],
   subCategory: null,
   isLoading: false,
   error: null,
   isUpdated: false,
   toggleSidebar: false,
   showSearchModal: false,
   darkMood: JSON.parse(localStorage.getItem("darkMood")) || false,
}
