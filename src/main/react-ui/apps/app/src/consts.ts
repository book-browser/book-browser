import { StatusEnum, PricingEnum, DistributionEnum, GenreEnum } from 'enum';

export const Pricing = {
  [PricingEnum.FREE]: {
    value: PricingEnum.FREE,
    label: 'Free/None'
  },
  [PricingEnum.PREMIUM]: {
    value: PricingEnum.PREMIUM,
    label: 'Premium'
  },
  [PricingEnum.FREMIUM]: {
    value: PricingEnum.FREMIUM,
    label: 'Fremium'
  },
  [PricingEnum.SUBSCRIPTION]: {
    value: PricingEnum.SUBSCRIPTION,
    label: 'Subscription'
  }
};

export const Status = {
  [StatusEnum.ONGOING]: {
    value: StatusEnum.ONGOING,
    label: 'Ongoing'
  },
  [StatusEnum.COMPLETED]: {
    value: StatusEnum.COMPLETED,
    label: 'Completed'
  }
};

export const Distribution = {
  [DistributionEnum.DIGITAL]: {
    value: DistributionEnum.DIGITAL,
    label: 'Digital'
  },
  [DistributionEnum.PRINT]: {
    value: DistributionEnum.PRINT,
    label: 'Print'
  }
};

export const Genre = {
  [GenreEnum.DRAMA]: {
    value: GenreEnum.DRAMA,
    label: 'Drama'
  },
  [GenreEnum.FANTASY]: {
    value: GenreEnum.FANTASY,
    label: 'Fantasy'
  },
  [GenreEnum.COMEDY]: {
    value: GenreEnum.COMEDY,
    label: 'Comedy'
  },
  [GenreEnum.ACTION]: {
    value: GenreEnum.ACTION,
    label: 'Action'
  },
  [GenreEnum.SLICE_OF_LIFE]: {
    value: GenreEnum.SLICE_OF_LIFE,
    label: 'Slice of life'
  },
  [GenreEnum.SUPERHERO]: {
    value: GenreEnum.SUPERHERO,
    label: 'Superhero'
  },
  [GenreEnum.ROMANCE]: {
    value: GenreEnum.ROMANCE,
    label: 'Romance'
  },
  [GenreEnum.SCI_FI]: {
    value: GenreEnum.SCI_FI,
    label: 'Sci-fi'
  },
  [GenreEnum.SUPERNATURAL]: {
    value: GenreEnum.SUPERNATURAL,
    label: 'Supernatural'
  },
  [GenreEnum.HORROR]: {
    value: GenreEnum.HORROR,
    label: 'Horror'
  },
  [GenreEnum.MYSTERY]: {
    value: GenreEnum.MYSTERY,
    label: 'Mystery'
  },
  [GenreEnum.SPORTS]: {
    value: GenreEnum.SPORTS,
    label: 'Sports'
  },
  [GenreEnum.HISTORICAL]: {
    value: GenreEnum.HISTORICAL,
    label: 'Historical'
  },
  [GenreEnum.HAREM]: {
    value: GenreEnum.HAREM,
    label: 'Harem'
  },
  [GenreEnum.MUSIC]: {
    value: GenreEnum.MUSIC,
    label: 'Music'
  },
  [GenreEnum.MECHA]: {
    value: GenreEnum.MECHA,
    label: 'Mecha'
  },
  [GenreEnum.GL]: {
    value: GenreEnum.GL,
    label: 'GL'
  },
  [GenreEnum.ADVENTURE]: {
    value: GenreEnum.ADVENTURE,
    label: 'Adventure'
  },
  [GenreEnum.GAMING]: {
    value: GenreEnum.GAMING,
    label: 'Gaming'
  },
  [GenreEnum.BL]: {
    value: GenreEnum.BL,
    label: 'BL'
  }
};
