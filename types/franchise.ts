export type InterestStatus = 'high' | 'medium' | 'low' | 'unassigned';

export interface FranchiseLead {
  fullName: string;
  email: string;
  phone: string;
  cityState: string;
  ownBusiness: 'yes' | 'no';
  businessName?: string;
  businessIndustry?: string;
  interestReason: string;
  estimatedBudget: string;
  hasSpace: 'yes' | 'no';
  spaceLocation?: string;
  spaceSize?: string;
  startTimeline: string;
  hearAboutUs: string;
  confirm: boolean;
  interestStatus: InterestStatus;
  createdAt: FirebaseFirestore.Timestamp | null;
}

