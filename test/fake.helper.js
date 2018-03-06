export default {
  Vue: {},
  Router ({ routes }) {
    return {
      routes,
      addRoutes(routes) {
        routes.forEach(route => this.routes.push(route))
      }
    }
  }
}
