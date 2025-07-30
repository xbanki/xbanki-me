/**
 * Logo Component type declarations.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.0.0
 *    @version   1.0.0
 */

/**
 * Optional logo props.
 */
export interface ILogoPropsOptional {
    /**
     * Logomark segments which to render. Used for rendering the current routing
     * breadcrumb.
     */
    segments: string[];
}

/**
 * Logo component props.
 */
export type LogoProps = Partial<ILogoPropsOptional>;
