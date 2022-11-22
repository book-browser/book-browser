import classNames from 'classnames';
import Form from 'components/form/form/form';
import { Pricing } from 'consts';
import { PricingEnum } from 'enum';
import React from 'react';
import { noop } from 'utils/noop';

export type PricingControlProps = {
  id: string;
  name: string;
  value?: PricingEnum;
  isInvalid?: boolean;
  onChange?: (name, value?: PricingEnum) => void;
  onBlur?: (name: string) => void;
};

type Keys = keyof typeof Pricing;
type Values = typeof Pricing[Keys];

const PricingControl = ({ id, name, value, isInvalid, onChange = noop, onBlur = noop }: PricingControlProps) => {
  const className = classNames({
    'is-invalid': isInvalid
  });
  return (
    <Form.Select
      id={id}
      name={name}
      value={value || ''}
      onChange={(e) => {
        onChange(name, (e.target.value as PricingEnum) || null);
      }}
      onBlur={() => onBlur(name)}
      className={className}
    >
      <option value=""></option>
      {Object.values(Pricing).map((item: Values) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </Form.Select>
  );
};

export default PricingControl;
