/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as StatsImport } from './routes/stats'

// Create Virtual Routes

const HelloLazyImport = createFileRoute('/hello')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const HelloLazyRoute = HelloLazyImport.update({
  path: '/hello',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/hello.lazy').then((d) => d.Route))

const StatsRoute = StatsImport.update({
  path: '/stats',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/stats': {
      id: '/stats'
      path: '/stats'
      fullPath: '/stats'
      preLoaderRoute: typeof StatsImport
      parentRoute: typeof rootRoute
    }
    '/hello': {
      id: '/hello'
      path: '/hello'
      fullPath: '/hello'
      preLoaderRoute: typeof HelloLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/stats': typeof StatsRoute
  '/hello': typeof HelloLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/stats': typeof StatsRoute
  '/hello': typeof HelloLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/stats': typeof StatsRoute
  '/hello': typeof HelloLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/stats' | '/hello'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/stats' | '/hello'
  id: '__root__' | '/' | '/stats' | '/hello'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  StatsRoute: typeof StatsRoute
  HelloLazyRoute: typeof HelloLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  StatsRoute: StatsRoute,
  HelloLazyRoute: HelloLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/stats",
        "/hello"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/stats": {
      "filePath": "stats.tsx"
    },
    "/hello": {
      "filePath": "hello.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
