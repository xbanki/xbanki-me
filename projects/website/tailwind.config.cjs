/**
 * Tailwind CSS configuration. Includes customized style properties.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.0.0
 *    @version   1.0.0
 */

/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ['./index.html', './src/**/*.{html,scss,sass,css,vue,ts}'],
  darkMode: ['class', '[data-mode="dark"]'],
  // @todo(xbanki): Extend this
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography')]
};
