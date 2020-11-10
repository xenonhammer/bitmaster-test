import { taxiReducer } from './reducers/taxiReducer';
import { combineReducers } from "redux";
import { ordersReducer } from './reducers/orderReducer';
import { progressReducer } from './reducers/progressReducer';

const rootReducer = combineReducers({
  taxi: taxiReducer,
  order: ordersReducer,
  progress: progressReducer
})

export default rootReducer