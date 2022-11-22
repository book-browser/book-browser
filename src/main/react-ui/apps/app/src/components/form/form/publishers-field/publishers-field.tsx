import DeleteIcon from '@mui/icons-material/Delete';
import { FormikErrors, FormikTouched } from 'formik';
import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Publisher, PublisherForm } from 'types/publisher';
import { noop } from 'utils/noop';
import Form from '../form';

export type PublishersFieldProps = {
  name?: string;
  value?: Array<Publisher | PublisherForm>;
  touched?: FormikTouched<PublisherForm[]>;
  errors?: FormikErrors<PublisherForm[]>;
  onChange?: (name: string, newValue: PublisherForm[]) => void;
  onBlur?: (name: string) => void;
};

export const PublishersField = ({
  name,
  value = [],
  touched,
  errors,
  onChange = noop,
  onBlur = noop
}: PublishersFieldProps) => {
  return (
    <Form.Group>
      {value.map((publisher, index) => (
        <Row key={index} className="mb-2">
          <Col xs={12} sm={11} className="mb-2 mb-sm-0">
            <Form.PublisherField
              id={`publisher-${index}`}
              name={`${name}[${index}]`}
              value={publisher}
              errors={errors?.[index]}
              touched={touched?.[index]}
              onChange={(fieldName, newValue) => {
                const newValues = [...value];
                Object.assign(newValues[index], newValue);
                onChange(name, newValues);
              }}
              onBlur={(name) => onBlur(name)}
            />
          </Col>
          <Col xs={1}>
            <Button
              id={`remove-publisher-${index}-button`}
              variant="danger"
              type="button"
              onClick={() => {
                const newPublishers = value.filter((item) => item !== publisher);
                onChange(name, newPublishers);
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
          className="pl-0 ms-n1"
          onClick={() => {
            const newPublishers = [...value];
            newPublishers.push({});
            onChange(name, newPublishers);
          }}
        >
          Add new Publisher
        </Button>
      </div>
    </Form.Group>
  );
};

export default PublishersField;
