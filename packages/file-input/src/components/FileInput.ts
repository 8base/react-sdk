import React from 'react';
import { FileInputProps, FileInputState } from '../types';
import { FileInputFilestack } from '../components/filestack/FileInput.Filestack';

export const FileInput: React.FC<FileInputProps> = (props) => {

  return <FileInputFilestack {...props} />;
}