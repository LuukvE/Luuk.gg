import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Keyboard, TextInput } from 'grommet';
import { Search as SearchIcon } from 'grommet-icons';
import { nameToPath } from '../routing';
import { RouterContext } from '../Router';

const allSuggestions = []; // todo

const Search = ({ open, setOpen }) => {
  const { go } = React.useContext(RouterContext);
  const [value, setValue] = React.useState('');
  const [suggestions, setSuggestions] = React.useState(allSuggestions);
  const inputRef = React.createRef();

  React.useEffect(() => {
    if (inputRef.current && open) {
      inputRef.current.focus();
    }
  }, [open]);

  const onChange = event => {
    const {
      target: { value: nextValue },
    } = event;
    let nextSuggestions;
    if (nextValue) {
      const regexp = new RegExp(nextValue, 'i');
      nextSuggestions = allSuggestions.filter(c => regexp.test(c));
    } else {
      nextSuggestions = allSuggestions;
    }
    // don't use newer value if nothing matches it
    if (nextSuggestions.length > 0) {
      setValue(nextValue);
      setSuggestions(nextSuggestions);
    }
  };

  const onEnter = () => {
    if (value) {
      if (suggestions.length === 1) {
        go(nameToPath(suggestions[0]));
      } else {
        const matches = allSuggestions.filter(
          c => c.toLowerCase() === value.toLowerCase(),
        );
        if (matches.length === 1) {
          go(nameToPath(matches[0]));
        }
      }
    }
  };

  const onSelect = event => {
    go(nameToPath(event.suggestion));
  };

  if (open) {
    return (
      <Keyboard
        onEsc={() => {
          setOpen(false);
        }}
        onEnter={onEnter}
      >
        <TextInput
          ref={inputRef}
          name="search-components"
          dropHeight="medium"
          placeholder="search..."
          value={value}
          suggestions={suggestions}
          onChange={onChange}
          onSelect={onSelect}
          onSuggestionsOpen={() => {
            setOpen(true);
          }}
          onSuggestionsClose={() => {
            setOpen(false);
          }}
        />
      </Keyboard>
    );
  }

  return (
    <Button
      plain
      onClick={() => {
        setOpen(true);
      }}
    >
      {({ hover }) => (
        <Box
          round="xlarge"
          pad="small"
          background={hover ? 'active' : undefined}
        >
          <SearchIcon />
        </Box>
      )}
    </Button>
  );
};

Search.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default Search;
