import { describe, it, expect } from 'vitest'
import type { UserType, ListItem, ItemInfo, CartInfo } from '@/types/frontend'

describe('Frontend Types', () => {
  describe('UserType interface', () => {
    it('should accept valid user object', () => {
      const user: UserType = {
        userName: 'testuser',
        userId: 'user-123',
      }

      expect(user.userName).toBe('testuser')
      expect(user.userId).toBe('user-123')
    })

    it('should have string userName', () => {
      const user: UserType = {
        userName: 'john_doe',
        userId: '1',
      }

      expect(typeof user.userName).toBe('string')
    })

    it('should have string userId', () => {
      const user: UserType = {
        userName: 'admin',
        userId: 'admin-456',
      }

      expect(typeof user.userId).toBe('string')
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

    it('should have string imgUrl', () => {
      const listItem: ListItem = {
        id: '1',
        imgUrl: 'https://example.com/image.jpg',
        name: 'Item',
        status: 1,
        maxPrice: 100,
        minPrice: 50,
      }

      expect(typeof listItem.imgUrl).toBe('string')
    })

    it('should have string name', () => {
      const listItem: ListItem = {
        id: '1',
        imgUrl: 'path.jpg',
        name: 'Product Name',
        status: 1,
        maxPrice: 100,
        minPrice: 50,
      }

      expect(typeof listItem.name).toBe('string')
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

    it('should have maxPrice greater than minPrice', () => {
      const listItem: ListItem = {
        id: '1',
        imgUrl: 'path.jpg',
        name: 'Item',
        status: 1,
        maxPrice: 300,
        minPrice: 150,
      }

      expect(listItem.maxPrice).toBeGreaterThan(listItem.minPrice)
    })
  })

  describe('ItemInfo interface', () => {
    it('should accept valid item info', () => {
      const itemInfo: ItemInfo = {
        id: '1',
        imgUrl: 'src/assets/box.jpg',
        name: 'Box1',
        sizes: ['small', 'medium', 'large'],
        colors: ['red', 'yellow', 'blue'],
        price: {
          small: 100,
          medium: 150,
          large: 200,
        },
        variants: [
          { size: 'small', color: 'red', quantity: 5 },
          { size: 'medium', color: 'red', quantity: 3 },
        ],
        description: 'A nice box',
      }

      expect(itemInfo.id).toBe('1')
      expect(itemInfo.sizes).toHaveLength(3)
      expect(itemInfo.colors).toHaveLength(3)
      expect(itemInfo.variants).toHaveLength(2)
    })

    it('should have string id', () => {
      const itemInfo: ItemInfo = {
        id: 'abc',
        imgUrl: '',
        name: '',
        sizes: [],
        colors: [],
        price: {},
        variants: [],
        description: '',
      }

      expect(typeof itemInfo.id).toBe('string')
    })

    it('should have string imgUrl', () => {
      const itemInfo: ItemInfo = {
        id: '1',
        imgUrl: 'path/to/image.jpg',
        name: '',
        sizes: [],
        colors: [],
        price: {},
        variants: [],
        description: '',
      }

      expect(typeof itemInfo.imgUrl).toBe('string')
    })

    it('should have string name', () => {
      const itemInfo: ItemInfo = {
        id: '1',
        imgUrl: '',
        name: 'Product',
        sizes: [],
        colors: [],
        price: {},
        variants: [],
        description: '',
      }

      expect(typeof itemInfo.name).toBe('string')
    })

    it('should have sizes array', () => {
      const itemInfo: ItemInfo = {
        id: '1',
        imgUrl: '',
        name: '',
        sizes: ['small', 'medium', 'large'],
        colors: [],
        price: {},
        variants: [],
        description: '',
      }

      expect(Array.isArray(itemInfo.sizes)).toBe(true)
      expect(itemInfo.sizes.every((s) => typeof s === 'string')).toBe(true)
    })

    it('should have colors array', () => {
      const itemInfo: ItemInfo = {
        id: '1',
        imgUrl: '',
        name: '',
        sizes: [],
        colors: ['red', 'blue', 'green'],
        price: {},
        variants: [],
        description: '',
      }

      expect(Array.isArray(itemInfo.colors)).toBe(true)
      expect(itemInfo.colors.every((c) => typeof c === 'string')).toBe(true)
    })

    it('should have price record with number values', () => {
      const itemInfo: ItemInfo = {
        id: '1',
        imgUrl: '',
        name: '',
        sizes: [],
        colors: [],
        price: { small: 100, medium: 150, large: 200 },
        variants: [],
        description: '',
      }

      expect(typeof itemInfo.price).toBe('object')
      Object.values(itemInfo.price).forEach((value) => {
        expect(typeof value).toBe('number')
      })
    })

    it('should have variants array', () => {
      const itemInfo: ItemInfo = {
        id: '1',
        imgUrl: '',
        name: '',
        sizes: [],
        colors: [],
        price: {},
        variants: [
          { size: 'small', color: 'red', quantity: 5 },
          { size: 'large', color: 'blue', quantity: 0 },
        ],
        description: '',
      }

      expect(Array.isArray(itemInfo.variants)).toBe(true)
    })

    it('should have string description', () => {
      const itemInfo: ItemInfo = {
        id: '1',
        imgUrl: '',
        name: '',
        sizes: [],
        colors: [],
        price: {},
        variants: [],
        description: 'Product description here',
      }

      expect(typeof itemInfo.description).toBe('string')
    })

    it('should have variants with correct structure', () => {
      const itemInfo: ItemInfo = {
        id: '1',
        imgUrl: '',
        name: '',
        sizes: [],
        colors: [],
        price: {},
        variants: [
          { size: 'medium', color: 'yellow', quantity: 10 },
        ],
        description: '',
      }

      itemInfo.variants.forEach((variant) => {
        expect(typeof variant.size).toBe('string')
        expect(typeof variant.color).toBe('string')
        expect(typeof variant.quantity).toBe('number')
      })
    })
  })

  describe('CartInfo interface', () => {
    it('should accept valid cart info', () => {
      const cartInfo: CartInfo = {
        id: 'cart-1',
        itemId: 'item-1',
        imgUrl: 'src/assets/box.jpg',
        name: 'Box1',
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
        description: 'Test description',
      }

      expect(cartInfo.id).toBe('cart-1')
      expect(cartInfo.itemId).toBe('item-1')
      expect(cartInfo.price.medium).toBe(150)
      expect(cartInfo.variants.size).toBe('medium')
    })

    it('should have string id', () => {
      const cartInfo: CartInfo = {
        id: 'abc123',
        itemId: 'item-1',
        imgUrl: '',
        name: '',
        price: {},
        variants: { size: '', color: '', quantity: 0 },
        description: '',
      }

      expect(typeof cartInfo.id).toBe('string')
    })

    it('should have string itemId', () => {
      const cartInfo: CartInfo = {
        id: '1',
        itemId: 'item-456',
        imgUrl: '',
        name: '',
        price: {},
        variants: { size: '', color: '', quantity: 0 },
        description: '',
      }

      expect(typeof cartInfo.itemId).toBe('string')
    })

    it('should have string imgUrl', () => {
      const cartInfo: CartInfo = {
        id: '1',
        itemId: 'item-1',
        imgUrl: 'path/image.jpg',
        name: '',
        price: {},
        variants: { size: '', color: '', quantity: 0 },
        description: '',
      }

      expect(typeof cartInfo.imgUrl).toBe('string')
    })

    it('should have string name', () => {
      const cartInfo: CartInfo = {
        id: '1',
        itemId: 'item-1',
        imgUrl: '',
        name: 'Product Name',
        price: {},
        variants: { size: '', color: '', quantity: 0 },
        description: '',
      }

      expect(typeof cartInfo.name).toBe('string')
    })

    it('should have price record with number values', () => {
      const cartInfo: CartInfo = {
        id: '1',
        itemId: 'item-1',
        imgUrl: '',
        name: '',
        price: { small: 50, medium: 75, large: 100 },
        variants: { size: '', color: '', quantity: 0 },
        description: '',
      }

      expect(typeof cartInfo.price).toBe('object')
      Object.values(cartInfo.price).forEach((value) => {
        expect(typeof value).toBe('number')
      })
    })

    it('should have variants object with correct types', () => {
      const cartInfo: CartInfo = {
        id: '1',
        itemId: 'item-1',
        imgUrl: '',
        name: '',
        price: {},
        variants: { size: 'large', color: 'blue', quantity: 5 },
        description: '',
      }

      expect(typeof cartInfo.variants.size).toBe('string')
      expect(typeof cartInfo.variants.color).toBe('string')
      expect(typeof cartInfo.variants.quantity).toBe('number')
    })

    it('should have string description', () => {
      const cartInfo: CartInfo = {
        id: '1',
        itemId: 'item-1',
        imgUrl: '',
        name: '',
        price: {},
        variants: { size: '', color: '', quantity: 0 },
        description: 'Cart item description',
      }

      expect(typeof cartInfo.description).toBe('string')
    })
  })
})
