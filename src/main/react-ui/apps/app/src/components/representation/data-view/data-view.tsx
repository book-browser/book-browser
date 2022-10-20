import React, { ReactNode } from 'react';
import './data-view.scss';

export type DataViewItem<E> = {
  heading: string;
  content: (data: E) => ReactNode;
  hidden?: (data: E) => boolean;
};

export type DataViewProps<E> = {
  items: DataViewItem<E>[];
  data: E;
};

export const DataView = <E,>({ items, data }: DataViewProps<E>) => {
  return (
    <div className="data-view">
      {items
        .filter((item) => !item.hidden || !item.hidden(data))
        .map((item) => (
          <div className="data-view-item" key={item.heading}>
            <div className="data-view-heading">{item.heading}</div>
            <div>{item.content(data)}</div>
          </div>
        ))}
    </div>
  );
};

export default DataView;
