/**
 *
 * Adds vendor prefixes to css style declaration
 *
 * @param  {String} css     Non-prefixed CSS style declaration
 * @param  {Array}  vendors Which vendors your want to prefix
 * @return {String}         Prefixed CSS style declaration
 */
export function vendorize(css, vendors=['-webkit-', '-moz-']) {
  let pre = '@' === css.trim().split(/[ ,]+/)[0] ? '@' : '';
  vendors.push('');
  return vendors.map(v => pre + v + css.trim()).join('\n')+'\n';
}
