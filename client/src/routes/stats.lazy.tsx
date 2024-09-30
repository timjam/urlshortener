import { createLazyFileRoute } from '@tanstack/react-router'
import { Stats } from '../Stats/Stats'

export const Route = createLazyFileRoute('/stats')({
  component: Stats
});