import React from 'react';
import { Button, Grommet } from 'grommet';
import Tile from './Tile';

export default () => {
  const [build, setBuild] = React.useState(true);
  const [phase, setPhase] = React.useState(1);
  const [theme1, setTheme1] = React.useState();
  const [theme2, setTheme2] = React.useState();
  const [theme3, setTheme3] = React.useState();

  React.useEffect(() => {
    const timer = setInterval(() => {
      const nextBuild = (build && phase < 6) || (!build && phase === 1);
      const nextPhase = nextBuild ? phase + 1 : phase - 1;
      let nextTheme1 = theme1;
      let nextTheme2 = theme2;
      let nextTheme3 = theme3;

      if (phase >= 2) {
        nextTheme1 = {
          global: {
            font: {
              family: 'Helvetica, sans-serif',
            },
          },
          button: {
            border: {
              color: 'accent-1',
              width: '6px',
              radius: '8px',
            },
            // color: { dark: undefined, light: undefined }
            primary: {
              // color: { dark: undefined, light: undefined }
            },
            padding: {
              vertical: '6px',
              horizontal: '12px',
            },
          },
        };
      } else {
        nextTheme1 = undefined;
      }

      if (phase >= 3) {
        nextTheme2 = {
          global: {
            font: {
              family: 'Arial, sans-serif',
            },
          },
          button: {
            border: {
              color: 'dark-2',
              width: '1px',
              radius: '0px',
            },
            // color: { dark: undefined, light: undefined }
            primary: {
              // color: { dark: undefined, light: undefined }
            },
            padding: {
              vertical: '12px',
              horizontal: '36px',
            },
          },
        };
      } else {
        nextTheme2 = undefined;
      }

      if (phase >= 4) {
        nextTheme3 = {
          global: {
            font: {
              family: 'Courier, sans-serif',
            },
          },
          button: {
            border: {
              color: 'accent-3',
              width: '9px',
              radius: '24px',
            },
            // color: { dark: undefined, light: undefined }
            primary: {
              // color: { dark: undefined, light: undefined }
            },
            padding: {
              vertical: '6px',
              horizontal: '24px',
            },
          },
        };
      } else {
        nextTheme3 = undefined;
      }
      setBuild(nextBuild);
      setPhase(nextPhase);
      setTheme1(nextTheme1);
      setTheme2(nextTheme2);
      setTheme3(nextTheme3);
    }, 1000);
    return () => clearInterval(timer);
  }, [build, phase, theme1, theme2, theme3]);

  return (
    <Tile
      name="powerful theming tools"
      summary={
        <span>
          tailor the component library to align with your Color, Type, Layout
          needs. You can even control component interaction.
        </span>
      }
      gap="medium"
    >
      <Grommet theme={theme1}>
        <Button label="Log in" />
      </Grommet>
      <Grommet theme={theme2}>
        <Button label="GET STARTED" />
      </Grommet>
      <Grommet theme={theme3}>
        <Button label="click me" />
      </Grommet>
    </Tile>
  );
};
