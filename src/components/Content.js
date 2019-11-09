import React from 'react';
// import { Route, Switch } from 'react-router-dom';
// import { Box, Text } from 'grommet';
import { Route, Routes } from '../Router';

import Accordion from '../screens/Accordion';
import About from '../screens/About';
import Anchor from '../screens/Anchor';
import AnnounceContext from '../screens/AnnounceContext';
import Box from '../screens/Box';
import Button from '../screens/Button';
import Calendar from '../screens/Calendar';
import Carousel from '../screens/Carousel';
import Chart from '../screens/Chart';
import CheckBox from '../screens/CheckBox';
import Clock from '../screens/Clock';
import Collapsible from '../screens/Collapsible';
import Color from '../screens/Color';
import Components from '../screens/Components';
import DataTable from '../screens/DataTable';
import Diagram from '../screens/Diagram';
import Distribution from '../screens/Distribution';
import Docs from '../screens/Docs';
import Drop from '../screens/Drop';
import DropButton from '../screens/DropButton';
import Form from '../screens/Form';
import FormField from '../screens/FormField';
import Grid from '../screens/Grid';
import Grommet from '../screens/Grommet';
import Heading from '../screens/Heading';
import Home from '../screens/Home';
import Image from '../screens/Image';
import InfiniteScroll from '../screens/InfiniteScroll';
import Keyboard from '../screens/Keyboard';
import Layer from '../screens/Layer';
import Markdown from '../screens/Markdown';
import MaskedInput from '../screens/MaskedInput';
import Menu from '../screens/Menu';
import Meter from '../screens/Meter';
import Paragraph from '../screens/Paragraph';
import Play from '../screens/Play';
import RadioButton from '../screens/RadioButton';
import RadioButtonGroup from '../screens/RadioButtonGroup';
import RangeInput from '../screens/RangeInput';
import RangeSelector from '../screens/RangeSelector';
import ResponsiveContext from '../screens/ResponsiveContext';
import Select from '../screens/Select';
import SkipLinks from '../screens/SkipLinks';
import Stack from '../screens/Stack';
import Tabs from '../screens/Tabs';
import Table from '../screens/Table';
import Text from '../screens/Text';
import TextArea from '../screens/TextArea';
import TextInput from '../screens/TextInput';
import ThemeContext from '../screens/ThemeContext';
import Try from '../screens/Try';
import Use from '../screens/Use';
import Video from '../screens/Video';
import WorldMap from '../screens/WorldMap';

import Browsers from '../screens/Docs/Browsers';
import Functions from '../screens/Docs/Functions';
import GettingStarted from '../screens/Docs/GettingStarted';
import Resources from '../screens/Docs/Resources';

// NOTE: This commented out code illustrates how to code-split per-screen
// class DynamicImport extends Component {
//   state = {
//     component: null,
//   }
//
//   componentDidMount() {
//     this.props.load()
//       .then((component) => {
//         this.setState(() => ({
//           component: component.default ? component.default : component,
//         }));
//       });
//   }
//
//   render() {
//     return this.props.children(this.state.component);
//   }
// }
//
// const Screens = {};
//
// ['About', 'Anchor', 'Box', 'Button', 'Calendar', 'Carousel', 'Chart',
//   'CheckBox', 'Clock', 'Color', 'Components', 'Diagram', 'Distribution',
//   'Drop', 'DropButton', 'Form', 'FormField', 'Grid', 'Grommet',
//   'Heading', 'Home', 'Image', 'InfiniteScroll', 'Keyboard', 'Layer',
//   'Markdown', 'Menu', 'Meter', 'Paragraph', 'RadioButton',
//   'RangeInput', 'RangeSelector', 'Responsive', 'Select', 'SkipLinks', 'Stack',
//   'Tabs', 'Table', 'Text', 'TextArea', 'TextInput', 'Try', 'Use',
//   'Video', 'WorldMap'].forEach((name) => {
//   Screens[name] = props => (
//     <DynamicImport load={() => import(`../screens/${name}`)}>
//       {C => ((C === null)
//         ? (
//           <Box pad='xlarge' justify='center' align='center'>
//             <Text color='light-5'>...</Text>
//           </Box>
//           )
//         : <C {...props} />)}
//     </DynamicImport>
//   );
// });

export default () => (
  <Routes notFoundRedirect="/">
    <Route exact path="/" component={Home} />

    <Route exact path="/play" component={Play} />
    <Route exact path="/theme" component={Try} />
    <Route exact path="/try" component={Try} />
    <Route exact path="/start" component={Use} />
    <Route exact path="/use" component={Use} />
    <Route exact path="/components" component={Components} />
    <Route exact path="/docs" component={Docs} />

    <Route exact path="/about" component={About} />

    <Route exact path="/accordion" component={Accordion} />
    <Route exact path="/anchor" component={Anchor} />
    <Route exact path="/announcecontext" component={AnnounceContext} />
    <Route exact path="/box" component={Box} />
    <Route exact path="/button" component={Button} />
    <Route exact path="/calendar" component={Calendar} />
    <Route exact path="/carousel" component={Carousel} />
    <Route exact path="/chart" component={Chart} />
    <Route exact path="/checkbox" component={CheckBox} />
    <Route exact path="/clock" component={Clock} />
    <Route exact path="/collapsible" component={Collapsible} />
    <Route exact path="/color" component={Color} />
    <Route exact path="/datatable" component={DataTable} />
    <Route exact path="/diagram" component={Diagram} />
    <Route exact path="/distribution" component={Distribution} />
    <Route exact path="/drop" component={Drop} />
    <Route exact path="/dropbutton" component={DropButton} />
    <Route exact path="/form" component={Form} />
    <Route exact path="/formfield" component={FormField} />
    <Route exact path="/grid" component={Grid} />
    <Route exact path="/grommet" component={Grommet} />
    <Route exact path="/heading" component={Heading} />
    <Route exact path="/image" component={Image} />
    <Route exact path="/infinitescroll" component={InfiniteScroll} />
    <Route exact path="/keyboard" component={Keyboard} />
    <Route exact path="/layer" component={Layer} />
    <Route exact path="/markdown" component={Markdown} />
    <Route exact path="/maskedinput" component={MaskedInput} />
    <Route exact path="/menu" component={Menu} />
    <Route exact path="/meter" component={Meter} />
    <Route exact path="/radiobutton" component={RadioButton} />
    <Route exact path="/radiobuttongroup" component={RadioButtonGroup} />
    <Route exact path="/rangeinput" component={RangeInput} />
    <Route exact path="/rangeselector" component={RangeSelector} />
    <Route exact path="/responsivecontext" component={ResponsiveContext} />
    <Route exact path="/paragraph" component={Paragraph} />
    <Route exact path="/select" component={Select} />
    <Route exact path="/skiplinks" component={SkipLinks} />
    <Route exact path="/stack" component={Stack} />
    <Route exact path="/table" component={Table} />
    <Route exact path="/tabs" component={Tabs} />
    <Route exact path="/text" component={Text} />
    <Route exact path="/textarea" component={TextArea} />
    <Route exact path="/textinput" component={TextInput} />
    <Route exact path="/themecontext" component={ThemeContext} />
    <Route exact path="/video" component={Video} />
    <Route exact path="/worldmap" component={WorldMap} />

    <Route exact path="/browsers" component={Browsers} />
    <Route exact path="/functions" component={Functions} />
    <Route exact path="/starter" component={GettingStarted} />
    <Route exact path="/resources" component={Resources} />

    <Route exact path="/grommet-icons" redirect="//icons.grommet.io" />
    <Route exact path="/grommet-icons/" redirect="//icons.grommet.io" />
  </Routes>
);
