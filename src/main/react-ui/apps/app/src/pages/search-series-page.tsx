import AutorenewIcon from '@mui/icons-material/Autorenew';
import LabelIcon from '@mui/icons-material/Label';
import SortIcon from '@mui/icons-material/Sort';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Container } from '@mui/material';
import { ErrorAlert } from 'components/error/error-alert';
import Form from 'components/form/form/form';
import Loading from 'components/loading/loading';
import Heading from 'components/navigation/heading/heading';
import Pagination from 'components/pagination/pagination';
import SeriesList from 'components/series-list/series-list';
import { Genre } from 'consts';
import { GenreEnum, StatusEnum } from 'enum';
import { useFindAllSeries } from 'hooks/series.hook';
import React, { KeyboardEvent, useEffect, useMemo, useState } from 'react';
import { Breadcrumb, Button, ButtonGroup, Col, FormControl, InputGroup, Row, ToggleButton } from 'react-bootstrap';
import { Link, Location, useLocation, useNavigate } from 'react-router-dom';
import { Series } from 'types/series';
import {
  convertEnumStringToUrlEnumString,
  convertUrlEnumStringToEnumString,
  generateEncodedUrl,
  parseParams
} from 'utils/location-utils';
import * as yup from 'yup';

type SearchSeriesPageParams = {
  query?: string;
  genres?: GenreEnum[];
  startDate?: Date;
  endDate?: Date;
  status?: StatusEnum | null;
  sort?: string;
  page?: number;
};

const readParams = (location: Location) => {
  const schema = yup.object().shape({
    query: yup.string().default(''),
    genres: yup.array(
      yup.mixed<GenreEnum>().oneOf(Object.values(GenreEnum)).transform(convertUrlEnumStringToEnumString)
    ),
    status: yup
      .mixed<StatusEnum>()
      .nullable()
      .oneOf([null].concat(Object.values(StatusEnum)))
      .transform(convertUrlEnumStringToEnumString),
    startDate: yup.date(),
    endDate: yup.date(),
    sort: yup.string().oneOf(['title', 'startDate', 'lastUpdated']).default('title'),
    page: yup
      .number()
      .min(0)
      .transform((val) => val - 1)
      .default(0)
  }) as yup.SchemaOf<SearchSeriesPageParams>;

  return parseParams(location, schema);
};

const SearchSeriesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useMemo(() => readParams(location), [location]);

  const [criteria, setCriteria] = useState<SearchSeriesPageParams>(params);
  const [query, setQuery] = useState(params.query);

  const { data: seriesList, loading, error, execute } = useFindAllSeries();

  const toggleGenre = (genre: GenreEnum) => {
    const newSelectedGenres = [...criteria.genres];
    const index = newSelectedGenres.indexOf(genre);
    if (index > -1) {
      newSelectedGenres.splice(index, 1);
    } else {
      newSelectedGenres.push(genre);
    }
    changeParams({ genres: newSelectedGenres, page: 0 });
  };

  const changeParams = (newParams: SearchSeriesPageParams) => {
    console.log(newParams);
    const sort = newParams.sort || criteria.sort;
    const page = (newParams.page !== undefined ? newParams.page : criteria.page) + 1;
    const status = 'status' in newParams ? newParams.status : criteria.status;
    const startDate = newParams.startDate !== undefined ? newParams.startDate : criteria.startDate;
    const endDate = newParams.endDate !== undefined ? newParams.endDate : criteria.endDate;

    navigate(
      generateEncodedUrl('/series/search', {
        query: newParams.query || criteria.query,
        genres: (newParams.genres || criteria.genres).map(convertEnumStringToUrlEnumString),
        status: status ? convertEnumStringToUrlEnumString(status) : status,
        startDate: startDate ? startDate.toISOString().substring(0, 10) : undefined,
        endDate: endDate ? endDate.toISOString().substring(0, 10) : undefined,
        page: page === 1 ? '' : page,
        sort: sort !== 'id' ? sort : ''
      }),
      { replace: true }
    );
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      changeParams({ query });
    }
  };

  const onPageChange = (newPage) => {
    changeParams({ page: newPage });
  };

  const reset = () => {
    navigate('/series/search');
  };

  useEffect(() => {
    execute({
      query: criteria.query,
      genres: criteria.genres,
      status: criteria.status,
      startDate: criteria.startDate,
      endDate: criteria.endDate,
      sort: criteria.sort as keyof Series,
      order: criteria.sort === 'lastUpdated' ? 'desc' : 'asc',
      page: criteria.page,
      limit: 18
    });
  }, [criteria, execute]);

  useEffect(() => {
    if (JSON.stringify(params) !== JSON.stringify(criteria)) {
      setCriteria(params);
      setQuery(params.query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    document.title = 'Search | Series | BookBrowser';
  }, []);

  return (
    <Container maxWidth="lg">
      <Breadcrumb className="mb-1">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home' }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/series' }}>
          Series
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Search</Breadcrumb.Item>
      </Breadcrumb>

      <Heading as="h1" className="mb-3">
        Search Series
      </Heading>

      <InputGroup className="mb-3">
        <FormControl
          size="lg"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <Button variant="primary" onClick={() => changeParams({ query })}>
          Search
        </Button>
        <Button variant="link" onClick={reset}>
          Reset
        </Button>
      </InputGroup>

      <Form.Group className="mb-3">
        <Form.Label>
          <LabelIcon className="me-1 mb-1" />
          <span>Genres</span>
        </Form.Label>
        <div className="d-flex flex-wrap mb-4">
          {Object.keys(GenreEnum).map((genre: GenreEnum) => (
            <ButtonGroup key={genre}>
              <ToggleButton
                type="checkbox"
                variant="outline-primary"
                className="me-2 mb-2"
                checked={criteria.genres.includes(genre)}
                value={genre}
                onClick={() => toggleGenre(genre)}
              >
                {Genre[genre].label}
              </ToggleButton>
            </ButtonGroup>
          ))}
        </div>
      </Form.Group>

      <Row>
        <Col xs={6} sm={3}>
          <Form.Group controlId="sort-select" className="mb-3">
            <Form.Label>
              <SortIcon className="me-1 mb-1" />
              <span>Sort</span>
            </Form.Label>
            <Form.Select value={criteria.sort} onChange={(e) => changeParams({ sort: e.target.value })}>
              <option value="title">Title</option>
              <option value="startDate">Start Date</option>
              <option value="lastUpdated">Last Updated</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs={6} sm={3}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="status-control">
              <AutorenewIcon className="mb-1 me-1" />
              <span>Status</span>
            </Form.Label>
            <Form.StatusControl
              id="status-control"
              allOption
              value={criteria.status}
              onChange={(_name, value) => changeParams({ status: value })}
            />
          </Form.Group>
        </Col>
        <Col xs={6} sm={3}>
          <Form.Group controlId="start-date-picker">
            <Form.Label>
              <CalendarMonthIcon className="mb-1 me-1" />
              <span>Start Date</span>
            </Form.Label>
            <Form.DateControl value={criteria.startDate} onChange={(val) => changeParams({ startDate: val })} />
          </Form.Group>
        </Col>
        <Col xs={6} sm={3}>
          <Form.Group controlId="end-date-picker">
            <Form.Label>
              <CalendarMonthIcon className="mb-1 me-1" />
              <span>End Date</span>
            </Form.Label>
            <Form.DateControl value={criteria.endDate} onChange={(val) => changeParams({ endDate: val })} />
          </Form.Group>
        </Col>
      </Row>

      {loading && <Loading />}
      {error && <ErrorAlert uiMessage="Unable to load content" error={error} />}
      {seriesList && (
        <div>
          <Heading as="h2">
            {seriesList.totalElements > 0 ? `Results (${seriesList.totalElements})` : 'No Results'}
          </Heading>
          <SeriesList seriesList={seriesList.items} />
          <Pagination page={criteria.page} totalPages={seriesList.totalPages} onPageChange={onPageChange} />
        </div>
      )}
    </Container>
  );
};

export default SearchSeriesPage;
