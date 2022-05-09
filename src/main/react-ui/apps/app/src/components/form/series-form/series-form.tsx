import DeleteIcon from '@material-ui/icons/Delete';
import MDEditor from '@uiw/react-md-editor';
import { debounce } from 'debounce';
import { Formik, FormikErrors } from 'formik';
import { useSearch } from 'hooks/book.hook';
import { useSearchForPerson } from 'hooks/person.hook';
import { useReferenceData } from 'hooks/reference-data.hook';
import React, { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Book } from 'types/book';
import { Genre } from 'types/genre';
import { Person } from 'types/person';
import { PersonCreator } from 'types/person-creator';
import { Series } from 'types/series';
import * as yup from 'yup';
import { RequiredFieldLegend } from '../required-field-legend';
import { RequiredSymbol } from '../required-symbol';


const schema = yup.object().shape({
  id: yup.number().nullable(),
  title: yup.string().required().max(50),
  description: yup.string().required().max(2000),
  banner: yup
    .mixed()
    .test('fileSize', 'The file is too large', (file?: File) => {
      return !(file && file.size > 1024 * 1024);
    }),
  thumbnail: yup
    .mixed()
    .test('fileSize', 'The file is too large', (file?: File) => {
      return !(file && file.size > 1024 * 1024);
    }),
  creators: yup.array(yup.object().shape({
    fullName: yup.string().required().label('name'),
    role: yup.string().nullable(),
  })),
  links: yup.array(
    yup.object().shape({
      url: yup.string().required().max(100).label('url'),
      description: yup
        .string()
        .required('description is a required field')
        .max(50)
        .label('description'),
    })
  ),
  genres: yup.array(yup.string()),
  books: yup.array(
    yup.object().shape({
      id: yup.number().required(),
    })
  ),
});

interface SeriesFormProps {
  onChange?: (series: Series, valid: boolean) => void;
  onSubmit?: (series: Series) => void;
  footer?: ReactNode;
  initialValue?: Series;
  value?: Series;
}

const defaultSeries = {
  title: '',
  description: '',
  banner: undefined,
  thumbnail: undefined,
  creators: [{ }],
  genres: [],
  links: [{}],
  books: [],
} as Series;

const convertBookToBookOption = (book: Book) => {
  return { value: book.id, label: book.title };
};

const convertGenreToSelectOptions = (genres: Genre[]) => {
  return genres.map(({ name }) => ({ value: name, label: name }));
};

const SeriesForm = (props: SeriesFormProps) => {
  const [value, setValue] = useState<Series>(
    props.initialValue || defaultSeries
  );
  const [bannerFile, setBannerFile] = useState<File>();
  const [bannerUrl, setBannerUrl] = useState<string>();
  const bannerFileInputRef = useRef<HTMLInputElement>();
  const [thumbnailFile, setThumbnailFile] = useState<File>();
  const [thumbnailUrl, setThumbnailUrl] = useState<string>();
  const thumbnailFileInputRef = useRef<HTMLInputElement>();

  const [books, setBooks] = useState<Book[]>([]);
  const bookOptions = books.map(convertBookToBookOption);

  const [people, setPeople] = useState<Person[]>([]);
  const { data: fetchedPeople, execute } = useSearchForPerson();
  const { data: referenceData } = useReferenceData();

  const selectOptions = people?.map(({ id, fullName }) => ({ value: id, label: fullName }));
  const genreOptions = referenceData
    ? convertGenreToSelectOptions(referenceData.genres)
    : [];

  const {
    data: fetchedBooks,
    execute: search,
    loading: searching,
  } = useSearch();

  const actualValue = props.value || value;

  const roles = referenceData ? referenceData.roles : [];
  
  useEffect(() => {
    if (fetchedBooks) {
      setBooks(fetchedBooks);
    }
  }, [fetchedBooks]);

  useEffect(() => {
    if (fetchedPeople) {
      setPeople(fetchedPeople);
    }
  }, [fetchedPeople]);

  useEffect(() => {
    if (
      actualValue.banner === undefined &&
      actualValue.hasBanner &&
      actualValue.id
    ) {
      setBannerFile(null);
      setBannerUrl(`/api/series/${actualValue.id}/banner`);
    }
    if (
      actualValue.thumbnail === undefined &&
      actualValue.hasThumbnail &&
      actualValue.id
    ) {
      setThumbnailFile(null);
      setThumbnailUrl(`/api/series/${actualValue.id}/thumbnail`);
    }
  }, [actualValue]);

  return (
    <Formik
      validationSchema={schema}
      initialValues={actualValue}
      enableReinitialize
      onSubmit={(values) => {
        if (props.onSubmit) {
          props.onSubmit(values);
        }
      }}
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
        errors,
      }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          if (values !== actualValue) {
            setValue(values);
            if (props.onChange) {
              props.onChange(values, isValid);
            }
          }
        }, [values, isValid]);
        return (
          <Form className="mb-3" noValidate onSubmit={handleSubmit}>
            <RequiredFieldLegend />
            <Form.Group controlId="title-input">
              <Form.Label>
                Title
                <RequiredSymbol />
              </Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.title && !!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="description-text-area">
              <Form.Label>
                Description
                <RequiredSymbol />
              </Form.Label>
              <MDEditor
                className={
                  touched.description && !!errors.description
                    ? 'is-invalid'
                    : undefined
                }
                height={500}
                value={values.description}
                textareaProps={{
                  name: 'description',
                  onBlur: handleBlur,
                }}
                onChange={(newValue) => {
                  setFieldValue('description', newValue);
                }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Banner</Form.Label>
              <Row>
                <Col>
                  <Form.File custom>
                    <Form.File.Input
                      name="banner"
                      accept="image/png, image/jpeg"
                      ref={bannerFileInputRef}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files[0];
                        console.log('file', file);
                        if (file) {
                          const reader = new FileReader();
                          reader.readAsDataURL(file);
                          reader.onload = function () {
                            setBannerFile(file);
                            setBannerUrl(URL.createObjectURL(file));
                            setFieldValue(
                              'banner',
                              (reader.result as string).split(',')[1]
                            );
                          };
                        }
                        // } else {
                        //   setBannerFile(null);
                        //   setBannerUrl(null);
                        //   setFieldValue('banner', undefined);
                        // }
                      }}
                      onBlur={handleBlur}
                      isInvalid={touched.banner && !!errors.banner}
                    />
                    <Form.File.Label>
                      {bannerFile?.name ||
                        (actualValue.banner === undefined &&
                        actualValue.hasBanner &&
                        actualValue.id
                          ? `${window.location.origin}/series/${actualValue.id}/banner`
                          : 'Browse')}
                    </Form.File.Label>

                    <Form.Text muted>Max file size 1MB</Form.Text>
                    <Feedback type="invalid">{errors.banner}</Feedback>
                  </Form.File>
                </Col>
                <Col xs="auto">
                  <Button
                    variant="link"
                    disabled={!((actualValue.hasBanner && actualValue.banner === undefined) || actualValue.banner)}
                    onClick={() => {
                      setFieldValue('banner', null);
                      setBannerFile(null);
                      setBannerUrl(null);
                      if (bannerFileInputRef.current) {
                        bannerFileInputRef.current.value = null;
                      }
                    }}
                  >
                    Remove
                  </Button>
                </Col>
                <Col xs="auto">
                  <Button
                    variant="link"
                    disabled={!actualValue.hasBanner || (actualValue.hasBanner && actualValue.banner === undefined)}
                    onClick={() => setFieldValue('banner', undefined)}
                  >
                    Reset
                  </Button>
                </Col>
              </Row>

              {bannerUrl && (
                <img
                  src={bannerUrl}
                  alt="Banner"
                  className="mt-3"
                  style={{ maxWidth: '100%' }}
                />
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Thumbnail
              </Form.Label>
              <Row>
                <Col>
                  <Form.File custom>
                    <Form.File.Input
                      name="thumbnail"
                      accept="image/png, image/jpeg"
                      ref={thumbnailFileInputRef}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files[0];
                        console.log(file);
                        if (file) {
                          const reader = new FileReader();
                          reader.readAsDataURL(file);
                          reader.onload = () => {
                            setThumbnailFile(file);
                            setThumbnailUrl(URL.createObjectURL(file));
                            setFieldValue(
                              'thumbnail',
                              (reader.result as string).split(',')[1]
                            );
                          };
                        }
                      }}
                      onBlur={handleBlur}
                      isInvalid={touched.thumbnail && !!errors.thumbnail}
                    />
                    <Form.File.Label>
                      {thumbnailFile?.name ||
                        (actualValue.thumbnail === undefined &&
                        actualValue.hasThumbnail &&
                        actualValue.id
                          ? `${window.location.origin}/series/${actualValue.id}/thumbnail`
                          : 'Browse')}
                    </Form.File.Label>
                    <Form.Text muted>Max file size 1MB</Form.Text>
                    <Feedback type="invalid">{errors.thumbnail}</Feedback>
                  </Form.File>
                </Col>
                <Col xs="auto">
                  <Button
                    variant="link"
                    disabled={!((actualValue.hasThumbnail && actualValue.thumbnail === undefined) || actualValue.thumbnail)}
                    onClick={() => {
                      setFieldValue('thumbnail', null);
                      setThumbnailFile(null);
                      setThumbnailUrl(null);
                      if (thumbnailFileInputRef.current) {
                        thumbnailFileInputRef.current.value = null;
                      }
                    }}
                  >
                    Remove
                  </Button>
                </Col>
                <Col xs="auto">
                  <Button
                    variant="link"
                    disabled={!actualValue.hasThumbnail || (actualValue.hasThumbnail && actualValue.thumbnail === undefined)}
                    onClick={() => setFieldValue('thumbnail', undefined)}
                  >
                    Reset
                  </Button>
                </Col>
              </Row>

              {thumbnailUrl && (
                <img
                  src={thumbnailUrl}
                  alt="Thumbnail"
                  className="mt-3"
                  style={{ maxWidth: '100%' }}
                />
              )}
            </Form.Group>
            <Form.Group controlId="genre-select">
              <Form.Label>Genres</Form.Label>
              <Select
                inputId="genre-select"
                isMulti
                name="genres"
                options={genreOptions}
                value={actualValue.genres.map((genre) => ({
                  value: genre,
                  label: genre,
                }))}
                onChange={(data) => {
                  const genres = data.map((item) => item.value);
                  setFieldValue('genres', genres);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Creators</Form.Label>
              <Form.Group>
                <Row>
                  <Col xs={12} sm={7}>
                    <Form.Label htmlFor={`creator0-name-select`}>Name<RequiredSymbol /></Form.Label>
                  </Col>
                  <Col xs={12} sm={3}>
                    <Form.Label htmlFor={`creator0-role-select`}>Role</Form.Label>
                  </Col>
                  <Col xs={2} />
                </Row>
                {values.creators.map((creator, index) => (
                  <Row key={index} className="mb-2">
                    <Col xs={12} sm={7} className="mb-2 mb-sm-0">
                      <CreatableSelect
                        defaultValue={creator.fullName && { label: creator.fullName, value: creator.id }}
                        inputId={`creator${index}-name-select`}
                        name={`creators[${index}].fullName`}
                        options={selectOptions}
                        onChange={(data) => {
                          let newCreator;
                          if (data.__isNew__) {
                            newCreator = {
                              ...creator,
                              id: undefined, 
                              fullName: data.label
                            }
                          } else {
                            newCreator = {
                              ...creator,
                              id: data.value,
                              fullName: data.label
                            }
                          }
                          setFieldValue(`creators[${index}]`, newCreator);
                        }}
                        onInputChange={(data) => {
                          if (data.length > 0) {
                            debounce(execute, 200)(data);
                          }
                        }}
                        onBlur={() => {
                          setPeople([]);
                          setFieldTouched(`creators[${index}].fullName`, true, true);
                        }}
                        styles={{
                          control: styles => ({
                            ...styles,
                            borderColor: touched?.creators?.[index]?.fullName && (errors?.creators as FormikErrors<PersonCreator>[])?.[index]?.fullName ? '#dc3545' : styles.borderColor,
                            '&:hover': {
                              borderColor: touched?.creators?.[index]?.fullName && (errors?.creators as FormikErrors<PersonCreator>[])?.[index]?.fullName ? '#dc3545': styles['&:hover'].borderColor,
                            }
                          })
                        }}
                      
                      />
                      {touched?.creators?.[index]?.fullName && (errors?.creators as FormikErrors<PersonCreator>[])?.[index]?.fullName && <div className="invalid-feedback d-block">{(errors?.creators as FormikErrors<PersonCreator>[])?.[index]?.fullName}</div>}
                    </Col>
                    <Col xs={12} sm={3} className="mb-2 mb-sm-0">
                      <Form.Control
                        id={`creator${index}-role-select`}
                        as="select"
                        custom
                        name={`creators[${index}].role`}
                        value={actualValue.creators[index]?.role || ''}
                        onChange={(e) => {
                          const newCreator = {
                            ...creator,
                            role: e.target.value ? roles[e.target.value].value : null 
                          }
                          
                          setFieldValue(`creators[${index}]`, newCreator);
                        }}
                      >
                        <option value='-1'></option>
                        {roles.map((role) => (
                          <option key={role.value} value={role.value}>{role.title}</option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col xs={2}>
                      <Button
                        id={`remove-creator${index}-button`}
                        variant="danger"
                        type="button"
                        disabled={values.creators.length === 1}
                        onClick={() => {
                          const newCreators = values.creators.filter((item) => item !== creator);
                          setFieldValue('creators', newCreators);
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </Col>
                  </Row>
                ))}
                <div className="mt-2">
                  <Button
                    variant="link"
                    className="pl-0"
                    onClick={() => {
                      const newCreators = [].concat(values.creators).concat([{ }]);
                      setFieldValue('creators', newCreators);
                    }}
                  >
                    Add new Creator
                  </Button>
                </div>
              </Form.Group>
            </Form.Group>
            <hr className="mb-4" />
            <h4 className="mb-3">Relevant Links</h4>
            <Form.Group>
              {values.links.length > 0 && (
                <Row>
                  <Col xs={12} sm={7}>
                    <Form.Label htmlFor={`link0-name-select`}>
                      URL
                      <RequiredSymbol />
                    </Form.Label>
                  </Col>
                  <Col xs={12} sm={3}>
                    <Form.Label htmlFor={`link0-role-select`}>
                      Description
                      <RequiredSymbol />
                    </Form.Label>
                  </Col>
                  <Col xs={2} />
                </Row>
              )}
              {values.links.map((link, index) => (
                <Row key={index} className="mb-2">
                  <Col xs={12} sm={7} className="mb-2 mb-sm-0">
                    <Form.Control
                      id={`link${index}-url-input`}
                      type="text"
                      name={`links[${index}].url`}
                      value={values.links[index].url}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={
                        touched.links?.[index]?.url &&
                        !!(errors as any).links?.[index]?.url
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {(errors as any).links?.[index]?.url}
                    </Form.Control.Feedback>
                  </Col>
                  <Col xs={12} sm={3} className="mb-2 mb-sm-0">
                    <Form.Control
                      id={`link${index}-description-input`}
                      type="text"
                      name={`links[${index}].description`}
                      value={values.links[index].description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={
                        touched.links?.[index]?.description &&
                        !!(errors as any).links?.[index]?.description
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {(errors as any).links?.[index]?.description}
                    </Form.Control.Feedback>
                  </Col>
                  <Col xs={2}>
                    <Button
                      id={`remove-link${index}-button`}
                      variant="danger"
                      type="button"
                      onClick={() => {
                        const newLinks = values.links.filter(
                          (item) => item !== link
                        );
                        setFieldValue('links', newLinks);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </Col>
                </Row>
              ))}
              <div className="mt-2">
                <Button
                  variant="link"
                  className="pl-0"
                  onClick={() => {
                    const newLinks = []
                      .concat(values.links)
                      .concat([{ description: '', url: '' }]);
                    setFieldValue('links', newLinks);
                  }}
                >
                  Add new Link
                </Button>
              </div>
            </Form.Group>
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
                    newBooks.push(
                      books.find((book) => book.id === type.option.value)
                    );
                    setFieldValue('books', newBooks);
                  } else if (type.action === 'remove-value') {
                    const index = values.books.findIndex(
                      (book) => book.id === type.removedValue.value
                    );
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
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <hr className="mb-4" />
            {props.footer}
          </Form>
        );
      }}
    </Formik>
  );
};

export default SeriesForm;
