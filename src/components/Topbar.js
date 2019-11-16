import React from 'react';
import { Box, Button, TextInput } from 'grommet';

export default () => {
    return (
      <Box
        pad="small"
        flex="shrink"
        direction="row"
        background="rgba(0,0,0,0.1)"
      >
        <Button
          focusIndicator={false}
          icon={<i className="material-icons">menu</i>}
        />
        <Button
          focusIndicator={false}
          icon={<span>Luuk.gg</span>}
        />
        <Box
          flex
          align="center"
          direction="row"
          margin={{ horizontal: 'auto' }}
          width={{ min: '320px', max: '640px' }}
          border={{ color: 'light-1', size: 'xsmall', style: 'dashed' }}
        >
          <TextInput
            plain
            size="small"
            placeholder="Search"
          />
          <Button
            focusIndicator={false}
            icon={<i className="material-icons">search</i>}
          />
        </Box>
        <Button
          focusIndicator={false}
          icon={<i className="material-icons">notifications_none</i>}
        />
      </Box>
    );
};