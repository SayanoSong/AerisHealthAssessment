export interface UserType {
  userName: string
  userId: string
}

export interface ListItem {
  id: string
  imgUrl: string
  name: string
  status: number
  maxPrice: number
  minPrice: number
}

export interface ItemInfo {
  id: string
  imgUrl: string
  name: string
  sizes: string[]
  colors: string[]
  price: Record<string, number>
  variants: {
    size: string
    color: string
    quantity: number
  }[]
  description: string
}

export interface CartInfo {
  id: string
  itemId: string
  imgUrl: string
  name: string
  price: Record<string, number>
  variants: {
    size: string
    color: string
    quantity: number
  }
  description: string
}
