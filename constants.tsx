
import { ClientData, Metric } from './types';

export const METRICS: Metric[] = [
  { label: 'Monthly Recurring Revenue', value: '$142,500.00', change: '+12.5%', isPositive: true },
  { label: 'Active Subscriptions', value: '4,821', change: '+3.2%', isPositive: true },
  { label: 'Average LTV', value: '$2,450.00', change: '-1.2%', isPositive: false },
  { label: 'Churn Rate', value: '2.14%', change: '-0.4%', isPositive: true },
];

export const CLIENT_DATA: ClientData[] = Array.from({ length: 25 }, (_, i) => ({
  id: `cli_${i + 100}`,
  name: [
    'Apex Solutions Inc.', 'Quantum Leap Corp', 'Nebula Dynamics', 'Stellar Venturers',
    'Omni Systems', 'Blue Horizon Tech', 'Vortex Digital', 'Summit Partners',
    'Velocity Labs', 'Prism Intelligence'
  ][i % 10],
  revenue: `$${(Math.random() * 200000 + 10000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  email: `admin@${['apex', 'quantum', 'nebula', 'stellar', 'omni'][i % 5]}.io`,
  apiKey: `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
  status: i % 7 === 0 ? 'Flagged' : i % 3 === 0 ? 'Pending' : 'Active'
}));
