import React from 'react';
import { Box } from 'grommet';
import { doc, themeDoc } from 'grommet/components/Box/doc';
import Page from '../components/Page';
import Doc from '../components/Doc';
import { genericSyntaxes } from '../utils/props';
import Item from './Components/Item';

const desc = doc(Box).toJSON();

export default () => (
  <Page>
    <Doc
      name="Box"
      desc={desc}
      code={`<Box
  direction="row"
  border={{ color: 'brand', size: 'large' }}
  pad="medium"
>
  <Box pad="small" background="dark-3" />
  <Box pad="medium" background="light-3" />
</Box>`}
      example={
        <Box flex border={{ color: 'brand', size: 'large' }} pad="medium" />
      }
      syntaxes={{
        ...genericSyntaxes,
        align: ['start', 'center', 'end', 'baseline', 'stretch'],
        alignContent: [
          'start',
          'center',
          'end',
          'between',
          'around',
          'stretch',
        ],
        animation: [
          'fadeIn',
          'fadeOut',
          'jiggle',
          'pulse',
          'slideUp',
          'slideDown',
          'slideLeft',
          'slideRight',
          'zoomIn',
          'zoomOut',
          {
            type: '...',
            delay: 0,
            duration: 1000,
            size: 'xsmall',
          },
          ['fadeIn', 'slideDown', '...'],
        ],
        background: [
          'neutral-1',
          'url(//my.com/assets/img.png)',
          {
            color: 'neutral-1',
            dark: true,
            opacity: true,
            position: 'bottom',
            image: 'url(//my.com/assets/img.png)',
          },
          {
            dark: 'light-2',
            light: 'dark-2',
          },
          {
            VALUES: {
              opacity: ['weak', 'medium', 'strong', true],
              position: 'any CSS for background-position',
            },
          },
        ],
        basis: [
          'xxsmall',
          'xsmall',
          'small',
          'medium',
          'large',
          'xlarge',
          'full',
          '1/2',
          '1/3',
          '2/3',
          '1/4',
          '2/4',
          '3/4',
          'auto',
        ],
        border: [
          'top',
          'left',
          'bottom',
          'right',
          'horizontal',
          'vertical',
          'all',
          {
            color: 'border',
            size: 'medium',
            style: 'dashed',
            side: 'all',
          },
          {
            VALUES: {
              size: [
                'xsmall',
                'small',
                'medium',
                'large',
                'xlarge',
                'any CSS size',
              ],
              style: [
                'solid',
                'dashed',
                'dotted',
                'double',
                'groove',
                'ridge',
                'inset',
                'outset',
                'hidden',
              ],
              side: [
                'top',
                'left',
                'bottom',
                'right',
                'horizontal',
                'vertical',
                'all',
              ],
            },
          },
        ],
        elevation: [
          'none',
          'xsmall',
          'small',
          'medium',
          'large',
          'xlarge',
          'any custom elevation name in the current theme',
        ],
        gap: ['xsmall', 'small', 'medium', 'large', 'xlarge', 'any CSS size'],
        height: [
          'xxsmall',
          'xsmall',
          'small',
          'medium',
          'large',
          'xlarge',
          'xxlarge',
          {
            min: '...',
            max: '...',
          },
          'any CSS size',
        ],
        overflow: [
          'auto',
          'hidden',
          'scroll',
          'visible',
          'any CSS overflow',
          {
            vertical: '...',
            horizontal: '...',
          },
        ],
        pad: [
          'none',
          'xxsmall',
          'xsmall',
          'small',
          'medium',
          'large',
          'xlarge',
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
        round: [
          true,
          false,
          'xsmall',
          'small',
          'medium',
          'large',
          'xlarge',
          'full',
          'any CSS size',
          {
            size: '...',
            corner: 'top-left',
          },
          {
            VALUES: {
              corner: [
                'top',
                'left',
                'bottom',
                'right',
                'top-left',
                'top-right',
                'bottom-left',
                'bottom-right',
              ],
            },
          },
        ],
        width: [
          'xxsmall',
          'xsmall',
          'small',
          'medium',
          'large',
          'xlarge',
          'xxlarge',
          {
            min: '...',
            max: '...',
          },
          'any CSS size',
        ],
      }}
      examples={{
        align: (
          <Box direction="row" justify="end" wrap>
            {['start', 'center', 'end'].map(align => (
              <Box
                key={align}
                direction="row"
                align={align}
                margin="xsmall"
                background={{ color: 'accent-2', opacity: 'weak' }}
              >
                <Box
                  pad="medium"
                  background={{ color: 'accent-2', opacity: 'weak' }}
                />
                <Box
                  pad="small"
                  background={{ color: 'accent-2', opacity: 'strong' }}
                />
              </Box>
            ))}
          </Box>
        ),
        // skip animation example so property values don't stretch long
        // animation: (
        //   <Box align='end'>
        //     <Box
        //       animation='pulse'
        //       pad='medium'
        //       background={{ color: 'accent-2', opacity: 'strong' }}
        //     />
        //   </Box>
        // ),
        background: (
          <Box direction="row" justify="end" wrap>
            {[undefined, 'strong', 'medium', 'weak'].map(opacity => (
              <Box
                key={opacity || 'opacity'}
                background={{ color: 'accent-2', opacity }}
                pad="medium"
                margin="xsmall"
              />
            ))}
          </Box>
        ),
        border: (
          <Box direction="row" justify="end" wrap align="start">
            {['xsmall', 'small', 'medium', 'large'].map(size => (
              <Box
                key={size}
                border={{
                  side: 'all',
                  size,
                  color: 'accent-2',
                  style: 'dashed',
                }}
                pad="small"
                margin="xsmall"
              />
            ))}
          </Box>
        ),
        elevation: (
          <Box direction="row" justify="end" wrap align="start">
            {['none', 'xsmall', 'small', 'medium', 'large', 'xlarge'].map(
              elevation => (
                <Box
                  key={elevation}
                  elevation={elevation}
                  pad="medium"
                  margin="xsmall"
                />
              ),
            )}
          </Box>
        ),
        gap: (
          <Box direction="row" justify="end" wrap align="start">
            {['xsmall', 'small', 'medium', 'large'].map(gap => (
              <Box
                key={gap}
                gap={gap}
                direction="row"
                background={{ color: 'accent-2', opacity: 'weak' }}
                margin="xsmall"
              >
                <Box
                  background={{ color: 'accent-2', opacity: 'strong' }}
                  pad="small"
                />
                <Box
                  background={{ color: 'accent-2', opacity: 'strong' }}
                  pad="small"
                />
              </Box>
            ))}
          </Box>
        ),
        justify: (
          <Box direction="row" justify="end" wrap align="start">
            {['start', 'center', 'between', 'end'].map(justify => (
              <Box
                key={justify}
                basis="xsmall"
                direction="row"
                justify={justify}
                background={{ color: 'accent-2', opacity: 'weak' }}
                margin="xsmall"
              >
                <Box
                  pad="small"
                  background={{ color: 'accent-2', opacity: 'medium' }}
                />
                <Box
                  pad="small"
                  background={{ color: 'accent-2', opacity: 'strong' }}
                />
              </Box>
            ))}
          </Box>
        ),
        margin: (
          <Box direction="row" justify="end" wrap align="start">
            {['none', 'xsmall', 'small', 'medium'].map(margin => (
              <Box
                key={margin}
                margin={margin}
                pad="small"
                background={{ color: 'accent-2', opacity: 'strong' }}
              />
            ))}
          </Box>
        ),
        pad: (
          <Box direction="row" justify="end" wrap align="start">
            {['none', 'xsmall', 'small', 'medium'].map(pad => (
              <Box
                key={pad}
                pad={pad}
                background={{ color: 'accent-2', opacity: 'weak' }}
                margin="xsmall"
              >
                <Box
                  pad="small"
                  background={{ color: 'accent-2', opacity: 'strong' }}
                />
              </Box>
            ))}
          </Box>
        ),
        round: (
          <Box direction="row" justify="end" wrap align="start">
            {['xsmall', 'small', 'medium'].map(round => (
              <Box
                key={round}
                round={round}
                pad="medium"
                background={{ color: 'accent-2', opacity: 'strong' }}
                margin="xsmall"
              />
            ))}
          </Box>
        ),
        wrap: (
          <Box fill direction="row" justify="end">
            <Box
              basis="small"
              align="end"
              direction="row"
              wrap
              background={{ color: 'accent-2', opacity: 'weak' }}
            >
              {[0, 1, 2, 3, 4, 5, 6].map(index => (
                <Box
                  key={index * 10}
                  pad="small"
                  margin="xsmall"
                  background={{ color: 'accent-2', opacity: 'strong' }}
                />
              ))}
            </Box>
          </Box>
        ),
      }}
      themeDoc={themeDoc}
    />
  </Page>
);

export const BoxItem = ({ name, path }) => (
  <Item name={name} path={path}>
    <Box flex border={{ color: 'brand', size: 'xlarge' }} />
  </Item>
);

BoxItem.propTypes = Item.propTypes;
