import React, { Component } from 'react';
import { structure, nameToPath } from '../../structure';
import Page from '../../components/Page';
import Header from '../../components/Header';
import Section from './Section';
import Color from './Color';

import {
  AccordionItem,
  AnchorItem,
  AnnounceContextItem,
  BoxItem,
  ButtonItem,
  CalendarItem,
  CarouselItem,
  ChartItem,
  CheckBoxItem,
  ClockItem,
  CollapsibleItem,
  DataTableItem,
  DiagramItem,
  DistributionItem,
  DropItem,
  DropButtonItem,
  FormItem,
  FormFieldItem,
  GridItem,
  GrommetItem,
  HeadingItem,
  ImageItem,
  InfiniteScrollItem,
  KeyboardItem,
  LayerItem,
  MarkdownItem,
  MaskedInputItem,
  MenuItem,
  MeterItem,
  ParagraphItem,
  RadioButtonItem,
  RadioButtonGroupItem,
  RangeInputItem,
  RangeSelectorItem,
  ResponsiveContextItem,
  SelectItem,
  SkipLinksItem,
  StackItem,
  TableItem,
  TabsItem,
  TextItem,
  TextAreaItem,
  TextInputItem,
  ThemeContextItem,
  VideoItem,
  WorldMapItem,
} from './items';

const Items = {
  Accordion: AccordionItem,
  Anchor: AnchorItem,
  AnnounceContext: AnnounceContextItem,
  Box: BoxItem,
  Button: ButtonItem,
  Calendar: CalendarItem,
  Carousel: CarouselItem,
  Chart: ChartItem,
  CheckBox: CheckBoxItem,
  Clock: ClockItem,
  Collapsible: CollapsibleItem,
  DataTable: DataTableItem,
  Diagram: DiagramItem,
  Distribution: DistributionItem,
  Drop: DropItem,
  DropButton: DropButtonItem,
  Form: FormItem,
  FormField: FormFieldItem,
  Grid: GridItem,
  Grommet: GrommetItem,
  Heading: HeadingItem,
  Image: ImageItem,
  InfiniteScroll: InfiniteScrollItem,
  Keyboard: KeyboardItem,
  Layer: LayerItem,
  Markdown: MarkdownItem,
  MaskedInput: MaskedInputItem,
  Menu: MenuItem,
  Meter: MeterItem,
  Paragraph: ParagraphItem,
  RadioButton: RadioButtonItem,
  RadioButtonGroup: RadioButtonGroupItem,
  RangeInput: RangeInputItem,
  RangeSelector: RangeSelectorItem,
  ResponsiveContext: ResponsiveContextItem,
  Select: SelectItem,
  SkipLinks: SkipLinksItem,
  Stack: StackItem,
  Table: TableItem,
  Tabs: TabsItem,
  Text: TextItem,
  TextArea: TextAreaItem,
  TextInput: TextInputItem,
  ThemeContext: ThemeContextItem,
  Video: VideoItem,
  WorldMap: WorldMapItem,
};

export default class Components extends Component {
  sectionRefs = {};

  constructor() {
    super();
    structure.sections.forEach(({ name }) => {
      this.sectionRefs[name] = React.createRef();
    });
  }

  componentDidMount() {
    document.title = 'Components - Grommet';
    this.scrollToSection();
  }

  componentDidUpdate() {
    this.scrollToSection();
  }

  scrollToSection = () => {
    const name = window.location.hash.split('#')[1];
    if (name && this.sectionRefs[name]) {
      this.sectionRefs[name].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  render() {
    return (
      <Page>
        <Header
          label="Components"
          summary="These are the building blocks of the grommet library, master them,
              and become a l33t."
        />

        {structure.sections.map(({ name, components }, index) => (
          <Section
            ref={this.sectionRefs[name]}
            key={name}
            name={name}
            index={index}
          >
            {name === 'Color' ? (
              <Color index={index} />
            ) : (
              components.map(component => {
                const Item = Items[component];
                return (
                  <Item
                    key={component}
                    name={component}
                    path={nameToPath(component)}
                  />
                );
              })
            )}
          </Section>
        ))}
      </Page>
    );
  }
}
