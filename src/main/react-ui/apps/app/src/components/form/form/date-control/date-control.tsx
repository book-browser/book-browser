import classNames from "classnames";
import React from "react";
import DatePicker from "react-datepicker";
import { noop } from "utils/noop";

export declare type DateControlProps = {
  name?: string
  value?: Date
  isInvalid?: boolean
  onChange?: (val?: Date) => void
  onBlur?: React.FocusEventHandler<HTMLInputElement>
}


export const DateControl = ({
  name,
  value,
  isInvalid,
  onChange = noop,
  onBlur
}: DateControlProps) => {
  return (
    <DatePicker
      showPopperArrow={false}
      wrapperClassName={classNames({ 'is-invalid' : isInvalid })}
      className={classNames('form-control', { 'is-invalid' : isInvalid })}
      selected={value}
      onChange={onChange}
      onBlur={onBlur}
      isClearable
    />
  );
}

export default DateControl;