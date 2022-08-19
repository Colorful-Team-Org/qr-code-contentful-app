import { Text } from '@contentful/f36-components';
import React, { PropsWithChildren } from 'react';
import tokens from '@contentful/f36-tokens';
import { css } from 'emotion';

export default function TokenText(props: PropsWithChildren<{}>) {
  return (
    <Text
      fontStack="fontStackMonospace"
      className={css({ color: tokens.green500, wordBreak: 'break-word' })}
    >
      {props.children}
    </Text>
  );
}
