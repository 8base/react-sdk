import React from 'react';
import { ApolloClient } from 'apollo-client';
import * as filestack from 'filestack-js';
import { FileInputProps, FileInputState } from '../../types';

  class FileInputFilestack extends React.Component<FileInputProps, FileInputState> {
    public static defaultProps = {
      maxFiles: 1,
      value: null,
      sessionCache: false,
    };

    public static getDerivedStateFromProps(props: FileInputProps, state: FileInputState) {
      let nextState = null;

      if (props.value !== state.value) {
        nextState = { value: props.value };
      }

      return nextState;
    }

    public filestack?: { [key: string]: any };
    public filestackPromise?: Promise<void>;

    constructor(props: FileInputProps & { client: ApolloClient<any> }) {
      super(props);

      this.state = {
        originalFile: null,
        path: null,
        value: props.value || null,
      };
    }

    public componentDidMount() {
      this.filestackPromise = this.initFilestack();
    }

    public async initFilestack() {    
      const { sessionCache, fileUploadSignInfo } = this.props;
      const { apiKey, policy, signature, path } = fileUploadSignInfo;

      this.setState({ path });

      this.filestack = filestack.init(apiKey, {
        security: {
          policy,
          signature,
        },
        sessionCache,
      });
    }

    public onUploadDone = async ({ filesUploaded }: any) => {
      if (!this.filestack) {
        return;
      }

      const { policy = '""', signature = '""' } = this.filestack.session;

      let value = filesUploaded.map(({ handle, filename, url, mimetype }: any) => {
        const urlOrigin = url ? new URL(url).origin : '';

        return {
          downloadUrl: `${urlOrigin}/security=p:${policy},s:${signature}/${handle}`,
          fileId: handle,
          filename,
          mimetype,
          public: !!this.props.public,
        };
      });

      let originalFile = filesUploaded.map((item: any) => item.originalFile);

      const { maxFiles, onUploadDone, onChange } = this.props;

      if (maxFiles === 1) {
        value = value[0];
        originalFile = originalFile[0];
      }

      if (typeof onUploadDone === 'function') {
        value = await onUploadDone(value, originalFile);
      }

      this.setState({ value, originalFile });

      if (typeof onChange === 'function') {
        onChange(value, originalFile);
      }
    };

    public collectPickerOptions = () => {
      const { maxFiles } = this.props;
      const { path } = this.state;

      return {
        exposeOriginalFile: true,
        maxFiles,
        onUploadDone: this.onUploadDone,
        storeTo: {
          path,
        },
      };
    };

    public pick = async (options = {}) => {
      await this.filestackPromise;

      if (!this.filestack) {
        return;
      }

      if ('maxFiles' in options) {
        console.warn('Specify "maxFiles" as a prop for FileInput component'); // tslint:disable-line
      }

      if ('onUploadDone' in options) {
        console.warn('Specify "onUploadDone" as a prop for FileInput component'); // tslint:disable-line
      }

      const pickerOptions = this.collectPickerOptions();

      const picker = this.filestack.picker({
        ...options,
        ...pickerOptions,
      });

      await picker.open();

      return picker;
    };

    public render() {
      const { children, error } = this.props;
      const { value, originalFile } = this.state;

      return children({ pick: this.pick, value, originalFile, error });
    }
  };

export { FileInputFilestack };