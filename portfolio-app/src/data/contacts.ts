import type { ComponentType } from 'react';
import { Mail, MessageCircle, Send } from 'lucide-react';
import { FacebookIcon, LinkedinIcon } from '../components/icons';

export interface ContactChannel {
  title: string;
  value: string;
  link: string;
  icon: ComponentType<{ className?: string }>;
}

export const CONTACTS: ContactChannel[] = [
  { title: 'Email', value: 'padilla.christian2003@gmail.com', link: 'mailto:padilla.christian2003@gmail.com', icon: Mail },
  { title: 'WhatsApp', value: '+63 931 928 1611', link: 'https://wa.me/639319281611', icon: MessageCircle },
  { title: 'LinkedIn', value: 'christian-padilla-s122603', link: 'https://www.linkedin.com/in/christian-padilla-s122603', icon: LinkedinIcon },
  { title: 'Telegram', value: '@cchhrriissttiiaann', link: 'https://t.me/cchhrriissttiiaann', icon: Send },
  { title: 'Facebook', value: 'christian.padilla.31149', link: 'https://facebook.com/christian.padilla.31149', icon: FacebookIcon },
];
