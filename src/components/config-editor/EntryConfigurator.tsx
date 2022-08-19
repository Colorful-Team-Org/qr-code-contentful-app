import { Box, Flex, Form, FormControl, Textarea, TextInput } from '@contentful/f36-components';
import tokens from '@contentful/f36-tokens';
import React, { useMemo } from 'react';
import { useContentTypesQuery } from '../../services';
import { MappingConfig } from '../../types';
import TokenIntructions from '../instructions/TokenInstructions';
import { ConfigEdit } from './ConfigOverview';
import { ContentTypeUrlEditor } from './ContentTypeUrlEditor';

type Props = {
  config?: MappingConfig;
  errors?: ConfigEdit['errors'];
  onChange?: (config: MappingConfig) => any;
};

export default function EntryConfigurator(props: Props) {
  // console.log('EntryEditor', props.config.name);
  const { config = { name: '', entries: {} } as MappingConfig } = props;
  // const [config, setConfig] = useState<MappingConfig>(props.config);
  // useEffect(() => {
  //   if (props.config !== config) {
  //     setConfig(props.config)
  //   }
  // }, [config, props.config]);

  const contentTypesQuery = useContentTypesQuery();

  const contentTypes = contentTypesQuery.data?.items;

  const list = useMemo(
    () =>
      contentTypes?.map(ct => ({
        contentType: ct,
        url: config?.entries[ct.sys.id],
      })),
    [contentTypes, config]
  );

  return (
    <Flex>
      <Box style={{ flex: 1, padding: `0 20px` }}>
        <Form>
          <FormControl isRequired>
            <FormControl.Label>Name</FormControl.Label>
            <TextInput
              title="Name"
              maxLength={20}
              value={config.name || ''}
              onChange={ev => {
                props.onChange?.({
                  ...config,
                  name: ev.currentTarget.value || '',
                });
              }}
            />
            {!!props.errors?.name && (
              <FormControl.ValidationMessage>{props.errors?.name}</FormControl.ValidationMessage>
            )}
          </FormControl>
          <FormControl>
            <FormControl.Label>Description</FormControl.Label>
            <Textarea
              value={config.description || ''}
              maxLength={200}
              onChange={ev => {
                props.onChange?.({
                  ...config,
                  description: ev.currentTarget.value || undefined,
                });
              }}
            />
          </FormControl>
          {list &&
            list.map((entry, i) => (
              <Box key={`${entry.contentType.sys.id}`} marginBottom="spacingL">
                <ContentTypeUrlEditor
                  contentType={entry.contentType.name}
                  url={entry.url}
                  showFieldErrors={!!props.errors?.entryUrl}
                  onChange={(checked, url) => {
                    if (!config) return;
                    /** if entry was unchecked we delete the contentType from `config` */
                    if (!checked) {
                      /** check if contentType was actually added to `config` before */
                      if (!(entry.contentType?.sys.id in config.entries)) {
                        return;
                      }
                      const newConfig = { ...config };
                      delete newConfig.entries[entry.contentType?.sys.id];
                      props.onChange?.(newConfig);
                      return;
                    }
                    /** if contentType is checked add url and dispatch  */
                    props.onChange?.({
                      ...config,
                      entries: {
                        ...config.entries,
                        [list[i].contentType.sys.id]: url,
                      },
                    });
                  }}
                />
              </Box>
            ))}
        </Form>
      </Box>
      <Box
        style={{
          flexBasis: 300,
          background: tokens.gray100,
          padding: '0 20px',
          marginTop: -15,
          marginRight: -15,
        }}
      >
        <TokenIntructions />
      </Box>
    </Flex>
  );
}
