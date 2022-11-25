import { Letter } from 'consts';
import { LetterEnum } from 'enum';
import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import { noop } from 'utils/noop';

export type LetterControlProps = {
  id?: string;
  name?: string;
  value?: LetterEnum;
  isInvalid?: boolean;
  onChange?: (name, value?: LetterEnum) => void;
  onBlur?: (name: string) => void;
};

const LetterControl = ({ id, name, value, onBlur = noop, onChange = noop }: LetterControlProps) => {
  console.log(value);
  return (
    <div id={id} className="d-flex flex-wrap mb-3">
      {Object.values(LetterEnum).map((letter) => (
        <ToggleButton
          type="checkbox"
          key={letter}
          value={letter}
          checked={value === letter}
          className="me-2 mb-2"
          variant="outline-primary"
          onClick={() => {
            onChange(name, letter);
            onBlur(name);
          }}
        >
          {Letter[letter].label}
        </ToggleButton>
      ))}
    </div>
  );
};

export default LetterControl;
