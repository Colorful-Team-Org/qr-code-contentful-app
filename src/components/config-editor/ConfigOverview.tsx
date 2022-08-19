import {
  Box,
  Button,
  ModalConfirm,
  ModalLauncher,
  Paragraph,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
} from '@contentful/f36-components';
import { Workbench, WorkbenchContent, WorkbenchSidebar } from '@contentful/f36-workbench';
import dayjs from 'dayjs';
import dayjsDuration from 'dayjs/plugin/duration';
import dayjsRelativeTime from 'dayjs/plugin/relativeTime';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { mappingConfigsAtom } from '../../app-context';
import translations from '../../translations';
import { MappingConfig } from '../../types';
import InstallationScreen from '../installation-screen/InstallationScreen';
import EntryConfigurator from './EntryConfigurator';
import Instructions from '../instructions/Instructions';
import ItemMenu from './ItemMenu';

dayjs.extend(dayjsDuration);
dayjs.extend(dayjsRelativeTime);

const t = translations.configScreen;
type Props = {};

export type ConfigEdit = {
  original?: MappingConfig;
  edit: MappingConfig;
  errors?: {
    name?: string;
    entryUrl?: string;
  };
};
export default function ConfigOverview(props: Props) {
  const [configs, setConfigs] = useAtom(mappingConfigsAtom);

  const [configEdit, setConfigEdit] = useState<ConfigEdit>();

  const onAddClick = () => {
    setConfigEdit({ edit: { name: '', entries: {} } });
  };

  const onMoveUpClick = (index: number) => {
    if (index <= 0) return;
    const newState = [...configs];
    const entry = newState[index];
    newState[index] = newState[index - 1];
    newState[index - 1] = entry;
    setConfigs(newState);
  };

  const onMoveDownClick = (index: number) => {
    if (index >= configs.length - 1) return;
    const newState = [...configs];
    const entry = newState[index];
    newState[index] = newState[index + 1];
    newState[index + 1] = entry;
    setConfigs(newState);
  };

  const onDeleteClick = async (index: number) => {
    /** get user confirmation */
    const config = configs[index];
    const confirmed = await ModalLauncher.open(modal => (
      <ModalConfirm
        isShown={modal.isShown}
        onConfirm={() => modal.onClose(true)}
        onCancel={() => modal.onClose(false)}
      >
        <Paragraph>
          <Text>{t.overview.delteConfirmation.replace(/{configName}/g, config.name)}</Text>
        </Paragraph>
      </ModalConfirm>
    ));

    if (confirmed) {
      /** update state */
      const newState = [...configs];
      newState.splice(index, 1);
      setConfigs(newState);
    }
  };

  const onEditClick = (index: number) => {
    const original = configs[index];
    setConfigEdit({ original, edit: original });
  };

  const onEditModalChange = (edit: MappingConfig) => {
    if (!configEdit) {
      return;
    }
    // console.log(`onEditModalChange`, edit);
    setConfigEdit({ ...configEdit, edit });
  };

  const onEditModalConfirm = () => {
    if (!configEdit) {
      return;
    }
    const { original, edit } = configEdit;
    const name = edit.name.trim();

    const errors: Exclude<ConfigEdit['errors'], undefined> = {};

    /** check for name required */
    if (!name) {
      errors.name = t.errors.fieldRequired;
    }

    /** check if name exists already */
    const sameNamedConfig = configs.find(c => c.name === name);
    if (!original) {
      if (sameNamedConfig) {
        errors.name = t.errors.entryNameExists;
      }
    } else {
      if (sameNamedConfig && sameNamedConfig !== original) {
        errors.name = t.errors.entryNameExists;
      }
    }

    /** check if all selected contentTypes got an url */
    if (Object.entries(configEdit.edit.entries).find(([k, v]) => !v)) {
      errors.entryUrl = t.errors.fieldRequired;
    }

    /** if there are errors abort */
    if (Object.keys(errors).length > 0) {
      setConfigEdit({
        original,
        edit,
        errors,
      });
      return false;
    }

    /** update state */
    if (!original) {
      setConfigs(state => [...state, { ...edit, created: new Date().toISOString() }]);
    } else {
      const index = configs.findIndex(c => c === original);
      if (index < 0) {
        console.warn(`Original configuration not found. This shouldn't have happened`);
        return false;
      }
      const newConfigs = [...configs];
      newConfigs[index] = edit;
      setConfigs(newConfigs);
    }

    /** reset edit state */
    setConfigEdit(undefined);
    return true;
  };

  const onEditModalClose = () => setConfigEdit(undefined);

  const now = Date.now();
  return (
    <>
      {!configs.length ? (
        <InstallationScreen onAddClick={onAddClick} />
      ) : (
        <Workbench>
          <WorkbenchContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t.overview.entryName}</TableCell>
                  <TableCell width={200}>{t.overview.entryCreatedAt}</TableCell>
                  <TableCell width={135}>{t.overview.entryContentTypesAssigned}</TableCell>
                  <TableCell width={50}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {configs.map((config, i) => (
                  <TableRow key={config.name}>
                    <TableCell style={{ cursor: 'pointer' }} onClick={() => onEditClick(i)}>
                      {config.name}
                    </TableCell>
                    <TableCell style={{ cursor: 'pointer' }} onClick={() => onEditClick(i)}>
                      {config.created
                        ? `${dayjs
                            .duration(now - new Date(config.created).getTime())
                            .humanize()} ago`
                        : ''}
                    </TableCell>
                    <TableCell style={{ cursor: 'pointer' }} onClick={() => onEditClick(i)}>
                      {Object.keys(config.entries).length || '0'}
                    </TableCell>
                    <TableCell>
                      <ItemMenu
                        onEditEntry={() => onEditClick(i)}
                        onMoveEntryUp={i !== 0 ? () => onMoveUpClick(i) : undefined}
                        onMoveEntryDown={
                          i < configs.length - 1 ? () => onMoveDownClick(i) : undefined
                        }
                        onDeleteEntry={() => onDeleteClick(i)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* <ConfiguratorTabView /> */}
          </WorkbenchContent>
          <WorkbenchSidebar style={{ width: 400 }}>
            <Box marginBottom="spacingXl">
              <Button variant="positive" onClick={onAddClick}>
                {t.actions.addEntry}
              </Button>
            </Box>
            <Instructions />
          </WorkbenchSidebar>
        </Workbench>
      )}
      <ModalConfirm
        size={1200}
        isShown={!!configEdit}
        title={t.addEntry[!configEdit?.original ? 'titleNew' : 'titleEdit']}
        modalContentProps={{ style: { marginBottom: 15 } }}
        onCancel={onEditModalClose}
        onConfirm={onEditModalConfirm}
      >
        <EntryConfigurator
          config={configEdit?.edit}
          errors={configEdit?.errors}
          onChange={onEditModalChange}
        />
      </ModalConfirm>
    </>
  );
}
