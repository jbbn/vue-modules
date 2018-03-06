/**
 * VueModules
 *
 * VueModules is a Vue plugin that tries to achieve some modularization of pages
 * and components
 */
const VueModules = {
  version: '0.0.0',

  /** @function
   * @name install
   * @param {Vue} Vue
   * @param {object} options Customizations of the plugin
   * @example Vue.use(VueModules, options)
   */
  install (Vue, { router, store, modules = [], customPages = [] }) {

    /** @function
     * @name registerModule
     * @param {object} options Customizations for module
     * @example Vue.registerModule({ resource, module })
     */
    Vue.registerModule = ({ resource, module = false, route = false }) => {
      let routes = []

      // vuex registerModule
      store && store.registerModule(resource, module.store())

      if (router) {
        module.routes.forEach(_route => routeHandler(
          _route,
          {
            resource,
            routes,
            alias: route.alias,
            customPages
          }
        ))

        // vue-router addRoutes
        router.addRoutes(routes)
      }
    }

    modules.length > 0 && modules.forEach(Vue.registerModule)
  }
}

/**
 * Route Handler
 *
 * Handles a route
 */
const routeHandler = (
  _route,
  {
    resource,
    routes = [],
    alias = false,
    customPages
  }
) => {

  /**
   * Override a page/route
   *
   * In the example the route named as "user" will load the "MyCustomUserPage"
   * instead of the defined in the module
   *
   * @example
   * customPages = [
   *   { name: 'user', component: require('./MyCustomUserPage') }
   * ]
   */
  if (customPages.length > 0) {
    if (_route.name === customPages[0].name) {
      customPages[0].path = _route.path
      _route = customPages[0]
    }
  }

  /**
   * Adds a alias for a route
   *
   * In the example the route "/usuario" is a duplication of the route "/user"
   *
   * @example route.alias = [ '/user=/usuario' ]
   */
  if (alias) {
    alias.forEach(item => {
      const [ match, alias ] = item.split('=')
      if (_route.path === match) {
        let path = alias

        // module "base" does not need prefix
        if (resource !== 'base') path = `/${resource}${path}`

        routes.push(Object.assign({}, _route, { path }))
      }
    })
  }

  // module "base" does not need prefix
  if (resource !== 'base') _route.path = `/${resource}${_route.path}`

  routes.push(_route)
}

export default VueModules
