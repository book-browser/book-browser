import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Formik } from 'formik';
import React, { ReactNode, useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { LoginRequest } from 'types/login-request';
import * as yup from 'yup';
import { RequiredFieldLegend } from '../required-field-legend';
import { RequiredSymbol } from '../required-symbol';

interface LoginFormProps {
  onSubmit?: (loginRequest: LoginRequest) => void;
  onChange?: (loginRequest: LoginRequest, isValid: boolean) => void;
  footer?: ReactNode;
}

const validationSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required()
});

const LoginForm = ({ onSubmit, onChange, footer }: LoginFormProps) => {
  const initialValues = {
    username: '',
    password: '',
    rememberMe: false
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        setFieldTouched,
        values,
        touched,
        isValid,
        errors
      }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          if (values !== initialValues) {
            onChange(values, isValid);
          }
        }, [values, isValid]);

        return (
          <Form noValidate onSubmit={handleSubmit}>
            <RequiredFieldLegend />
            <Form.Group controlId="username">
              <Form.Label>
                Username
                <RequiredSymbol />
              </Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.username && !!errors.username}
              />
              <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>
                Password
                <RequiredSymbol />
              </Form.Label>
              <InputGroup className="mb-2">
                <Form.Control
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.password && !!errors.password}
                />
                <Button
                  variant="outline-secondary"
                  title={passwordVisible ? 'Hide Password' : 'Show Password'}
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {!passwordVisible && <VisibilityIcon fontSize="inherit" />}
                  {passwordVisible && <VisibilityOffIcon fontSize="inherit" />}
                </Button>
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="remember-me">
              <Form.Check
                type="checkbox"
                name="rememberMe"
                label="Remember me"
                checked={values.rememberMe}
                onChange={handleChange}
              />
            </Form.Group>
            {footer}
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
