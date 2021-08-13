export const STEPS = {
  select: 'select',
  upload: 'upload',
  uploadMore: 'uploadMore',
  uploading: 'uploading',
} as const;

export type StepType = keyof typeof STEPS;
