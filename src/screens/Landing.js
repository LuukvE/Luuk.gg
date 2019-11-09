import React, { useEffect, useContext } from 'react';
import { Box, Heading, Paragraph, Anchor } from 'grommet';
import { RouterContext } from '../Router';

const Landing = () => {
  useEffect(() => {
    document.title = 'Luuk.gg';
  });

  const { go } = useContext(RouterContext);

  return (
    <Box pad="large" flex>
      <Heading textAlign="center" margin="none">
        Luuk.gg
      </Heading>

      <Paragraph size="xxlarge" textAlign="center">
        containing many standard forms and pages
      </Paragraph>

      <Anchor
        href="/sign-up"
        icon={null}
        label="Sign up"
        onClick={event => {
          event.preventDefault();
          go('/sign-up');
        }}
      />

      <pre>
        1.1.0 future release (january 2020) - Feature: Offline application
        support - Memory syncing with `indexedDB` on the client-side - HTML5
        manifest file - Feature: Deployment automation - S3 AWS deploy to bucket
        - Bugsnag upload sourcemap 1.0.0 future release (december 2019) -
        Feature: Components - Buttons - Graphs - Inputs - Text - Number - Select
        - Datalist - Currency - Color - Range - Drag and drop - Date _(+ range)_
        - HTML _(+ editable preview)_ - File _(+ progress bar)_ - Image _(+
        cropping)_ - Tooltips - Popovers - Feature: Pages - Interface components
        to create, update and delete data records - Lists able to filter,
        loading / empty states, pagination, sorting - Feature: Forms -
        Bi-directional inputs for any text or file - Validation and error
        messaging - Multi-step indicators and subflows - Remembers input if the
        browsers closes during form fill-out - Feature: Multilingual support -
        Datetime, relative time or durations through `moment.js` -
        Language-specific builds are made with `webpack` compiler - Feature:
        Single application router for multiple domains - Dynamic CSS loading -
        Dynamic JS loading - A single app; no duplicate code - Feature: Google
        Analytics
      </pre>
    </Box>
  );
};

export default Landing;
