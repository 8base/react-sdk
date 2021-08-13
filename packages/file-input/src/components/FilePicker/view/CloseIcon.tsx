import React from 'react';

import { css } from '@emotion/css';

const closeIconCss = css`
  width: 24px;
  height: 24px;
  display: block;
`;

export const CloseIcon = () => (
  <i className={closeIconCss}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path
        d="m23.542371 10.62753-1.491936-1.4919365-5.914843 5.9148425-5.914843-5.9148425-1.4919365 1.4919365 5.9148425 5.914843-5.9148425 5.914843 1.4919365 1.491936 5.914843-5.914842 5.914843 5.914842 1.491936-1.491936-5.914842-5.914843z"
        fill="#656565"
        fillRule="evenodd"
        strokeWidth="1.058111"
      />
    </svg>
  </i>
);
