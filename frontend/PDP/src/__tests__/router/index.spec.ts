import { describe, it, expect } from 'vitest'
import router from '@/router/index'

describe('Router', () => {
  it('should be defined', () => {
    expect(router).toBeDefined()
  })

  it('should have correct mode', () => {
    expect(router.options.history).toBeDefined()
  })

  describe('routes', () => {
    it('should have root route', () => {
      const routes = router.getRoutes()
      const rootRoute = routes.find((r) => r.path === '/')

      expect(rootRoute).toBeDefined()
      expect(rootRoute?.components?.default).toBeDefined()
    })

    it('should have home route', () => {
      const routes = router.getRoutes()
      const homeRoute = routes.find((r) => r.path === '/home')

      expect(homeRoute).toBeDefined()
      expect(homeRoute?.components?.default).toBeDefined()
    })

    it('should have exactly 2 routes', () => {
      const routes = router.getRoutes()

      expect(routes).toHaveLength(2)
    })

    it('should point root and home to same component', () => {
      const routes = router.getRoutes()
      const rootRoute = routes.find((r) => r.path === '/')
      const homeRoute = routes.find((r) => r.path === '/home')

      expect(rootRoute?.components?.default).toBe(homeRoute?.components?.default)
    })
  })

  describe('navigation', () => {
    it('should resolve root route', async () => {
      const route = router.resolve('/')

      expect(route.name).toBeUndefined()
      expect(route.path).toBe('/')
    })

    it('should resolve home route', async () => {
      const route = router.resolve('/home')

      expect(route.name).toBeUndefined()
      expect(route.path).toBe('/home')
    })

    it('should return 404 for unknown route', async () => {
      const route = router.resolve('/unknown-route')

      expect(route.matched).toHaveLength(0)
    })
  })
})
