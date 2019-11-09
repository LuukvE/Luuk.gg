import React from 'react';
import PropTypes from 'prop-types';
import { Box, Anchor, Heading, Text } from 'grommet';
import { Link as LinkIcon } from 'grommet-icons';
import { genericSyntaxes } from '../../utils/props';
import { Prop } from './Prop';

export const Props = ({ desc, examples, syntaxes }) => (
  <Box
    id="props"
    margin={{ vertical: 'large' }}
    border={{ side: 'top', size: 'medium', color: 'brand' }}
  >
    <Box
      direction="row"
      justify="between"
      align="center"
      margin={{ top: 'medium', bottom: 'xlarge' }}
    >
      <Heading level={2} margin="none">
        Props
      </Heading>
      <Anchor href="#props" icon={<LinkIcon color="light-4" />} />
    </Box>
    {desc.properties ? (
      desc.properties
        .sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        })
        .map((property, index) => (
          <Prop
            key={property.name}
            property={property}
            first={!index}
            syntax={(syntaxes || genericSyntaxes)[property.name]}
            example={examples[property.name]}
          />
        ))
    ) : (
      <Text color="light-5">No properties</Text>
    )}
  </Box>
);

Props.propTypes = {
  desc: PropTypes.shape({
    properties: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ),
  }),
  examples: PropTypes.shape({}),
  syntaxes: PropTypes.shape({}),
};

Props.defaultProps = {
  desc: undefined,
  examples: {},
  syntaxes: undefined,
};
