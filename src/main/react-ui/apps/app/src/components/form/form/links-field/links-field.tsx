import { RequiredSymbol } from 'components/form/required-symbol';
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'types/link';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormikErrors, FormikTouched } from 'formik';

export type LinksFieldProps = {
  name?: string;
  value?: Partial<Link>[];
  touched?: FormikTouched<Link[]>;
  errors?: FormikErrors<Link[]>;
  onChange?: (name: string, newValue: Partial<Link>[]) => void;
  onBlur?: (name: string) => void;
};

export const LinksField = ({ name, value = [], touched, errors, onChange, onBlur }) => {
  return (
    <Form.Group>
      {value.length > 0 && (
        <Row>
          <Col xs={12} sm={7}>
            <Form.Label htmlFor={`link-0-url-input`}>
              URL
              <RequiredSymbol />
            </Form.Label>
          </Col>
          <Col xs={12} sm={3}>
            <Form.Label htmlFor={`link-0-description-input`}>
              Description
              <RequiredSymbol />
            </Form.Label>
          </Col>
          <Col xs={2} />
        </Row>
      )}
      {value.map((link, index) => (
        <Row key={index} className="mb-2">
          <Col xs={12} sm={7} className="mb-2 mb-sm-0">
            <Form.Control
              id={`link-${index}-url-input`}
              type="text"
              name={`${name}[${index}].url`}
              value={value[index].url}
              onChange={(e) => {
                const newLink: Link = { ...value[index], url: e.target.value };
                const newLinks = [...value];
                newLinks[index] = newLink;
                onChange(name, newLinks);
              }}
              onBlur={() => onBlur(`${name}[${index}].url`)}
              isInvalid={touched?.[index]?.url && !!errors?.[index]?.url}
            />
            <Form.Control.Feedback type="invalid">{errors?.[index]?.url}</Form.Control.Feedback>
          </Col>
          <Col xs={12} sm={3} className="mb-2 mb-sm-0">
            <Form.Control
              id={`link-${index}-description-input`}
              type="text"
              name={`links[${index}].description`}
              value={value[index].description}
              onChange={(e) => {
                const newLink: Link = { ...value[index], description: e.target.value };
                const newLinks = [...value];
                newLinks[index] = newLink;
                onChange(name, newLinks);
              }}
              onBlur={() => onBlur(`${name}[${index}].description`)}
              isInvalid={touched?.[index]?.description && !!errors?.[index]?.description}
            />
            <Form.Control.Feedback type="invalid">{errors?.[index]?.description}</Form.Control.Feedback>
          </Col>
          <Col xs={2}>
            <Button
              id={`remove-link${index}-button`}
              variant="danger"
              type="button"
              onClick={() => {
                const newLinks = value.filter((item) => item !== link);
                onChange(name, newLinks);
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
            const newLinks = [].concat(value).concat([{}]);
            onChange(name, newLinks);
          }}
        >
          Add new Link
        </Button>
      </div>
    </Form.Group>
  );
};

export default LinksField;
