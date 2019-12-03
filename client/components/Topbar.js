import React from 'react';
import { Box, Button, TextInput, Heading } from 'grommet';

export default () => {
    return (
      <Box
        pad="small"
        flex="shrink"
        direction="row"
        background="rgba(50,50,50,0)" // this makes the font color go white
      >
        <Button
          focusIndicator={false}
          icon={<i className="material-icons">menu</i>}
        />
        <Button
          focusIndicator={false}
          plain
          label={
            <Heading
              level="3"
              margin={{ vertical: 'none' }}
            >
              Luuk.GG
            </Heading>
          }
        />
        <Box
          flex
          align="center"
          direction="row"
          margin={{ horizontal: 'auto' }}
          width={{ min: '320px', max: '640px' }}
          background="rgba(0,0,0,0.2)"
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