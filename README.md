# Docs

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [VueModules](#vuemodules)
-   [install](#install)
-   [registerModule](#registermodule)
-   [routeHandler](#routehandler)
-   [\_route](#_route)
-   [alias](#alias)

## VueModules

VueModules

VueModules is a Vue plugin that tries to achieve some modularization of pages
and components

## install

**Parameters**

-   `Vue` **Vue** 
-   `options` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Customizations of the plugin

**Examples**

```javascript
Vue.use(VueModules, options)
```

## registerModule

**Parameters**

-   `options` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Customizations for module

**Examples**

```javascript
Vue.registerModule({ resource, module })
```

## routeHandler

Route Handler

Handles a route

**Parameters**

-   `_route`  
-   `$1` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `$1.resource`  
    -   `$1.routes`   (optional, default `[]`)
    -   `$1.alias`   (optional, default `false`)
    -   `$1.custom.routes`   (optional, default `[]`)

## \_route

Override a page/route

In the example the route named as "user" will load the "MyCustomUserPage"
instead of the defined in the module

**Examples**

```javascript
customRoutes = [
  { name: 'user', component: require('./MyCustomUserPage') }
]
```

## alias

Adds a alias for a route

In the example the route "/usuario" is a duplication of the route "/user"

**Examples**

```javascript
route.alias = [ '/user=/usuario' ]
```