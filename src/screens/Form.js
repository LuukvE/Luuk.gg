import React from 'react';

import { Button, Form, FormField } from 'grommet';
import { doc } from 'grommet/components/Form/doc';

import Page from '../components/Page';
import Doc from '../components/Doc';
import Item from './Components/Item';

const desc = doc(Form).toJSON();

export default () => (
  <Page>
    <Doc
      name="Form"
      desc={desc}
      code={`<Form>
  <FormField name="name" label="Name" />
  <Button type="submit" primary label="Submit" />
</Form>`}
    />
  </Page>
);

export const FormItem = ({ name, path }) => (
  <Item name={name} path={path} center>
    <Form>
      <FormField name="name" label="Name" />
      <Button type="submit" primary label="Submit" />
    </Form>
  </Item>
);

FormItem.propTypes = Item.propTypes;
