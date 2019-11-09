import React from 'react';
import stringify from 'json-stringify-pretty-compact';
import { Box } from 'grommet';

const Values = ({ name, values, defaultValue }) => {
  let content = (
    <Box>
      {values
        .filter(v => !v.type)
        .map((value, index) => {
          if (value === 'boolean') {
            return [true, false].map(v => {
              if (v === defaultValue) {
                return (
                  <span key={v}>
                    <strong>{stringify(v)}</strong>
                  </span>
                );
              }
              return <span key={v}>{stringify(v)}</span>;
            });
          }
          let valueContent = value.trim();
          let isDefault =
            valueContent === defaultValue ||
            (defaultValue === true && valueContent === 'true') ||
            (defaultValue === false && valueContent === 'false');
          if (
            values.length === 1 &&
            (valueContent === 'string' || valueContent === 'number') &&
            defaultValue !== undefined
          ) {
            valueContent = defaultValue;
            isDefault = true;
          }
          if (value !== 'true' && value !== 'false' && value !== 'number') {
            valueContent = `"${valueContent}"`;
          }
          if (isDefault) {
            valueContent = <strong>{valueContent}</strong>;
          }
          return <span key={`${index + 0}`}>{valueContent}</span>;
        })}
    </Box>
  );
  if (name) {
    content = (
      <Box direction="row" gap="small">
        {name}
        {content}
      </Box>
    );
  }
  content = (
    <Box>
      {content}
      {values
        .filter(v => v.type)
        .map((value, index) => (
          <Value key={`${index + 0}`} value={value} />
        ))}
    </Box>
  );
  return content;
};

export const Value = ({ value: { name, type, values }, defaultValue }) => {
  let content = (
    <Values name={name} values={values} defaultValue={defaultValue} />
  );
  if (type === 'object' || type === 'array') {
    content = (
      <Box>
        {type === 'array' ? '[' : '{'}
        <Box pad={{ left: 'medium' }}>{content}</Box>
        {type === 'array' ? ']' : '}'}
      </Box>
    );
  }
  return content;
};
