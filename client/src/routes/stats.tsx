import { createFileRoute } from '@tanstack/react-router'
import { fallback, zodSearchValidator } from '@tanstack/router-zod-adapter'
import { z } from 'zod'

const StatsProps = z.object({
  shortUrl: fallback(z.string(), '').default(''),
});

export const Route = createFileRoute('/stats')({
  validateSearch: zodSearchValidator(StatsProps)
})