import { GOODS } from './mockData'
import type {
  AddToCartRequestType,
  AuthResponse,
  CartDataResponseType,
  CartItemType,
  ListItem,
  LoginRequest,
  RegisterRequest,
  User,
} from './types'

const STORAGE_KEY = 'mock_users'

const getUsers = (): User[] => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

const saveUsers = (users: User[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36)
}

const generateToken = (): string => {
  return 'token_' + Date.now().toString(36) + Math.random().toString(36)
}

export const mockApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const users = getUsers()
    const user = users.find((u) => u.username === data.username && u.password === data.password)

    if (user) {
      const token = generateToken()
      const tokensData = localStorage.getItem('tokens')
      const tokens = tokensData ? JSON.parse(tokensData) : {}
      tokens[user.id] = token
      localStorage.setItem('tokens', JSON.stringify(tokens))
      return {
        status: 1,
        message: 'Login Success',
        user,
        token,
      }
    }
    return {
      status: 0,
      message: 'Incorrect user name or password.',
    }
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const users = getUsers()
    if (users.some((u) => u.username === data.username)) {
      return {
        status: 0,
        message: 'The user name has been used.',
      }
    }

    const newUser: User = {
      id: generateId(),
      username: data.username,
      password: data.password,
    }

    users.push(newUser)
    saveUsers(users)

    const token = generateToken()
    const tokensData = localStorage.getItem('tokens')
    const tokens = tokensData ? JSON.parse(tokensData) : {}
    tokens[newUser.id] = token
    localStorage.setItem('tokens', JSON.stringify(tokens))

    return {
      status: 1,
      message: 'Sign Up Successful!',
      user: newUser,
      token,
    }
  },

  logout: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const tokensData = localStorage.getItem('tokens')
    if (tokensData) {
      const tokens = JSON.parse(tokensData)
      delete tokens[id]
      localStorage.setItem('tokens', JSON.stringify(tokens))
    }
  },

  getCurrentUser: async (token: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const tokensData = localStorage.getItem('tokens')
    if (!tokensData)
      return {
        data: null,
        status: 0,
      }

    const tokens = JSON.parse(tokensData)
    for (const [userId, userToken] of Object.entries(tokens)) {
      if (userToken === token && validToken(token)) {
        const users = getUsers()
        const user = users.find((u) => u.id === userId)
        return {
          data: { userId, name: user?.username || `User ${userId}` },
          status: 1,
        }
      }
    }
    return {
      data: null,
      status: 0,
    }
  },

  getGoodList: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const goods = localStorage.getItem('goodList')
    if (!goods) {
      localStorage.setItem('goodList', JSON.stringify(GOODS))
      return {
        data: GOODS,
        status: 200,
      }
    }
    return {
      data: JSON.parse(goods),
      status: 200,
    }
  },

  getGoodInfo: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const goodList: ListItem[] = JSON.parse(localStorage.getItem('goodList') ?? JSON.stringify([]))
    const good = goodList.find((item) => item.id === id)
    if (good) {
      const sizes = ['small', 'medium', 'large']
      const colors = ['red', 'yellow', 'blue']

      // If a box is added into a user cart or removed from it, the quantity should also be changed.
      // It is a remainder that I can do better.
      const variants = sizes.flatMap((size) =>
        colors.map((color) => ({
          size,
          color,
          quantity: color === 'blue' ? 0 : Math.floor(Math.random() * 10) + 1,
        })),
      )

      return {
        data: {
          id,
          name: good.name,
          imgUrl: good.imgUrl,
          sizes,
          colors,
          price: {
            small: good.minPrice,
            medium: Math.floor((good.maxPrice + good.minPrice) / 2),
            large: good.maxPrice,
          },
          variants,
          description: 'This is a static description.',
        },
        status: 200,
      }
    }
    return {
      data: null,
      status: 404,
    }
  },

  addToCart: async (data: AddToCartRequestType) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    if (!addToCartValidator(data)) {
      return {
        data: 'Add Failed.',
        // The error message is defined based on the result of addToCartValidator(data)
        status: 400,
      }
    }

    // Transaction needs to be applied
    // This part should search another data table that contain current quantity from the database
    // Then generating an instance of the add-to-cart operation which the id is differnt with the id of the item of the "goodList"
    // Items that in goodList represent types of box instead of instance.
    const goodList: ListItem[] = JSON.parse(localStorage.getItem('goodList') ?? JSON.stringify([]))
    const good = goodList.find((item) => item.id === data.itemId)
    if (!good) {
      // This situation can be handled above.
      return {
        data: 'Add Failed.',
        status: 404,
      }
    }
    const userCart = getCartById(data.userId)

    const existingItemIndex = userCart.findIndex(
      (item) =>
        item.itemId === data.itemId &&
        item.variants.size === data.variant.size &&
        item.variants.color === data.variant.color,
    )

    if (existingItemIndex >= 0 && userCart[existingItemIndex]?.variants?.quantity) {
      userCart[existingItemIndex].variants.quantity += data.variant.quantity
    } else {
      const cartItem: CartItemType = {
        id: generateId(),
        itemId: data.itemId,
        variants: data.variant,
        // Notice: the price of a item should be from another table
        price: {
          small: good.minPrice,
          medium: Math.floor((good.maxPrice + good.minPrice) / 2),
          large: good.maxPrice,
        },
      }
      userCart.push(cartItem)
    }
    // Needs decreasing the quantity of the item in the stock
    localStorage.setItem('userCart', JSON.stringify(userCart))

    return {
      data: null,
      status: 200,
    }
  },

  getCartById: async (id: string): Promise<CartDataResponseType> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const userCart = getCartById(id)
    const goodList: ListItem[] = JSON.parse(localStorage.getItem('goodList') ?? JSON.stringify([]))

    const data = userCart.map((cartItem) => {
      const good = goodList.find((item) => item.id === cartItem.itemId)
      return {
        id: cartItem.id,
        itemId: cartItem.itemId,
        imgUrl: good?.imgUrl || '',
        name: good?.name || '',
        price: cartItem.price,
        variants: cartItem.variants,
        description: 'This is a static description.',
      }
    })

    return {
      data,
      status: 200,
      info: '',
    }
  },
}

function getCartById(userId: string): CartItemType[] {
  // For convenience I did not design more complicated structure to get cart by id
  try {
    const userCart = JSON.parse(localStorage.getItem('userCart') ?? JSON.stringify([]))
    return userCart
  } catch (e) {
    return []
  }
}

function validToken(token: string) {
  // Check if the token is valid. It usually involves encryption methods.
  return true
}

function addToCartValidator(data: AddToCartRequestType) {
  // It also need to check if the requirement of the current quantity or other conditions of the request is satisfied
  // And if the user id exists
  return data && data.itemId && data.userId && data.variant
}
