import v8Validator from '@rjsf/validator-ajv8';

import Layout from './layout';
import Playground, { PlaygroundProps } from './components';

const validators: PlaygroundProps['validators'] = {
  AJV8: v8Validator,
};

export default function App() {
  return (
    <Layout>
      <Playground validators={validators} />
    </Layout>
  );
}
