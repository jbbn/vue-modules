import VueModules from '..'
import assert from 'assert'
import fake from './fake.helper'

describe('VueModules', function() {
  it('Method "install" exists', function() {
    assert(typeof VueModules.install === 'function')
  })

  it('On install "registerModule" exists', function() {
    const { Vue } = fake
    VueModules.install(Vue, {})
    assert(typeof Vue.registerModule === 'function')
  })

  it('We can register new routes with our module', function() {
    const { Vue, Router } = fake
    const router = Router({ routes: [] })
    const resource = 'test-resource'
    const module = {
      routes: [
        { path: '/', name: 'home', component: {} },
        { path: '/login', name: 'login', component: {} }
      ]
    }

    VueModules.install(Vue, { router })

    Vue.registerModule({ resource, module })

    assert.deepEqual(module.routes, router.routes)
  })

  it('We can set a alias to a route', function() {
    const { Vue, Router } = fake
    const router = Router({ routes: [] })
    const resource = 'test-resource'
    const module = {
      routes: [
        { path: '/', name: 'home', component: {} },
        { path: '/login', name: 'login', component: {} }
      ]
    }
    const route = {
      alias: [
        '/=/home2',
        '/login=/credentials'
      ]
    }
    const _expected_routes = [
      { path: `/${resource}/home2`, name: 'home', component: {} },
      { path: `/${resource}/`, name: 'home', component: {} },
      { path: `/${resource}/credentials`, name: 'login', component: {} },
      { path: `/${resource}/login`, name: 'login', component: {} },
    ]

    VueModules.install(Vue, { router })

    Vue.registerModule({ resource, module, route })

    assert.deepEqual(_expected_routes, router.routes)
  })
})
