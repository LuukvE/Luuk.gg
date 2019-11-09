import React from 'react';

import { Video } from 'grommet';
import { CirclePlay } from 'grommet-icons';
import { doc, themeDoc } from 'grommet/components/Video/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import Item from './Components/Item';

const desc = doc(Video).toJSON();

export default () => (
  <Page>
    <Doc
      name="Video"
      desc={desc}
      code={`<Video controls="over" fit="cover">
  <source key="video" src="/assets/small.mp4" type="video/mp4" />
  <track
    key="cc"
    label="English"
    kind="subtitles"
    srcLang="en"
    src="/assets/small-en.vtt"
    default
  />
</Video>`}
      themeDoc={themeDoc}
    />
  </Page>
);

export const VideoItem = ({ name, path }) => (
  <Item name={name} path={path} center>
    <CirclePlay color="brand" size="xlarge" />
  </Item>
);

VideoItem.propTypes = Item.propTypes;
