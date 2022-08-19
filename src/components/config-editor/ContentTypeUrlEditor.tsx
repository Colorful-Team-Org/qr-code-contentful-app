import { Box, Checkbox, FormControl, TextInput } from '@contentful/f36-components';
import React, { ChangeEventHandler, useState } from 'react';
import translations from '../../translations';

const t = translations.configScreen;

type Props = {
  contentType: string;
  url?: string;
  showFieldErrors?: boolean;
  onChange?: (checked: boolean, url?: string) => void;
};

export function ContentTypeUrlEditor(props: Props) {
  const [url, setUrl] = useState(props.url || '');
  const [checked, setChecked] = useState(props.url !== undefined);

  const handleCheck = () => {
    const newState = !checked;
    setChecked(newState);
    props.onChange?.(newState, newState ? url : undefined);
  };

  const handleUrl: ChangeEventHandler<HTMLInputElement> = ev => {
    const { value } = ev.currentTarget;
    setUrl(value);
    props.onChange?.(checked, value);
  };

  // useEffect(() => {
  //   setUrl(props.url || '');
  // }, [props.url]);

  return (
    <div>
      <Checkbox isChecked={checked} onChange={handleCheck}>
        {props.contentType}
      </Checkbox>
      {checked && (
        <Box marginTop="spacingS">
          <FormControl>
            <TextInput
              title="URL"
              placeholder={t.addEntry.urlPlaceholder}
              value={url}
              formNoValidate
              onChange={handleUrl}
            />
            {!!props.showFieldErrors && !props.url && (
              <FormControl.ValidationMessage>
                {t.errors.fieldRequired}
              </FormControl.ValidationMessage>
            )}
          </FormControl>
        </Box>
      )}
    </div>
  );
}
