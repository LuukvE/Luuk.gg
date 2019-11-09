import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import {
  Anchor,
  Box,
  Image,
  Text,
  Paragraph,
  ResponsiveContext,
} from 'grommet';
import { Next } from 'grommet-icons';

import Header from '../../components/Header';
import Section from './Section';

const Tile = ({ desc, label, link, src }) => {
  const size = useContext(ResponsiveContext);
  const imgWidth = size === 'medium' ? 365 : 482;
  return (
    <Box align="center" size="small" pad={{ horizontal: 'large' }}>
      <Anchor
        size="xlarge"
        href={link}
        label={<Text size="large">{label}</Text>}
        icon={<Next color="accent-1" />}
        reverse
        target="_blank"
      />
      <Paragraph textAlign="center" size="xlarge" alignSelf="center">
        {desc}
      </Paragraph>
      <Box flex />
      <Image width={imgWidth} src={src} />
    </Box>
  );
};

Tile.propTypes = {
  desc: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export const Tools = () => {
  return (
    <Box>
      <Section pad={{ top: 'xlarge' }} background="neutral-2">
        <Header
          label="but wait there's more"
          summary="we've been hard at work on making grommet even easier to learn and use"
        />
        <Box
          direction="row-responsive"
          justify="center"
          gap="large"
          margin={{ horizontal: 'large', top: 'large' }}
        >
          <Tile
            desc="build experiences with grommet components; then publish and share
              your ideas with a simple wysiwg interface"
            label="Grommet Designer (beta)"
            link="https://designer.grommet.io/"
            src="/img/tools/designer.png"
          />
          <Tile
            desc="want grommet to look like your brand? plug your details in and
              share it or import it into to grommet designer"
            label="Grommet Themer (beta)"
            link="https://theme-designer.grommet.io/"
            src="/img/tools/themer.png"
          />
        </Box>
      </Section>
    </Box>
  );
};
