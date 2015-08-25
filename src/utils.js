/**
 *
 * Adds vendor prefixes to css style declaration
 *
 * @param  {String} css     Non-prefixed CSS style declaration
 * @param  {Array}  vendors Which vendors your want to prefix
 * @return {String}         Prefixed CSS style declaration
 */
export function vendorize(css, vendors=['-webkit-', '-moz-']) {
  let atRule = '@' === css.trim().split(/[ ,]+/)[0][0];
  let pre = atRule ? '@' : '';
  vendors.push('');
  css = css.trim();
  if (atRule) css = css.substr(1);
  return vendors.map(v => pre + v + css).join('\n')+'\n';
}
