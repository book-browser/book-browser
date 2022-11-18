import { CompletionEnum, CostAccessEnum, DistributionEnum } from 'enum';

export type Publisher = {
  partyId: number;
  fullName: string;
  url: string;
  episodeCount?: number;
  costAccess?: CostAccessEnum;
  cost?: number;
  completion?: CompletionEnum;
  distribution?: DistributionEnum;
  preview?: boolean;
};

export type PublisherForm = {
  partyId?: number | null;
  fullName?: string | null;
  url?: string | null;
  episodeCount?: number | null;
  costAccess?: CostAccessEnum | null;
  cost?: number | null;
  completion?: CompletionEnum | null;
  distribution?: DistributionEnum | null;
  preview?: boolean | null;
};
