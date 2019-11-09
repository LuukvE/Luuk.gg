import React from 'react';
import PropTypes from 'prop-types';
import stringify from 'json-stringify-pretty-compact';
import { Box, Text } from 'grommet';

export const Syntax = ({ syntax, format, defaultValue, leaf }) => {
  if (!leaf && Array.isArray(syntax)) {
    return (
      <>
        {syntax.map((s, i) => (
          <Syntax
            key={`${i + 0}`}
            syntax={s}
            leaf
            defaultValue={defaultValue}
          />
        ))}
      </>
    );
  }
  let content = syntax;
  if (typeof syntax === 'object' && syntax.VALUES) {
    return Object.keys(syntax.VALUES).map(key => {
      const values = syntax.VALUES[key];
      return (
        <Box key={key} margin={{ top: 'small' }}>
          <Text color="dark-3">{`where ${key} could be:`}</Text>
          {Array.isArray(values) ? (
            values.map(v => (
              <Text key={v} margin={{ left: 'medium' }}>
                {stringify(v)}
              </Text>
            ))
          ) : (
            <Text>{values}</Text>
          )}
        </Box>
      );
    });
  }
  if (
    format !== 'function' &&
    syntax[0] !== '(' &&
    syntax[0] !== '<' &&
    syntax[0] !== '['
  ) {
    content = stringify(syntax, { maxLength: 40 });
    content = <code className="language-json">{content}</code>;
  }
  if (defaultValue !== undefined && syntax === defaultValue) {
    content = <strong>{content}</strong>;
  }
  return <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{content}</pre>;
};

Syntax.propTypes = {
  syntax: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  format: PropTypes.string,
  defaultValue: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  leaf: PropTypes.bool,
};

Syntax.defaultProps = {
  defaultValue: undefined,
  format: undefined,
  leaf: false,
};
