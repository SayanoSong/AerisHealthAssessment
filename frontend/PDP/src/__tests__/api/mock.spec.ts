import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mockApi } from '@/api/mock'
import type { AddToCartRequestType, User } from '@/api/types'
import { GOODS } from '@/api/mockData'

describe('mockApi', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllTimers()
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('login', () => {
    it('should login successfully with correct credentials', async () => {
      const testUser: User = {
        id: 'test-id-1',
        username: 'testuser',
        password: 'testpass',
      }
      localStorage.setItem('mock_users', JSON.stringify([testUser]))

      const result = await mockApi.login({ username: 'testuser', password: 'testpass' })

      expect(result.status).toBe(1)
      expect(result.message).toBe('Login Success')
      expect(result.user).toEqual(testUser)
      expect(result.token).toBeDefined()
    })

    it('should fail login with incorrect password', async () => {
      const testUser: User = {
        id: 'test-id-1',
        username: 'testuser',
        password: 'testpass',
      }
      localStorage.setItem('mock_users', JSON.stringify([testUser]))

      const result = await mockApi.login({ username: 'testuser', password: 'wrongpass' })

      expect(result.status).toBe(0)
      expect(result.message).toBe('Incorrect user name or password.')
      expect(result.user).toBeUndefined()
    })

    it('should fail login with non-existent user', async () => {
      const result = await mockApi.login({ username: 'nonexistent', password: 'pass' })

      expect(result.status).toBe(0)
      expect(result.message).toBe('Incorrect user name or password.')
      expect(result.user).toBeUndefined()
    })

    it('should store token after successful login', async () => {
      const testUser: User = {
        id: 'test-id-1',
        username: 'testuser',
        password: 'testpass',
      }
      localStorage.setItem('mock_users', JSON.stringify([testUser]))

      await mockApi.login({ username: 'testuser', password: 'testpass' })

      const tokens = JSON.parse(localStorage.getItem('tokens') || '{}')
      expect(tokens[testUser.id]).toBeDefined()
    })
  })

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const result = await mockApi.register({ username: 'newuser', password: 'newpass' })

      expect(result.status).toBe(1)
      expect(result.message).toBe('Sign Up Successful!')
      expect(result.user).toBeDefined()
      expect(result.user?.username).toBe('newuser')
      expect(result.token).toBeDefined()
    })

    it('should fail registration with existing username', async () => {
      const existingUser: User = {
        id: 'test-id-1',
        username: 'existinguser',
        password: 'pass',
      }
      localStorage.setItem('mock_users', JSON.stringify([existingUser]))

      const result = await mockApi.register({ username: 'existinguser', password: 'newpass' })

      expect(result.status).toBe(0)
      expect(result.message).toBe('The user name has been used.')
      expect(result.user).toBeUndefined()
    })

    it('should store new user in localStorage', async () => {
      await mockApi.register({ username: 'newuser', password: 'newpass' })

      const users: User[] = JSON.parse(localStorage.getItem('mock_users') || '[]')
      const newUser = users.find((u) => u.username === 'newuser')
      expect(newUser).toBeDefined()
      expect(newUser?.password).toBe('newpass')
    })

    it('should store token after successful registration', async () => {
      const result = await mockApi.register({ username: 'newuser', password: 'newpass' })

      const tokens = JSON.parse(localStorage.getItem('tokens') || '{}')
      expect(tokens[result.user!.id]).toBe(result.token)
    })
  })

  describe('logout', () => {
    it('should remove token from localStorage', async () => {
      const tokens = { 'user-id': 'test-token' }
      localStorage.setItem('tokens', JSON.stringify(tokens))

      await mockApi.logout('user-id')

      const updatedTokens = JSON.parse(localStorage.getItem('tokens') || '{}')
      expect(updatedTokens['user-id']).toBeUndefined()
    })

    it('should handle logout when no tokens exist', async () => {
      await expect(mockApi.logout('non-existent-id')).resolves.toBeUndefined()
    })
  })

  describe('getCurrentUser', () => {
    it('should return user data for valid token', async () => {
      const testUser: User = {
        id: 'test-id-1',
        username: 'testuser',
        password: 'testpass',
      }
      const token = 'valid-token'
      localStorage.setItem('mock_users', JSON.stringify([testUser]))
      localStorage.setItem('tokens', JSON.stringify({ [testUser.id]: token }))

      const result = await mockApi.getCurrentUser(token)

      expect(result.status).toBe(1)
      expect(result.data).toEqual({ userId: testUser.id, name: 'testuser' })
    })

    it('should return null for invalid token', async () => {
      const result = await mockApi.getCurrentUser('invalid-token')

      expect(result.status).toBe(0)
      expect(result.data).toBeNull()
    })

    it('should return null when no tokens exist', async () => {
      localStorage.removeItem('tokens')

      const result = await mockApi.getCurrentUser('any-token')

      expect(result.status).toBe(0)
      expect(result.data).toBeNull()
    })

    it('should return default name when user not found', async () => {
      const token = 'valid-token'
      localStorage.setItem('tokens', JSON.stringify({ 'unknown-id': token }))
      localStorage.setItem('mock_users', JSON.stringify([]))

      const result = await mockApi.getCurrentUser(token)

      expect(result.status).toBe(1)
      expect(result.data?.name).toBe('User unknown-id')
    })
  })

  describe('getGoodList', () => {
    it('should return goods list from localStorage', async () => {
      localStorage.setItem('goodList', JSON.stringify(GOODS))

      const result = await mockApi.getGoodList()

      expect(result.status).toBe(200)
      expect(result.data).toEqual(GOODS)
    })

    it('should initialize goods list when localStorage is empty', async () => {
      localStorage.removeItem('goodList')

      const result = await mockApi.getGoodList()

      expect(result.status).toBe(200)
      expect(result.data).toEqual(GOODS)
    })

    it('should store goods in localStorage after initialization', async () => {
      localStorage.removeItem('goodList')

      await mockApi.getGoodList()

      const stored = JSON.parse(localStorage.getItem('goodList') || '[]')
      expect(stored).toEqual(GOODS)
    })
  })

  describe('getGoodInfo', () => {
    beforeEach(() => {
      localStorage.setItem('goodList', JSON.stringify(GOODS))
    })

    it('should return good info for valid id', async () => {
      const result = await mockApi.getGoodInfo('1')

      expect(result.status).toBe(200)
      expect(result.data).toBeDefined()
      expect(result.data?.id).toBe('1')
      expect(result.data?.name).toBe('Box1')
      expect(result.data?.sizes).toEqual(['small', 'medium', 'large'])
      expect(result.data?.colors).toEqual(['red', 'yellow', 'blue'])
    })

    it('should return 404 for invalid id', async () => {
      const result = await mockApi.getGoodInfo('invalid-id')

      expect(result.status).toBe(404)
      expect(result.data).toBeNull()
    })

    it('should generate correct price structure', async () => {
      const result = await mockApi.getGoodInfo('1')

      expect(result.data?.price).toEqual({
        small: 100,
        medium: 150,
        large: 200,
      })
    })

    it('should generate variants with all size and color combinations', async () => {
      const result = await mockApi.getGoodInfo('1')

      expect(result.data?.variants).toHaveLength(9) // 3 sizes * 3 colors
      expect(result.data?.variants[0]).toEqual({
        size: 'small',
        color: 'red',
        quantity: expect.any(Number),
      })
    })

    it('should have zero quantity for blue color variants', async () => {
      const result = await mockApi.getGoodInfo('1')

      const blueVariants = result.data?.variants.filter(
        (v: { color: string }) => v.color === 'blue',
      )
      blueVariants?.forEach((variant: { color: string; quantity: number }) => {
        expect(variant.quantity).toBe(0)
      })
    })
  })

  describe('addToCart', () => {
    beforeEach(() => {
      localStorage.setItem('goodList', JSON.stringify(GOODS))
    })

    const validRequest: AddToCartRequestType = {
      userId: 'user-1',
      itemId: '1',
      variant: { size: 'small', color: 'red', quantity: 2 },
    }

    it('should add item to cart successfully', async () => {
      const result = await mockApi.addToCart(validRequest)

      expect(result.status).toBe(200)
      expect(result.data).toBeNull()
    })

    it('should fail with invalid request data', async () => {
      const invalidRequest = {
        userId: '',
        itemId: '',
        variant: null,
      } as unknown as AddToCartRequestType

      const result = await mockApi.addToCart(invalidRequest)

      expect(result.status).toBe(400)
    })

    it('should fail when item not found', async () => {
      const request = { ...validRequest, itemId: 'invalid-id' }

      const result = await mockApi.addToCart(request)

      expect(result.status).toBe(404)
    })

    it('should store cart item in localStorage', async () => {
      await mockApi.addToCart(validRequest)

      const cart = JSON.parse(localStorage.getItem('userCart') || '[]')
      expect(cart).toHaveLength(1)
      expect(cart[0].itemId).toBe('1')
    })

    it('should update quantity if same item exists', async () => {
      await mockApi.addToCart(validRequest)
      await mockApi.addToCart(validRequest)

      const cart = JSON.parse(localStorage.getItem('userCart') || '[]')
      expect(cart).toHaveLength(1)
      expect(cart[0].variants.quantity).toBe(4)
    })

    it('should add separate items for different variants', async () => {
      const request2: AddToCartRequestType = {
        userId: 'user-1',
        itemId: '1',
        variant: { size: 'medium', color: 'red', quantity: 1 },
      }

      await mockApi.addToCart(validRequest)
      await mockApi.addToCart(request2)

      const cart = JSON.parse(localStorage.getItem('userCart') || '[]')
      expect(cart).toHaveLength(2)
    })

    it('should include price in cart item', async () => {
      await mockApi.addToCart(validRequest)

      const cart = JSON.parse(localStorage.getItem('userCart') || '[]')
      expect(cart[0].price).toEqual({
        small: 100,
        medium: 150,
        large: 200,
      })
    })
  })

  describe('getCartById', () => {
    beforeEach(() => {
      localStorage.setItem('goodList', JSON.stringify(GOODS))
    })

    it('should return empty cart when no items', async () => {
      const result = await mockApi.getCartById('user-1')

      expect(result.status).toBe(200)
      expect(result.data).toEqual([])
    })

    it('should return cart items with product info', async () => {
      const request: AddToCartRequestType = {
        userId: 'user-1',
        itemId: '1',
        variant: { size: 'small', color: 'red', quantity: 2 },
      }
      await mockApi.addToCart(request)

      const result = await mockApi.getCartById('user-1')

      expect(result.status).toBe(200)
      expect(result.data).toHaveLength(1)
      expect(result.data![0].itemId).toBe('1')
      expect(result.data![0].name).toBe('Box1')
      expect(result.data![0].imgUrl).toBe('src/assets/box.jpg')
    })

    it('should include description in cart items', async () => {
      const request: AddToCartRequestType = {
        userId: 'user-1',
        itemId: '1',
        variant: { size: 'small', color: 'red', quantity: 2 },
      }
      await mockApi.addToCart(request)

      const result = await mockApi.getCartById('user-1')

      expect(result.data![0].description).toBe('This is a static description.')
    })
  })
})
