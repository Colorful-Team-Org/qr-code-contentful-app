import { Button, Card, Flex, Heading, Paragraph } from '@contentful/f36-components';
import React from 'react';
import translations from '../../translations';
import imageSrc from './installation-image.png';

const tConfig = translations.configScreen;
const tInstall = translations.installatonScreen;

export default function InstallationScreen(props: { onAddClick?: () => any }) {
  return (
    <Flex justifyContent="center" marginTop="spacing4Xl">
      <Card style={{ width: 770, padding: 30 }}>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          style={{
            maxWidth: 700,
          }}
        >
          <img src={imageSrc} style={{ width: 250 }} alt="app icon" />

          <Heading>{tInstall.headline}</Heading>
          <Paragraph style={{ textAlign: 'center' }}>{tInstall.body}</Paragraph>

          <Button variant="primary" onClick={props.onAddClick}>
            {tConfig.actions.addEntry}
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
}
