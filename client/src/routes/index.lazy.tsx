import { createLazyFileRoute } from '@tanstack/react-router'

import { UrlShortener } from '../UrlShortener/UrlShortener'

export const Route = createLazyFileRoute('/')({
  component: UrlShortener,
})
