<?php
/**
 * Post Structures loader for Astra theme.
 *
 * @package     Astra
 * @author      Brainstorm Force
 * @copyright   Copyright (c) 2022, Brainstorm Force
 * @link        https://www.brainstormforce.com
 * @since       Astra x.x.x
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Customizer Initialization
 *
 * @since x.x.x
 */
class Astra_Posts_Structure_Loader {

	/**
	 * Instance
	 *
	 * @var array $customizer_defaults
	 */
	private static $customizer_defaults = array();

	/**
	 *  Constructor
	 *
	 * @since x.x.x
	 */
	public function __construct() {
		/**
		* Update Astra default color and typography values. To not update directly on existing users site, added backwards.
		*
		* @since 4.0.0
		*/
		$apply_new_default_color_typo_values                = astra_check_default_color_typo();
		self::$customizer_defaults['responsive-background'] = array(
			'desktop' => array(
				'background-color'      => '',
				'background-image'      => '',
				'background-repeat'     => 'repeat',
				'background-position'   => 'center center',
				'background-size'       => 'auto',
				'background-attachment' => 'scroll',
				'background-type'       => '',
				'background-media'      => '',
			),
			'tablet'  => array(
				'background-color'      => '',
				'background-image'      => '',
				'background-repeat'     => 'repeat',
				'background-position'   => 'center center',
				'background-size'       => 'auto',
				'background-attachment' => 'scroll',
				'background-type'       => '',
				'background-media'      => '',
			),
			'mobile'  => array(
				'background-color'      => '',
				'background-image'      => '',
				'background-repeat'     => 'repeat',
				'background-position'   => 'center center',
				'background-size'       => 'auto',
				'background-attachment' => 'scroll',
				'background-type'       => '',
				'background-media'      => '',
			),
		);

		self::$customizer_defaults['responsive-spacing'] = array(
			'desktop'      => array(
				'top'    => '',
				'right'  => '',
				'bottom' => '',
				'left'   => '',
			),
			'tablet'       => array(
				'top'    => '',
				'right'  => '',
				'bottom' => '',
				'left'   => '',
			),
			'mobile'       => array(
				'top'    => '',
				'right'  => '',
				'bottom' => '',
				'left'   => '',
			),
			'desktop-unit' => 'px',
			'tablet-unit'  => 'px',
			'mobile-unit'  => 'px',
		);

		self::$customizer_defaults['responsive-padding'] = array(
			'desktop'      => array(
				'top'    => 3,
				'right'  => 3,
				'bottom' => 3,
				'left'   => 3,
			),
			'tablet'       => array(
				'top'    => '',
				'right'  => '',
				'bottom' => '',
				'left'   => '',
			),
			'mobile'       => array(
				'top'    => '',
				'right'  => '',
				'bottom' => '',
				'left'   => '',
			),
			'desktop-unit' => 'em',
			'tablet-unit'  => 'em',
			'mobile-unit'  => 'em',
		);

		self::$customizer_defaults['font-size'] = array(
			'desktop'      => '',
			'tablet'       => '',
			'mobile'       => '',
			'desktop-unit' => 'px',
			'tablet-unit'  => 'px',
			'mobile-unit'  => 'px',
		);

		self::$customizer_defaults['title-font-size'] = array(
			'desktop'      => $apply_new_default_color_typo_values ? '32' : '',
			'tablet'       => '',
			'mobile'       => '',
			'desktop-unit' => 'px',
			'tablet-unit'  => 'px',
			'mobile-unit'  => 'px',
		);

		self::$customizer_defaults['responsive-slider'] = array(
			'desktop' => '',
			'tablet'  => '',
			'mobile'  => '',
		);

		self::$customizer_defaults['responsive-color'] = array(
			'desktop' => '',
			'tablet'  => '',
			'mobile'  => '',
		);

		add_action( 'customize_register', array( $this, 'posts_strctures_customize_register' ), 2 );
		add_action( 'astra_get_fonts', array( $this, 'add_fonts' ), 1 );
		add_action( 'customize_preview_init', array( $this, 'preview_scripts' ) );
	}

	/**
	 * Enqueue google fonts.
	 *
	 * @return void
	 * @since x.x.x
	 */
	public function add_fonts() {
		$post_types = self::get_supported_post_types();
		foreach ( $post_types as $index => $post_type ) {
			// Single Banner - Font Support.
			$title_section = 'ast-dynamic-single-' . $post_type;

			$single_title_font_family = astra_get_option( $title_section . '-title-font-family' );
			$single_title_font_weight = astra_get_option( $title_section . '-title-font-weight' );
			Astra_Fonts::add_font( $single_title_font_family, $single_title_font_weight );

			$single_text_font_family = astra_get_option( $title_section . '-text-font-family' );
			$single_text_font_weight = astra_get_option( $title_section . '-text-font-weight' );
			Astra_Fonts::add_font( $single_text_font_family, $single_text_font_weight );

			$single_meta_font_family = astra_get_option( $title_section . '-meta-font-family' );
			$single_meta_font_weight = astra_get_option( $title_section . '-meta-font-weight' );
			Astra_Fonts::add_font( $single_meta_font_family, $single_meta_font_weight );

			// Archive Banner - Font Support.
			$title_section = 'ast-dynamic-archive-' . $post_type;

			$archive_text_font_family = astra_get_option( $title_section . '-text-font-family' );
			$archive_text_font_weight = astra_get_option( $title_section . '-text-font-weight' );
			Astra_Fonts::add_font( $archive_text_font_family, $archive_text_font_weight );

			$archive_title_font_family = astra_get_option( $title_section . '-title-font-family' );
			$archive_title_font_weight = astra_get_option( $title_section . '-title-font-weight' );
			Astra_Fonts::add_font( $archive_title_font_family, $archive_title_font_weight );
		}
	}

	/**
	 * Add postMessage support for site title and description for the Theme Customizer.
	 *
	 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
	 *
	 * @since x.x.x
	 */
	public function posts_strctures_customize_register( $wp_customize ) {

		/**
		 * Register Config control in Related Posts.
		 */
		// @codingStandardsIgnoreStart WPThemeReview.CoreFunctionality.FileInclude.FileIncludeFound
		require_once ASTRA_THEME_POST_STRUCTURE_DIR . 'customizer/class-astra-posts-structures-configs.php';
		require_once ASTRA_THEME_POST_STRUCTURE_DIR . 'customizer/class-astra-posts-single-structures-configs.php';
		require_once ASTRA_THEME_POST_STRUCTURE_DIR . 'customizer/class-astra-posts-archive-structures-configs.php';
		// @codingStandardsIgnoreEnd WPThemeReview.CoreFunctionality.FileInclude.FileIncludeFound
	}

	/**
	 * Get all supported pots types & filter the public ones for further query.
	 *
	 * @since x.x.x
	 * @return array $post_types
	 */
	public static function get_supported_post_types() {

		$queried_post_types = array_keys(
			get_post_types(
				array(
					'public'              => true,
					'_builtin'            => false,
					'exclude_from_search' => false,
				)
			)
		);

		$queried_post_types = array_diff(
			$queried_post_types,
			array(
				'astra-advanced-hook',
				'astra_adv_header',
				'elementor_library',
				'brizy_template',

				'course',
				'lesson',
				'llms_membership',

				'tutor_quiz',
				'tutor_assignments',

				'testimonial',
				'frm_display',
				'mec_esb',
				'mec-events',

				'sfwd-assignment',
				'sfwd-essays',
				'sfwd-transactions',
				'sfwd-certificates',
				'sfwd-quiz',
				'e-landing-page',
			)
		);

		$queried_post_types[] = 'post';
		$queried_post_types[] = 'page';

		$supported_post_types = array_reverse( array_unique( $queried_post_types ) );

		return apply_filters( 'astra_dynamic_post_structure_posttypes', $supported_post_types );
	}

	/**
	 * Customizer preview support.
	 *
	 * @since x.x.x
	 */
	public function preview_scripts() {
		/** @psalm-suppress RedundantCondition */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
		$dir_name = ( SCRIPT_DEBUG ) ? 'unminified' : 'minified';
		/** @psalm-suppress RedundantCondition */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort

		/** @psalm-suppress RedundantCondition */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
		$file_prefix = ( SCRIPT_DEBUG ) ? '' : '.min';
		/** @psalm-suppress RedundantCondition */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort

		wp_enqueue_script( 'astra-post-strctures-customizer-preview', ASTRA_THEME_POST_STRUCTURE_URI . 'assets/js/' . $dir_name . '/customizer-preview' . $file_prefix . '.js', array( 'customize-preview', 'astra-customizer-preview-js' ), ASTRA_THEME_VERSION, true );

		// Localize variables for further JS.
		wp_localize_script(
			'astra-post-strctures-customizer-preview',
			'AstraPostStrcturesData',
			array(
				'post_types'         => self::get_supported_post_types(),
				'tablet_break_point' => astra_get_tablet_breakpoint(),
				'mobile_break_point' => astra_get_mobile_breakpoint(),
			)
		);
	}

	/**
	 * Get customizer dynamic default.
	 *
	 * @param string $key Retrieve default for this parameter.
	 *
	 * @since x.x.x
	 */
	public static function get_customizer_default( $key ) {
		return isset( self::$customizer_defaults[ $key ] ) ? self::$customizer_defaults[ $key ] : array();
	}

	/**
	 * Get dynamic font default.
	 *
	 * @param string $key Retrieve default for this parameter.
	 *
	 * @since x.x.x
	 */
	public static function get_dynamic_font_extras_default( $dynamic_font_extras, $line_height, $text_transform ) {
		$astra_options             = Astra_Theme_Options::get_astra_options();
		$astra_dynamic_font_extras = array(
			'line-height'         => ! isset( $astra_options[ $dynamic_font_extras ] ) && isset( $astra_options[ $line_height ] ) ? $astra_options[ $line_height ] : '1.6',
			'line-height-unit'    => 'em',
			'letter-spacing'      => '',
			'letter-spacing-unit' => 'px',
			'text-transform'      => ! isset( $astra_options[ $dynamic_font_extras ] ) && isset( $astra_options[ $text_transform ] ) ? $astra_options[ $text_transform ] : '',
			'text-decoration'     => '',
		);
		return $astra_dynamic_font_extras;
	}
}

/**
 * Initialize class object with 'new' instance.
 */
new Astra_Posts_Structure_Loader();
