/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-spread */
import { Genre } from 'consts';
import { debounce } from 'debounce';
import { DistributionEnum, GenreEnum, PricingEnum, StatusEnum } from 'enum';
import { FormikErrors } from 'formik';
import { useSearch } from 'hooks/book.hook';
import React, { ReactNode, useEffect, useState } from 'react';
import Select from 'react-select';
import { Book } from 'types/book';
import { Series, SeriesForm as SeriesFormType } from 'types/series';
import * as yup from 'yup';
import Form from '../form/form';
import { RequiredFieldLegend } from '../required-field-legend';
import { RequiredSymbol } from '../required-symbol';

const schema = yup.object().shape({
  id: yup.number().nullable(),
  title: yup.string().required().max(50),
  description: yup.string().required().max(2000),
  banner: yup.mixed().test('fileSize', 'The file is too large', (file?: File) => {
    return !(file && file.size > 1024 * 1024);
  }),
  thumbnail: yup.mixed().test('fileSize', 'The file is too large', (file?: File) => {
    return !(file && file.size > 1024 * 1024);
  }),
  status: yup
    .mixed<StatusEnum>()
    .nullable()
    .oneOf([null].concat(Object.values(StatusEnum))),
  creators: yup.array(
    yup.object().shape({
      fullName: yup.string().required().label('name'),
      role: yup.string().nullable()
    })
  ),
  publishers: yup.array(
    yup.object().shape({
      fullName: yup.string().required().label('name'),
      url: yup.string().nullable(),
      episodeCount: yup.number().nullable(),
      pricing: yup
        .mixed<PricingEnum>()
        .nullable()
        .oneOf([null].concat(Object.values(PricingEnum))),
      cost: yup.number().nullable(),
      status: yup
        .mixed<StatusEnum>()
        .nullable()
        .oneOf([null].concat(Object.values(StatusEnum))),
      distribution: yup
        .mixed<DistributionEnum>()
        .nullable()
        .oneOf([null].concat(Object.values(DistributionEnum))),
      preview: yup.boolean().nullable()
    })
  ),
  links: yup.array(
    yup.object().shape({
      url: yup.string().required().max(100).label('url'),
      description: yup.string().required('description is a required field').max(50).label('description')
    })
  ),
  genres: yup.array(yup.mixed<GenreEnum>().oneOf(Object.values(GenreEnum))).required(),
  books: yup.array(
    yup.object().shape({
      id: yup.number().required()
    })
  )
});

export type SeriesFormProps = {
  onChange?: (series: SeriesFormType, valid: boolean, errors: FormikErrors<SeriesFormType>) => void;
  onSubmit?: (series: SeriesFormType) => void;
  footer?: ReactNode;
  initialValue?: SeriesFormType;
  value?: SeriesFormType;
};

const defaultSeries = {
  title: '',
  description: '',
  status: null,
  banner: undefined,
  thumbnail: undefined,
  publishers: [],
  creators: [
    {
      fullName: undefined
    }
  ],
  genres: [],
  links: [],
  books: []
} as SeriesFormType;

const convertBookToBookOption = (book: Book) => {
  return { value: book.id, label: book.title };
};

const convertGenreToSelectOptions = (genres: GenreEnum[]) => {
  return genres.map((genre) => ({ value: genre, label: Genre[genre].label }));
};

const SeriesForm = (props: SeriesFormProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const bookOptions = books.map(convertBookToBookOption);

  const genreOptions = convertGenreToSelectOptions(Object.values(GenreEnum));

  const { data: fetchedBooks, execute: search, loading: searching } = useSearch();

  useEffect(() => {
    if (fetchedBooks) {
      setBooks(fetchedBooks);
    }
  }, [fetchedBooks]);

  return (
    <Form
      validationSchema={schema}
      initialValues={props.value || { ...defaultSeries, ...props.initialValue }}
      onChange={props.onChange}
      onSubmit={props.onSubmit}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        setFieldTouched,
        values,
        touched,
        isValid,
        errors
      }) => {
        console.log('touched', touched);
        return (
          <>
            <RequiredFieldLegend />
            <Form.Group controlId="title-input" className="mb-3">
              <Form.Label>
                Title
                <RequiredSymbol />
              </Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={values.title}
                onChange={(e) => {
                  handleChange(e);
                }}
                onBlur={handleBlur}
                isInvalid={touched.title && !!errors.title}
              />
              <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="description-text-area" className="mb-3">
              <Form.Label>
                Description
                <RequiredSymbol />
              </Form.Label>
              <Form.MarkdownControl
                name="description"
                value={values.description || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.description && !!errors.description}
              />
              <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Banner</Form.Label>
              <Form.ImageControl
                name="banner"
                defaultValue={values.id && values.bannerUrl ? values.bannerUrl : undefined}
                value={values.banner as File}
                isInvalid={touched.banner && !!errors.banner}
                onChange={setFieldValue}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Thumbnail</Form.Label>
              <Form.ImageControl
                name="thumbnail"
                defaultValue={values.id && values.thumbnailUrl ? values.thumbnailUrl : undefined}
                value={values.thumbnail as File}
                isInvalid={touched.thumbnail && !!errors.thumbnail}
                onChange={setFieldValue}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group controlId="genre-select" className="mb-3">
              <Form.Label>Genres</Form.Label>
              <Select
                id="genres-control"
                className={errors?.genres && touched?.genres ? 'is-invalid' : undefined}
                inputId="genre-select"
                isMulti
                name="genres"
                options={genreOptions}
                value={values.genres.map((genre) => genreOptions.find((option) => option.value === genre))}
                onChange={(data) => {
                  const genres = data.map((item) => item.value);
                  setFieldValue('genres', genres);
                  setFieldTouched('genres');
                }}
              />
              <Form.Control.Feedback type="invalid">{errors?.genres}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="series-status-control">Status</Form.Label>
              <Form.StatusControl
                id="series-status-control"
                name="status"
                value={values.status}
                isInvalid={errors?.status && touched?.status}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
              />
              <Form.Control.Feedback type="invalid">{errors?.status}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Creators</Form.Label>
              <Form.CreatorsField
                name="creators"
                value={values.creators}
                touched={touched.creators}
                errors={errors.creators as any}
                onChange={(name, creators) => {
                  values.creators.length = 0;
                  values.creators.push.apply(values.creators, creators);
                  setFieldValue(name, values.creators);
                }}
                onBlur={setFieldTouched}
              />
            </Form.Group>
            <hr className="mb-4" />
            <Form.Group>
              <Form.Label>Publishers</Form.Label>
              <Form.PublishersField
                name="publishers"
                value={values.publishers}
                touched={touched.publishers}
                errors={errors.publishers as any}
                onChange={(name, publishers) => {
                  setFieldValue(name, publishers);
                }}
                onBlur={setFieldTouched}
              />
            </Form.Group>
            <hr className="mb-4" />
            <Form.Group>
              <Form.Label>Relevant Links</Form.Label>
              <Form.LinksField
                name="links"
                value={values.links}
                touched={touched.links}
                errors={errors.links}
                onChange={(name, links) => {
                  values.links.length = 0;
                  values.links.push.apply(values.links, links);
                  setFieldValue(name, values.links);
                }}
                onBlur={setFieldTouched}
              />
            </Form.Group>
            <hr className="mb-4" />
            <Form.Group>
              <Form.Label htmlFor="books-select">Books</Form.Label>
              <Select
                inputId="books-select"
                name="books"
                isMulti
                isClearable
                isLoading={searching}
                options={bookOptions}
                value={values.books.map(convertBookToBookOption)}
                onChange={(data, type) => {
                  if (type.action === 'select-option') {
                    const newBooks = values.books.slice();
                    newBooks.push(books.find((book) => book.id === type.option.value));
                    setFieldValue('books', newBooks);
                  } else if (type.action === 'remove-value') {
                    const index = values.books.findIndex((book) => book.id === type.removedValue.value);
                    const newBooks = values.books.slice();
                    newBooks.splice(index, 1);
                    setFieldValue('books', newBooks);
                  } else if (type.action === 'clear') {
                    setFieldValue('books', []);
                  }
                }}
                onInputChange={debounce((data) => {
                  if (data.length > 0) {
                    search({ query: data });
                  }
                }, 500)}
              />
              <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
            </Form.Group>

            <hr className="mb-4" />
            {props.footer}
          </>
        );
      }}
    </Form>
  );
};

export default SeriesForm;
