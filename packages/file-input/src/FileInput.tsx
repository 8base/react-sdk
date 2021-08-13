import React, { useState } from 'react';

import { PickerOptions } from 'filestack-js';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

import { FileInputAws } from './FileInput.aws';
import { FileInputFilestack } from './FileInput.filestack';
import { AWSFileInputProps, CommonFileInputProps, RenderPropType } from './types';

type FileManagementProviderResponse = {
  system: {
    environmentSettings: {
      fileManagementProvider: string;
    };
  };
};

const FALLBACK_PROPS = {
  value: null,
  originalFile: null,
  error: null,
  loading: true,
};

const FILE_MANAGEMENT_PROVIDER_QUERY = gql`
  query FileManagementProvider {
    system {
      environmentSettings {
        fileManagementProvider
      }
    }
  }
`;

const AWS_PROVIDER_NAME = 'aws';

const checkAWSProvider = (data: FileManagementProviderResponse | undefined) => {
  const provider =
    data &&
    data.system &&
    data.system.environmentSettings &&
    data.system.environmentSettings.fileManagementProvider;
  return provider === AWS_PROVIDER_NAME;
};

/**
 * This component check the workspace file provider
 * and selects which type of filepicker to use - filestack or 8base
 */
export const FileInput: React.FC<CommonFileInputProps | AWSFileInputProps> = props => {
  // need to open picker after finish query
  const [fallbackOptions, setFallbackOptions] = useState<PickerOptions | undefined>();
  const { data, loading } = useQuery<FileManagementProviderResponse>(
    FILE_MANAGEMENT_PROVIDER_QUERY,
    { fetchPolicy: props.fetchPolicy },
  );

  if (loading) {
    return props.children({
      ...FALLBACK_PROPS,
      pick: setFallbackOptions as RenderPropType['pick'],
    });
  }

  if (checkAWSProvider(data)) {
    return <FileInputAws {...(props as AWSFileInputProps)} fallbackOptions={fallbackOptions} />;
  }

  return <FileInputFilestack {...props} fallbackOptions={fallbackOptions} />;
};
