import { CircularProgress } from '@mui/material';
import { ErrorAlert } from 'components/error/error-alert';
import LoginForm from 'components/form/login-form/login-form';
import RegisterForm from 'components/form/register-form/register-form';
import RegisterSuccess from 'components/message/register-success/register-success';
import { useLogin, useRegister, useSendUsernameEmail, useUser } from 'hooks/user.hook';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { LoginRequest } from 'types/login-request';
import { RegisterRequest } from 'types/register-request';

export type HeaderModalTab = 'login' | 'register' | 'recover';

export interface HeaderModalProps {
  defaultTab: HeaderModalTab
  show: boolean
  onHide: () => void
}

const LoginModalContent = ({ setActiveTab } : {
  setActiveTab: React.Dispatch<React.SetStateAction<HeaderModalTab>>
}) => {
  const { execute: login, error, loading } = useLogin();
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
              {error && <ErrorAlert uiMessage="Unable to login." error={error} />}
              <div className="mb-3">
                {!loading && <Button variant="primary" className="w-100" type="submit" disabled={!valid}>Login</Button>}
                {loading && <Button variant="primary" className="w-100" type="submit" disabled>Loading <CircularProgress color="inherit" size={"15px"} /></Button>}
              </div>
              <div className="text-center"><Button variant="link" onClick={() => setActiveTab('recover')}>Forgot Username?</Button></div>
              <div className="text-center align-baseline">Don't have an account? <Button variant="link" onClick={() => setActiveTab('register')}>Register</Button></div>
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

const RegisterStep = ({ valid, error, loading, onChange, onSubmit, setActiveTab }: {
  valid: boolean
  error?: Error
  loading: boolean
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
          {error && <ErrorAlert uiMessage="Something went wrong. Unable to Register." error={error} />}
          {!loading && <Button className="mb-4 w-100" variant="primary" type="submit" disabled={!valid}>Register</Button>}
          {loading && <Button className="mb-4 w-100" variant="primary" type="submit" disabled>Registering <CircularProgress color="inherit" size={"15px"} /></Button>}
          <p className="text-center"><Button variant="link" onClick={() => setActiveTab('recover')}>Forgot Username?</Button></p>
          <p className="text-center">Already have an account? <Button variant="link" onClick={() => setActiveTab('login')}>Login</Button></p>
        </div>
      }
    />
  );
}

const RegisterModalContent = ({ setActiveTab } : {
  setActiveTab: React.Dispatch<React.SetStateAction<HeaderModalTab>>
}) => {
  const { execute: register, executed, error, loading } = useRegister();
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
            loading={loading}
            onChange={onChange}
            onSubmit={onSubmit}
            setActiveTab={setActiveTab}
          />
        )}
      </Modal.Body>
    </>
  );
}

const UsernameRecoveryContent = ({ setActiveTab } : {
  setActiveTab: React.Dispatch<React.SetStateAction<HeaderModalTab>>
}) => {
  const [email, setEmail] = useState('');
  const { execute, executed, loading, error } = useSendUsernameEmail();

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEmail(e.target.value);
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Recover Username</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please enter the email address that you want to send the username to.</p>
        <div>
          <Form.Group controlId="email-input">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="text"
              name="email-input"
              value={email}
              onChange={onChange}
            />
          </Form.Group>
        </div>
        <div className="mb-3">
          {!loading && <Button className="w-100" variant="primary" disabled={email.length === 0} onClick={() => execute(email)}>Send</Button>}
          {loading && <Button className="w-100" variant="primary" disabled>Resending <CircularProgress color="inherit" size={"15px"} /></Button>}
        </div>
        <Form.Text className="mb-3" muted>
          If you still have not received the email, please check your "Spam" or "Trash" folder in your email.  
        </Form.Text>
        <div className="text-center mb-3">
          <Button variant="link" onClick={() => setActiveTab('login')}>Login</Button>
          {` | `}
          <Button variant="link" onClick={() => setActiveTab('register')}>Register</Button>

        </div>
        {error && <ErrorAlert uiMessage="Something went wrong. Unable to process your request." error={error} />}
        {executed && !error && <Alert variant="success">Username Email Sent!</Alert>}
      </Modal.Body>
    </>
  )
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
      {activeTab === 'recover' && <UsernameRecoveryContent setActiveTab={setActiveTab} />}
    </Modal>
  )
}

export default HeaderModal;