import React, { useState } from 'react';

import * as R from 'ramda';
import { PickerOptions } from 'filestack-js';
import { FileInputProps, FileInputState, RenderPropType } from '../types';
import { FileInputFilestack } from './filestack/FileInput.Filestack';
import { FileInputUploadcare } from './uploadcare/FileInput.Uploadcare';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

const WORKSPACE_FILE_UPLOAD_SIGN_INFO = gql`
  query WorkspaceFileUploadSignInfo {
    system {
      fileUploadSignInfo {
        ... on AwsSignInfoResponse {
          url
          path
          fields
        }
        ... on FileStackSignInfoResponse {
          signature
          apiKey
          path
          policy
        }
        ... on UploadcareSignInfoResponse {
          expire
          publicKey
          signature
        }
      }
    }
  }
`;

const UPLOADCARE_TYPE = 'UploadcareSignInfoResponse';

const isUploadcare = (fileUploadSignInfo: any) => {
  const provider = fileUploadSignInfo.__typename;

  return provider === UPLOADCARE_TYPE;
};

const FALLBACK_PROPS = {
  value: null,
  originalFile: null,
  error: undefined,
  loading: true,
};

export const FileInput: React.FC<FileInputProps> = props => {
  const [fallbackOptions, setFallbackOptions] = useState<PickerOptions | undefined>();
  const { data, loading, error } = useQuery(WORKSPACE_FILE_UPLOAD_SIGN_INFO);

  const fileUploadSignInfo = R.pathOr({}, ['system', 'fileUploadSignInfo'], data);
  
  if (loading) {
    return props.children({
      ...FALLBACK_PROPS,
      pick: setFallbackOptions as RenderPropType['pick'],
    });
  }

  if (isUploadcare(fileUploadSignInfo)) {
    return <FileInputUploadcare {...props} fileUploadSignInfo={fileUploadSignInfo} error={error} />
  }

  return <FileInputFilestack {...props} fileUploadSignInfo={fileUploadSignInfo} error={error} />;
};
