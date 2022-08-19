import { useCMA } from '@contentful/react-apps-toolkit';
import { useQuery } from 'react-query';

export const contentTypesQueryKey = 'cma.contentTypes';
export const useContentTypesQuery = () => {
  const cma = useCMA();
  return useQuery(contentTypesQueryKey, () => cma.contentType.getMany({}));
};
