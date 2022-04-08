import { FetchPolicy } from 'apollo-client';
import { PickerOptions } from 'filestack-js';
import { ApolloError } from 'apollo-client';

export type FileValue = {
  fileId: string;
  filename: string;
  id?: string;
  downloadUrl?: string;
  mimetype?: string;
};

export type FileInputValue = FileValue | FileValue[];

export type OriginalFileInputValue = File | File[];

export type FileInputProps = {
  onChange?: (value: FileInputValue, originalFile: OriginalFileInputValue) => void;
  children: (args: {
    pick: (options: {}) => Promise<void>;
    value: FileInputValue | null;
    originalFile: OriginalFileInputValue | null;
    error: ApolloError | undefined;
  }) => JSX.Element;
  public?: boolean;
  fetchPolicy?: FetchPolicy;
  maxFiles?: number;
  sessionCache?: boolean;
  onUploadDone?: (value: FileInputValue, originalFile?: OriginalFileInputValue) => Promise<FileInputValue>;
  value?: FileInputValue | null;
  fileUploadSignInfo: any;
  error: ApolloError | undefined;
};

export type RenderPropType = {
  pick: (options: PickerOptions) => Promise<void>;
  value: FileInputValue | null;
  originalFile: OriginalFileInputValue | null;
  error: Record<string, unknown> | null;
  loading?: boolean;
};

export type FileInputState = {
  path: string | null;
  value: FileInputValue | null;
  originalFile: OriginalFileInputValue | null;
};
