import {
  OPEN_SIGN_UP_MODAL,
  OPEN_LOGIN_MODAL,
  OPEN_NEW_REQUEST_MODAL,
  OPEN_NEW_ITEM_TO_SELL_MODAL,
  SET_USER_LOGGED_IN,
  OPEN_DELETE_MODAL,
  OPEN_USERS_ITEMS_MODAL,
  ITEM_TO_FETCH_USERS,
  SET_SELECTED_PARTICIPANT,
  SET_USER_NAME,
  SET_NOTIFICATION,
  SET_ACTIVE_DASHBOARD,
} from "../actionTypes";

export const initialState = {
  signUpModal: false,
  loginModalOpen: false,
  newRequestModal: false,
  newItemToSellModal: false,
  userLoggedIn: false,
  openDeleteModal: false,
  usersItemsModal: false,
  itemToFetchUsers: "",
  selectedParticipant: null,
  loggedInUser: "",
  notifications: [],
  activeDashboard: 0,
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "REPLACE_STATE":
      return action.payload;
    case OPEN_SIGN_UP_MODAL: {
      return {
        ...state,
        signUpModal: action.payload,
      };
    }
    case OPEN_LOGIN_MODAL: {
      return {
        ...state,
        loginModalOpen: action.payload,
      };
    }

    case OPEN_NEW_REQUEST_MODAL: {
      return {
        ...state,
        newRequestModal: action.payload,
      };
    }

    case OPEN_NEW_ITEM_TO_SELL_MODAL: {
      return {
        ...state,
        newItemToSellModal: action.payload,
      };
    }

    case OPEN_DELETE_MODAL: {
      return {
        ...state,
        openDeleteModal: action.payload,
      };
    }

    case OPEN_USERS_ITEMS_MODAL: {
      return {
        ...state,
        usersItemsModal: action.payload,
      };
    }

    case ITEM_TO_FETCH_USERS: {
      return {
        ...state,
        itemToFetchUsers: action.payload,
      };
    }

    case SET_USER_LOGGED_IN: {
      return {
        ...state,
        userLoggedIn: action.payload,
      };
    }

    case SET_SELECTED_PARTICIPANT: {
      return {
        ...state,
        selectedParticipant: action.payload,
      };
    }

    case SET_USER_NAME: {
      return {
        ...state,
        loggedInUser: action.payload,
      };
    }
    case SET_NOTIFICATION: {
      return {
        ...state,
        notifications: action.payload,
      };
    }
    case SET_ACTIVE_DASHBOARD: {
      return {
        ...state,
        activeDashboard: action.payload,
      };
    }
    default:
      return state;
  }
};
