import React from 'react';

import { DropzoneState } from 'react-dropzone';

import { DROPZONE_STYLES } from './FilePicker.styles';

export type FilePickerDropZoneProps = {
  getRootProps: DropzoneState['getRootProps'];
  getInputProps: DropzoneState['getInputProps'];
};

export const FilePickerDropZone = ({ getRootProps, getInputProps }: FilePickerDropZoneProps) => {
  return (
    <div className={DROPZONE_STYLES.wrapper} {...getRootProps()}>
      <input {...getInputProps()} />
      <div className={DROPZONE_STYLES.title}>Select Files to Upload</div>
      <div className={DROPZONE_STYLES.description}>or Drag and Drop, Copy and Paste Files </div>
    </div>
  );
};
