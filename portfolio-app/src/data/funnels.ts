export interface FunnelDemo {
  title: string;
  type: string;
  industry: string;
  image: string;
  link: string;
}

export const FUNNEL_DEMOS: FunnelDemo[] = [
  {
    title: 'Crowning Glory Co.',
    type: 'Appointment/Services Booking website',
    industry: 'Beauty Industry',
    image: './img/Funnels/salon.png',
    link: 'https://crowningglory.me/',
  },
  {
    title: 'Bright Smiles Dental Clinic',
    type: 'Appointment Booking Funnel (w/ free consultation offer)',
    industry: 'Dental/Family Healthcare',
    image: './img/Funnels/brightsmiles.png',
    link: 'https://brightsmiles.christianpadilla.online/',
  },
  {
    title: 'HighLevel Webinar',
    type: 'Webinar Funnel',
    industry: 'Software as a Service (SaaS)',
    image: './img/Funnels/webinar.png',
    link: 'https://highlevelwebinar.christianpadilla.online/',
  },
  {
    title: 'NovaScale Marketing Agency',
    type: 'Landing Page',
    industry: 'Marketing Agency',
    image: './img/Funnels/marketing.png',
    link: 'https://novascale.christianpadilla.online/',
  },
];
