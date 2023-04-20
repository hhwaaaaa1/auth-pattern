import type { AppProps } from 'next/app';
import { Global, css } from '@emotion/react';
import emotionReset from 'emotion-reset';
import { RecoilRoot } from 'recoil';

import Layout from '@/components/Layout';
import { DebugObserver } from '@/components/DebugObserver';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <DebugObserver />
      <Layout>
        <Global
          styles={css`
            ${emotionReset}
          `}
        />
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}
