import classNames from 'classnames';
import Form from 'components/form/form/form';
import { Status } from 'consts';
import { StatusEnum } from 'enum';
import React from 'react';
import { noop } from 'utils/noop';

export type StatusControlProps = {
  id: string;
  name?: string;
  value?: StatusEnum;
  isInvalid?: boolean;
  allOption?: boolean;
  onChange?: (name, value?: StatusEnum | null) => void;
  onBlur?: (name: string) => void;
};

type Keys = keyof typeof Status;
type Values = typeof Status[Keys];

const StatusControl = ({
  id,
  name = 'status',
  value,
  isInvalid,
  allOption = false,
  onChange = noop,
  onBlur = noop
}: StatusControlProps) => {
  const className = classNames({
    'is-invalid': isInvalid
  });
  return (
    <Form.Select
      id={id}
      name={name}
      value={allOption && value === undefined ? 'all' : value || ''}
      onChange={(e) => {
        if (allOption && e.target.value === 'all') {
          onChange(name, undefined);
        }
        onChange(name, (e.target.value as StatusEnum) || null);
      }}
      onBlur={() => onBlur(name)}
      className={className}
    >
      {allOption && <option value="all">All</option>}
      <option value="">N/A</option>
      {Object.values(Status).map((item: Values) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </Form.Select>
  );
};

export default StatusControl;
