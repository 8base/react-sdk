import { css } from '@emotion/css';

export const COMMON_STYLES = {
  button: css`
    appearance: none;
    outline: none;
    text-align: center;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    white-space: nowrap;
    color: rgb(255, 255, 255);
    line-height: 20px;
    font-weight: 600;
    letter-spacing: 0.2px;
    transition: all 0.15s ease-in-out 0s;
    cursor: pointer;
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    background-color: rgb(8, 116, 249);
    border-color: rgb(8, 116, 249);
    height: 40px;
    padding: 0px 32px;
    font-size: 14px;
    &:active {
      background-color: rgb(77, 161, 255);
      border-color: rgb(77, 161, 255);
      box-shadow: rgb(50 50 93 / 14%) 0px 1px 3px 0px inset,
        rgb(51 80 107 / 8%) 0px 4px 6px 0px inset;
    }

    &:hover {
      background-color: rgb(35, 139, 255);
      border-color: rgb(35, 139, 255);
      box-shadow: rgb(50 50 93 / 20%) 0px 2px 4px 0px;
    }
  `,
};

export const CONTENT_STYLES = {
  closeWrapper: css`
    cursor: pointer;
    user-select: none;
    margin-right: 8px;
    margin-left: auto;

    &:hover {
      color: #8698a7;
    }
  `,
  header: css`
    position: relative;
    cursor: inherit;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    min-height: 40px;
  `,
  headerTitle: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 13px;
  `,
  listWrapper: css`
    display: flex;
    flex-flow: column nowrap;
    place-content: flex-start;
    align-items: flex-start;
    margin: 16px 16px 0 16px;
    padding-bottom: 12px;
    cursor: inherit;
    overflow: auto;
  `,
  footer: css`
    display: flex;
    flex-flow: row nowrap;
    place-content: flex-start flex-end;
    align-items: flex-start;
    padding: 16px;
    cursor: inherit;
    margin-top: auto;
    border-top: 1px solid #dddddd;

    & > :not(:last-child) {
      margin-right: 8px;
    }
  `,
  footerDetails: css`
    font-size: 13px;
    font-weight: 400;
    margin: auto;
    margin-left: 0;
    margin-right: auto !important;
  `,
};

export const DROPZONE_STYLES = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 1px dashed #bdbdbd;
    margin: 10px 30px 30px 30px;
    flex: 1;
  `,
  title: css`
    font-size: 20px;
    font-weight: 400;
  `,
  description: css`
    line-height: 20px;
    font-size: 13px;
    font-weight: 400;
    margin-top: 10px;
    color: #9e9e9e;
  `,
};

export const FILE_PREVIEW_STYLES = {
  itemWrapper: css`
    display: flex;
    flex-flow: row nowrap;
    place-content: flex-start;
    align-items: center;
    padding: 8px;
    cursor: inherit;
    width: 100%;
    height: 100%;
    background: #fff;
    margin-bottom: 4px;
    box-sizing: border-box;

    & > :not(:last-child) {
      margin-right: 8px;
    }
  `,
  image: css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    border-radius: 10%;
    border: 1px solid #d0d7dd;
    box-sizing: border-box;

    object-fit: cover;
    object-position: center center;
  `,
  removeWrapper: css`
    cursor: pointer;
    user-select: none;
    margin-left: auto;
    display: flex;

    &:hover {
      color: #8698a7;
    }
  `,
  details: css`
    display: flex;
    flex-flow: column nowrap;
    place-content: flex-start;
    align-items: flex-start;
    cursor: inherit;
    line-height: 15px;
    font-size: 13px;

    & > :not(:last-child) {
      margin-bottom: 8px;
    }

    & > span {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  `,
};
