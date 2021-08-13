import { css } from '@emotion/css';

type StylesComponents = 'overlay' | 'content' | 'header';

export const MODAL_STYLE: Record<StylesComponents, string> = {
  overlay: css`
    align-items: center;
    inset: 0px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    position: fixed;
    background-color: rgba(47, 53, 62, 0.86);
    z-index: 2147483647;
  `,
  content: css`
    width: 100%;
    height: 100%;
    background: #eeeeee;
    display: flex;
    flex: 1;
    flex-direction: column;
    @media screen and (min-width: 769px) {
      border-radius: 2px;
      max-width: 750px;
      max-height: 500px;
    }
  `,
  header: css`
    display: flex;
    flex-flow: row nowrap;
    place-content: flex-start flex-end;
    align-items: flex-start;
    cursor: inherit;
    position: relative;
  `,
};
