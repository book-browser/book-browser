import { StatusEnum, PricingEnum, DistributionEnum } from 'enum';

export type Publisher = {
  partyId: number;
  fullName: string;
  url: string;
  episodeCount?: number;
  pricing?: PricingEnum;
  cost?: number;
  status?: StatusEnum;
  distribution?: DistributionEnum;
  preview?: boolean;
};

export type PublisherForm = {
  partyId?: number | null;
  fullName?: string | null;
  url?: string | null;
  episodeCount?: number | null;
  pricing?: PricingEnum | null;
  cost?: number | null;
  status?: StatusEnum | null;
  distribution?: DistributionEnum | null;
  preview?: boolean | null;
};
