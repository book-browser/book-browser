import Loading from 'components/loading/loading';
import { NotFound } from 'components/message/not-found/not-found';
import { SomethingWentWrong } from 'components/message/something-went-wrong/something-went-wrong';
import UserVerified from 'components/message/user-verified/user-verified';
import VerificationLinkExpired from 'components/message/verification-link-expired/verification-link-expired';
import { useConfirmRegistration } from 'hooks/user.hook';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ApiError } from 'types/api-error';

const VerifyUserPage = () => {
  const { token } = useParams();
  const { execute, loading, executed, error } = useConfirmRegistration();
  const apiError = error?.name === 'ApiError' && (error as ApiError);

  useEffect(() => {
    document.title = 'Verify User | BookBrowser';
  }, []);

  useEffect(() => {
    execute(token);
  }, [execute, token]);

  if (!executed) {
    return null;
  } else if (loading) {
    return <Loading />;
  } else if (!error) {
    return <UserVerified />;
  } else if (apiError?.status === 404) {
    return <NotFound />;
  } else if (apiError?.status === 400) {
    return <VerificationLinkExpired />;
  } else {
    return <SomethingWentWrong error={error} />;
  }
};

export default VerifyUserPage;
