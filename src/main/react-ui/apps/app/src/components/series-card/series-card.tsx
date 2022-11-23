import { Card } from 'components/card/card';
import { ImgLink } from 'components/img-link/img-link';
import React from 'react';
import { Link } from 'react-router-dom';
import { Series } from 'types/series';
import './series-card.scss';

export type SeriesCardProps = {
  series: Series;
};

const SeriesCard = ({ series }: SeriesCardProps) => {
  return (
    <Card className="series-card">
      <Card.Thumbnail>
        {series.thumbnailUrl && (
          <ImgLink to={`/series/${series.urlTitle}`} imgProps={{ alt: 'thumbnail', src: series.thumbnailUrl }} />
        )}
        {!series.thumbnailUrl && (
          <ImgLink
            to={`/series/${series.urlTitle}`}
            imgProps={{
              alt: 'thumbnail',
              src: 'data:image/png;base64,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'
            }}
          />
        )}
      </Card.Thumbnail>
      <div>
        <Link to={`/series/${series.urlTitle}`}>{series.title}</Link>
      </div>
    </Card>
  );
};

export default SeriesCard;
