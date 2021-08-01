import DeleteIcon from '@material-ui/icons/Delete';
import { debounce } from "debounce";
import { Formik, FormikErrors } from 'formik';
import { useSearchForPerson } from 'hooks/person.hook';
import { useReferenceData } from 'hooks/reference-data.hook';
import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';
import CreatableSelect from 'react-select/creatable';
import { Book } from 'types/book';
import { BookSubmission } from 'types/book-submission';
import { Person } from 'types/person';
import { PersonCreator } from 'types/person-creator';
import * as yup from 'yup';
import { RequiredFieldLegend } from '../../components/form/required-field-legend';
import { RequiredSymbol } from '../../components/form/required-symbol';

const schema = yup.object().shape({
  title: yup.string().required().max(50),
  description: yup.string().required().max(1000),
  thumbnail: yup.mixed().required().test("fileSize", "The file is too large", (file?: File) => {
    console.log(file && file.size, 1024 * 1024)
    return !(file && file.size > 1024 * 1024);
  }),
  creators: yup.array(yup.object().shape({
    fullName: yup.string().required('name is a required field'),
    role: yup.string(),
  }))
});

const defaultBook = {
  title: '',
  description: '',
  thumbnail: null,
  creators: [{ }]
} as BookSubmission;

interface BookFormProps {
  onChange?: (book: BookSubmission, valid: boolean) => void
  onSubmit?: (book: BookSubmission) => void
  footer?: ReactNode,
  initialValue?: BookSubmission
}

export const BookForm = (props: BookFormProps) => {
  const initialValue = props.initialValue || defaultBook;

  const [thumbnailUrl, setThumbnailUrl] = useState(undefined);
  const [people, setPeople] = useState<Person[]>([]);

  const { data: fetchedPeople, execute } = useSearchForPerson();
  const { data: referenceData } = useReferenceData();

  const selectOptions = people?.map(({ id, fullName }) => ({ value: id, label: fullName }));
  const roles = referenceData ? referenceData.roles : [];

  useEffect(() => {
    if (fetchedPeople) {
      setPeople(fetchedPeople);
    }
  }, [fetchedPeople])

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValue}
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
      errors}) => (
        <Form
          noValidate
          onSubmit={handleSubmit}
          onChange={() => {
            if(props.onChange) {
              props.onChange(values, isValid)
            }
          }}
        >
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
                      setFieldValue('thumbnail', file);
                      if (file) {
                        setThumbnailUrl(URL.createObjectURL(file))
                      } else {
                        setThumbnailUrl(null);
                      }
                    }}
                    onBlur={handleBlur}
                    isInvalid={touched.thumbnail && !!errors.thumbnail}
                  />
                  <Form.File.Label>{values?.thumbnail?.name || 'Browse'}</Form.File.Label>
                  <Form.Text muted>
                    Max file size 1MB
                  </Form.Text>
                  <Feedback type="invalid">
                    {errors.thumbnail}
                  </Feedback>
                </Form.File>
              </Col>
              <Col xs="auto">
                <Button
                  disabled={!values.thumbnail}
                  variant="danger"
                  onClick={() => {
                    setFieldValue('thumbnail', null);
                    setThumbnailUrl(null);
                  }}>
                    Remove
                  </Button>
              </Col>
            </Row>
            
            {thumbnailUrl && <img src={thumbnailUrl} className="mt-3" style={{ maxWidth: "100%" }} />}
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
                      value={creator.role}
                      onChange={(e) => {
                        const newCreator = {
                          ...creator,
                          role: roles[e.target.value].value
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
          {props.footer}
        </Form>
      )}
    </Formik>
  )
}