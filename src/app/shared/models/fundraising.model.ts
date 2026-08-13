export interface Fundraiser {
  id: string;
  name: string;
  icon: string;
  description: string;
  startDate: string;
  endDate: string;
  goal: number;
  currentTotal: number;
  reward: string;
  topFundraiser: string;
}
