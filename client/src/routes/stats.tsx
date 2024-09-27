import { createFileRoute } from '@tanstack/react-router'
import { zodSearchValidator } from '@tanstack/router-zod-adapter'
import { Stats } from '../Stats/Stats'
import { z } from 'zod'

const StatsProps = z.object({
  shortUrl: z.string().default(''),
});

export const Route = createFileRoute('/stats')({
  validateSearch: zodSearchValidator(StatsProps),
  component: Stats
})