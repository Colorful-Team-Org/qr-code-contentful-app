// type MappingConfigEntry = {
//   contentType: string;
//   url?: string;
// };

export interface AppInstallationParameters {
  mappingConfigs?: MappingConfig[];
}

export type MappingConfig = {
  name: string;
  created?: string;
  description?: string;
  entries: Record<string, string | undefined>; // contentType.sys.id => url
};
