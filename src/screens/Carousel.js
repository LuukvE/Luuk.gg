import React from 'react';

import { Box, Carousel } from 'grommet';
import { Next, Previous } from 'grommet-icons';
import { doc, themeDoc } from 'grommet/components/Carousel/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import Item from './Components/Item';

const desc = doc(Carousel).toJSON();

export default () => (
  <Page>
    <Doc
      name="Carousel"
      desc={desc}
      code={`<Box height="small" width="medium" overflow="hidden">
  <Carousel fill>
    <Image fit="cover" src="//v2.grommet.io/assets/Wilderpeople_Ricky.jpg" />
    <Image fit="cover" src="//v2.grommet.io/assets/IMG_4245.jpg" />
    <Image fit="cover" src="//v2.grommet.io/assets/IMG_4210.jpg" />
  </Carousel>
</Box>`}
      themeDoc={themeDoc}
    />
  </Page>
);

export const CarouselItem = ({ name, path }) => (
  <Item name={name} path={path} center pad="none">
    <Box fill direction="row" justify="between" align="center" gap="small">
      <Box
        height="xsmall"
        background="white"
        elevation="medium"
        justify="center"
        pad="small"
      >
        <Previous size="medium" color="brand" />
      </Box>
      <Box
        width="medium"
        height="xsmall"
        background="white"
        elevation="medium"
      />
      <Box
        height="xsmall"
        background="white"
        elevation="medium"
        justify="center"
        pad="small"
      >
        <Next size="medium" color="brand" />
      </Box>
    </Box>
  </Item>
);

CarouselItem.propTypes = Item.propTypes;
