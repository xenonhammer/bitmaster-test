import { OrdersApi, TOrderData } from './../../api/orders';
import {BaseThunkType, InferActionsTypes} from '../store'
import { progressActions, TProgressActions } from './progressAction';

export type TOrderActions = InferActionsTypes<typeof orderActions>
type ThunkType = BaseThunkType<TOrderActions| TProgressActions>

type TNewOrder = {
  address: string,
  lat: number 
  lon: number 
}

export const orderActions = {
  createNewOrder: (value: TNewOrder) => ({
    type: "CREATE_NEW_ORDER",
    payload: value
  } as const),
  setOrderID: (id: number) => ({
    type: "SET_ORDER_ID",
    payload: id
  } as const),
  setCrewID: (id: number) => ({
    type: "SET_CREW_ID",
    payload: id
  }as const)
}

export const orderThunks = ({
  sendOrder: (orderData: TOrderData):ThunkType => async (dispatch) => {
    dispatch(progressActions.handleShowProgressLoading(true))
    try {
      const data = await OrdersApi.createNewOrder(orderData)
      if(typeof data !== 'string') {
        dispatch(orderActions.setOrderID(data.data.order_id))
        dispatch(orderActions.setCrewID(orderData.crew_id))
        dispatch(orderActions.createNewOrder(
          {
            address: orderData.data.address,
            lat: orderData.data.lat,
            lon: orderData.data.lon,
          }
          ))
        }
      }
    catch(error) {

    }
    finally {
      dispatch(progressActions.handleShowProgressLoading(false))
    }
  }
})