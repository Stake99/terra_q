import { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Statistic {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
}

export interface ContactMethod {
  id: string;
  type: 'email' | 'phone' | 'address';
  label: string;
  value: string;
  href?: string;
  icon: LucideIcon;
}
