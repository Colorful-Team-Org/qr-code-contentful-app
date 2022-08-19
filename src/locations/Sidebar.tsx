import { SidebarExtensionSDK } from '@contentful/app-sdk';
import { Box, Paragraph, Spinner, Stack, Tabs } from '@contentful/f36-components';
import { useCMA, useSDK } from '@contentful/react-apps-toolkit';
import get from 'lodash/get';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { AppInstallationParameters } from '../types';

const Sidebar = () => {
  const sdk = useSDK<SidebarExtensionSDK>();
  const cma = useCMA();
  cma.entry.get({ entryId: sdk.entry.getSys().id });

  const parameters = sdk.parameters.installation as AppInstallationParameters;

  const configs = useMemo(
    () =>
      parameters.mappingConfigs?.filter(config =>
        Object.keys(config.entries).includes(sdk.contentType.sys.id)
      ),
    [parameters.mappingConfigs, sdk.contentType.sys.id]
  );

  useEffect(() => {
    sdk.window.startAutoResizer();
    return () => sdk.window.stopAutoResizer();
  }, [sdk.window]);

  const qrCodeBoxes = useMemo(
    () =>
      configs?.map(config => {
        const url = config.entries[sdk.contentType.sys.id];
        return (
          <>
            {url && <QRCodeView url={url} />}
            {!!config.description && (
              <Paragraph marginTop="spacingM">{config.description}</Paragraph>
            )}
          </>
        );
      }) || [],
    [configs, sdk.contentType.sys.id]
  );

  if (!configs?.length) {
    return <Paragraph>Please check you app configuration.</Paragraph>;
  }

  return (
    <>
      {qrCodeBoxes.length === 1 ? (
        qrCodeBoxes[0]
      ) : (
        <Tabs defaultTab={configs[0]?.name}>
          <Tabs.List>
            {configs.map(config => (
              <Tabs.Tab panelId={config.name} key={`tab-${config.name}`}>
                {config.name}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {configs.map((config, i) => {
            return (
              <Tabs.Panel id={config.name} key={`panel-${config.name}`}>
                <Box marginTop="spacingM">{qrCodeBoxes[i]}</Box>
              </Tabs.Panel>
            );
          })}
        </Tabs>
      )}
    </>
  );
};

export default Sidebar;

function QRCodeView(props: { url: string }) {
  const sdk = useSDK<SidebarExtensionSDK>();
  const cma = useCMA();

  const parsedUrlQuery = useQuery(`QRCodeView-${props.url}`, async () => {
    const tokens =
      props.url.match(/\{[a-zA-Z_\-\[\].]+\}/gm)?.filter((v, i, self) => self.indexOf(v) === i) ||
      [];
    let newUrl = props.url;
    for (const token of tokens) {
      const segments = token.substring(1, token.length - 1).split('.');
      let value = '';
      switch (segments[0]) {
        case `env`:
          const env = await cma.environment.get({ environmentId: sdk.ids.environment });
          const path = segments.slice(1).join('.');
          if (path) {
            value = get(env, path);
          }

          break;
        case 'entry':
          if (segments.length >= 3) {
            switch (segments[1]) {
              case 'fields':
                value = sdk.entry.fields[segments[2]].getValue();
                break;
              case 'sys':
                const path = segments.slice(2).join('.');
                if (path) {
                  value = get(sdk.entry.getSys(), path);
                }
                break;
            }
            break;
          }
      }
      if (value) {
        newUrl = newUrl.replaceAll(token, value);
      }
    }
    return newUrl;
  });
  const parsedUrl = parsedUrlQuery.data;

  if (parsedUrlQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {!!parsedUrl && (
        <Stack alignItems="flex-end" justifyContent="center">
          <Box
            marginTop="spacingS"
            padding="spacingL"
            style={{ width: '100%', background: 'white', textAlign: 'center' }}
          >
            {parsedUrl.startsWith('http:') || parsedUrl.startsWith('https://') ? (
              <a href={parsedUrl} target="blank" rel="noopener">
                <QRCodeSVG width="100%" height="100%" value={parsedUrl} />
              </a>
            ) : (
              <QRCodeSVG width="100%" height="100%" value={parsedUrl} />
            )}
          </Box>
        </Stack>
      )}
    </>
  );
}
