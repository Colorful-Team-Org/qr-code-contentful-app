import { IconButton, Menu } from '@contentful/f36-components';
import React from 'react';
import * as icons from '@contentful/f36-icons';
import translations from '../../translations';

type Props = {
  onEditEntry?: () => any;
  onMoveEntryUp?: () => any;
  onMoveEntryDown?: () => any;
  onDeleteEntry?: () => any;
};

const t = translations.configScreen;

export default function ItemMenu(props: Props) {
  return (
    <Menu>
      <Menu.Trigger>
        <IconButton
          icon={<icons.MoreVerticalIcon />}
          aria-label="toggle menu"
          style={{ minHeight: 30, paddingTop: 5, paddingBottom: 5 }}
        />
      </Menu.Trigger>
      <Menu.List>
        <Menu.Item onClick={props.onEditEntry}>{t.overview.editEntry}</Menu.Item>
        <Menu.Item disabled={!props.onMoveEntryUp} onClick={props.onMoveEntryUp}>
          {t.overview.moveEntryUp}
        </Menu.Item>
        <Menu.Item disabled={!props.onMoveEntryDown} onClick={props.onMoveEntryDown}>
          {t.overview.moveEntryDown}
        </Menu.Item>
        <Menu.Item onClick={props.onDeleteEntry}>{t.overview.deleteEntry}</Menu.Item>
      </Menu.List>
    </Menu>
  );
}
