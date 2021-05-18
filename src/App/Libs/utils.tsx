export const UcFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const GetNonce = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

// REF: https://github.com/mohitgupta8888/react-currency-format/blob/react-currency-format/src/utils.js
/**
 * limit decimal numbers to given scale
 * Not used .fixedTo because that will break with big numbers
 */
export const limitToScale = (numStr: string, scale: number, fixedDecimalScale: boolean) => {
  let str = '';
  const filler = fixedDecimalScale ? '0' : '';
  for (let i = 0; i <= scale - 1; i++) {
    str += numStr[i] || filler;
  }
  return str;
};

/**
 * This method is required to round prop value to given scale.
 * Not used .round or .fixedTo because that will break with big numbers
 */
export const roundToPrecision = (numStr: string, scale: number, fixedDecimalScale: boolean) => {
  const numberParts = numStr.split('.');
  const roundedDecimalParts = parseFloat(`0.${numberParts[1] || '0'}`)
    .toFixed(scale)
    .split('.');
  const intPart = numberParts[0]
    .split('')
    .reverse()
    .reduce((roundedStr, current, idx) => {
      if (roundedStr.length > idx) {
        return (Number(roundedStr[0]) + Number(current)).toString() + roundedStr.substring(1, roundedStr.length);
      }
      return current + roundedStr;
    }, roundedDecimalParts[0]);

  const decimalPart = limitToScale(roundedDecimalParts[1] || '', (numberParts[1] || '').length, fixedDecimalScale);

  return intPart + (decimalPart ? '.' + decimalPart : '');
};

export const getDescendantProp = (obj, desc) => {
  const arr = desc.split('.');
  while (arr.length && (obj = obj[arr.shift()]));
  return obj;
};

// REF: https://gomakethings.com/how-to-get-the-closest-parent-element-with-a-matching-selector-using-vanilla-javascript/
export const getClosest = (elem, selector) => {
  // Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (s) {
        const matches = (this.document || this.ownerDocument).querySelectorAll(s);
        let i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1;
      };
  }

  // Get the closest matching element
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem;
  }
  return null;
};
