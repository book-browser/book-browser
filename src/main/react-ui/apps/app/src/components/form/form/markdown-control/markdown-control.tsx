import MDEditor from '@uiw/react-md-editor';
import React from 'react';

export type MarkdownControlProps = {
  name?: string;
  value?: string;
  isInvalid?: boolean;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
};

export const MarkdownControl = ({ name, value, isInvalid, onChange, onBlur }: MarkdownControlProps) => {
  return (
    <MDEditor
      className={isInvalid ? 'is-invalid' : undefined}
      height={500}
      value={value}
      textareaProps={{
        name,
        onBlur,
        onChange
      }}
      // onChange={(newValue) => {
      //   setFieldValue('description', newValue);
      // }}
    />
  );
};

export default MarkdownControl;
