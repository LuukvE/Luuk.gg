import React from 'react';

import { Accordion, AccordionPanel, Box } from 'grommet';
import { doc as docAccordion } from 'grommet/components/Accordion/doc';
import {
  doc as docAccordionPanel,
  themeDoc,
} from 'grommet/components/AccordionPanel/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import { genericSyntaxes } from '../utils/props';
import Item from './Components/Item';

const desc = docAccordion(Accordion).toJSON();
const descAccordionPanel = docAccordionPanel(AccordionPanel).toJSON();

export default () => (
  <Page>
    <Doc
      name="Accordion"
      desc={desc}
      syntaxes={{
        ...genericSyntaxes,
        activeIndex: [0, [0, 2]],
        children: 'node',
        onActive: '([0]) => {}',
      }}
      code={`<Accordion>
  <AccordionPanel label="Panel 1">
    <Box pad="medium" background="light-2">
      <Text>One</Text>
    </Box>
  </AccordionPanel>
  <AccordionPanel label="Panel 2">
    <Box pad="medium" background="light-2">
      <Text>Two</Text>
    </Box>
  </AccordionPanel>
</Accordion>`}
    />

    <Doc
      name="AccordionPanel"
      nav={false}
      desc={descAccordionPanel}
      themeDoc={themeDoc}
      title="Accordion Panel"
      syntaxes={{
        'accordion.icons.collapse': '<UpIcon />',
        'accordion.icons.expand': '<DownIcon />',
      }}
    />
  </Page>
);

export const AccordionItem = ({ name, path }) => (
  <Item name={name} path={path} center>
    <Box width="small">
      <Box pad="small" background="brand" />
      <Box pad="small" background={{ color: 'brand', opacity: 'medium' }} />
      <Box pad="small" background="brand" />
      <Box pad="small" background={{ color: 'brand', opacity: 'medium' }} />
    </Box>
  </Item>
);

AccordionItem.propTypes = Item.propTypes;
