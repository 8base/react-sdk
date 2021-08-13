import { PickerOptions } from 'filestack-js';
import { DropzoneState } from 'react-dropzone';

import { CommonFileInputProps, FileInputState } from 'src/types';

import { StepType } from './useFilePicker.constants';

export type LocalFile = File & { localPath: string | undefined };

export type FilePickerState = {
  fileList: LocalFile[];
  setFileList: (files: LocalFile[]) => void;
  fileProgressList: number[];
  addFiles: (files: LocalFile[]) => void;
  removeFile: (file: LocalFile) => () => void;
  isOpen: boolean;
  hideFilePicker: () => void;
  setStep: (step: StepType) => void;
  step: StepType;
  upload: () => void;
  showFilePicker: (options?: PickerOptions, onUploadDone?: CommonFileInputProps['onUploadDone']) => void;
  setUploadMoreStep: () => void;
  setUploadStep: () => void;
  getRootProps: DropzoneState['getRootProps'];
  getInputProps: DropzoneState['getInputProps'];
  options: PickerOptions;
  value: FileInputState['value'];
  originalFile: FileInputState['originalFile'];
  error: FileInputState['error'];
};
