import { TTaxiActions } from '../actions/taxiActions';
import { TTaxi } from './../../types/types';

type TState = {
  code: number | null
  descr: string | null
  taxiList: TTaxi[] ,
  errorResponse: string
}

const initialState: TState = {
  taxiList: [],
  code: null,
  descr: null,
  errorResponse: ''
}

export const taxiReducer = (state = initialState, action: TTaxiActions):TState => {
  switch (action.type){
    case 'SET_TAXI_LIST': 
      return {...state, taxiList : action.payload}
    case 'SET_TAXI_CODE':
      return {...state, code: action.payload}
    case 'SET_TAXI_DESCR':
      return {...state, descr: action.payload}
    case 'SET_TAXI_ERROR_RESPONSE':
      return {...state, errorResponse: action.payload}
    default:
      return state
  }
}