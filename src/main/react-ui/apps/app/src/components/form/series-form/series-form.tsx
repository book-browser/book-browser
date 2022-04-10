import { debounce } from "debounce";
import { Formik } from 'formik';
import { useSearch } from 'hooks/book.hook';
import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';
import Select from 'react-select';
import { Book } from 'types/book';
import { Series } from 'types/series';
import * as yup from 'yup';
import { RequiredFieldLegend } from '../required-field-legend';
import { RequiredSymbol } from '../required-symbol';
import MDEditor from '@uiw/react-md-editor';

const schema = yup.object().shape({
  id: yup.number().nullable(),
  title: yup.string().required().max(50),
  description: yup.string().required().max(1000),
  banner: yup.mixed()
    .when('id', (id, schema) => {
      return id ? schema : schema.required();
    })
    .test("fileSize", "The file is too large", (file?: File) => {
    return !(file && file.size > 1024 * 1024);
  }),
  books: yup.array(yup.object().shape({
    id: yup.number().required(),
  })),
});

interface SeriesFormProps {
  onChange?: (series: Series, valid: boolean) => void
  onSubmit?: (series: Series) => void
  footer?: ReactNode,
  initialValue?: Series
  value?: Series
}

const defaultSeries = {
  title: '',
  description: '',
  banner: null,
  books: []
} as Series;

const convertBookToBookOption = (book: Book) => {
  return { value: book.id, label: book.title };
}

const SeriesForm = (props: SeriesFormProps) => {
  const [value, setValue] = useState<Series>(props.initialValue || defaultSeries);
  const [bannerFile, setBannerFile] = useState<File>();
  const [bannerUrl, setBannerUrl] = useState<string>();

  const [books, setBooks] = useState<Book[]>([]);
  const bookOptions = books.map(convertBookToBookOption);

  const { data: fetchedBooks, execute: search, loading: searching } = useSearch();

  const actualValue = props.value || value;

  useEffect(() => {
    if (fetchedBooks) {
      setBooks(fetchedBooks);
    }
  }, [fetchedBooks]);

  useEffect(() => {
    if (!actualValue.banner && actualValue.id) {
      setBannerFile(null);
      setBannerUrl(`/api/series/${actualValue.id}/banner`);
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
          useEffect(() => {
            if (values !== actualValue) {
              setValue(values);
              if(props.onChange) {
                props.onChange(values, isValid);
              }
            }
          }, [values]);
          return (
            <Form
              className="mb-3"
              noValidate
              onSubmit={handleSubmit}
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
                <MDEditor
                  className={(touched.description  && !!errors.description) ? 'is-invalid' : undefined}
                  height={500}
                  value={values.description}
                  textareaProps={{
                    name: "description",
                    onBlur: handleBlur
                  }}
                  onChange={(value) => {
                    setFieldValue('description', value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Banner<RequiredSymbol /></Form.Label>
                <Form.File custom>
                  <Form.File.Input
                    name="banner"
                    accept="image/png, image/jpeg"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function () {
                          setBannerFile(file);
                          setBannerUrl(URL.createObjectURL(file));
                          setFieldValue('banner', (reader.result as string).split(',')[1]);
                        };
                      
                      } else {
                        setBannerFile(null);
                        setBannerUrl(null);
                        setFieldValue('banner', null);
                      }
                    }}
                    onBlur={handleBlur}
                    isInvalid={touched.banner && !!errors.banner}
                  />
                  <Form.File.Label>{bannerFile?.name || ((!actualValue.banner && actualValue.id) ? `${window.location.origin}/series/${actualValue.id}/banner` : 'Browse')}</Form.File.Label>
                  <Form.Text muted>
                    Max file size 1MB
                  </Form.Text>
                  <Feedback type="invalid">
                    {errors.banner}
                  </Feedback>
                </Form.File>
                
                {bannerUrl && <img src={bannerUrl} className="mt-3" style={{ maxWidth: "100%" }} />}
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
                      newBooks.push(books.find((book) => book.id === type.option.value));
                      setFieldValue('books', newBooks);
                    } else if (type.action === 'remove-value') {
                      const index = values.books.findIndex((book) => book.id === type.removedValue.value)
                      const newBooks = values.books.slice();
                      newBooks.splice(index, 1);
                      setFieldValue('books', newBooks);
                    } else if (type.action === 'clear') {
                      setFieldValue('books', []);
                    }
                  }}
                  onInputChange={debounce((data) => {
                    if (data.length > 0) {
                      search({ query: data })
                    }
                  }, 500)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>

              <hr className="mb-4"/>
              {props.footer}
            </Form>
          )
        }}
    </Formik>
  );
}

export default SeriesForm;