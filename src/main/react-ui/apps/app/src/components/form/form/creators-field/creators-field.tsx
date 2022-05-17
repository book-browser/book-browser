import DeleteIcon from '@material-ui/icons/Delete';
import { RequiredSymbol } from 'components/form/required-symbol';
import { debounce } from 'debounce';
import { FormikErrors, FormikTouched } from 'formik';
import { useFindAllParties } from 'hooks/party.hook';
import { useReferenceData } from 'hooks/reference-data.hook';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { Creator } from 'types/creator';
import { Party } from 'types/party';

export declare type CreatorsFieldProps = {
  name?: string;
  value?: Partial<Creator>[];
  touched?: FormikTouched<Creator[]>;
  errors?: FormikErrors<Creator[]>;
  onChange?: (name: string, newValue: Partial<Creator>[]) => void;
  onBlur?: (name: string) => void;
};

export const CreatorsField = ({ name, value = [], touched, errors, onChange, onBlur }) => {
  const [parties, setParties] = useState<Party[]>([]);
  const { data: referenceData } = useReferenceData();
  const { data: fetchedParties, execute } = useFindAllParties();

  const roles = referenceData ? referenceData.roles : [];
  const selectOptions = parties?.map(({ id, fullName }) => ({ value: id, label: fullName }));

  useEffect(() => {
    if (fetchedParties) {
      setParties(fetchedParties.items);
    }
  }, [fetchedParties]);

  return (
    <Form.Group>
      {value.length > 0 && (
        <Row>
          <Col xs={12} sm={7}>
            <Form.Label htmlFor={`creator-0-name-select`}>
              Name
              <RequiredSymbol />
            </Form.Label>
          </Col>
          <Col xs={12} sm={3}>
            <Form.Label htmlFor={`creator-0-role-select`}>Role</Form.Label>
          </Col>
          <Col xs={2} />
        </Row>
      )}

      {value.map((creator, index) => (
        <Row key={index} className="mb-2">
          <Col xs={12} sm={7} className="mb-2 mb-sm-0">
            <CreatableSelect
              defaultValue={creator.fullName && { label: creator.fullName, value: creator.id }}
              inputId={`creator-${index}-name-select`}
              name={`${name}[${index}].fullName`}
              options={selectOptions}
              onChange={(data) => {
                const newCreators = [...value];
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
                newCreators[index] = newCreator;
                onChange(name, newCreators);
              }}
              onInputChange={(data) => {
                if (data.length > 0) {
                  debounce(execute, 200)({ name: data });
                }
              }}
              onBlur={() => {
                setParties([]);
                onBlur(`${name}[${index}].fullName`);
                console.log('blur');
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
          <Col xs={12} sm={3} className="mb-2 mb-sm-0">
            <Form.Control
              id={`creator-${index}-role-select`}
              as="select"
              custom
              name={`${name}[${index}].role`}
              value={value[index]?.role || ''}
              onChange={(e) => {
                console.log(roles, e.target.value);
                const newCreator = {
                  ...creator,
                  role: e.target.value
                };
                const newCreators = [...value];
                newCreators[index] = newCreator;
                onChange(name, newCreators);
              }}
              onBlur={() => {
                onBlur(`${name}[${index}].role`);
              }}
            >
              <option value="-1"></option>
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.title}
                </option>
              ))}
            </Form.Control>
          </Col>
          <Col xs={2}>
            <Button
              id={`remove-creator-${index}-button`}
              variant="danger"
              type="button"
              onClick={() => {
                const newCreators = value.filter((item) => item !== creator);
                onChange(name, newCreators);
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
            const newCreators = [...value];
            newCreators.push({});
            onChange(name, newCreators);
          }}
        >
          Add new Creator
        </Button>
      </div>
    </Form.Group>
  );
};

export default CreatorsField;
