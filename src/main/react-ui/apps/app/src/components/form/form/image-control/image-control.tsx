import classNames from 'classnames';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { noop } from 'utils/noop';
import './image-control.scss';

export type ImageControlProps = {
  name?: string;
  defaultValue?: string | File;
  value?: File;
  isInvalid?: boolean;
  onChange?: (name?: string, file?: File | null) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

const getDefaultCurrentValue = (defaultValue?: string | File, value?: File) => {
  if (value) {
    return value;
  } else if (defaultValue && typeof defaultValue !== 'string') {
    return defaultValue;
  } else if (value === null) {
    return null;
  }
  return undefined;
};

const getDefaultImageUrl = (defaultValue?: string | File, value?: File) => {
  if (value) {
    return URL.createObjectURL(value);
  } else if (value === null) {
    return undefined;
  } else if (defaultValue) {
    if (typeof defaultValue === 'string') {
      return defaultValue;
    } else {
      return URL.createObjectURL(defaultValue);
    }
  }
  return undefined;
};

export const ImageControl = ({
  name,
  defaultValue,
  value,
  isInvalid,
  onChange = noop,
  onBlur = noop
}: ImageControlProps) => {
  const inputRef = useRef<HTMLInputElement>();
  const [imageUrl, setImageUrl] = useState<string>(getDefaultImageUrl(defaultValue, value));
  const [currentValue, setCurrentValue] = useState<File | null>(getDefaultCurrentValue(defaultValue, value));

  useEffect(() => {
    if (currentValue !== value) {
      setCurrentValue(value);
      setImageUrl(getDefaultImageUrl(defaultValue, value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const className = classNames({ 'is-invalid': isInvalid });
  return (
    <div className={className}>
      <Row>
        <Col>
          <Form.Control
            type="file"
            name={name}
            accept="image/png, image/jpeg"
            ref={inputRef}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                  setCurrentValue(file);
                  setImageUrl(URL.createObjectURL(file));
                  onChange(name, file);
                };
              }
            }}
            onBlur={onBlur}
            isInvalid={isInvalid}
          />
        </Col>
        <Col xs="auto">
          <Button
            variant="link"
            disabled={!(value || (value === undefined && defaultValue))}
            onClick={() => {
              setCurrentValue(null);
              setImageUrl(null);
              inputRef.current.value = null;
              onChange(name, null);
            }}
          >
            Remove
          </Button>
        </Col>
        <Col xs="auto">
          <Button
            variant="link"
            disabled={!(defaultValue && value !== undefined && value !== defaultValue)}
            onClick={() => {
              setCurrentValue(undefined);
              setImageUrl(getDefaultImageUrl(defaultValue));
              inputRef.current.value = null;
              onChange(name, undefined);
            }}
          >
            Reset
          </Button>
        </Col>
      </Row>

      {imageUrl && <img src={imageUrl} alt={name} className="image-control-src" />}
    </div>
  );
};

export default ImageControl;
