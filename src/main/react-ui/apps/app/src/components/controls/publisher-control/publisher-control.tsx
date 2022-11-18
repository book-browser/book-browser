import { useFindAllPublisher } from 'hooks/party.hook';
import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { Party } from 'types/party';
import { debounce } from 'debounce';
import { noop } from 'utils/noop';

export type PublisherControlProps = {
  id: string;
  name: string;
  value?: { fullName: string; partyId?: number };
  isInvalid?: boolean;
  onChange?: (value: { fullName: string; partyId?: number }) => void;
  onBlur?: (name: string) => void;
};

export const PublisherControl = ({
  id,
  name,
  value,
  isInvalid,
  onChange = noop,
  onBlur = noop
}: PublisherControlProps) => {
  const [publishers, setPublishers] = useState<Party[]>([]);
  const { data: fetchedPublishers, execute } = useFindAllPublisher();

  const selectOptions = publishers?.map(({ id, fullName }) => ({ value: id, label: fullName }));

  useEffect(() => {
    if (fetchedPublishers) {
      setPublishers(fetchedPublishers.items);
    }
  }, [fetchedPublishers]);

  return (
    <CreatableSelect
      value={value?.fullName && { label: value.fullName, value: value.partyId }}
      inputId={`${id}`}
      name={name}
      options={selectOptions}
      onChange={(data) => {
        let newValue;
        if (data.__isNew__) {
          newValue = {
            partyId: undefined,
            fullName: data.label
          };
        } else {
          newValue = {
            partyId: data.value,
            fullName: data.label
          };
        }
        onChange(newValue);
      }}
      onInputChange={(data) => {
        if (data.length > 0) {
          debounce(execute, 200)({ name: data });
        }
      }}
      onBlur={() => onBlur(name)}
      styles={{
        control: (styles) => ({
          ...styles,
          borderColor: isInvalid ? '#dc3545' : styles.borderColor,
          '&:hover': {
            borderColor: isInvalid ? '#dc3545' : styles['&:hover'].borderColor
          }
        })
      }}
    />
  );
};
