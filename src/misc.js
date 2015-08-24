/**
 *
 * Classy - Miscellaneous Helpers
 *
 * @module lib/misc
 * @description
 *   Helpers that don't fit nicely into the other core modules
 */

/**
 * [genHash description]
 * @param  {[type]} len=5 [description]
 * @return {String}       A five char hash
 */
export function genHash(len=5) {
  return (+new Date * Math.random()).toString(36).substring(0, len);
}
