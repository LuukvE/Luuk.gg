import React, { Component } from 'react';
import WebFont from 'webfontloader';
import {
  Anchor,
  Box,
  Button,
  FormField,
  Grommet,
  Heading,
  Image,
  Paragraph,
  Select,
  Text,
  TextInput,
} from 'grommet';
import { Previous as PreviousIcon } from 'grommet-icons';
import Page from '../components/Page';
import {
  hslToRgb,
  parseRGBString,
  rgbToHsl,
  toRGBString,
} from '../utils/color';
import { mergeDeep } from '../utils/object';

const SHARPNESSES = ['soft', 'medium', 'hard'];

const SHARPNESS_ROUND_SIZE = {
  soft: 'large',
  medium: 'medium',
  hard: 'none',
};

const SHARPNESS = {
  soft: {
    global: { input: { border: { radius: '24px' } } },
    button: { border: { radius: '24px' } },
    checkBox: { border: { radius: '24px' } },
    layer: { border: { radius: '24px' } },
  },
  medium: {
    global: { input: { border: { radius: '4px' } } },
    button: { border: { radius: '4px' } },
    checkBox: { border: { radius: '4px' } },
    layer: { border: { radius: '4px' } },
  },
  hard: {
    global: { input: { border: { radius: '0px' } } },
    button: { border: { radius: '0px' } },
    checkBox: { border: { radius: '0px' } },
    layer: { border: { radius: '0px' } },
  },
};

const MOODS = ['happy', 'even', 'serious'];

const MOOD = {
  happy: { saturationBoost: 0.1, luminenceBoost: 0.2 },
  even: { saturationBoost: 0, luminenceBoost: 0 },
  serious: { saturationBoost: -0.1, luminenceBoost: -0.2 },
};

const deriveHues = (h, count) => {
  const degH = h * 360;
  const offset = 360 / (count + 1);
  const result = [];
  for (let i = 1; i <= count; i += 1) {
    result.push(((degH + offset * i) % 360) / 360.0);
  }
  return result;
};

const between = (value, min, max) => Math.min(max, Math.max(min, value));

const colorsForMood = (color, mood) => {
  let result;
  const array = parseRGBString(color);
  if (array) {
    result = { global: { colors: { brand: color } } };
    const [r, g, b] = array;
    const [h, s, l] = rgbToHsl(r, g, b);
    const accentHues = deriveHues(h, 2);
    const accentSat = between(s + MOOD[mood].saturationBoost, 0.2, 0.8);
    const accentLum = between(1.0 - (l - MOOD[mood].luminenceBoost), 0.2, 0.8);
    result.global.colors.accent = accentHues.map(
      ah => `#${toRGBString(hslToRgb(ah, accentSat, accentLum))}`,
    );
  }
  return result;
};

export default class Try extends Component {
  constructor(props) {
    super(props);

    const font = 'Fira Sans';
    const color = '#99cc33';
    const mood = 'even';
    const sharpness = 'medium';
    let theme = {};
    theme = mergeDeep(theme, colorsForMood(color, mood) || {});
    theme = mergeDeep(theme, SHARPNESS[sharpness]);
    this.state = {
      color,
      errors: {},
      font,
      key: 1,
      loading: {},
      mood,
      name: 'My Theme',
      sharpness,
      theme,
    };
  }

  componentDidMount() {
    const { font } = this.state;
    this.onChangeFont({ target: { value: font } });
    document.title = 'Try - Grommet';
  }

  onChangeColor = event => {
    const { errors, key, mood, theme } = this.state;
    const color = event.target.value;
    const colors = colorsForMood(color, mood);
    if (colors) {
      this.setState({
        color,
        errors: { ...errors, color: undefined },
        key: key + 1,
        theme: mergeDeep(theme, colors),
      });
    } else {
      this.setState({
        color,
        errors: { ...errors, color: 'must be #RRGGBB' },
      });
    }
  };

  onFontLoaded = name => () => {
    const { key, loading, theme } = this.state;
    this.setState({
      key: key + 1,
      loading: { ...loading, font: undefined },
      theme: mergeDeep(theme, {
        global: {
          font: {
            name,
            family: `'${name}', Arial, sans-serif`,
            face: undefined,
          },
        },
      }),
    });
  };

  onFontError = () => () => {
    const { errors, loading } = this.state;
    this.setState({
      errors: { ...errors, font: 'unavailable' },
      loading: { ...loading, font: undefined },
    });
  };

  onChangeName = event => this.setState({ name: event.target.value });

  onChangeFont = event => {
    const { errors, loading } = this.state;
    const name = event.target.value;
    // remove all previously loaded fonts
    // <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Rob" media="all">
    const links = document.querySelectorAll(
      'link[href^="https://fonts.googleapis.com"]',
    );
    for (let i = 0; i < links.length; i += 1) {
      links[i].remove();
    }

    this.setState({
      font: name,
      errors: { ...errors, font: undefined },
      loading: { ...loading, font: true },
    });
    WebFont.load({
      classes: false,
      inactive: this.onFontError(name),
      active: this.onFontLoaded(name),
      google: { families: [name] },
    });
  };

  onChangeSharpness = ({ option: sharpness }) => {
    const { key, theme } = this.state;
    this.setState({
      key: key + 1,
      sharpness,
      theme: mergeDeep(theme, SHARPNESS[sharpness]),
    });
  };

  onChangeMood = ({ option: mood }) => {
    const { key, theme } = this.state;
    this.setState({
      key: key + 1,
      mood,
      theme: mergeDeep(
        theme,
        colorsForMood(theme.global.colors.brand, mood) || {},
      ),
    });
  };

  onDownload = event => {
    const { name, theme } = this.state;
    event.preventDefault();
    // extract font-face from link in header
    const fontLink = document.querySelector(
      'link[href*="fonts.googleapis.com"]',
    );
    fetch(fontLink.getAttribute('href'))
      .then(response => response.text())
      .then(face => {
        const downloadTheme = mergeDeep(theme, { global: { font: { face } } });
        const jsonString = encodeURIComponent(JSON.stringify(downloadTheme));
        const data = `data:text/json;charset=utf-8,${jsonString}`;
        const element = document.createElement('a');
        element.setAttribute('href', data);
        element.setAttribute('download', `${name}.json`);
        element.click();
        element.remove();
      });
  };

  render() {
    const {
      color,
      errors,
      font,
      key,
      loading,
      mood,
      name,
      sharpness,
      theme,
    } = this.state;
    return (
      <Page background={{ image: 'url("img/circles.svg")' }}>
        <Box direction="row" gap="large" wrap align="start">
          <Box basis="medium" margin={{ bottom: 'large' }}>
            <Heading level={1} margin={{ top: 'none', bottom: 'small' }}>
              <strong>Try us without writing a single line of code</strong>
            </Heading>
            <Paragraph size="large">
              Learn more about how you can theme using the grommet library.
            </Paragraph>

            <form onSubmit={this.onDownload}>
              <Box pad={{ vertical: 'medium' }}>
                <FormField label="Name">
                  <TextInput plain value={name} onChange={this.onChangeName} />
                </FormField>
                <FormField
                  label="Brand Color"
                  help="hex RGB"
                  error={errors.color}
                >
                  <Box direction="row" align="center" justify="between">
                    <TextInput
                      plain
                      value={color}
                      onChange={this.onChangeColor}
                    />
                    <Box
                      background={theme.global.colors.brand}
                      pad="small"
                      round="small"
                    />
                  </Box>
                </FormField>
                <FormField
                  label="Font Name"
                  help={
                    loading.font ? (
                      'loading ...'
                    ) : (
                      <Anchor
                        href="https://fonts.google.com/"
                        label="google fonts"
                      />
                    )
                  }
                  error={errors.font}
                >
                  <TextInput plain value={font} onChange={this.onChangeFont} />
                </FormField>
                <FormField label="Sharpness">
                  <Select
                    plain
                    value={sharpness}
                    options={SHARPNESSES}
                    onChange={this.onChangeSharpness}
                  />
                </FormField>
                <FormField label="Mood">
                  <Select
                    plain
                    value={mood}
                    options={MOODS}
                    onChange={this.onChangeMood}
                  />
                </FormField>
              </Box>
              <Box pad={{ vertical: 'medium' }}>
                <Button
                  type="submit"
                  label="Download"
                  primary
                  onClick={this.onDownload}
                />
              </Box>
            </form>
          </Box>

          <Box direction="row">
            <Box
              justify="center"
              gap="medium"
              style={{ position: 'relative', right: -12 }}
            >
              <Box pad="large" round="full" background="brand" />
              <Box pad="large" round="full" background="brand" />
              <Box pad="large" round="full" background="brand" />
            </Box>
            <Grommet
              key={key}
              theme={theme}
              style={{ position: 'relative', zIndex: 10 }}
            >
              <Box
                direction="column"
                round="medium"
                animation="fadeIn"
                background="black"
                border={{ size: 'xlarge', color: 'black' }}
                overflow="hidden"
                elevation="xlarge"
              >
                <Box round="medium" overflow="hidden" background="white">
                  <Box
                    pad="medium"
                    background="accent-1"
                    direction="row"
                    justify="between"
                    align="center"
                    round={SHARPNESS_ROUND_SIZE[sharpness]}
                    overflow="hidden"
                  >
                    <Button icon={<PreviousIcon />} onClick={() => {}} />
                    <Button primary label="Subscribe" onClick={() => {}} />
                  </Box>
                  <Box pad="large" align="start">
                    <Heading level={1} margin={{ top: 'none' }}>
                      Bring it on!
                    </Heading>
                    <Text>January</Text>
                    <Paragraph>
                      Biodiesel small batch blue bottle you probably have not
                      heard of them cornhole taiyaki thundercats celiac
                      messenger bag. Prism cred, poutine bespoke tumeric tofu
                      helvetica put a bird on it.
                    </Paragraph>
                    <Image src="https://myjourneytosixmillion.files.wordpress.com/2018/01/park-dasol-146056.jpg?w=300" />
                  </Box>
                </Box>
              </Box>
            </Grommet>
            <Box
              justify="center"
              gap="medium"
              style={{ position: 'relative', left: -12 }}
            >
              <Box pad="large" round="full" background="brand" />
            </Box>
          </Box>
        </Box>
      </Page>
    );
  }
}
