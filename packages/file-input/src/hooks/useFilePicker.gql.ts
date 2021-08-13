import gql from 'graphql-tag';

export const FILE_PICKER__CREATE_FILE_MUTATION = gql`
  mutation FileCreate($data: FileCreateInput!) {
    fileCreate(data: $data) {
      id
      fileId
      filename
      provider
      uploadUrl
      downloadUrl
      public
    }
  }
`;
