import {
  UPDATESTATE
} from '../constants/song'

export const updateState = (payload) => ({
  type: UPDATESTATE,
  payload
})