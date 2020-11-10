import {InferActionsTypes} from '../store'

export type TProgressActions = InferActionsTypes<typeof progressActions>
// type ThunkType = BaseThunkType<TProgress>

export const progressActions = {
  handleShowProgressLoading: (value: boolean) => ({
    type: 'SET_SHOW_PROGRESS',
    payload: value
  } as const)
}