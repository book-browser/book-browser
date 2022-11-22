import { RequiredSymbol } from 'components/form/required-symbol';
import { PricingEnum } from 'enum';
import { FormikErrors, FormikTouched } from 'formik';
import React from 'react';
import { Publisher, PublisherForm } from 'types/publisher';
import { noop } from 'utils/noop';
import { Form } from '../form';

export type PublisherFieldProps = {
  id?: string;
  name?: string;
  value?: Publisher | PublisherForm;
  touched?: FormikTouched<PublisherForm>;
  errors?: FormikErrors<PublisherForm>;
  onChange?: (name: string, newValue: PublisherForm) => void;
  onBlur?: (name: string) => void;
};

export const PublisherField = ({
  id = 'publisher-field',
  name = 'publisher',
  value,
  touched,
  errors,
  onChange = noop,
  onBlur = noop
}: PublisherFieldProps) => {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label htmlFor={`${id}-publisher-control`}>
          Name
          <RequiredSymbol />
        </Form.Label>
        <Form.PublisherControl
          id={`${id}-publisher-control`}
          name={`${name}.fullName`}
          value={value?.fullName ? { fullName: value.fullName, partyId: value.partyId } : undefined}
          isInvalid={errors?.fullName && touched?.fullName}
          onChange={(newPartyValue) => {
            const newValue = { ...value, ...newPartyValue };
            onChange(name, newValue);
          }}
          onBlur={(name) => onBlur(name)}
        />
        {touched?.fullName && errors?.fullName && <div className="invalid-feedback d-block">{errors?.fullName}</div>}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor={`${id}-url-input`}>URL</Form.Label>
        <Form.Control
          id={`${id}-url-input`}
          type="url"
          name={`${name}.url`}
          value={value?.url || ''}
          isInvalid={errors?.url && touched?.url}
          onChange={(e) => {
            const newValue = { ...value, url: e.target.value };
            onChange(name, newValue);
          }}
          onBlur={(name) => onBlur(`${name}.url`)}
        />
        <Form.Text className="text-muted">https://example.com</Form.Text>
        <Form.Control.Feedback type="invalid">{errors?.url}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor={`${id}-episode-count-input`}>Available Episode Count</Form.Label>
        <Form.Control
          id={`${id}-episode-count-input`}
          type="number"
          name={`${name}.episodeCount`}
          value={value?.episodeCount || ''}
          isInvalid={errors?.episodeCount && touched?.episodeCount}
          onChange={(e) => {
            const episodeCount = e.target.value === '' ? null : Number.parseInt(e.target.value, 10);
            const newValue = { ...value, episodeCount };
            onChange(name, newValue);
          }}
          onBlur={(name) => onBlur(`${name}.episode-count`)}
        />
        <Form.Control.Feedback type="invalid">{errors?.episodeCount}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor={`${id}-cost-access-control`}>Pricing</Form.Label>
        <Form.PricingControl
          id={`${id}-pricing-control`}
          name={`${name}.pricing`}
          value={value?.pricing}
          isInvalid={errors?.pricing && touched?.pricing}
          onChange={(name, newValue) =>
            onChange(name, {
              ...value,
              pricing: newValue
            })
          }
          onBlur={onBlur}
        />
        <Form.Control.Feedback type="invalid">{errors?.pricing}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor={`${id}-cost-input`}>Cost</Form.Label>
        <Form.Control
          id={`${id}-cost-input`}
          type="currency"
          name={`${name}.cost`}
          value={value?.cost || ''}
          isInvalid={errors?.cost && touched?.cost}
          disabled={value?.pricing !== PricingEnum.PREMIUM}
          onChange={(e) => {
            const newValue = { ...value, cost: Number.parseInt(e.target.value, 10) };
            onChange(name, newValue);
          }}
          onBlur={(name) => onBlur(`${name}.cost`)}
        />
        <Form.Control.Feedback type="invalid">{errors?.cost}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          id={`${id}-preview-control`}
          name={`${name}.preview`}
          type="checkbox"
          label="Preview Available"
          checked={value?.preview || false}
          disabled={value?.pricing !== PricingEnum.PREMIUM}
          onChange={(e) => onChange(`${name}.preview`, { ...value, preview: e.target.checked })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor={`${id}-status-control`}>Listed Status</Form.Label>
        <Form.StatusControl
          id={`${id}-status-control`}
          name={`${name}.status`}
          value={value?.status}
          isInvalid={errors?.status && touched?.status}
          onChange={(name, newValue) =>
            onChange(name, {
              ...value,
              status: newValue
            })
          }
          onBlur={onBlur}
        />
        <Form.Control.Feedback type="invalid">{errors?.status}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor={`${id}-distribution-control`}>Distribution Format</Form.Label>
        <Form.DistributionControl
          id={`${id}-distribution-control`}
          name={`${name}.distribution`}
          value={value?.distribution}
          isInvalid={errors?.distribution && touched?.distribution}
          onChange={(name, newValue) =>
            onChange(name, {
              ...value,
              distribution: newValue
            })
          }
          onBlur={onBlur}
        />
        <Form.Control.Feedback type="invalid">{errors?.distribution}</Form.Control.Feedback>
      </Form.Group>
    </div>
  );
};
