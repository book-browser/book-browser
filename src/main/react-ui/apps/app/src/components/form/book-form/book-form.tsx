/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteIcon from '@mui/icons-material/Delete';
import MDEditor from '@uiw/react-md-editor';
import { debounce } from 'debounce';
import { FormikErrors } from 'formik';
import { useFindAllParties } from 'hooks/party.hook';
import { useReferenceData } from 'hooks/reference-data.hook';
import React, { ReactNode, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Book } from 'types/book';
import { Creator } from 'types/creator';
import { Genre } from 'types/genre';
import { Party } from 'types/party';
import * as yup from 'yup';
import Form from '../form/form';
import { RequiredFieldLegend } from '../required-field-legend';
import { RequiredSymbol } from '../required-symbol';

const schema = yup.object().shape({
  id: yup.number().nullable(),
  title: yup.string().required().max(50),
  description: yup.string().required().max(1000),
  releaseDate: yup.date().nullable(),
  thumbnail: yup
    .mixed()
    .when('id', (id, thumbnailSchema) => {
      return id ? thumbnailSchema : thumbnailSchema.required();
    })
    .test('fileSize', 'The file is too large', (file?: File) => {
      return !(file && file.size > 1024 * 1024);
    }),
  creators: yup.array(
    yup.object().shape({
      fullName: yup.string().required().label('name'),
      role: yup.string().nullable()
    })
  ),
  genres: yup.array(yup.object()),
  links: yup.array(
    yup.object().shape({
      url: yup.string().required().max(100).label('url'),
      description: yup.string().required('description is a required field').max(50).label('description')
    })
  )
});

interface BookFormProps {
  onChange?: (book: Book, valid: boolean) => void;
  onSubmit?: (book: Book) => void;
  footer?: ReactNode;
  initialValue?: Book;
  value?: Book;
}

const defaultBook = {
  title: '',
  description: '',
  releaseDate: null,
  thumbnail: null,
  creators: [{}],
  genres: [],
  links: []
} as Book;

const convertGenreToSelectOptions = (genres: Genre[]) => {
  return genres.map(({ id, name }) => ({ value: id, label: name }));
};

export const BookForm = (props: BookFormProps) => {
  const [people, setPeople] = useState<Party[]>([]);

  const { data: fetchedPeople, execute } = useFindAllParties();
  const { data: referenceData } = useReferenceData();

  const selectOptions = people?.map(({ id, fullName }) => ({ value: id, label: fullName }));
  const genreOptions = referenceData ? convertGenreToSelectOptions(referenceData.genres) : [];

  const roles = referenceData ? referenceData.roles : [];

  useEffect(() => {
    if (fetchedPeople) {
      setPeople(fetchedPeople.items);
    }
  }, [fetchedPeople]);

  return (
    <Form
      validationSchema={schema}
      initialValues={props.value || { ...defaultBook, ...props.initialValue }}
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
        return (
          <>
            <h4 className="mb-3">General Information</h4>
            <hr className="mb-4" />
            <RequiredFieldLegend />
            <Form.Group className="mb-3" controlId="title-input">
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
              <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description-text-area">
              <Form.Label>
                Description
                <RequiredSymbol />
              </Form.Label>
              <MDEditor
                className={touched.description && !!errors.description ? 'is-invalid' : undefined}
                height={500}
                value={values.description}
                textareaProps={{
                  name: 'description',
                  onBlur: handleBlur
                }}
                onChange={(newValue) => {
                  setFieldValue('description', newValue);
                }}
              />
              <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="release-date-picker" className="mb-3 w-50">
              <Form.Label>Release Date</Form.Label>
              <DatePicker
                id="release-date-picker"
                showPopperArrow={false}
                wrapperClassName={errors.releaseDate ? 'is-invalid' : null}
                className={`form-control ${errors.releaseDate ? 'is-invalid' : null}`}
                selected={values.releaseDate || null}
                onChange={(val) => setFieldValue('releaseDate', val)}
                onBlur={handleBlur}
                isClearable
              />
              <Form.Control.Feedback type="invalid">{errors.releaseDate as any}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Thumbnail
                <RequiredSymbol />
              </Form.Label>
              <Row>
                <Col>
                  <Form.ImageControl
                    name="thumbnail"
                    defaultValue={values.thumbnailUrl}
                    value={values.thumbnail as File}
                    isInvalid={touched.thumbnail && !!errors.thumbnail}
                    onChange={setFieldValue}
                    onBlur={handleBlur}
                  />
                  <Form.Text muted>Max file size 1MB</Form.Text>
                  <Feedback type="invalid">{errors.thumbnail as any}</Feedback>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="genre-select" className="mb-3">
              <Form.Label>Genres</Form.Label>
              <Select
                inputId="genre-select"
                isMulti
                name="genres"
                options={genreOptions}
                value={convertGenreToSelectOptions(values.genres)}
                onChange={(data) => {
                  const genres = data.map((item) => ({
                    id: item.value,
                    name: item.label
                  }));
                  setFieldValue('genres', genres);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Creators</Form.Label>
              <Form.Group>
                <Row>
                  <Col xs={12} sm={7}>
                    <Form.Label htmlFor={`creator0-name-select`}>
                      Name
                      <RequiredSymbol />
                    </Form.Label>
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
                        defaultValue={creator.fullName && { label: creator.fullName, value: creator.partyId }}
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
                            };
                          } else {
                            newCreator = {
                              ...creator,
                              id: data.value,
                              fullName: data.label
                            };
                          }
                          setFieldValue(`creators[${index}]`, newCreator);
                        }}
                        onInputChange={(data) => {
                          if (data.length > 0) {
                            debounce(execute, 200)({ name: data });
                          }
                        }}
                        onBlur={() => {
                          setPeople([]);
                          setFieldTouched(`creators[${index}].fullName`, true, true);
                        }}
                        styles={{
                          control: (styles) => ({
                            ...styles,
                            borderColor:
                              touched?.creators?.[index]?.fullName &&
                              (errors?.creators as FormikErrors<Creator>[])?.[index]?.fullName
                                ? '#dc3545'
                                : styles.borderColor,
                            '&:hover': {
                              borderColor:
                                touched?.creators?.[index]?.fullName &&
                                (errors?.creators as FormikErrors<Creator>[])?.[index]?.fullName
                                  ? '#dc3545'
                                  : styles['&:hover'].borderColor
                            }
                          })
                        }}
                      />
                      {touched?.creators?.[index]?.fullName &&
                        (errors?.creators as FormikErrors<Creator>[])?.[index]?.fullName && (
                          <div className="invalid-feedback d-block">
                            {(errors?.creators as FormikErrors<Creator>[])?.[index]?.fullName}
                          </div>
                        )}
                    </Col>
                    <Col xs={12} sm={3} className="mb-2 mb-sm-0">
                      <Form.Select
                        id={`creator${index}-role-select`}
                        name={`creators[${index}].role`}
                        value={values.creators[index].role || ''}
                        onChange={(e) => {
                          const newCreator = {
                            ...creator,
                            role: e.target.value ? roles[e.target.value].value : null
                          };

                          setFieldValue(`creators[${index}]`, newCreator);
                        }}
                      >
                        <option value="-1"></option>
                        {roles.map((role) => (
                          <option key={role.value} value={role.value}>
                            {role.title}
                          </option>
                        ))}
                      </Form.Select>
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
                      const newCreators = [].concat(values.creators).concat([{}]);
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
            <Form.Group className="mb-3">
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
                      isInvalid={touched.links?.[index]?.url && !!(errors as any).links?.[index]?.url}
                    />
                    <Form.Control.Feedback type="invalid">{(errors as any).links?.[index]?.url}</Form.Control.Feedback>
                  </Col>
                  <Col xs={12} sm={3} className="mb-2 mb-sm-0">
                    <Form.Control
                      id={`link${index}-description-input`}
                      type="text"
                      name={`links[${index}].description`}
                      value={values.links[index].description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.links?.[index]?.description && !!(errors as any).links?.[index]?.description}
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
                        const newLinks = values.links.filter((item) => item !== link);
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
                    const newLinks = [].concat(values.links).concat([{ description: '', url: '' }]);
                    setFieldValue('links', newLinks);
                  }}
                >
                  Add new Link
                </Button>
              </div>
            </Form.Group>
            <hr className="mb-4" />
            {props.footer}
          </>
        );
      }}
    </Form>
  );
};
