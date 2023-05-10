import { useState, useRef, useCallback, cloneElement, ReactElement, ReactNode } from 'react';
import { CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache, { EmotionCache } from '@emotion/cache';
import { create, Jss } from 'jss';
import { jssPreset, StylesProvider } from '@material-ui/core/styles';
import Frame, { FrameComponentProps, FrameContextConsumer } from 'react-frame-component';
import { __createChakraFrameProvider } from '@rjsf/chakra-ui';

/*
Adapted from https://github.com/mui-org/material-ui/blob/master/docs/src/modules/components/DemoSandboxed.js

The MIT License (MIT)

Copyright (c) 2014 Call-Em-All

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

interface DemoFrameProps extends FrameComponentProps {
  /** override children to be ReactElement to avoid Typescript issue. In this case we don't need to worry about
   * children being of the other valid ReactNode types, undefined and string as it always contains an RJSF `Form`
   */
  children: ReactElement;
}

export default function DemoFrame(props: DemoFrameProps) {
  const { children, head, ...frameProps } = props;

  const [jss, setJss] = useState<Jss>();
  const [ready, setReady] = useState(false);
  const [sheetsManager, setSheetsManager] = useState(new Map());
  const [emotionCache, setEmotionCache] = useState<EmotionCache>(createCache({ key: 'css' }));
  const [container, setContainer] = useState();
  const [window, setWindow] = useState();

  const instanceRef = useRef<any>();

  const handleRef = useCallback(
    (ref: any) => {
      instanceRef.current = {
        contentDocument: ref ? ref.node.contentDocument : null,
        contentWindow: ref ? ref.node.contentWindow : null,
      };
    },
    [instanceRef]
  );

  const onContentDidMount = useCallback(() => {
    setReady(true);
    setJss(
      create({
        plugins: jssPreset().plugins,
        insertionPoint: instanceRef.current.contentWindow['demo-frame-jss'],
      })
    );
    setSheetsManager(new Map());
    setEmotionCache(
      createCache({
        key: 'css',
        prepend: true,
        container: instanceRef.current.contentWindow['demo-frame-jss'],
      })
    );
    setContainer(instanceRef.current.contentDocument.body);
    setWindow(() => instanceRef.current.contentWindow);
  }, []);

  let body: ReactNode = children;

  return (
    <Frame ref={handleRef} contentDidMount={onContentDidMount} head={head} {...frameProps}>
      <div id='demo-frame-jss' />
      {body}
    </Frame>
  );
}
