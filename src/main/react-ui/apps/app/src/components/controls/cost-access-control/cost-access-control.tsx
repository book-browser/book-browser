import Form from 'components/form/form/form';
import { CostAccess } from 'consts';
import { CostAccessEnum } from 'enum';
import React from 'react';
import { noop } from 'utils/noop';

export type CostAccessControlProps = {
  id: string;
  name: string;
  value?: CostAccessEnum;
  isInvalid?: boolean;
  onChange?: (name, value?: CostAccessEnum) => void;
  onBlur?: (name: string) => void;
};

type Keys = keyof typeof CostAccess;
type Values = typeof CostAccess[Keys];

const CostAccessControl = ({ id, name, value, isInvalid, onChange = noop, onBlur = noop }: CostAccessControlProps) => {
  return (
    <Form.Select
      id={id}
      name={name}
      value={value || ''}
      onChange={(e) => {
        onChange(name, (e.target.value as CostAccessEnum) || null);
      }}
      onBlur={() => onBlur(name)}
    >
      <option value=""></option>
      {Object.values(CostAccess).map((item: Values) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </Form.Select>
  );
};

export default CostAccessControl;
