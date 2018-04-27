import { handleError } from "../utils/error";
const UI_LOADING = "react/app/ui/loading";
const UI_UNLOADING = "react/app/ui/unloading";
const SWITCH_MENU_COLLAPSED = "react/app/ui/switch_menu_collapsed";
const CLOSE_MENU_COLLAPSED = "react/app/ui/close_menu_collapsed";

const initialState = {
  loading: false,
  menuCollapsed: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UI_LOADING:
      return {
        ...state,
        loading: true
      };
    case UI_UNLOADING:
      return {
        ...state,
        loading: false
      };
    case SWITCH_MENU_COLLAPSED:
      return {
        ...state,
        menuCollapsed: !state.menuCollapsed
      };
    case CLOSE_MENU_COLLAPSED:
      return {
        ...state,
        menuCollapsed: false
      };
    default:
      return state;
  }
}

export function loading() {
  return { type: UI_LOADING };
}

export function unloading() {
  return { type: UI_UNLOADING };
}

export function switchMenuCollapsed() {
  return { type: SWITCH_MENU_COLLAPSED };
}

export function closeMenuCollapsed() {
  return { type: CLOSE_MENU_COLLAPSED };
}

export const requestWrapper = (request, unkeeploading = true) => async (
  dispatch,
  state
) => {
  try {
    dispatch(loading());
    // await stopThread();
    return await request(dispatch, state);
  } catch (err) {
    handleError(err, dispatch);
    unkeeploading = true;
  } finally {
    dispatch(closeMenuCollapsed());
    if (unkeeploading) {
      dispatch(unloading());
    }
  }
};

// async function stopThread() {
//   return await new Promise((resolve, reject) => {
//     setTimeout(Math.random() > 0 ? resolve : reject, 5000);
//   }).catch(() => {
//     const error =  {status : 403, message: "...."};
//     throw error;
//   });
// }

export const mockRequest = (args, time = 2000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(args);
    }, time);
  });
};
