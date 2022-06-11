/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeepPartial } from '@reduxjs/toolkit';
import React, { ReactNode } from 'react';
import { Episode } from 'types/episode';
import * as yup from 'yup';
import Form from '../form/form';
import { RequiredFieldLegend } from '../required-field-legend';
import { RequiredSymbol } from '../required-symbol';

const schema = yup.object().shape({
  id: yup.number().nullable(),
  seriesId: yup.number().required(),
  title: yup.string().required().max(100),
  description: yup.string().nullable().max(1000),
  releaseDate: yup.date().required(),
  thumbnail: yup
    .mixed()
    .when('id', (id, schema) => {
      return id ? schema : schema.required();
    })
    .test('fileSize', 'The file is too large', (file?: File) => {
      return !(file && file.size > 1024 * 1024);
    }),
  links: yup.array(
    yup.object().shape({
      url: yup.string().required().max(100).label('url'),
      description: yup.string().required('description is a required field').max(50).label('description')
    })
  )
});

export declare type EpisodeFormProps = {
  onChange?: (series: DeepPartial<Episode>, valid: boolean) => void;
  onSubmit?: (series: DeepPartial<Episode>) => void;
  footer?: ReactNode;
  initialValue?: DeepPartial<Episode>;
  value?: DeepPartial<Episode>;
};

const defaultEpisode = {
  title: '',
  description: '',
  releaseDate: undefined,
  thumbnail: undefined,
  links: []
} as DeepPartial<Episode>;

export const EpisodeForm = (props: EpisodeFormProps) => {
  return (
    <Form
      validationSchema={schema}
      initialValues={props.value || { ...defaultEpisode, ...props.initialValue }}
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
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.title && !!errors.title}
              />
              <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="title-input" className="mb-3">
              <Form.Label>
                Series
                <RequiredSymbol />
              </Form.Label>
              <Form.SeriesControl
                name="seriesId"
                value={values.seriesId}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                isInvalid={touched.seriesId && !!errors.seriesId}
              />
              <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="release-date-picker" className="w-50 mb-3">
              <Form.Label>
                Release Date
                <RequiredSymbol />
              </Form.Label>
              <Form.DateControl
                value={values.releaseDate as Date}
                isInvalid={touched.releaseDate && !!errors.releaseDate}
                onChange={(val) => setFieldValue('releaseDate', val)}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type="invalid">{errors.releaseDate as any}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="description-text-area" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.MarkdownControl
                name="description"
                value={values.description || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.description && !!errors.description}
              />
              <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="thumbnail-image" className="mb-3">
              <Form.Label>
                Thumbnail
                <RequiredSymbol />
              </Form.Label>
              <Form.ImageControl
                name="thumbnail"
                defaultValue={values.id ? `${window.location.origin}/api/episode/${values.id}/thumbnail` : undefined}
                value={values.thumbnail as File}
                isInvalid={touched.thumbnail && !!errors.thumbnail}
                onChange={setFieldValue}
                onBlur={handleBlur}
              />
              <Form.Text muted>Max file size 1MB</Form.Text>
              <Form.Control.Feedback type="invalid">{errors.thumbnail as any}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Links</Form.Label>
              <Form.LinksField
                name="links"
                value={values.links}
                touched={touched.links}
                errors={errors.links}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
              />
            </Form.Group>
            {props.footer}
          </>
        );
      }}
    </Form>
  );
};
