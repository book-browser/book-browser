import { CompletionEnum, CostAccessEnum, DistributionEnum } from 'enum';

export const CostAccess = {
  [CostAccessEnum.FREE]: {
    value: CostAccessEnum.FREE,
    label: 'Free/None'
  },
  [CostAccessEnum.PREMIUM]: {
    value: CostAccessEnum.PREMIUM,
    label: 'Premium'
  }
} as const;

export const Completion = {
  [CompletionEnum.ONGOING]: {
    value: CompletionEnum.ONGOING,
    label: 'Ongoing'
  },
  [CompletionEnum.COMPLETED]: {
    value: CompletionEnum.COMPLETED,
    label: 'Completed'
  }
} as const;

export const Distribution = {
  [DistributionEnum.DIGITAL]: {
    value: DistributionEnum.DIGITAL,
    label: 'Digital'
  },
  [DistributionEnum.PRINT]: {
    value: DistributionEnum.PRINT,
    label: 'Print'
  },
  [DistributionEnum.BOTH]: {
    value: DistributionEnum.BOTH,
    label: 'Digital & Print'
  }
} as const;
