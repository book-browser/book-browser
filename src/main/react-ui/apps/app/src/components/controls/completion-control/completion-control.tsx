import Form from 'components/form/form/form';
import { Completion } from 'consts';
import { CompletionEnum } from 'enum';
import React from 'react';
import { noop } from 'utils/noop';

export type CompletionControlProps = {
  id: string;
  name: string;
  value?: CompletionEnum;
  isInvalid?: boolean;
  onChange?: (name, value?: CompletionEnum) => void;
  onBlur?: (name: string) => void;
};

type Keys = keyof typeof Completion;
type Values = typeof Completion[Keys];

const CompletionControl = ({ id, name, value, isInvalid, onChange = noop, onBlur = noop }: CompletionControlProps) => {
  return (
    <Form.Select
      id={id}
      name={name}
      value={value || ''}
      onChange={(e) => {
        onChange(name, (e.target.value as CompletionEnum) || null);
      }}
      onBlur={() => onBlur(name)}
    >
      <option value=""></option>
      {Object.values(Completion).map((item: Values) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </Form.Select>
  );
};

export default CompletionControl;
