import React from 'react';

import { AnnounceContext } from 'grommet/contexts';
import { Sign } from 'grommet-icons';
import { doc } from 'grommet/contexts/AnnounceContext/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import Item from './Components/Item';

const desc = doc(AnnounceContext.Consumer).toJSON();

export default () => (
  <Page>
    <Doc
      name="AnnounceContext"
      title="Announce Context .Consumer"
      desc={desc}
    />
  </Page>
);

export const AnnounceContextItem = ({ name, path }) => (
  <Item name={name} path={path} center>
    <Sign color="brand" size="xlarge" />
  </Item>
);

AnnounceContextItem.propTypes = Item.propTypes;
