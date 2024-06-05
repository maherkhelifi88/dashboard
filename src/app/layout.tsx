import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import AppWrappers from './AppWrappers';
import ConfigureAmplifyClientSide from './amplify-cognito-config';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id={'root'}>
        <>
        <ConfigureAmplifyClientSide/>
        <AppWrappers>{children}</AppWrappers>
        </>
      </body>
    </html>
  );
}
