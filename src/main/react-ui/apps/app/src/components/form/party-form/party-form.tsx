import { DeepPartial } from '@reduxjs/toolkit';
import React, { ReactNode } from 'react';
import { Party } from 'types/party';
import * as yup from 'yup';
import Form from '../form/form';
import { RequiredFieldLegend } from '../required-field-legend';
import { RequiredSymbol } from '../required-symbol';

const schema = yup.object().shape({
  id: yup.number().nullable(),
  fullName: yup.string().required().max(150),
  description: yup.string().max(2000),
  picture: yup.mixed().test('fileSize', 'The file is too large', (file?: File) => {
    return !(file && file.size > 1024 * 1024);
  })
});

export type PartyFormProps = {
  onChange?: (series: DeepPartial<Party>, valid: boolean) => void;
  onSubmit?: (series: DeepPartial<Party>) => void;
  footer?: ReactNode;
  initialValue?: DeepPartial<Party>;
  value?: DeepPartial<Party>;
};
const defaultParty = {
  fullName: '',
  description: '',
  picture: undefined
} as DeepPartial<Party>;

export const PartyForm = (props: PartyFormProps) => {
  return (
    <Form
      validationSchema={schema}
      initialValues={props.value || { ...defaultParty, ...props.initialValue }}
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
                Full Name
                <RequiredSymbol />
              </Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.fullName && !!errors.fullName}
              />
              <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
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
                Profile Picture
                <RequiredSymbol />
              </Form.Label>
              <Form.ImageControl
                name="picture"
                defaultValue={
                  values.id && values.hasPicture
                    ? `${window.location.origin}/api/party/${values.id}/picture`
                    : undefined
                }
                value={values.picture as File}
                isInvalid={touched.picture && !!errors.picture}
                onChange={setFieldValue}
                onBlur={handleBlur}
              />
              <Form.Text muted>Max file size 1MB</Form.Text>
              <Form.Control.Feedback type="invalid">{errors.picture as any}</Form.Control.Feedback>
            </Form.Group>
            {props.footer}
          </>
        );
      }}
    </Form>
  );
};
