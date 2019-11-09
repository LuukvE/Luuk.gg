export const HelloWorld = `/**
* Welcome to the Grommet playground!
* This is the hello world example. There are more examples available
* in the top right header, so feel free to explore all of it.
* Grommet components can be accessed by their direct name, e.g.:
* Box, Button, ...
* Icons are available inside Icons variable: Icons.Add, for example.
*
* About this hello world example:
*
* It simulates a form (no real action). It adds a Header, Body, and Footer.
* The body scrolls independently. Header and Footer are sticky.
* See overflow='auto' in the Box for the Body component.
*
* Don't forget to checkout the Theme playground, where we demonstrate how to
* customize the Grommet theme to match your brand.
*
* Have fun :)
**/

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
    <Heading level={3} margin='none'>
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
  <Grommet theme={Themes.grommet} full={true}>
    <Box fill={true}>
      <Header />
      <Body />
      <Footer />
    </Box>
  </Grommet>
);

render(<App />);
`;
