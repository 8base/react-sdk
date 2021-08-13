import React from 'react';

import { FilePickerState } from 'src/hooks';

import { STEPS } from '../FilePicker.constants';

import { CloseIcon } from './CloseIcon';
import { FilePickerDropZone, FilePickerDropZoneProps } from './FilePicker.dropzone';
import { FilePreview } from './FilePicker.filePreview';
import { COMMON_STYLES, CONTENT_STYLES } from './FilePicker.styles';

type FilePickerContentProps = FilePickerDropZoneProps &
  Pick<
  FilePickerState,
    | 'step'
    | 'hideFilePicker'
    | 'addFiles'
    | 'fileList'
    | 'setUploadStep'
    | 'removeFile'
    | 'setUploadMoreStep'
    | 'upload'
    | 'fileProgressList'
    | 'options'
  >;

const shouldShowUploadMoreBtn = (options: FilePickerContentProps['options'], length: number) => {
  if (options && options.maxFiles) {
    return length < options.maxFiles;
  }

  return true;
};

const shouldShowUploadBtn = (options: FilePickerContentProps['options'], length: number) => {
  if (options && options.minFiles) {
    return length >= options.minFiles;
  }

  return true;
};

export const FilePickerContent = ({
  step,
  hideFilePicker,
  fileList,
  setUploadStep,
  removeFile,
  setUploadMoreStep,
  upload,
  fileProgressList,
  getRootProps,
  getInputProps,
  options,
}: FilePickerContentProps) => {
  switch (step) {
    case STEPS.select: {
      return (
        <>
          <div className={CONTENT_STYLES.header}>
            <div className={CONTENT_STYLES.closeWrapper} onClick={hideFilePicker}>
              <CloseIcon />
            </div>
          </div>
          <FilePickerDropZone getRootProps={getRootProps} getInputProps={getInputProps} />
        </>
      );
    }

    case STEPS.uploadMore: {
      return (
        <>
          <div className={CONTENT_STYLES.header}>
            <div className={CONTENT_STYLES.closeWrapper} onClick={hideFilePicker}>
              <CloseIcon />
            </div>
          </div>
          <FilePickerDropZone getRootProps={getRootProps} getInputProps={getInputProps} />
          <div className={CONTENT_STYLES.footer}>
            <span className={CONTENT_STYLES.footerDetails}>Selected Files: {fileList.length}</span>
            <button className={COMMON_STYLES.button} onClick={setUploadStep}>
              View Selected
            </button>
          </div>
        </>
      );
    }

    case STEPS.upload: {
      return (
        <>
          <div className={CONTENT_STYLES.header}>
            <div className={CONTENT_STYLES.headerTitle}>Selected Files</div>
            <div className={CONTENT_STYLES.closeWrapper} onClick={hideFilePicker}>
              <CloseIcon />
            </div>
          </div>
          <div className={CONTENT_STYLES.listWrapper}>
            {fileList.map((el, index) => (
              <FilePreview
                key={`${el.name}_${index}`}
                size={el.size}
                name={el.name}
                src={el.localPath}
                onRemoveClick={removeFile(el)}
              />
            ))}
          </div>
          <div className={CONTENT_STYLES.footer}>
            {shouldShowUploadMoreBtn(options, fileList.length) && (
              <button className={COMMON_STYLES.button} onClick={setUploadMoreStep}>
                Upload more
              </button>
            )}
            {shouldShowUploadBtn(options, fileList.length) && (
              <button className={COMMON_STYLES.button} onClick={upload}>
                Upload
              </button>
            )}
          </div>
        </>
      );
    }

    case STEPS.uploading: {
      return (
        <>
          <div className={CONTENT_STYLES.header}>
            <span className={CONTENT_STYLES.headerTitle}>Selected Files</span>
          </div>
          <div className={CONTENT_STYLES.listWrapper}>
            {fileList.map((el, index) => (
              <FilePreview
                key={`${el.name}_${index}`}
                size={el.size}
                name={el.name}
                src={el.localPath}
                isUploading
                progress={fileProgressList[index]}
              />
            ))}
          </div>
        </>
      );
    }

    default: {
      return null;
    }
  }
};
