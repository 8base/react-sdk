import React, { useCallback, useRef, useState, useEffect } from "react";
import { FileInfo, Widget, WidgetAPI } from "@uploadcare/react-widget";
import { FileInputProps, FileInputValue, OriginalFileInputValue } from "../../types";
import { getFileValue, getOriginalFile } from './FileInput.Uploadcare.utils';

const WIDGET_TABS = "file url facebook instagram dropbox gdrive";
const WIDGET_EFFECTS =
  "crop, flip, enhance, grayscale, blur, rotate, mirror, sharp, invert";

const FileInputUploadcare: React.FC<FileInputProps> = ({
  fileUploadSignInfo,
  children,
  error,
  onUploadDone,
  onChange,
  maxFiles,
  value,
}) => {
  const [fileInputValue, setFileInputValue] = useState<FileInputValue | null>(null);
  const [key, setKey] = useState<React.Key | undefined>();

  useEffect(() => {
    if (value) {
      setFileInputValue(value);
    };
  }, [value]);

  useEffect(()=> {
    //key need to reset widget
    if (value !== fileInputValue) {
      setKey(new Date().toISOString());
    };
  },[value, fileInputValue]);

  const [originalFileInfo, setOriginalFileInfo] = useState<OriginalFileInputValue | null>(null);
  const widgetRef = useRef() as React.MutableRefObject<WidgetAPI>;

  const { expire, publicKey, signature } = fileUploadSignInfo;
  
  const openUploadcareDialog = useCallback(async () => {
    if (widgetRef && widgetRef.current) {
      await widgetRef.current.openDialog('file');
    }
  }, []);

  const onFileSelect = useCallback((fileInfo) => {
    if (maxFiles && maxFiles > 1) {
      fileInfo.done(async (info: FileInfo) => {
        const originalFile = getOriginalFile(info);
        const fileValue = getFileValue(info);
        
        setFileInputValue([fileValue]);
        setOriginalFileInfo(originalFile);
  
        if (onChange) {
          await onChange([fileValue], originalFile);
        };
      });
    } else {
      fileInfo.done(async (info: FileInfo) => {
        const originalFile = getOriginalFile(info);
        const fileValue = getFileValue(info);

        setFileInputValue(fileValue);
        setOriginalFileInfo(originalFile);

        if (onChange) {
          await onChange(fileValue, originalFile);
        };
      });
    };
  }, [maxFiles, onChange, onUploadDone]);

  const onInputChange = useCallback(async (fileInfo: FileInfo) => {
    const fileValue = getFileValue(fileInfo);
    const originalFile = getOriginalFile(fileInfo);

    if (onUploadDone) {
      await onUploadDone(fileValue, originalFile);
    };
  }, [maxFiles, onChange]);

  return (
    <>
      <div style={{ display: 'none' }}>
        <Widget
          //key need to reset widget
          key={key}
          ref={widgetRef}
          previewStep
          onChange={onInputChange}
          onFileSelect={onFileSelect}
          publicKey={publicKey}
          secureExpire={expire}
          secureSignature={signature}
          tabs={WIDGET_TABS}
          effects={WIDGET_EFFECTS}
        />
      </div>
      {children({
        pick: openUploadcareDialog,
        value: fileInputValue,
        originalFile: originalFileInfo,
        error
      })}
    </>
  );
};

export { FileInputUploadcare };
