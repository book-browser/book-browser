import Delete from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { CircularProgress, Container } from '@mui/material';
import { ErrorAlert } from 'components/error/error-alert';
import Loading from 'components/loading/loading';
import { ErrorMessage } from 'components/message/error-message/error-message';
import Message from 'components/message/message';
import SeriesDetails from 'components/series-details/series-details';
import { useDeleteSeriesById, useGetById } from 'hooks/series.hook';
import React, { useEffect } from 'react';
import { Breadcrumb, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

const SeriesPage = () => {
  const { data: series, execute, loading, error } = useGetById();
  const {
    execute: deleteSeries,
    loading: deleting,
    error: deleteError,
    executed: executedDelete
  } = useDeleteSeriesById();

  const { id } = useParams();

  console.log(deleteError);

  const onDelete = () => {
    if (window.confirm('Are you sure that you want to delete this series?')) {
      deleteSeries(series.id);
    }
  };

  useEffect(() => {
    execute(Number(id));
  }, [id, execute]);

  useEffect(() => {
    if (series) {
      document.title = `${series.title} | BookBrowser`;
    } else {
      document.title = 'BookBrowser';
    }
  }, [series]);

  const SeriesPageHeader = () => {
    return (
      <div className="d-flex align-items-baseline mb-2">
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/home' }}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/series' }}>
            Series
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{series.title}</Breadcrumb.Item>
        </Breadcrumb>
        <Button as={Link as any} to={`/series/${series.id}/edit`} className="ms-auto" variant="primary">
          <EditIcon /> Edit
        </Button>
        {!deleting && (
          <Button variant="outline-danger" className="ms-2" onClick={onDelete}>
            <Delete /> Delete
          </Button>
        )}
        {deleting && (
          <Button variant="outline-danger" className="ms-2" onClick={onDelete} disabled={deleting}>
            <Delete /> Deleting <CircularProgress color="error" size="0.95rem" />
          </Button>
        )}
      </div>
    );
  };

  const SeriesPageContent = () => {
    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <ErrorMessage error={error} />;
    }

    if (executedDelete && !deleteError) {
      return <Message variant="success" title="Success" lead="This series has been deleted" />;
    }

    if (series) {
      return (
        <>
          <SeriesPageHeader />
          {deleteError && (
            <ErrorAlert uiMessage="Something went wrong. Unable to delete your entry." error={deleteError} />
          )}
          <SeriesDetails series={series} />
        </>
      );
    }

    return null;
  };

  return (
    <Container maxWidth="lg">
      <SeriesPageContent />
    </Container>
  );
};

export default SeriesPage;
