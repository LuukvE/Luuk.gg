import React from 'react';
import { Box, Text, ResponsiveContext } from 'grommet';
import RoutedAnchor from './RoutedAnchor';
import RoutedButton from './RoutedButton';
import Search from './Search';

export default () => {
  const size = React.useContext(ResponsiveContext);
  const [searchOpen, setSearchOpen] = React.useState(false);

  return (
    <Box
      direction="row"
      justify="between"
      align="center"
      width="xlarge"
      alignSelf="center"
      gap="medium"
      border="top"
    >
      <RoutedAnchor
        path="/"
        icon={null}
        label={size !== 'small' && <Text size="xlarge">luuk.gg</Text>}
      />
      <Box direction="row" gap="small">
        {!searchOpen && (
          <RoutedButton path="/components" plain>
            {({ hover }) => (
              <Box
                pad={{ vertical: 'small', horizontal: 'medium' }}
                round="xlarge"
                background={hover ? 'active' : 'accent-1'}
              >
                <Text>components</Text>
              </Box>
            )}
          </RoutedButton>
        )}
        <Search open={searchOpen} setOpen={value => setSearchOpen(value)} />
      </Box>
    </Box>
  );
};
