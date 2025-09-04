/**
 * Links component type declarations.
 *
 *    @copyright copyright (c) 2025, xbanki <contact@xbanki.me>
 *               licensed under mit license.
 *               see license for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.0.0
 *    @version   1.0.0
 */

/**
 * Optional links component props.
 */
export interface ILinksPropsOptional {
    /**
     * [Github](https://github.com/).
     */
    github: string;

    /**
     * E-mail.
     */
    email: string;

    /**
     * [X (formerly Twitter)](https://x.com/)
     */
    x: string;
}

/**
 *
 */
export type LinksProps = Partial<ILinksPropsOptional>;
