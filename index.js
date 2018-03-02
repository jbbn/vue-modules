const VueModules = {
  version: '0.0.0',

  install (Vue, { customPages = [], router = false, store, modules = [] }) {
    Vue.registerModule = ({ resource, module, route = false }) => {
      console.debug('registerModule', resource)
      let routes = []

      store.registerModule(resource, module.store())

      if (router) {
        module.routes.forEach(_route => {

          // Override a page/route
          if (customPages.length > 0) {
            if (_route.name === customPages[0].name) {
              customPages[0].path = _route.path
              _route = customPages[0]
            }
          }

          if (route && route.alias) {
            route.alias.forEach(item => {
              const [ match, alias ] = item.split('=')
              if (_route.path === match) _route.path = alias
            })
          }

          if (route && route.props) _route.props = route.props

          routes.push(_route)
        })

        router.addRoutes(routes)
      }
    }

    modules.length > 0 && modules.forEach(Vue.registerModule)
  }
}

export default VueModules
