import { Hourglass, AlertCircle, CalendarX, Unplug, Zap, TrendingUp, CheckCircle, Layers, type LucideIcon } from 'lucide-react';

/** Front = the problem, back = the system that solves it. */
export interface FlipCard {
  id: number;
  frontTitle: string;
  frontDesc: string;
  frontIcon: LucideIcon;
  backTitle: string;
  backDesc: string;
  backIcon: LucideIcon;
}

export const FLIP_CARDS: FlipCard[] = [
  {
    id: 1,
    frontTitle: 'Funnels Without Automation',
    frontDesc: 'Leads are collected but go cold without nurture.',
    frontIcon: Hourglass,
    backTitle: 'Faster Lead Response',
    backDesc: 'Leads are contacted instantly, increasing booking probability.',
    backIcon: Zap,
  },
  {
    id: 2,
    frontTitle: 'Unstructured Pipelines',
    frontDesc: 'Deals sit in random stages causing manual chasing.',
    frontIcon: AlertCircle,
    backTitle: 'Full Pipeline Visibility',
    backDesc: 'Every lead has a clear stage, status, and movement history.',
    backIcon: TrendingUp,
  },
  {
    id: 3,
    frontTitle: 'No Follow-Up Logic',
    frontDesc: 'Reminders depend on memory, causing inconsistent bookings.',
    frontIcon: CalendarX,
    backTitle: 'Reduced No-Shows',
    backDesc: 'Automated reminders and re-engagement sequences recover lost leads.',
    backIcon: CheckCircle,
  },
  {
    id: 4,
    frontTitle: 'Disconnected Systems',
    frontDesc: 'Using separate CRMs and calendars causes operational friction.',
    frontIcon: Unplug,
    backTitle: 'The All-in-One Structure',
    backDesc: 'Funnels, pipelines, and automation work seamlessly together.',
    backIcon: Layers,
  },
];
