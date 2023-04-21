import type { AppProps } from 'next/app';
import { Global, css } from '@emotion/react';
import emotionReset from 'emotion-reset';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';

import Layout from '@/components/Layout';
import UserRoot from '@/components/Root/UserRoot';
import { DebugObserver } from '@/components/DebugObserver';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <DebugObserver />
      <QueryClientProvider client={queryClient}>
        <UserRoot>
          <Layout>
            <Global
              styles={css`
                ${emotionReset}
              `}
            />
            <Component {...pageProps} />
          </Layout>
        </UserRoot>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
