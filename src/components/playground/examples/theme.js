export const Theme = `/**
* Welcome to the Theme playground!
* Here we demonstrate how to leverage the theme object and make
* the necessary changes to match your design requirements.
*
* We not only enable changing predefined variables (e.g. border radius of a button),
* but also allow any component to be extended, see myTheme.button.extend down here.
*
* Extend prop receives either a function or a string. The function passes the current
* component props so that you can add special styles depending on the component state
* (e.g. adding white text color if Button is primary).
*
* You can notice the markup (JSX) is basically the same as the Hello World playground.
* The focus here is how powerful, composable, and themeable Grommet v2 is.
**/

const myTheme = {
  global: {
    colors: {
      brand: '#2196f3',
    },
    elevation: {
      light: {
        xsmall: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        small: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        medium: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        large: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        xlarge: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
      },
    },
    font: {
      family: "'Roboto', Arial, sans-serif",
      size: '14px',
    },
    input: {
      weight: 500,
    },
  },
  button: {
    border: {
      radius: 0,
    },
    padding: {
      vertical: '6px',
      horizontal: '24px',
    },
    extend: props => \`
      font-weight: 500;
      text-transform: uppercase;
      font-size: 14px;

      \${props && props.primary && 'color: white;'}
    \`,
  },
  formField: {
    border: {
      position: 'outer',
      side: 'all',
    },
    label: {
      weight: 600,
      size: 'small',
      color: 'dark-4',
    },
  },
  heading: {
    font: {
      family: "'Roboto', Arial, sans-serif",
    },
  },
  select: {
    icons: {
      down: Icons.CaretDown,
      color: 'dark-5',
    },
  },
};

const Header = () => (
  <Box
    tag='header'
    background='brand'
    pad='small'
    elevation='small'
    justify='between'
    direction='row'
    align='center'
    flex={false}
  >
    <Heading level={3} margin='none' color='white'>
      <strong>My App</strong>
    </Heading>
    <Menu
      dropAlign={{ top: 'top', right: 'right' }}
      items={[{ label: 'Logout', href: '#' }]}
      icon={<Icons.Menu color='white' />}
    />
  </Box>
);

const Footer = () => (
  <Box
    tag='footer'
    direction='row'
    justify='end'
    pad='medium'
    border={{ side: 'top' }}
    gap='small'
    flex={false}
  >
    <Button label='Cancel' color='border' onClick={() => {}} />
    <Button label='Add' primary={true} onClick={() => {}} />
  </Box>
);

const Body = () => (
  <Box flex={true} pad='medium' overflow='auto'>
    <Box flex={false}>
      <Heading level={3} margin='none'>
        <strong>User Information</strong>
      </Heading>
      <Box pad={{ top: 'medium' }} gap='small'>
        <FormField
          label='Name'
          htmlFor='name-input'
        >
          <TextInput
            id='name-input'
            placeholder='Enter your name'
          />
        </FormField>
        <FormField
          label='Street'
          htmlFor='street-input'
        >
          <TextInput
            id='street-input'
            placeholder='Enter your street'
          />
        </FormField>
        <Box direction='row' gap='small'>
          <FormField
            basis='2/3'
            label='City'
            htmlFor='city-input'
          >
            <TextInput
              id='city-input'
              placeholder='Enter your city'
            />
          </FormField>
          <FormField
            basis='1/3'
            label='State'
            htmlFor='state-input'
          >
            <Select
              id='state-input'
              placeholder='Select your state'
              options={['CA', 'FL', 'OR']}
            />
          </FormField>
        </Box>
      </Box>
    </Box>
  </Box>
);

const App = () => (
  <Grommet theme={myTheme} full={true}>
    <Box fill={true}>
      <Header />
      <Body />
      <Footer />
    </Box>
  </Grommet>
);

render(<App />);
`;
