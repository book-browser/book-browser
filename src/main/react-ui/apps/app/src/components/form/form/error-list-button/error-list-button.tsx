import { Error } from '@mui/icons-material';
import { FormikErrors, FormikValues } from 'formik';
import React, { useState } from 'react';
import { OverlayTrigger, Popover, ToggleButton } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { flatten } from 'utils/object-utils';

export type ErrorListButtonProps<Values extends FormikValues> = {
  errors: FormikErrors<Values>;
};

const ErrorListButton = <Values,>({ errors }: ErrorListButtonProps<Values>) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const flattenedErrors = flatten(errors);

  const entries = Object.entries(flattenedErrors);

  if (entries.length > 0) {
    return (
      <OverlayTrigger
        trigger="click"
        placement="top"
        overlay={
          <Popover>
            <Popover.Body>
              <ul style={{ paddingLeft: '10px' }}>
                {entries.map(([key, value]) => {
                  const element =
                    document.getElementsByName(key)[0] ||
                    document.getElementsByName(key.substring(0, key.lastIndexOf('[')))[0];
                  const id = element.id ? element.id : element.closest('[id]').id;
                  return <li key={key}>{id ? <a href={`${location.pathname}#${id}`}>{value}</a> : value}</li>;
                })}
              </ul>
            </Popover.Body>
          </Popover>
        }
      >
        <ToggleButton
          type="checkbox"
          variant="outline-danger"
          className="mx-2"
          checked={open}
          value={`${open}`}
          onClick={() => setOpen(!open)}
        >
          <Error /> {`${entries.length} ${entries.length === 1 ? 'Error' : 'Errors'}`}
        </ToggleButton>
      </OverlayTrigger>
    );
  }
  return null;
};

export default ErrorListButton;
