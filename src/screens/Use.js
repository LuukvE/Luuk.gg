import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Anchor, Box, Heading, Markdown, Text } from 'grommet';
import Page from '../components/Page';
import Header from '../components/Header';

const Item = ({ label, snippet, description }) => (
  <Box border="bottom" margin={{ bottom: 'large' }} pad={{ bottom: 'medium' }}>
    <Box direction="row" responsive justify="between">
      <Text size="large" margin={{ bottom: 'small' }}>
        <strong>{label}</strong>
      </Text>
      <Text>{snippet}</Text>
    </Box>
    <Markdown>{description}</Markdown>
  </Box>
);

Item.propTypes = {
  description: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  snippet: PropTypes.node.isRequired,
};

export default class Use extends Component {
  componentDidMount() {
    document.title = 'Use - Grommet';
  }

  render() {
    return (
      <Page>
        <Header label="Start" />

        <Box pad={{ bottom: 'large' }}>
          <Heading level={2}>New Application</Heading>
          <Item
            label="new application"
            snippet={<code>grommet new [app-name]</code>}
            description="Generate a new application."
          />

          <Heading level={2}>Existing Application</Heading>
          <Item
            label="grommet library"
            snippet={<code>npm install grommet --save</code>}
            description="Get grommet on your local environment."
          />
          <Item
            label="grommet icons"
            snippet={<code>npm install grommet-icons --save</code>}
            description="SVG icon library built for React apps and most
              importantly grommet! Learn
              more, [icons.grommet.io](https://icons.grommet.io)."
          />

          <Heading level={2}>Design Elements</Heading>
          <Item
            label="sketch resources"
            snippet={
              <Anchor href="https://github.com/grommet/grommet-design">
                github
              </Anchor>
            }
            description="Are you a designer? Use [Sketch](https://www.sketchapp.com)?
              Grab our library and templates to start designing with grommet."
          />
        </Box>
      </Page>
    );
  }
}
