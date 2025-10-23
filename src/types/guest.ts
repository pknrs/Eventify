export type Guest = {
  id: string;
  eventId: string;
  name: string;
  email?: string;
  ticketType?: 'VIP' | 'Regular' | 'Staff' | string;
  checkedIn?: boolean;
  company?: string;
  seat?: string;
};
