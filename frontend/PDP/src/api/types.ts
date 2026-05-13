export interface User {
  id: string
  username: string
  password: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  password: string
}

export interface AuthResponse {
  status: number
  message: string
  user?: User
  token?: string
}

export interface AddToCartRequestType {
  userId: string
  itemId: string
  variant: {
    size: string
    color: string
    quantity: number
  }
}

export interface ListItem {
  id: string
  imgUrl: string
  name: string
  status: number
  maxPrice: number
  minPrice: number
}

export interface CartItemType {
  id: string
  itemId: string
  // The request of add-to-cart does not need the prices, backend can and must get them.
  price: Record<string, number>
  variants: {
    size: string
    color: string
    quantity: number
  }
}

export interface CartDataResponseType {
  data: {
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
  }[]
  status: number
  info: string
}
