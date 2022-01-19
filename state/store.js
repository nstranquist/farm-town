import create from 'zustand'
import createFarmSlice from './createFarmSlice'

export const useFarmStore = create((set, get) => ({
  ...createFarmSlice(set, get)
}))