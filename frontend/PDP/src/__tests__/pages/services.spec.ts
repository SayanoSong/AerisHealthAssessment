import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getGoodList, getGoodInfoById, addToCart, getCartInfoById } from '@/pages/services'
import { mockApi } from '@/api/mock'
import { GOODS } from '@/api/mockData'

vi.mock('@/api/mock', () => ({
  mockApi: {
    getGoodList: vi.fn(),
    getGoodInfo: vi.fn(),
    addToCart: vi.fn(),
    getCartById: vi.fn(),
  },
}))

describe('Services', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getGoodList', () => {
    it('should return goods list on successful response', async () => {
      vi.mocked(mockApi.getGoodList).mockResolvedValueOnce({
        status: 200,
        data: GOODS,
      })

      const result = await getGoodList()

      expect(result).toEqual(GOODS)
      expect(mockApi.getGoodList).toHaveBeenCalledTimes(1)
    })

    it('should return empty array on failed response', async () => {
      vi.mocked(mockApi.getGoodList).mockResolvedValueOnce({
        status: 400,
        data: GOODS,
      })

      const result = await getGoodList()

      expect(result).toEqual([])
    })

    it('should return undefined when data is undefined', async () => {
      vi.mocked(mockApi.getGoodList).mockResolvedValueOnce({
        status: 200,
        data: undefined,
      })

      const result = await getGoodList()

      expect(result).toBeUndefined()
    })
  })

  describe('getGoodInfoById', () => {
    const mockGoodInfo = {
      id: '1',
      name: 'Box1',
      imgUrl: 'src/assets/box.jpg',
      sizes: ['small', 'medium', 'large'],
      colors: ['red', 'yellow', 'blue'],
      price: { small: 100, medium: 150, large: 200 },
      variants: [
        { size: 'small', color: 'red', quantity: 5 },
        { size: 'medium', color: 'red', quantity: 3 },
      ],
      description: 'Test description',
    }

    it('should return good info on successful response', async () => {
      vi.mocked(mockApi.getGoodInfo).mockResolvedValueOnce({
        status: 200,
        data: mockGoodInfo,
      })

      const result = await getGoodInfoById('1')

      expect(result).toEqual(mockGoodInfo)
      expect(mockApi.getGoodInfo).toHaveBeenCalledTimes(1)
      expect(mockApi.getGoodInfo).toHaveBeenCalledWith('1')
    })

    it('should return null on failed response', async () => {
      vi.mocked(mockApi.getGoodInfo).mockResolvedValueOnce({
        status: 404,
        data: null,
      })

      const result = await getGoodInfoById('invalid-id')

      expect(result).toBeNull()
    })

    it('should return null when data is null', async () => {
      vi.mocked(mockApi.getGoodInfo).mockResolvedValueOnce({
        status: 200,
        data: null,
      })

      const result = await getGoodInfoById('1')

      expect(result).toBeNull()
    })
  })

  describe('addToCart', () => {
    const mockRequest = {
      userId: 'user-1',
      itemId: '1',
      variant: { size: 'small', color: 'red', quantity: 2 },
    }

    it('should return null on successful add to cart', async () => {
      vi.mocked(mockApi.addToCart).mockResolvedValueOnce({
        status: 200,
        data: null,
      })

      const result = await addToCart(mockRequest)

      expect(result).toBeNull()
      expect(mockApi.addToCart).toHaveBeenCalledTimes(1)
      expect(mockApi.addToCart).toHaveBeenCalledWith(mockRequest)
    })

    it('should return error message on failed add to cart', async () => {
      vi.mocked(mockApi.addToCart).mockResolvedValueOnce({
        status: 400,
        data: 'Add Failed.',
      })

      const result = await addToCart(mockRequest)

      expect(result).toBe('Add Failed.')
    })

    it('should return error message on 404 status', async () => {
      vi.mocked(mockApi.addToCart).mockResolvedValueOnce({
        status: 404,
        data: 'Item not found',
      })

      const result = await addToCart(mockRequest)

      expect(result).toBe('Item not found')
    })
  })

  describe('getCartInfoById', () => {
    const mockCartData = [
      {
        id: 'cart-1',
        itemId: '1',
        imgUrl: 'src/assets/box.jpg',
        name: 'Box1',
        price: { small: 100, medium: 150, large: 200 },
        variants: { size: 'small', color: 'red', quantity: 2 },
        description: 'Test description',
      },
    ]

    it('should return cart info on successful response', async () => {
      vi.mocked(mockApi.getCartById).mockResolvedValueOnce({
        status: 200,
        data: mockCartData,
        info: '',
      })

      const result = await getCartInfoById('user-1')

      expect(result).toEqual(mockCartData)
      expect(mockApi.getCartById).toHaveBeenCalledTimes(1)
      expect(mockApi.getCartById).toHaveBeenCalledWith('user-1')
    })

    it('should return empty array on failed response', async () => {
      vi.mocked(mockApi.getCartById).mockResolvedValueOnce({
        status: 400,
        data: [],
        info: 'Error',
      })

      const result = await getCartInfoById('user-1')

      expect(result).toEqual([])
    })

    it('should return undefined when data is undefined', async () => {
      vi.mocked(mockApi.getCartById).mockResolvedValueOnce({
        status: 200,
        data: undefined,
        info: '',
      })

      const result = await getCartInfoById('user-1')

      expect(result).toBeUndefined()
    })
  })
})
