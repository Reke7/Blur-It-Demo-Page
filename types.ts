
export interface ClientData {
  id: string;
  name: string;
  revenue: string;
  email: string;
  apiKey: string;
  status: 'Active' | 'Pending' | 'Flagged';
}

export interface Metric {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}
