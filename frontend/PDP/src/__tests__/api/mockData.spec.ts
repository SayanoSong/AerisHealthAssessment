import { describe, it, expect } from 'vitest'
import { GOODS } from '@/api/mockData'

describe('mockData', () => {
  describe('GOODS array', () => {
    it('should be defined', () => {
      expect(GOODS).toBeDefined()
      expect(Array.isArray(GOODS)).toBe(true)
    })

    it('should have 10 items', () => {
      expect(GOODS).toHaveLength(10)
    })

    it('should have unique ids', () => {
      const ids = GOODS.map((item) => item.id)
      const uniqueIds = new Set(ids)

      expect(uniqueIds.size).toBe(10)
    })

    it('should have sequential numeric ids as strings', () => {
      const ids = GOODS.map((item) => item.id)

      expect(ids).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])
    })

    it('should have sequential names', () => {
      const names = GOODS.map((item) => item.name)

      expect(names).toEqual([
        'Box1',
        'Box2',
        'Box3',
        'Box4',
        'Box5',
        'Box6',
        'Box7',
        'Box8',
        'Box9',
        'Box10',
      ])
    })

    describe('item structure', () => {
      it('should have all required properties', () => {
        GOODS.forEach((item) => {
          expect(item).toHaveProperty('id')
          expect(item).toHaveProperty('name')
          expect(item).toHaveProperty('imgUrl')
          expect(item).toHaveProperty('status')
          expect(item).toHaveProperty('minPrice')
          expect(item).toHaveProperty('maxPrice')
        })
      })

      it('should have string id', () => {
        GOODS.forEach((item) => {
          expect(typeof item.id).toBe('string')
        })
      })

      it('should have string name', () => {
        GOODS.forEach((item) => {
          expect(typeof item.name).toBe('string')
        })
      })

      it('should have string imgUrl', () => {
        GOODS.forEach((item) => {
          expect(typeof item.imgUrl).toBe('string')
        })
      })

      it('should have number status', () => {
        GOODS.forEach((item) => {
          expect(typeof item.status).toBe('number')
        })
      })

      it('should have number minPrice', () => {
        GOODS.forEach((item) => {
          expect(typeof item.minPrice).toBe('number')
        })
      })

      it('should have number maxPrice', () => {
        GOODS.forEach((item) => {
          expect(typeof item.maxPrice).toBe('number')
        })
      })

      it('should have maxPrice greater than minPrice', () => {
        GOODS.forEach((item) => {
          expect(item.maxPrice).toBeGreaterThan(item.minPrice)
        })
      })

      it('should have status as 0 or 1', () => {
        GOODS.forEach((item) => {
          expect([0, 1]).toContain(item.status)
        })
      })
    })

    describe('imgUrl patterns', () => {
      it('should start with src/assets/', () => {
        GOODS.forEach((item) => {
          expect(item.imgUrl).toMatch(/^src\/assets\//)
        })
      })

      it('should end with .jpg', () => {
        GOODS.forEach((item) => {
          expect(item.imgUrl).toMatch(/\.jpg$/)
        })
      })
    })

    describe('price ranges', () => {
      it('should have reasonable minPrice range (80-200)', () => {
        const minPrices = GOODS.map((item) => item.minPrice)

        minPrices.forEach((price) => {
          expect(price).toBeGreaterThanOrEqual(80)
          expect(price).toBeLessThanOrEqual(200)
        })
      })

      it('should have reasonable maxPrice range (180-300)', () => {
        const maxPrices = GOODS.map((item) => item.maxPrice)

        maxPrices.forEach((price) => {
          expect(price).toBeGreaterThanOrEqual(180)
          expect(price).toBeLessThanOrEqual(300)
        })
      })
    })

    describe('active vs inactive items', () => {
      it('should have 8 active items (status: 1)', () => {
        const activeItems = GOODS.filter((item) => item.status === 1)

        expect(activeItems).toHaveLength(8)
      })

      it('should have 2 inactive items (status: 0)', () => {
        const inactiveItems = GOODS.filter((item) => item.status === 0)

        expect(inactiveItems).toHaveLength(2)
      })

      it('should have Box5 and Box8 as inactive', () => {
        const box5 = GOODS.find((item) => item.name === 'Box5')
        const box8 = GOODS.find((item) => item.name === 'Box8')

        expect(box5?.status).toBe(0)
        expect(box8?.status).toBe(0)
      })
    })
  })
})
