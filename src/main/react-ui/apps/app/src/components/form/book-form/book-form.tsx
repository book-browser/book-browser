import DeleteIcon from '@material-ui/icons/Delete';
import { debounce } from "debounce";
import { Formik, FormikErrors } from 'formik';
import { useSearchForPerson } from 'hooks/person.hook';
import { useReferenceData } from 'hooks/reference-data.hook';
import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';
import CreatableSelect from 'react-select/creatable';
import { Person } from 'types/person';
import { PersonCreator } from 'types/person-creator';
import * as yup from 'yup';
import { RequiredFieldLegend } from '../required-field-legend';
import { RequiredSymbol } from '../required-symbol';
import Select from 'react-select';
import { Genre } from 'types/genre';
import { Book } from 'types/book';

const schema = yup.object().shape({
  id: yup.number().nullable(),
  title: yup.string().required().max(50),
  description: yup.string().required().max(1000),
  thumbnail: yup.mixed()
    .when('id', (id, schema) => {
      return id ? schema : schema.required();
    })
    .test("fileSize", "The file is too large", (file?: File) => {
    return !(file && file.size > 1024 * 1024);
  }),
  creators: yup.array(yup.object().shape({
    fullName: yup.string().required().label('name'),
    role: yup.string().nullable(),
  })),
  genres: yup.array(yup.object()),
  links: yup.array(yup.object().shape({
    url: yup.string().required().max(100).label('url'),
    description: yup.string().required('description is a required field').max(50).label('description'),
  })),
});

interface BookFormProps {
  onChange?: (book: Book, valid: boolean) => void
  onSubmit?: (book: Book) => void
  footer?: ReactNode,
  initialValue?: Book,
  value?: Book
}

const defaultBook = {
  title: '',
  description: '',
  thumbnail: null,
  creators: [{ }],
  genres: [],
  links: [],
} as Book;

const convertGenreToSelectOptions = (genres: Genre[]) => {
  return genres.map(({ id, name }) => ({ value: id, label: name }))
}

export const BookForm = (props: BookFormProps) => {
  const [value, setValue] = useState<Book>(props.initialValue || defaultBook);
  const [thumbnailFile, setThumbnailFile] = useState<File>();
  const [thumbnailUrl, setThumbnailUrl] = useState<string>();

  const [people, setPeople] = useState<Person[]>([]);

  const { data: fetchedPeople, execute } = useSearchForPerson();
  const { data: referenceData } = useReferenceData();

  const selectOptions = people?.map(({ id, fullName }) => ({ value: id, label: fullName }));
  const genreOptions = referenceData ? convertGenreToSelectOptions(referenceData.genres) : [];

  const roles = referenceData ? referenceData.roles : [];

  useEffect(() => {
    if (fetchedPeople) {
      setPeople(fetchedPeople);
    }
  }, [fetchedPeople]);

  const actualValue = props.value || value;

  useEffect(() => {
    if (!actualValue.thumbnail && actualValue.id) {
      setThumbnailFile(null);
      setThumbnailUrl(`/api/book/${actualValue.id}/thumbnail`);
    }
  }, [actualValue]);

  return (
    <Formik
      validationSchema={schema}
      initialValues={actualValue}
      enableReinitialize
      onSubmit={(values) => {
        if(props.onSubmit) {
          props.onSubmit(values);
        }
      }}>
    {({handleSubmit,
      handleChange,
      handleBlur,
      setFieldValue,
      setFieldTouched,
      values,
      touched,
      isValid,
      errors}) => {
        useEffect(() => {
          setValue(values);
          if(props.onChange) {
            props.onChange(values, isValid);
          }
        }, [values]);
      return (

        <Form
          className="m-3"
          noValidate
          onSubmit={handleSubmit}
        >
          <h4 className="mb-3">General Information</h4>
          <hr className="mb-4"/>
          <RequiredFieldLegend />
          <Form.Group controlId="title-input">
            <Form.Label>Title<RequiredSymbol /></Form.Label>
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
            <Form.Label>Description<RequiredSymbol /></Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={6}
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.description && !!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Thumbnail<RequiredSymbol /></Form.Label>
            <Row>
              <Col>
                <Form.File custom>
                  <Form.File.Input
                    name="thumbnail"
                    accept="image/png, image/jpeg"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function () {
                          setThumbnailFile(file);
                          setThumbnailUrl(URL.createObjectURL(file));
                          setFieldValue('thumbnail', (reader.result as string).split(',')[1]);
                        };
                       
                      } else {
                        setThumbnailFile(null);
                        setThumbnailUrl(null);
                        setFieldValue('thumbnail', null);
                      }
                    }}
                    onBlur={handleBlur}
                    isInvalid={touched.thumbnail && !!errors.thumbnail}
                  />
                  <Form.File.Label>{thumbnailFile?.name || ((!actualValue.thumbnail && actualValue.id) ? `${window.location.origin}/book/${actualValue.id}/thumbnail` : 'Browse')}</Form.File.Label>
                  <Form.Text muted>
                    Max file size 1MB
                  </Form.Text>
                  <Feedback type="invalid">
                    {errors.thumbnail}
                  </Feedback>
                </Form.File>
              </Col>
            </Row>
            
            {thumbnailUrl && <img src={thumbnailUrl} className="mt-3" style={{ maxWidth: "100%" }} />}
          </Form.Group>
          <Form.Group controlId="genre-select">
            <Form.Label>Genres</Form.Label>
            <Select
              inputId="genre-select"
              isMulti
              name="genres"
              options={genreOptions}
              value={convertGenreToSelectOptions(actualValue.genres)}
              onChange={(data) => {
                const genres = data.map((item) => ({
                  id: item.value,
                  name: item.label
                }));
                setFieldValue('genres', genres);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Creators</Form.Label>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Label htmlFor={`creator0-name-select`}>Name<RequiredSymbol /></Form.Label>
                </Col>
                <Col xs={3}>
                  <Form.Label htmlFor={`creator0-role-select`}>Role</Form.Label>
                </Col>
                <Col xs={2} />
              </Row>
              {values.creators.map((creator, index) => (
                <Row key={index} className="mb-2">
                  <Col>
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
                  <Col xs={3}>
                    <Form.Control
                      id={`creator${index}-role-select`}
                      as="select"
                      custom
                      name={`creators[${index}].role`}
                      value={creator.role || -1}
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
                      className="position-absolute"
                      style={{top: "0"}}
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
          <hr className="mb-4"/>
          <h4 className="mb-3">Relevant Links</h4>
          <Form.Group>
           {values.links.length > 0 && (
              <Row>
                <Col>
                  <Form.Label htmlFor={`link0-name-select`}>URL<RequiredSymbol /></Form.Label>
                </Col>
                <Col xs={3}>
                  <Form.Label htmlFor={`link0-role-select`}>Description<RequiredSymbol /></Form.Label>
                </Col>
                <Col xs={2} />
              </Row>
            )}
            {values.links.map((link, index) => (
              <Row key={index} className="mb-2">
                <Col>
                  <Form.Control
                    id={`link${index}-url-input`}
                    type="text"
                    name={`links[${index}].url`}
                    value={values.links[index].url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.links?.[index]?.url && !!(errors as any).links?.[index]?.url}
                  />
                  <Form.Control.Feedback type="invalid">
                    {(errors as any).links?.[index]?.url}
                  </Form.Control.Feedback>
                </Col>
                <Col xs={3}>
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
                    className="position-absolute"
                    style={{top: "0"}}
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
                onClick={() => {
                  const newLinks = [].concat(values.links).concat([{ description: '', url: '' }]);
                  setFieldValue('links', newLinks);
                }}
              >
                Add new Link
              </Button>
            </div>
          </Form.Group>
          <hr className="mb-4"/>
          {props.footer}
        </Form>
      )}}
    </Formik>
  )
}