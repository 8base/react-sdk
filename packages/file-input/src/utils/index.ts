const BYTE_UNITS = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const BIBYTE_UNITS = ['B', 'kiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
const BIT_UNITS = ['b', 'kbit', 'Mbit', 'Gbit', 'Tbit', 'Pbit', 'Ebit', 'Zbit', 'Ybit'];
const BIBIT_UNITS = ['b', 'kibit', 'Mibit', 'Gibit', 'Tibit', 'Pibit', 'Eibit', 'Zibit', 'Yibit'];

type OptionType = {
  bits?: boolean;
  binary?: boolean;
  signed?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

const DEFAULT_MAXIMUM_FRACTION = 1;

const getUnits = (options: OptionType) => {
  if (options.bits) {
    return options.binary ? BIBIT_UNITS : BIT_UNITS;
  }

  return options.binary ? BIBYTE_UNITS : BYTE_UNITS;
};

const getPrefix = (isNegative: boolean, options: OptionType) => {
  if (isNegative) {
    return '-';
  }

  return options.signed ? '+' : '';
};

export const formatFileSize = (
  number: number,
  options: OptionType = { bits: false, binary: false },
): string => {
  if (!Number.isFinite(number)) {
    // eslint-disable-next-line no-console
    console.error(`Expected a finite number, got ${typeof number}: ${number}`);
    return '';
  }

  const UNITS = getUnits(options);

  if (options.signed && number === 0) {
    return ` 0 ${UNITS[0]}`;
  }

  const isNegative = number < 0;
  const prefix = getPrefix(isNegative, options);

  let resultNumber = number;
  if (isNegative) {
    resultNumber = -number;
  }

  const localeOptions = {
    minimumFractionDigits: options.minimumFractionDigits,
    maximumFractionDigits: options.maximumFractionDigits || DEFAULT_MAXIMUM_FRACTION,
  };

  if (resultNumber < 1) {
    const numberString = resultNumber.toLocaleString(undefined, localeOptions);
    return `${prefix + numberString} ${UNITS[0]}`;
  }

  const log = options.binary
    ? Math.log(resultNumber) / Math.log(1024)
    : Math.log10(resultNumber) / 3;
  const exponent = Math.min(Math.floor(log), UNITS.length - 1);

  resultNumber /= Math.pow(options.binary ? 1024 : 1000, exponent);

  const numberString = resultNumber.toLocaleString(undefined, localeOptions);
  const unit = UNITS[exponent];

  return `${prefix + numberString} ${unit}`;
};
