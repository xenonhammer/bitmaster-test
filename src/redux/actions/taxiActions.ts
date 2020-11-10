import { TTaxi } from './../../types/types';
import { TaxiApi } from './../../api/taxi';
import { BaseThunkType, InferActionsTypes } from '../store';
import { progressActions, TProgressActions } from './progressAction';

export type TTaxiActions = InferActionsTypes<typeof taxiActions>
type ThunkType = BaseThunkType<TTaxiActions| TProgressActions>

export const taxiActions = {
  setList: (list: TTaxi[]) => ({
    type: "SET_TAXI_LIST",
    payload:  list
  }as const),
  setCode: (code: number) => ({
    type: "SET_TAXI_CODE",
    payload: code
  }as const),
  setDescr: (descr: string) => ({
    type: "SET_TAXI_DESCR",
    payload: descr
  }as const),
  setErrorResponse: (message: string) => ({
    type: "SET_TAXI_ERROR_RESPONSE",
    payload: message
  }as const)
} 


export const taxiThunks = ({
  getDataByAdress: ( address: string, lat: number, lon: number): ThunkType => async (dispatch) => {
    dispatch(progressActions.handleShowProgressLoading(true))
    try {
      const data = await TaxiApi.getTaxiDataByCoordinates({ address, lat, lon })
      if(typeof data !== 'string'){
        dispatch(taxiActions.setList(data.data.crews_info))
        dispatch(taxiActions.setCode(data.code))
        dispatch(taxiActions.setDescr(data.descr))
      }
      else {
        dispatch(taxiActions.setErrorResponse(data))
      }
    } catch (error) {
      return error.message
    } 
    finally {
      dispatch(progressActions.handleShowProgressLoading(false))
    }
  }
})