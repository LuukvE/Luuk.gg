import React from 'react';
import {
  Box, Button, Heading, Paragraph, RoutedButton, Text, TextInput,
} from 'grommet';
import Nav from '../components/Nav';

export default () => (
  <Box pad='large'>
    <Box>
      <Nav />
      <Box direction='row'>
        <Box margin={{ vertical: 'large' }} basis='medium'>
          <Heading level={1}>
            <strong>See examples of inspiration</strong>
          </Heading>
          <Paragraph size='large'>
            Examples of grommet in use. An expanding list of examples built by the community.
          </Paragraph>
        </Box>
      </Box>
    </Box>

    <Box direction='row' wrap>

      <Box basis='medium' margin='small'>
        <RoutedButton path='/photo-browser'>
          <Box background='neutral-1' pad='large' round='large'>
            <Heading level={3} margin={{ top: 'none' }}>Photo Browser</Heading>
            <Box flex basis='small' direction='row' wrap>
              {[1, 2, 3, 4, 5, 6].map(index => (
                <Box
                  key={index}
                  basis='xsmall'
                  margin='xsmall'
                  border={index % 3 === 0 ? {
                    color: 'light-1',
                    thickness: 'small',
                  } : undefined}
                  background={{
                    color: 'light-1',
                    opacity: (index % 3 === 0 ? 'weak' : 'medium'),
                  }}
                />
              ))}
            </Box>
          </Box>
        </RoutedButton>
      </Box>

      <Box basis='medium' margin='small'>
        <RoutedButton path='/form'>
          <Box background='neutral-2' pad='large' round='large'>
            <Heading level={3} margin={{ top: 'none' }}>Form</Heading>
            <Box flex basis='small' justify='between' align='start'>
              <TextInput placeholder='name' />
              <TextInput placeholder='email' />
              <Button primary label='Submit' />
            </Box>
          </Box>
        </RoutedButton>
      </Box>

      <Box basis='medium' margin='small'>
        <Button href='https://grommet.io/grommet-swagger'>
          <Box background='neutral-3' pad='large' round='large'>
            <Heading level={3} margin={{ top: 'none' }}>API Browser</Heading>
            <Box flex basis='small' align='start'>
              <Box direction='row' align='center'>
                <Text size='large'>GET</Text>
                <TextInput value='https://eric-5.dev.hpedevops.net/rest/metrics' />
              </Box>
              <Heading level={3}>Parameters</Heading>
              <Box
                border='horizontal'
                pad={{ vertical: 'small' }}
                direction='row'
                justify='between'
                alignSelf='stretch'
              >
                <Text><strong>query</strong></Text>
                <Paragraph margin='none'>Filter results</Paragraph>
              </Box>
            </Box>
          </Box>
        </Button>
      </Box>

      <Box basis='medium' margin='small'>
        <Button href='https://grommet.io/grommet-weather'>
          <Box background='neutral-1' pad='large' round='large'>
            <Heading level={3} margin={{ top: 'none' }}>Weather</Heading>
            <Box flex basis='small' direction='row'>
              <Box basis='1/4' background={{ color: 'light-1', opacity: 'medium' }} />
              <Box basis='1/4' background={{ color: 'light-5', opacity: 'medium' }} />
              <Box
                basis='1/2'
                background={{ color: 'light-1', opacity: 'medium' }}
                justify='between'
                align='end'
                pad='xsmall'
              >
                <Text size='large'><strong>88&deg;</strong></Text>
                <Text size='large'><strong>68&deg;</strong></Text>
              </Box>
            </Box>
          </Box>
        </Button>
      </Box>
    </Box>
  </Box>
);
