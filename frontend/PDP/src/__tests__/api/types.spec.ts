import { describe, it, expect } from 'vitest'
import type {
  User,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  AddToCartRequestType,
  ListItem,
  CartItemType,
  CartDataResponseType,
} from '@/api/types'

describe('API Types', () => {
  describe('User interface', () => {
    it('should accept valid user object', () => {
      const user: User = {
        id: 'user-123',
        username: 'testuser',
        password: 'password123',
      }

      expect(user.id).toBe('user-123')
      expect(user.username).toBe('testuser')
      expect(user.password).toBe('password123')
    })

    it('should have string id', () => {
      const user: User = {
        id: 'abc123',
        username: 'user',
        password: 'pass',
      }

      expect(typeof user.id).toBe('string')
    })

    it('should have string username', () => {
      const user: User = {
        id: '1',
        username: 'john_doe',
        password: 'secret',
      }

      expect(typeof user.username).toBe('string')
    })

    it('should have string password', () => {
      const user: User = {
        id: '1',
        username: 'user',
        password: 'hashed_password',
      }

      expect(typeof user.password).toBe('string')
    })
  })

  describe('LoginRequest interface', () => {
    it('should accept valid login request', () => {
      const loginRequest: LoginRequest = {
        username: 'testuser',
        password: 'testpass',
      }

      expect(loginRequest.username).toBe('testuser')
      expect(loginRequest.password).toBe('testpass')
    })

    it('should have string username', () => {
      const loginRequest: LoginRequest = {
        username: 'admin',
        password: 'admin123',
      }

      expect(typeof loginRequest.username).toBe('string')
    })

    it('should have string password', () => {
      const loginRequest: LoginRequest = {
        username: 'user',
        password: 'pass',
      }

      expect(typeof loginRequest.password).toBe('string')
    })
  })

  describe('RegisterRequest interface', () => {
    it('should accept valid register request', () => {
      const registerRequest: RegisterRequest = {
        username: 'newuser',
        password: 'newpass',
      }

      expect(registerRequest.username).toBe('newuser')
      expect(registerRequest.password).toBe('newpass')
    })

    it('should have string username', () => {
      const registerRequest: RegisterRequest = {
        username: 'john',
        password: 'doe',
      }

      expect(typeof registerRequest.username).toBe('string')
    })

    it('should have string password', () => {
      const registerRequest: RegisterRequest = {
        username: 'jane',
        password: 'smith',
      }

      expect(typeof registerRequest.password).toBe('string')
    })
  })

  describe('AuthResponse interface', () => {
    it('should accept successful auth response', () => {
      const authResponse: AuthResponse = {
        status: 1,
        message: 'Login Success',
        user: {
          id: 'user-1',
          username: 'testuser',
          password: 'testpass',
        },
        token: 'token_abc123',
      }

      expect(authResponse.status).toBe(1)
      expect(authResponse.message).toBe('Login Success')
      expect(authResponse.user).toBeDefined()
      expect(authResponse.token).toBe('token_abc123')
    })

    it('should accept failed auth response', () => {
      const authResponse: AuthResponse = {
        status: 0,
        message: 'Invalid credentials',
      }

      expect(authResponse.status).toBe(0)
      expect(authResponse.message).toBe('Invalid credentials')
      expect(authResponse.user).toBeUndefined()
      expect(authResponse.token).toBeUndefined()
    })

    it('should have number status', () => {
      const authResponse: AuthResponse = {
        status: 1,
        message: 'Success',
      }

      expect(typeof authResponse.status).toBe('number')
    })

    it('should have string message', () => {
      const authResponse: AuthResponse = {
        status: 0,
        message: 'Error',
      }

      expect(typeof authResponse.message).toBe('string')
    })
  })

  describe('AddToCartRequestType interface', () => {
    it('should accept valid add to cart request', () => {
      const addToCartRequest: AddToCartRequestType = {
        userId: 'user-123',
        itemId: 'item-456',
        variant: {
          size: 'medium',
          color: 'red',
          quantity: 2,
        },
      }

      expect(addToCartRequest.userId).toBe('user-123')
      expect(addToCartRequest.itemId).toBe('item-456')
      expect(addToCartRequest.variant.size).toBe('medium')
      expect(addToCartRequest.variant.color).toBe('red')
      expect(addToCartRequest.variant.quantity).toBe(2)
    })

    it('should have string userId', () => {
      const addToCartRequest: AddToCartRequestType = {
        userId: 'user-1',
        itemId: 'item-1',
        variant: { size: 'small', color: 'blue', quantity: 1 },
      }

      expect(typeof addToCartRequest.userId).toBe('string')
    })

    it('should have string itemId', () => {
      const addToCartRequest: AddToCartRequestType = {
        userId: 'user-1',
        itemId: 'item-1',
        variant: { size: 'small', color: 'blue', quantity: 1 },
      }

      expect(typeof addToCartRequest.itemId).toBe('string')
    })

    it('should have variant object', () => {
      const addToCartRequest: AddToCartRequestType = {
        userId: 'user-1',
        itemId: 'item-1',
        variant: { size: 'large', color: 'yellow', quantity: 5 },
      }

      expect(typeof addToCartRequest.variant).toBe('object')
      expect(addToCartRequest.variant.size).toBe('large')
      expect(addToCartRequest.variant.color).toBe('yellow')
      expect(addToCartRequest.variant.quantity).toBe(5)
    })
  })

  describe('ListItem interface', () => {
    it('should accept valid list item', () => {
      const listItem: ListItem = {
        id: '1',
        imgUrl: 'src/assets/box.jpg',
        name: 'Box1',
        status: 1,
        maxPrice: 200,
        minPrice: 100,
      }

      expect(listItem.id).toBe('1')
      expect(listItem.imgUrl).toBe('src/assets/box.jpg')
      expect(listItem.name).toBe('Box1')
      expect(listItem.status).toBe(1)
      expect(listItem.maxPrice).toBe(200)
      expect(listItem.minPrice).toBe(100)
    })

    it('should have string id', () => {
      const listItem: ListItem = {
        id: '123',
        imgUrl: 'path.jpg',
        name: 'Item',
        status: 1,
        maxPrice: 100,
        minPrice: 50,
      }

      expect(typeof listItem.id).toBe('string')
    })

    it('should have number status', () => {
      const listItem: ListItem = {
        id: '1',
        imgUrl: 'path.jpg',
        name: 'Item',
        status: 0,
        maxPrice: 100,
        minPrice: 50,
      }

      expect(typeof listItem.status).toBe('number')
    })

    it('should have number prices', () => {
      const listItem: ListItem = {
        id: '1',
        imgUrl: 'path.jpg',
        name: 'Item',
        status: 1,
        maxPrice: 300,
        minPrice: 150,
      }

      expect(typeof listItem.maxPrice).toBe('number')
      expect(typeof listItem.minPrice).toBe('number')
    })
  })

  describe('CartItemType interface', () => {
    it('should accept valid cart item', () => {
      const cartItem: CartItemType = {
        id: 'cart-1',
        itemId: 'item-1',
        price: {
          small: 100,
          medium: 150,
          large: 200,
        },
        variants: {
          size: 'medium',
          color: 'red',
          quantity: 2,
        },
      }

      expect(cartItem.id).toBe('cart-1')
      expect(cartItem.itemId).toBe('item-1')
      expect(cartItem.price.small).toBe(100)
      expect(cartItem.variants.size).toBe('medium')
    })

    it('should have string id', () => {
      const cartItem: CartItemType = {
        id: 'abc',
        itemId: 'xyz',
        price: { small: 50 },
        variants: { size: 'small', color: 'blue', quantity: 1 },
      }

      expect(typeof cartItem.id).toBe('string')
    })

    it('should have string itemId', () => {
      const cartItem: CartItemType = {
        id: '1',
        itemId: 'item-123',
        price: { small: 50 },
        variants: { size: 'small', color: 'blue', quantity: 1 },
      }

      expect(typeof cartItem.itemId).toBe('string')
    })

    it('should have price record', () => {
      const cartItem: CartItemType = {
        id: '1',
        itemId: 'item-1',
        price: { small: 100, medium: 150 },
        variants: { size: 'small', color: 'red', quantity: 1 },
      }

      expect(typeof cartItem.price).toBe('object')
    })

    it('should have variants object', () => {
      const cartItem: CartItemType = {
        id: '1',
        itemId: 'item-1',
        price: { small: 100 },
        variants: { size: 'large', color: 'yellow', quantity: 3 },
      }

      expect(typeof cartItem.variants).toBe('object')
    })
  })

  describe('CartDataResponseType interface', () => {
    it('should accept valid cart data response', () => {
      const cartDataResponse: CartDataResponseType = {
        data: [
          {
            id: 'cart-1',
            itemId: 'item-1',
            imgUrl: 'src/assets/box.jpg',
            name: 'Box1',
            price: { small: 100, medium: 150, large: 200 },
            variants: { size: 'medium', color: 'red', quantity: 2 },
            description: 'Test description',
          },
        ],
        status: 200,
        info: '',
      }

      expect(cartDataResponse.data).toHaveLength(1)
      expect(cartDataResponse.status).toBe(200)
      expect(cartDataResponse.info).toBe('')
    })

    it('should have data array', () => {
      const cartDataResponse: CartDataResponseType = {
        data: [],
        status: 200,
        info: 'success',
      }

      expect(Array.isArray(cartDataResponse.data)).toBe(true)
    })

    it('should have number status', () => {
      const cartDataResponse: CartDataResponseType = {
        data: [],
        status: 404,
        info: 'not found',
      }

      expect(typeof cartDataResponse.status).toBe('number')
    })

    it('should have string info', () => {
      const cartDataResponse: CartDataResponseType = {
        data: [],
        status: 200,
        info: 'success',
      }

      expect(typeof cartDataResponse.info).toBe('string')
    })
  })
})
