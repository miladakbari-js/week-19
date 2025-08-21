const initialDashboardState = ({ page = 1, search = "", limit = 6 } = {}) => ({
  showForm: false,
  editingProduct: null,
  confirmDeleteId: null,
  confirmDeleteMultiple: false,
  selectedProducts: [],
  currentPage: page,
  search,
  limit,
});

const dashboardReducer = (state, action) => {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };

    case "SET_SEARCH":
      return { ...state, search: action.payload, currentPage: 1 };

    case "OPEN_FORM_CREATE":
      return { ...state, showForm: true, editingProduct: null };

    case "OPEN_FORM_EDIT":
      return { ...state, showForm: true, editingProduct: action.payload };

    case "CLOSE_FORM":
      return { ...state, showForm: false, editingProduct: null };

    case "OPEN_CONFIRM_DELETE":
      return { ...state, confirmDeleteId: action.payload };

    case "CLOSE_CONFIRM_DELETE":
      return { ...state, confirmDeleteId: null };

    case "OPEN_CONFIRM_MULTIPLE":
      return { ...state, confirmDeleteMultiple: true };

    case "CLOSE_CONFIRM_MULTIPLE":
      return { ...state, confirmDeleteMultiple: false };

    case "TOGGLE_SELECT": {
      const id = action.payload;
      const selected = state.selectedProducts.includes(id)
        ? state.selectedProducts.filter((item) => item !== id)
        : [...state.selectedProducts, id];

      return { ...state, selectedProducts: selected };
    }

    case "CLEAR_SELECTION":
      return { ...state, selectedProducts: [] };

    default:
      return state;
  }
};


export {dashboardReducer , initialDashboardState}
