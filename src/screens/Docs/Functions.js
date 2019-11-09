import React from 'react';

import { Box } from 'grommet';
import { MarkdownTemplate } from '../../components/MarkdownTemplate';
import Page from '../../components/Page';

const children = `

### deepMerge
A function that recieves two theme objects and returns a theme object that includes
          both theme values. 
In case different styling are found for the same components on the two themes, the second argument theme will determine the styling. 

\`\`\`
import { deepMerge } from 'grommet/utils';

const myCustomTheme = deepMerge(grommet, {
  global: {
    colors: {
      brand: 'red',
    },
  },
});

const CustomPrimaryButton = () => (
  <Grommet theme={myCustomTheme}>
    <Box align="center" pad="large" gap="small">
      <Button primary label="deepMerge custom button" onClick={() => {}} />
    </Box>
    <Text>
      The Button font is taken from the grommet theme, while its
      primary color is taken from myCustomTheme.
    </Text>
  </Grommet>
);
\`\`\`

`;

export default () => (
  <Page>
    <Box width="xlarge" alignSelf="center">
      <MarkdownTemplate name="Functions" desc="">
        {children}
      </MarkdownTemplate>
    </Box>
  </Page>
);
