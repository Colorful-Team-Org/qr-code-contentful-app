import { Paragraph, SectionHeading } from '@contentful/f36-components';
import React from 'react';
import TokenText from './TokenText';

export default function Instructions() {
  return (
    <>
      <SectionHeading>ABOUT THE APP</SectionHeading>
      <Paragraph>
        Adding a preview environment generates a QR code in the entry sidebar allowing your users to
        open the preview link on their mobile phone.
      </Paragraph>
      <Paragraph>
        The QR Preview app is an open-source app built and maintained by the community. Use it at
        your own risk. The code for the app can be found on{' '}
        <a
          href="https://github.com/Colorful-Team-Org/qr-code-contentful-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        .
      </Paragraph>

      <SectionHeading marginTop="spacingXl">Set up</SectionHeading>
      <Paragraph>
        To set up a preview link, select a content type from the list and add the URL used by your
        app.
      </Paragraph>
      <Paragraph>
        You can use placeholder values for dynamic variables, as explained below. For example, if
        you are working with the entry whose ID is <TokenText>7oPtZLNLNtaCgInSOdrTmZ </TokenText>
        the URL <TokenText>{`colorfulcoin://article/{entry.sys.id} `}</TokenText>
        will be resolved to <TokenText>colorfulcoin://article/7oPtZLNLNtaCgInSOdrTmZ</TokenText>.
        Resolved URLs will be turned into QR codes and displayed in the sidebar.
      </Paragraph>

      <SectionHeading marginTop="spacingXl">Usage</SectionHeading>
      <Paragraph>
        Preview links can be added to multiple content types and the app supports multiple
        configurations per content type. This is useful when you want to add different preview
        environments to the same entry, for example, iOS app & Android app, Legacy app & new app,
        Staff app & Public app.
      </Paragraph>
      <Paragraph>
        URLs with custom prefixes will be displayed as read-only QR codes. When provided URLs begin
        with the prefix `http://` or `https://` users can additionally click on the QR code to open
        the preview link in the browser of their desktop computer.
      </Paragraph>

      {/* <TokenIntructions /> */}
    </>
  );
}
