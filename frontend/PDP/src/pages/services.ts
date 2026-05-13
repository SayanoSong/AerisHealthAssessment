import type { CartInfo, ItemInfo, ListItem } from '@/types/frontend'
import { mockApi } from './../api/mock'
import type { AddToCartRequestType } from '@/api/types'

export async function getGoodList(): Promise<ListItem[]> {
  const res = await mockApi.getGoodList()
  if (res.status === 200) {
    return res.data
  }
  return []
}

export async function getGoodInfoById(id: string): Promise<ItemInfo | null> {
  const res = await mockApi.getGoodInfo(id)
  if (res.status === 200) {
    return res.data
  }
  return null
}

export async function addToCart(param: AddToCartRequestType): Promise<string | null> {
  const res = await mockApi.addToCart(param)
  if (res.status === 200) {
    return null
  }
  return res.data
}

export async function getCartInfoById(id: string): Promise<CartInfo[]> {
  const res = await mockApi.getCartById(id)
  if (res.status === 200) {
    return res.data
  }
  return []
}
