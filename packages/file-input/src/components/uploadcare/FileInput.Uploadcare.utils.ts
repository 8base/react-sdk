import { FileInfo, FilesUpload } from "@uploadcare/react-widget";
import { OriginalFileInputValue, FileValue } from "../../types";
import * as R from "ramda";

export const getFileValue = (file: FileInfo): FileValue => {
  return {
    fileId: file.uuid as string,
    filename: file.name as string,
    downloadUrl: file.originalUrl as string,
    mimetype: file.mimeType as string,
  };
};

export const getOriginalFile = (file: FileInfo): OriginalFileInputValue => {
  const sourceInfo = R.path(["sourceInfo", "file"], file) as OriginalFileInputValue;

  return sourceInfo;
};

export const getFilesList = (filesArray: FilesUpload[]): FileValue[] => {
  const result: FileValue[] = [];

  filesArray.forEach((file: FilesUpload) => {
    // Extended JQ promise typings missing
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    file.done((info: FileInfo) => {
      const fileValue = getFileValue(info);

      result.push(fileValue);
    });
  });

  return result;
};

export const getOriginalFileList = (
  filesArray: FilesUpload[]
): OriginalFileInputValue => {
  const result: OriginalFileInputValue = [];

  filesArray.forEach((file: FilesUpload) => {
    // Extended JQ promise typings missing
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    file.done((info: FileInfo) => {
      const originalFile = R.path(["sourceInfo", "file"], info) as File;

      if (originalFile) {
        result.push(originalFile);
      };
    });
  });

  return result;
};