import { TProgressActions } from "../actions/progressAction"

type TInitialState = {
  isShow: boolean
}

const initialState: TInitialState = {
  isShow: false
}

export const progressReducer = (state = initialState, action: TProgressActions) => {
  switch (action.type) {
    case "SET_SHOW_PROGRESS": 
      return {...state, isShow: action.payload}
    default:
      return state
  }
}