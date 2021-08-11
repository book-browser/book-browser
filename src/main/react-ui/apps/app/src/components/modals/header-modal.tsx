import { ErrorAlert } from 'components/error/error-alert';
import LoginForm from 'components/form/login-form/login-form';
import { useLogin, useRegister, useUser } from 'hooks/user.hook';
import React from 'react';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { LoginRequest } from 'types/login-request';
import { Link } from 'react-router-dom'; 
import { useEffect } from 'react';
import { RegisterRequest } from 'types/register-request';
import RegisterForm from 'components/form/register-form/register-form';
import RegisterSuccess from 'components/message/register-success/register-success';

export type HeaderModalTab = 'login' | 'register' | 'recover';

export interface HeaderModalProps {
  defaultTab: HeaderModalTab
  show: boolean
  onHide: () => void
}

const LoginModalContent = ({ setActiveTab } : {
  setActiveTab: React.Dispatch<React.SetStateAction<HeaderModalTab>>
}) => {
  const { execute: login, error } = useLogin();
  const [valid, setValid] = useState(false);

  const onSubmit = (data: LoginRequest) => {
    login(data);
  };

  const onChange = (_data: LoginRequest, valid: boolean) => {
    setValid(valid);
  }
 
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LoginForm
          onChange={onChange}
          onSubmit={onSubmit}
          footer={
            <div>
              {error && <ErrorAlert error={error} />}
              <Button variant="primary" type="submit" disabled={!valid}>Login</Button>
              <p className="text-center"><Button variant="link" onClick={() => setActiveTab('recover')}>Forgot Password?</Button></p>
              <p className="text-center">Don't have an account? <Button variant="link" onClick={() => setActiveTab('register')}>Register</Button></p>
            </div>
          }
        />
      </Modal.Body>
    </>
  );
};

const RegisterSuccessStep = ({ setActiveTab } : {
  setActiveTab: React.Dispatch<React.SetStateAction<HeaderModalTab>>
}) => {
  return (
    <RegisterSuccess 
      footer={(
        <Button variant="link" onClick={() => setActiveTab('login')}>Login</Button>
      )}
    />
  );
}

const RegisterStep = ({ valid, error, onChange, onSubmit, setActiveTab }: {
  valid: boolean
  error?: Error
  onChange: (data: RegisterRequest, valid: boolean) => void
  onSubmit: (data: RegisterRequest) => void
  setActiveTab: React.Dispatch<React.SetStateAction<HeaderModalTab>>
}) => {
  return (
    <RegisterForm
      onChange={onChange}
      onSubmit={onSubmit}
      footer={
        <div>
          {error && <ErrorAlert error={error} />}
          <Button variant="primary" type="submit" disabled={!valid}>Register</Button>
          <p className="text-center"><Button variant="link" onClick={() => setActiveTab('recover')}>Forgot Password?</Button></p>
          <p className="text-center">Already have an account? <Button variant="link" onClick={() => setActiveTab('login')}>Login</Button></p>
        </div>
      }
    />
  );
}

const RegisterModalContent = ({ setActiveTab } : {
  setActiveTab: React.Dispatch<React.SetStateAction<HeaderModalTab>>
}) => {
  const { execute: register, executed, error } = useRegister();
  const [valid, setValid] = useState(false);

  const onSubmit = (data: RegisterRequest) => {
    register(data);
  };

  const onChange = (_data: RegisterRequest, valid: boolean) => {
    setValid(valid);
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {executed && !error && <RegisterSuccessStep setActiveTab={setActiveTab} />}
        {(!executed || error) && (
          <RegisterStep
            valid={valid}
            error={error}
            onChange={onChange}
            onSubmit={onSubmit}
            setActiveTab={setActiveTab}
          />
        )}
      </Modal.Body>
    </>
  );
}

const HeaderModal = ({
  defaultTab,
  show,
  onHide
}: HeaderModalProps) => {

  const [activeTab, setActiveTab] = useState(defaultTab);

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      onHide();
    }
  }, [user]);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab, show])

  return (
    <Modal animation={false}  show={show} onHide={onHide}>
      {activeTab === 'login' && <LoginModalContent setActiveTab={setActiveTab} />}
      {activeTab === 'register' && <RegisterModalContent setActiveTab={setActiveTab} />}
    </Modal>
  )
}

export default HeaderModal;