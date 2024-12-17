const initialState = {
  users: [],
  loading: false,
  error: null,
  totalCount: 0,
  individualUser: {},
  indivloading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_INDIV_REQUEST":
      return { ...state, indivloading: true };
    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        loading: false,
        users: action.payload.data,
        totalCount: action.payload.total,
      };
    case "FETCH_USERS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "FETCH_INDIVIDUAL_USERS_SUCCESS":
      return {
        ...state,
        indivloading: false,
        individualUser: action.payload.data,
      };
    case "FETCH_INDIVIDUAL_USERS_FAILURE":
      return { ...state, indivloading: false, error: action.payload };

    default:
      return state;
  }
};

export default userReducer;
