import StatusControl from 'components/controls/status-control/status-control';
import PricingControl from 'components/controls/pricing-control/pricing-control';
import DistributionControl from 'components/controls/distribution-control/distribution-control';
import { PublisherControl } from 'components/controls/publisher-control/publisher-control';
import { Formik, FormikConfig, FormikErrors, FormikProps, FormikValues } from 'formik';
import React, { useEffect, useState } from 'react';
import { Form as BootstrapForm } from 'react-bootstrap';
import { noop } from 'utils/noop';
import CreatorsField from './creators-field/creators-field';
import DateControl from './date-control/date-control';
import ImageControl from './image-control/image-control';
import LinksField from './links-field/links-field';
import MarkdownControl from './markdown-control/markdown-control';
import { PublisherField } from './publishers-field/publisher-field';
import PublishersField from './publishers-field/publishers-field';
import SeriesControl from './series-control/series-control';

// eslint-disable-next-line @typescript-eslint/ban-types
export type FormProps<Values extends FormikValues, ExtraProps = {}> = Omit<
  FormikConfig<Values> & ExtraProps,
  'onSubmit'
> & {
  value?: Values;
  onChange?: (values: Values, valid: boolean, errors: FormikErrors<Values>) => void;
  onSubmit?: (values: Values) => void;
  children: (bag: FormikProps<Values>) => React.ReactNode;
};

export const Form = <Values,>({ onChange = noop, onSubmit = noop, children, ...props }: FormProps<Values>) => {
  const [value, setValue] = useState<Values>(props.initialValues);
  const actualValue = props.value || value;

  return (
    <Formik {...props} onSubmit={onSubmit}>
      {(formikProps) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          if (formikProps.values !== actualValue) {
            setValue(formikProps.values);
          }
          onChange(formikProps.values, formikProps.isValid, formikProps.errors);
        }, [formikProps.values, formikProps.isValid, formikProps.errors]);

        return (
          <BootstrapForm className="mb-3" noValidate onSubmit={formikProps.handleSubmit}>
            {children(formikProps)}
          </BootstrapForm>
        );
      }}
    </Formik>
  );
};

Form.Group = BootstrapForm.Group;
Form.Label = BootstrapForm.Label;
Form.Control = BootstrapForm.Control;
Form.Text = BootstrapForm.Text;
Form.Select = BootstrapForm.Select;
Form.Check = BootstrapForm.Check;

Form.DateControl = DateControl;
Form.MarkdownControl = MarkdownControl;
Form.ImageControl = ImageControl;
Form.SeriesControl = SeriesControl;
Form.PublisherControl = PublisherControl;
Form.PricingControl = PricingControl;
Form.StatusControl = StatusControl;
Form.DistributionControl = DistributionControl;

Form.LinksField = LinksField;
Form.CreatorsField = CreatorsField;
Form.PublisherField = PublisherField;
Form.PublishersField = PublishersField;

export default Form;
