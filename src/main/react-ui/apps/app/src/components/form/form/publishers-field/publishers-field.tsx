import DeleteIcon from '@mui/icons-material/Delete';
import { RequiredSymbol } from 'components/form/required-symbol';
import { debounce } from 'debounce';
import { FormikErrors, FormikTouched } from 'formik';
import { useFindAllPublisher } from 'hooks/party.hook';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { Link } from 'types/link';
import { Party } from 'types/party';
import { Publisher } from 'types/publisher';

export type PublishersFieldProps = {
  name?: string;
  value?: Partial<Publisher>[];
  touched?: FormikTouched<Publisher[]>;
  errors?: FormikErrors<Publisher[]>;
  onChange?: (name: string, newValue: Partial<Publisher>[]) => void;
  onBlur?: (name: string) => void;
};

export const PublishersField = ({ name, value = [], touched, errors, onChange, onBlur }: PublishersFieldProps) => {
  const [publishers, setPublishers] = useState<Party[]>([]);
  const { data: fetchedPublishers, execute } = useFindAllPublisher();

  const selectOptions = publishers?.map(({ id, fullName }) => ({ value: id, label: fullName }));

  useEffect(() => {
    if (fetchedPublishers) {
      setPublishers(fetchedPublishers.items);
    }
  }, [fetchedPublishers]);

  return (
    <Form.Group>
      {value.length > 0 && (
        <Row>
          <Col xs={12} sm={5}>
            <Form.Label htmlFor={`publisher-0-name-select`}>
              Name
              <RequiredSymbol />
            </Form.Label>
          </Col>
          <Col xs={12} sm={5}>
            <Form.Label htmlFor={`publisher-0-url-input`}>URL</Form.Label>
          </Col>
          <Col xs={2} />
        </Row>
      )}
      {value.map((publisher, index) => (
        <Row key={index} className="mb-2">
          <Col xs={12} sm={5} className="mb-2 mb-sm-0">
            <CreatableSelect
              defaultValue={publisher.fullName && { label: publisher.fullName, value: publisher.partyId }}
              inputId={`publisher-${index}-name-select`}
              name={`${name}[${index}].fullName`}
              options={selectOptions}
              onChange={(data) => {
                const newPublishers = [...value];
                let newPublisher;
                if (data.__isNew__) {
                  newPublisher = {
                    ...publisher,
                    partyId: undefined,
                    fullName: data.label
                  };
                } else {
                  newPublisher = {
                    ...publisher,
                    partyId: data.value,
                    fullName: data.label
                  };
                }
                newPublishers[index] = newPublisher;
                onChange(name, newPublishers);
              }}
              onInputChange={(data) => {
                if (data.length > 0) {
                  debounce(execute, 200)({ name: data });
                }
              }}
              onBlur={() => {
                setPublishers([]);
                onBlur(`${name}[${index}].fullName`);
              }}
              styles={{
                control: (styles) => ({
                  ...styles,
                  borderColor: touched?.[index]?.fullName && errors?.[index]?.fullName ? '#dc3545' : styles.borderColor,
                  '&:hover': {
                    borderColor:
                      touched?.[index]?.fullName && errors?.[index]?.fullName
                        ? '#dc3545'
                        : styles['&:hover'].borderColor
                  }
                })
              }}
            />
            {touched?.[index]?.fullName && errors?.[index]?.fullName && (
              <div className="invalid-feedback d-block">{errors?.[index]?.fullName}</div>
            )}
          </Col>
          <Col xs={12} sm={6} className="mb-2 mb-sm-0">
            <Form.Control
              id={`link-${index}-url-input`}
              type="text"
              name={`${name}[${index}].url`}
              value={value[index].url}
              onChange={(e) => {
                const newLink: Link = { ...value[index], url: e.target.value, description: '' };
                const newLinks = [...value];
                newLinks[index] = newLink;
                onChange(name, newLinks);
              }}
              onBlur={() => onBlur(`${name}[${index}].url`)}
              isInvalid={touched?.[index]?.url && !!errors?.[index]?.url}
            />
            <Form.Control.Feedback type="invalid">{errors?.[index]?.url}</Form.Control.Feedback>
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
