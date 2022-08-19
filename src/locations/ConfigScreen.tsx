import { AppExtensionSDK } from '@contentful/app-sdk';
import { Spinner } from '@contentful/f36-components';
import { useSDK } from '@contentful/react-apps-toolkit';
import { useAtom } from 'jotai';
import React, { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { mappingConfigsAtom } from '../app-context';
import ConfigOverview from '../components/config-editor/ConfigOverview';
import { useContentTypesQuery } from '../services';
import { AppInstallationParameters } from '../types';

const ConfigScreen = () => {
  // const [parameters, setParameters] = useState<AppInstallationParameters>({});
  const [mappingConfigs, setMappingConfig] = useAtom(mappingConfigsAtom);

  const sdk = useSDK<AppExtensionSDK>();

  const parametersQuery = useQuery('currentParameters', () =>
    sdk.app.getParameters<AppInstallationParameters>()
  );
  const contentTypesQuery = useContentTypesQuery();

  const isLoading = parametersQuery.isLoading || contentTypesQuery.isLoading;

  // If the app is not installed yet, `parameters` will be `null`.
  const parameters = parametersQuery.data;
  const contentTypeIds = useMemo(
    () => contentTypesQuery.data?.items.map(c => c.sys.id),
    [contentTypesQuery.data?.items]
  );

  /** sets persisted mapingConfigs after they were loaded during initialization*/
  useEffect(() => {
    if (isLoading) {
      return;
    }

    const mappingConfigs = parameters?.mappingConfigs;
    if (mappingConfigs) {
      setMappingConfig(mappingConfigs);
    }
    sdk.app.setReady();
  }, [
    contentTypesQuery.isLoading,
    isLoading,
    parameters,
    parametersQuery.isLoading,
    sdk,
    setMappingConfig,
  ]);

  // `onConfigure` allows to configure a callback to be
  // invoked when a user attempts to install the app or update
  // its configuration.
  useEffect(() => {
    sdk.app.onConfigure(async () => {
      /** this actually should never happen */
      if (parametersQuery.isLoading || !contentTypeIds) {
        throw new Error('App is not ready yet.');
      }

      const currentState = await sdk.app.getCurrentState();

      const mappedContentTypeIds = new Set<string>();
      for (const config of mappingConfigs) {
        Object.entries(config.entries).forEach(([contentTypeId, url]) => {
          /** we check if url is set and if the contentType actually exists (in case contentmodel changed meanwhile) */
          if (url && contentTypeIds.includes(contentTypeId)) {
            mappedContentTypeIds.add(contentTypeId);
          } else {
            delete config.entries[contentTypeId];
          }
        });
      }

      return {
        // Parameters to be persisted as the app configuration.
        parameters: {
          mappingConfigs: mappingConfigs,
        },
        targetState: {
          ...currentState,
          EditorInterface: Array.from(mappedContentTypeIds).reduce(
            (acc, contentTypeId) => ({
              ...acc,
              [contentTypeId]: { sidebar: { position: 0 } },
            }),
            {} as any
          ),
        },
      };
    });
  }, [contentTypeIds, mappingConfigs, parametersQuery.isLoading, sdk]);

  if (isLoading) {
    return <Spinner />;
  }

  return <ConfigOverview />;
};

export default ConfigScreen;
