import { TOrderActions } from "../actions/orderActions"

export type TOrderState = Partial<{
  address: string,
  lat: number | null
  lon: number | null
  crew_id:  number
  order_id:  number
}>

const initialState: TOrderState = {}

export const ordersReducer = (state = initialState, action: TOrderActions) => {
  switch (action.type) {
    case "CREATE_NEW_ORDER": 
      return {...state, ...action.payload}
    case "SET_ORDER_ID": 
      return {...state, order_id: action.payload}
    case "SET_CREW_ID":
      return {...state, crew_id: action.payload}
    default:
      return state
  }

}