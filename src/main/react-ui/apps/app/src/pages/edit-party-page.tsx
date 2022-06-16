import { CircularProgress, Container } from '@mui/material';
import { DeepPartial } from '@reduxjs/toolkit';
import { ErrorAlert } from 'components/error/error-alert';
import { PartyForm } from 'components/form/party-form/party-form';
import Loading from 'components/loading/loading';
import { NotFound } from 'components/message/not-found/not-found';
import { useGetPartyById, useCreateOrUpdateParty } from 'hooks/party.hook';
import React, { useEffect, useState } from 'react';
import { Alert, Breadcrumb, Button } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ApiError } from 'types/api-error';
import { Party } from 'types/party';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UNSAVED_MESSAGE = 'Are you sure that you want to leave with unsaved changes?';

export const EditPartyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: loadedParty, execute: load, loading: loadingParty, error: loadError } = useGetPartyById();
  const { data: savedParty, execute: save, loading: savingParty, error: saveError } = useCreateOrUpdateParty();
  const notFound = loadError?.name === 'ApiError' && (loadError as ApiError)?.status === 404;

  const [party, setParty] = useState<DeepPartial<Party>>();
  const [saved, setSaved] = useState(true);

  const onChange = (changedParty: DeepPartial<Party>) => {
    setParty(changedParty);
    setSaved(false);
  };

  const onSubmit = (partySubmission: DeepPartial<Party>) => {
    save(partySubmission);
  };

  const reset = () => {
    setParty(savedParty || loadedParty);
  };

  const cancel = () => {
    navigate(`/parties/${party.id}`);
  };

  useEffect(() => {
    if (party) {
      document.title = `Edit ${(savedParty || loadedParty).fullName}${saved ? '' : '*'} | BookBrowser`;
    } else {
      document.title = 'Edit | BookBrowser';
    }
  }, [party, savedParty, loadedParty, saved]);

  useEffect(() => {
    load(Number(id));
  }, [id, load]);

  useEffect(() => {
    if (loadedParty) {
      setParty(loadedParty);
    }
  }, [loadedParty]);

  useEffect(() => {
    if (savedParty) {
      setParty(savedParty);
      setSaved(true);
    }
  }, [savedParty]);

  return (
    <Container maxWidth="md" className="mt-3">
      {loadingParty && <Loading />}
      {loadError && !notFound && (
        <ErrorAlert uiMessage="Something went wrong. Unable to load this entry." error={loadError} />
      )}
      {loadError && notFound && <NotFound />}
      {party && (
        <div>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home' }}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Party</Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/parties/${party.id}` }}>
              {(savedParty || loadedParty)?.fullName}
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Edit</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="heading-main">Edit Party</h1>
          <PartyForm
            value={party}
            onChange={onChange}
            onSubmit={onSubmit}
            footer={
              <div>
                {saveError && (
                  <ErrorAlert uiMessage="Something went wrong. Unable to save this entry." error={saveError} />
                )}
                {!saveError && savedParty && (
                  <Alert variant="success" className="mb-2">
                    Changes successfully saved
                  </Alert>
                )}
                <div className="d-flex">
                  <Button className="me-2" variant="secondary" disabled={savingParty} onClick={cancel}>
                    Cancel
                  </Button>
                  <Button className="me-auto" variant="secondary" disabled={savingParty} onClick={reset}>
                    Reset
                  </Button>
                  <Button variant="primary" type="submit" disabled={savingParty}>
                    {!savingParty && <span>Save</span>}
                    {savingParty && (
                      <span>
                        Saving <CircularProgress color="secondary" size={'15px'} />
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            }
          />
          {/* <Prompt when={!saved} message={UNSAVED_MESSAGE} /> */}
        </div>
      )}
    </Container>
  );
};

export default EditPartyPage;
