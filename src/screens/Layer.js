import React from 'react';

import { Box, Layer } from 'grommet';
import { doc, themeDoc } from 'grommet/components/Layer/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import Item from './Components/Item';

const desc = doc(Layer).toJSON();

export default () => (
  <Page>
    <Doc
      name="Layer"
      desc={desc}
      syntaxes={{
        margin: [
          'none',
          'xsmall',
          'small',
          'medium',
          'large',
          'any CSS size',
          {
            vertical: '...',
            horizontal: '...',
            top: '...',
            bottom: '...',
            left: '...',
            right: '...',
          },
        ],
        onClickOutside: '() => {}',
        onEsc: '() => {}',
      }}
      code={`function Example() {
  const [show, setShow] = React.useState();
  return (
    <Box>
      <Button label="show" onClick={() => setShow(true)} />
      {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >
          <Button label="close" onClick={() => setShow(false)} />
        </Layer>
      )}
    </Box>
  );
}`}
      themeDoc={themeDoc}
    />
  </Page>
);

export const LayerItem = ({ name, path }) => (
  <Item name={name} path={path}>
    <Box flex direction="row">
      <Box basis="1/3" background={{ color: 'brand', opacity: 'weak' }} />
      <Box flex background="brand" />
    </Box>
  </Item>
);

LayerItem.propTypes = Item.propTypes;
