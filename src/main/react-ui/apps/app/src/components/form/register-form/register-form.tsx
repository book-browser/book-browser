import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Formik } from 'formik';
import React, { ReactNode, useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { RegisterRequest } from 'types/register-request';
import * as yup from 'yup';
import { RequiredFieldLegend } from '../required-field-legend';
import { RequiredSymbol } from '../required-symbol';

interface RegisterFormProps {
  onSubmit?: (registerRequest: RegisterRequest) => void;
  onChange?: (registerRequest: RegisterRequest, isValid: boolean) => void;
  footer?: ReactNode;
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required()
    .max(25)
    .matches(/[a-zA-Z0-9_]+/, 'only letters, numbers, and underscores are allowed'),
  email: yup.string().required().max(50),
  password: yup.string().required().max(25),
  passwordAgain: yup.string().test('passwordMatchCheck', 'Passwords must match', function (value) {
    return this.parent.password === value;
  })
});

const RegisterForm = ({ onSubmit, onChange, footer }: RegisterFormProps) => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    passwordAgain: ''
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
                autoComplete="off"
              />
              <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>
                Email
                <RequiredSymbol />
              </Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email && !!errors.email}
                autoComplete="off"
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
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
                  autoComplete="off"
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
            <Form.Group controlId="passwordAgain">
              <Form.Label>
                Re-enter Password
                <RequiredSymbol />
              </Form.Label>
              <InputGroup className="mb-2">
                <Form.Control
                  type={passwordVisible ? 'text' : 'password'}
                  name="passwordAgain"
                  value={values.passwordAgain}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.passwordAgain && !!errors.passwordAgain}
                  autoComplete="off"
                />
                <Button
                  variant="outline-secondary"
                  title={passwordVisible ? 'Hide Password' : 'Show Password'}
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {!passwordVisible && <VisibilityIcon fontSize="inherit" />}
                  {passwordVisible && <VisibilityOffIcon fontSize="inherit" />}
                </Button>
                <Form.Control.Feedback type="invalid">{errors.passwordAgain}</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            {footer}
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
