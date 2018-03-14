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
  install (Vue, { app, router, store, modules = [] }) {

    /** @function
     * @name registerModule
     * @param {object} options Customizations for module
     * @example Vue.registerModule({ resource, module })
     */
    Vue.registerModule = ({ resource, module = false, route = false, custom = {} }) => {
      let routes = []

      // vuex registerModule
      store && store.registerModule(resource, module.store())

      if (router) {
        module.routes.forEach(_route => routeHandler(
          _route,
          {
            app,
            resource,
            routes,
            alias: route.alias,
            custom
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
    app,
    resource,
    routes = [],
    alias = false,
    custom: { routes: customRoutes = [] }
  }
) => {

  /**
   * Override a page/route
   *
   * In the example the route named as "user" will load the "MyCustomUserPage"
   * instead of the defined in the module
   *
   * @example
   * customRoutes = [
   *   { name: 'user', component: require('./MyCustomUserPage') }
   * ]
   */
  if (customRoutes.length > 0) {
    if (_route.name === customRoutes[0].name) {
      customRoutes[0].path = _route.path
      _route = customRoutes[0]
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

  const module = resource
  const page = _route.name

  import(`../../src/core/apps-themes/${app}/modules/${module}/${page}.styl`)
    .catch(() => import(`../../src/core/apps-themes/chalk/modules/${module}/${page}.styl`))

  routes.push(_route)
}

export default VueModules
