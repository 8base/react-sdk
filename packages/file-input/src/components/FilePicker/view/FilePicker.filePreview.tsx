import React from 'react';

import { formatFileSize } from '../../../utils';

import { CloseIcon } from './CloseIcon';
import { IconDocument } from './FileIcon';
import { FILE_PREVIEW_STYLES } from './FilePicker.styles';

type FilePreviewProps = {
  name: string;
  src?: string;
  size: number;
  isUploading?: boolean;
  progress?: number;
  onRemoveClick?: () => void;
};

export const FilePreview = ({
  name,
  src,
  size,
  onRemoveClick,
  isUploading,
  progress = 0,
}: FilePreviewProps) => {
  const progressString = formatFileSize(progress);
  const sizeString = formatFileSize(size);
  return (
    <div className={FILE_PREVIEW_STYLES.itemWrapper}>
      {src ? (
        <img className={FILE_PREVIEW_STYLES.image} src={src} />
      ): (
        <div className={FILE_PREVIEW_STYLES.image}>
          <IconDocument />
        </div>
      )}
      <div className={FILE_PREVIEW_STYLES.details}>
        <span>{name}</span>
        <span>{isUploading ? `${progressString} / ${sizeString}` : sizeString}</span>
      </div>
      {!isUploading && (
        <div className={FILE_PREVIEW_STYLES.removeWrapper} onClick={onRemoveClick}>
          <CloseIcon />
        </div>
      )}
    </div>
  );
};
