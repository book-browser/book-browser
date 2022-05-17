import { FormikErrors, FormikTouched } from 'formik';
import { useState } from 'react';
import { Party } from 'types/party';
import { Publisher } from 'types/publisher';

export declare type PublishersFieldProps = {
  name?: string;
  value?: Partial<Publisher>[];
  touched?: FormikTouched<Publisher[]>;
  errors?: FormikErrors<Publisher[]>;
  onChange?: (name: string, newValue: Partial<Publisher>[]) => void;
  onBlur?: (name: string) => void;
};

export const PublishersField = ({ name, value = [], touched, errors, onChange, onBlur }) => {
  const [publishers, setPublishers] = useState<Party[]>([]);
};

export default PublishersField;
