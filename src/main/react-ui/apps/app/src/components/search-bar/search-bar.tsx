import { useSearch } from 'hooks/book.hook';
import React, { useCallback, useRef, useState } from 'react';
import { AsyncTypeahead, Menu, useItem } from 'react-bootstrap-typeahead';
import { Book } from 'types/book';
import './search-bar.scss';
import { Link, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { Button, InputGroup } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';


const SearchBarOption =({ option, position }: {
  option: Book,
  position: number
}) => {
  const newProps = useItem({ option, position});
  const props = {
    ...newProps,
    active: undefined,
  }
  
  return (
    <Link to={`/book/${option.id}`} className={`dropdown-item ${newProps.active ? 'active' : ''}`} {...props}>
      <div className="search-option">
        <img className="search-option-thumbnail" src={`/api/book/${option.id}/thumbnail`} />
        <div>
          <strong>{option.title}</strong>
        </div>
      </div>
    </Link>
  )
}

const SearchBar = () => {
  const { data, loading, execute } = useSearch();
  const history = useHistory();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [text, setText] = useState('');
  const ref = useRef(null);

  const filterBy = () => true;

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (activeIndex != -1) {
        history.push(`/book/${data[activeIndex].id}`)
      } else if (text.length > 0) {
        history.push(`/search?query=${encodeURIComponent(text)}`)
      } else {
        history.push(`/search`)
      }
      ref.current.clear();
    }
  }

  const onInputChange = (text: string) => {
    setText(text);
  }

  const onChange = () => {
    ref.current.clear();
  }

  const onFocus = () => {
    ref.current.inputNode.setSelectionRange(0, text.length);
  }

  return (
    <InputGroup>
      <AsyncTypeahead 
        ref={ref}
        filterBy={filterBy}
        id='search-bar'
        isLoading={loading}
        labelKey={() => text}
        onSearch={useCallback((query) => execute({ query }), [])}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onInputChange={onInputChange}
        onChange={onChange}
        options={data ? data : []}
        renderMenu={(results, menuProps) => (
          <Menu {...menuProps}>
            {results.map((result, index) => <SearchBarOption key={index} option={result} position={index} />)}
          </Menu>
        )}
      >
        {(state) => {
          useEffect(() => setActiveIndex(state.activeIndex), [state.activeIndex])
        // Passing a child render function to the component exposes partial
        // internal state, including the index of the highlighted menu item.
      }}
      </AsyncTypeahead>
      <InputGroup.Append>
        <Button variant="secondary">
          <SearchIcon fontSize="small" />
        </Button>
      </InputGroup.Append>
    </InputGroup> 
  );
}

export default SearchBar;