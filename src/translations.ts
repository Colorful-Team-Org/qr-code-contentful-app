const translations = {
  installatonScreen: {
    headline: 'Preview your content on a mobile device',
    body: 'Give your content creators an easy way to preview draft entries on mobile devices by automatically displaying preview QR codes within the entry sidebar. The app support native previews within mobile apps and previews within a mobile browser.',
  },
  configScreen: {
    overview: {
      entryName: `Name`,
      entryCreatedAt: `Created`,
      entryContentTypesAssigned: `Content types`,
      editEntry: `Edit`,
      deleteEntry: `Delete`,
      moveEntryUp: `Move up`,
      moveEntryDown: `Move down`,
      delteConfirmation: `Are you sure you want to delete configuration "{configName}"?`,
    },
    addEntry: {
      titleNew: `Add new QR code`,
      titleEdit: `Edit QR code`,
      name: `Name`,
      description: `Description`,
      urlPlaceholder: `For example: protocol://yourdomain/component/{entry.sys.id}`,
      submitNew: `Add QR code`,
      submitEdit: `Save QR code`,
    },
    actions: {
      addEntry: 'Add QR code',
    },
    errors: {
      entryNameExists: `A entry with this name exists already.`,
      fieldRequired: `This field is required.`,
    },
  },
};

export default translations;
