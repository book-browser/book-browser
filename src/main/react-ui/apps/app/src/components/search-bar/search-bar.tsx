import SearchIcon from '@mui/icons-material/Search';
import { usePromise } from 'hooks/promise.hook';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, InputGroup } from 'react-bootstrap';
import { AsyncTypeahead, Menu, useItem } from 'react-bootstrap-typeahead';
import { Link, useNavigate } from 'react-router-dom';
import { findAll as findAllBooks } from 'services/book.service';
import { findAll as findAllSeries } from 'services/series.service';
import { Book } from 'types/book';
import { Series } from 'types/series';
import { generateEncodedUrl } from 'utils/location-utils';
import './search-bar.scss';

const findAll = async (arg: { query: string; limit: number }) => {
  return await Promise.all([findAllBooks(arg), findAllSeries(arg)]);
};

const BookSearchBarOption = ({ option, position }: { option: Book; position: number }) => {
  const newProps = useItem({ option, position });
  const props = {
    ...newProps,
    active: undefined
  };

  return (
    <Link to={`/book/${option.id}`} className={`dropdown-item ${newProps.active ? 'active' : ''}`} {...props}>
      <div className="search-option">
        <img className="search-option-thumbnail" src={`/api/book/${option.id}/thumbnail`} />
        <div>{option.title}</div>
      </div>
    </Link>
  );
};

declare type Content = Book | Series;

const SeriesSearchBarOption = ({ option, position }: { option: Series; position: number }) => {
  const newProps = useItem({ option, position });
  const props = {
    ...newProps,
    active: undefined
  };

  return (
    <Link to={`/series/${option.id}`} className={`dropdown-item ${newProps.active ? 'active' : ''}`} {...props}>
      <div className="search-option">
        <img className="search-option-thumbnail" src={`/api/series/${option.id}/thumbnail`} />
        <div>{option.title}</div>
      </div>
    </Link>
  );
};

const SearchBar = ({ className }: { className?: string }) => {
  const { data, loading, execute } = usePromise(findAll);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [text, setText] = useState('');
  const ref = useRef(null);

  const filterBy = () => true;

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (activeIndex != -1) {
        if (activeIndex < data[0].items.length) {
          navigate(`/book/${data[0].items[activeIndex].id}`);
        } else {
          navigate(`/series/${data[1].items[data[0].items.length - activeIndex].id}`);
        }
      } else if (text.length > 0) {
        navigate(`/search?query=${encodeURIComponent(text)}`);
      } else {
        navigate(`/search`);
      }
      ref.current.clear();
    }
  };

  const onInputChange = (text: string) => {
    setText(text);
  };

  const onChange = () => {
    ref.current.clear();
  };

  const onFocus = () => {
    ref.current.inputNode.setSelectionRange(0, text.length);
  };

  return (
    <InputGroup className={`${className} flex-nowrap search-bar`}>
      <AsyncTypeahead
        ref={ref}
        filterBy={filterBy}
        id="search-bar"
        isLoading={loading}
        labelKey={() => text}
        onSearch={useCallback((query) => execute({ query, limit: 4 }), [])}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onInputChange={onInputChange}
        onChange={onChange}
        options={data ? [...data[0].items, ...data[1].items] : []}
        renderMenu={(results, menuProps) => {
          console.log(menuProps);
          return (
            <Menu {...menuProps}>
              {data && data[0].items.length > 0 && (
                <div className="search-bar-result-header">
                  Books{' '}
                  <Link
                    className="float-right"
                    to={generateEncodedUrl('/books/search', { query: text })}
                    onClick={() => ref.current.clear()}
                  >
                    View More
                  </Link>
                </div>
              )}
              {data &&
                results
                  .slice(0, data[0].items.length)
                  .map((result, index) => <BookSearchBarOption key={index} option={result as Book} position={index} />)}
              {data && data[1].items.length > 0 && (
                <div className="search-bar-result-header">
                  Series{' '}
                  <Link
                    className="float-right"
                    to={generateEncodedUrl('/series/search', { query: text })}
                    onClick={() => ref.current.clear()}
                  >
                    View More
                  </Link>
                </div>
              )}
              {data &&
                results
                  .slice(data[0].items.length, data[0].items.length + data[1].items.length)
                  .map((result, index) => (
                    <SeriesSearchBarOption
                      key={data[0].items.length + index}
                      option={result as Series}
                      position={data[0].items.length + index}
                    />
                  ))}
              {results.length > 0 && (
                <div className="search-bar-result-footer">
                  <Link to={generateEncodedUrl('/search', { query: text })} onClick={() => ref.current.clear()}>
                    View All
                  </Link>
                </div>
              )}
            </Menu>
          );
        }}
      >
        {(state) => {
          useEffect(() => setActiveIndex(state.activeIndex), [state.activeIndex]);
          // Passing a child render function to the component exposes partial
          // internal state, including the index of the highlighted menu item.
        }}
      </AsyncTypeahead>
      <Button variant="test" className="search-bar-button border-left-0 border bg-white outline-secondary">
        <SearchIcon fontSize="small" />
      </Button>
    </InputGroup>
  );
};

export default SearchBar;
