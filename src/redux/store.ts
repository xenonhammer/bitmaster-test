import { Action, applyMiddleware, createStore } from "redux";
import  rootReducer  from "./rootReducer";
import thunk, { ThunkAction } from 'redux-thunk'


const initialState = {}
const middleware = [thunk]

const store = createStore(rootReducer,initialState, applyMiddleware(...middleware))

export type RootState = ReturnType<typeof rootReducer>

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args:any)=>any}> = ReturnType<PropertiesType<T>>
export type BaseThunkType<A extends Action, R= Promise<any>> = ThunkAction<R, RootState, unknown, A>

export default store