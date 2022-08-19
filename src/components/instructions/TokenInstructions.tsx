import { Paragraph, SectionHeading, Text } from '@contentful/f36-components';
import React from 'react';
import TokenText from './TokenText';

export default function TokenIntructions() {
  return (
    <>
      <SectionHeading marginTop="spacingXl">Tokens for for preview urls</SectionHeading>
      <Paragraph>
        Use these representative tokens in your strings. They will be replaced with the
        corresponding values when the preview is opened in the entry editor.
      </Paragraph>

      <Paragraph>
        <TokenText>{`{env}`}</TokenText>
        <Text>: the environment for the entry.</Text>
      </Paragraph>
      <Paragraph>
        <TokenText>{`{entry}`}</TokenText>
        <Text>: an object containing all the properties and their values for the entry.</Text>
      </Paragraph>
      <Paragraph>You can get the value of any property, for example:</Paragraph>
      <Paragraph>
        <TokenText>{`{env.name}`}</TokenText>
        <Text>: name of the current environment</Text>
      </Paragraph>
      <Paragraph>
        <TokenText>{`{env.sys.id}`}</TokenText>
        <Text>: id of the current environment</Text>
      </Paragraph>
      <Paragraph>
        <TokenText>{`{entry.sys.id}`}</TokenText>
        <Text>: id of the current entry</Text>
      </Paragraph>
      <Paragraph>
        <TokenText>{`{entry.fields.slug}`}</TokenText>
        <Text>: the value of the slug field for the current entry (default locale)</Text>
      </Paragraph>
    </>
  );
}
