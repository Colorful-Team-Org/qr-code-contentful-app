import { FormControl, ModalConfirm, TextInput } from '@contentful/f36-components';
import React, { useEffect, useRef } from 'react';

type Props = {
  title: string;
  defaultValue?: string;
  isShown?: boolean;
  onClose?: (name?: string) => any;
};
export default function CreateEntryModal(props: Props) {
  console.log('CreateEntryModal', props);
  const inputRef = useRef<HTMLInputElement>(null);

  /** autofocus input field (modal prop `initialFocusRef` seems to be buggy) */
  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
      if (inputRef.current && props.defaultValue) {
        inputRef.current.value = props.defaultValue;
        inputRef.current.setSelectionRange(0, props.defaultValue.length);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [props.defaultValue]);

  return (
    <ModalConfirm
      isShown={!!props.isShown}
      intent="positive"
      title={props.title}
      confirmLabel="Create"
      cancelLabel="Cancel"
      // initialFocusRef={inputRef}
      onCancel={() => props.onClose?.(undefined)}
      onConfirm={() => inputRef.current?.value && props.onClose?.(inputRef.current?.value)}
    >
      <FormControl isRequired>
        <FormControl.Label>Name</FormControl.Label>
        <TextInput ref={inputRef} title="Name" maxLength={15}></TextInput>
      </FormControl>
    </ModalConfirm>
  );
}
