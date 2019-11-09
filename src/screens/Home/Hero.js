import React from 'react';
import { Ad } from 'grommet-icons';
import { Builder, BuilderBox } from '../../components/Builder';

export default () => (
  <Builder phases={3} interval={4800} wrap>
    <BuilderBox
      alignSelf="center"
      direction="row"
      height="medium"
      margin="large"
      phases={[
        {
          phase: 1,
          props: {
            pad: 'medium',
            background: 'light-1',
            width: 'large',
            elevation: 'small',
          },
        },
        {
          phase: 2,
          props: {
            pad: 'medium',
            background: 'light-2',
            width: 'large',
            elevation: 'large',
            round: 'small',
          },
        },
        {
          phase: 3,
          props: {
            pad: { vertical: 'medium', horizontal: 'small' },
            direction: 'column',
            background: 'black',
            width: 'small',
            elevation: 'xlarge',
            round: 'medium',
          },
        },
      ]}
    >
      <Builder phases={12} interval={400}>
        <BuilderBox
          basis="1/3"
          background="neutral-2"
          pad="medium"
          gap="medium"
          phases={[
            { phase: 2, props: { basis: 'full' } },
            {
              phase: [2, 5],
              props: {
                animation: 'fadeIn',
                background: 'light-5',
              },
            },
          ]}
        >
          <BuilderBox
            background="accent-3"
            pad={{ vertical: 'small' }}
            round
            phases={[
              {
                phase: [3, 5],
                props: {
                  animation: 'fadeIn',
                  background: 'light-2',
                  round: undefined,
                },
              },
            ]}
          />
          <BuilderBox
            background="accent-3"
            pad={{ vertical: 'small' }}
            round
            phases={[
              {
                phase: [4, 5],
                props: {
                  animation: 'fadeIn',
                  background: 'light-2',
                  round: undefined,
                },
              },
            ]}
          />
          <BuilderBox
            background="accent-3"
            pad={{ vertical: 'small' }}
            round
            phases={[
              {
                phase: 5,
                props: {
                  animation: 'fadeIn',
                  background: 'light-2',
                  round: undefined,
                },
              },
            ]}
          />
        </BuilderBox>
        <BuilderBox
          basis="2/3"
          background="light-2"
          border={{ side: 'top', size: 'large', color: 'neutral-2' }}
          pad="medium"
          gap="medium"
          phases={[
            {
              phase: [3, 8],
              props: {
                animation: 'fadeIn',
                background: 'light-4',
                border: { side: 'top', size: 'large', color: 'light-4' },
              },
            },
          ]}
        >
          <BuilderBox
            basis="xxsmall"
            direction="row"
            justify="between"
            gap="medium"
            phases={[
              {
                phase: [6, 9],
                props: {
                  animation: 'fadeIn',
                },
              },
            ]}
          >
            <BuilderBox
              basis="xxsmall"
              round="full"
              background="accent-3"
              align="center"
              justify="center"
              phases={[
                {
                  phase: [7, 9],
                  props: {
                    animation: 'fadeIn',
                    background: 'light-3',
                    round: undefined,
                  },
                },
              ]}
            >
              <Ad />
            </BuilderBox>
            <BuilderBox
              flex
              background="accent-3"
              round
              phases={[
                {
                  phase: [7, 9],
                  props: {
                    animation: 'fadeIn',
                    background: 'light-3',
                    round: undefined,
                  },
                },
              ]}
            />
          </BuilderBox>
          <BuilderBox
            flex
            background="accent-3"
            pad="medium"
            round
            phases={[
              {
                phase: [8, 9],
                props: {
                  animation: 'fadeIn',
                  background: 'light-5',
                  round: undefined,
                },
              },
            ]}
          />
        </BuilderBox>
      </Builder>
    </BuilderBox>
  </Builder>
);
