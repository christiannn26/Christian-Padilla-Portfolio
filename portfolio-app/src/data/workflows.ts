export interface Workflow {
  id: string;
  title: string;
  description: string;
  thumbnailSrc: string;
  /** Full-resolution screenshot (4000px) — only fetched when its modal opens, kept large for crisp zoom. */
  highResSrc: string;
}

export const WORKFLOWS: Workflow[] = [
  {
    id: '1',
    title: 'Lead Capture & Recovery',
    description: 'From traffic to booking confirmation, every lead is monitored. If someone submits a form but does not complete scheduling, the system automatically follows up, updates the pipeline, and recovers the opportunity. No lost leads. No manual chasing.',
    thumbnailSrc: './img/Workflows/Lead Capture & Recovery_thumb.webp',
    highResSrc: './img/Workflows/Lead Capture & Recovery.webp',
  },
  {
    id: '2',
    title: 'Booking to New Lead Pipeline',
    description: 'When an appointment is confirmed, the system instantly assigns ownership, notifies the team, verifies the opportunity, updates the pipeline stage, syncs lifecycle status, and cleans up pending tags. Booking data, CRM, and pipeline stay perfectly aligned without manual updates.',
    thumbnailSrc: './img/Workflows/Booking to New Lead Pipeline_thumb.webp',
    highResSrc: './img/Workflows/Booking to New Lead Pipeline.webp',
  },
  {
    id: '3',
    title: 'Appointment Confirmation',
    description: 'Appointments are confirmed, reminded, tracked, and protected automatically. Reply routing handles YES or RESCHEDULE, reminders go out strategically, no-shows trigger recovery flows, and pipeline stages update in real time. Attendance increases. Revenue leaks decrease.',
    thumbnailSrc: './img/Workflows/Appointment Confirmation_thumb.webp',
    highResSrc: './img/Workflows/Appointment Confirmation.webp',
  },
  {
    id: '4',
    title: 'Re-Engagement Sequence',
    description: 'When leads go cold, cancel, or miss appointments, the system automatically re-engages them. Timed follow-ups, booking reminders, internal alerts, and conditional exits reactivate interest while keeping the pipeline clean. Lost leads are given structured second chances without manual chasing.',
    thumbnailSrc: './img/Workflows/Re-Engagement Sequence_thumb.webp',
    highResSrc: './img/Workflows/Re-Engagement Sequence.webp',
  },
  {
    id: '5',
    title: 'No-Show Handler',
    description: 'Missed appointments automatically trigger status updates, tag cleanup, internal alerts, and a structured re-engagement message. Instead of losing the opportunity, the system moves fast to recover it while keeping your CRM accurate.',
    thumbnailSrc: './img/Workflows/No-Show Handler_thumb.webp',
    highResSrc: './img/Workflows/No-Show Handler.webp',
  },
];
