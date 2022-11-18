import Form from 'components/form/form/form';
import { Distribution } from 'consts';
import { DistributionEnum } from 'enum';
import React from 'react';
import { noop } from 'utils/noop';

export type DistributionControlProps = {
  id: string;
  name: string;
  value?: DistributionEnum;
  isInvalid?: boolean;
  onChange?: (name, value?: DistributionEnum) => void;
  onBlur?: (name: string) => void;
};

type Keys = keyof typeof Distribution;
type Values = typeof Distribution[Keys];

const DistributionControl = ({
  id,
  name,
  value,
  isInvalid,
  onChange = noop,
  onBlur = noop
}: DistributionControlProps) => {
  return (
    <Form.Select
      id={id}
      name={name}
      value={value || ''}
      onChange={(e) => {
        onChange(name, (e.target.value as DistributionEnum) || null);
      }}
      onBlur={() => onBlur(name)}
    >
      <option value=""></option>
      {Object.values(Distribution).map((item: Values) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </Form.Select>
  );
};

export default DistributionControl;
