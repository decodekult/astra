import { insertBlock, createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { publishPost } from '../../../../utils/publish-post';
describe( 'Global button font setting under the Customizer', () => {
	it( 'button font should apply correctly', async () => {
		const buttonFont = {
			'font-family-button': 'Aclonica,sans-serif',
		};
		await setCustomize( buttonFont );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'buttonFontFamily' } );
			await insertBlock( 'Buttons' );
			await page.keyboard.type( 'font' );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/buttonFontFamily/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.wp-block-button .wp-block-button__link, input#submit, button, form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button, input[type="submit"]' );
		await expect( {
			selector: '.wp-block-button .wp-block-button__link, input#submit, button, form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button, input[type="submit"]',
			property: 'font-family',
		} ).cssValueToBe( `${ buttonFont[ 'font-family-button' ] }` );
	} );

	it( 'button font size should apply correctly', async () => {
		const buttonFontSize = {
			'font-size-button': {
				desktop: 30,
				tablet: 20,
				mobile: 10,
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
		};
		await setCustomize( buttonFontSize );
		await page.goto( createURL( 'buttonFontFamily' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.wp-block-button .wp-block-button__link, input#submit, input[type="submit"], form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button' );
		await expect( {
			selector: '.wp-block-button .wp-block-button__link, input#submit, input[type="submit"], form[CLASS*="wp-block-search__"].wp-block-search .wp-block-search__inside-wrapper .wp-block-search__button',
			property: 'font-size',
		} ).cssValueToBe( `${ buttonFontSize[ 'font-size-button' ].desktop }${ buttonFontSize[ 'font-size-button' ][ 'desktop-unit' ] }` );

		//responsive mode test case is commented due to GitHub issue
		// await setBrowserViewport( 'medium' );
		// await expect( {
		// 	selector: '.wp-block-button',
		// 	property: 'font-size',
		// } ).cssValueToBe(
		// 	`${ buttonFontSize[ 'font-size-button' ].tablet }${ buttonFontSize[ 'font-size-button' ][ 'tablet-unit' ] }` );

		// await setBrowserViewport( 'small' );
		// await expect( {
		// 	selector: '.wp-block-button',
		// 	property: 'font-size',
		// } ).cssValueToBe(
		// 	`${ buttonFontSize[ 'font-size-button' ].mobile }${ buttonFontSize[ 'font-size-button' ][ 'mobile-unit' ] }` );
	} );
	it( 'button font weight should apply correctly', async () => {
		const fontWeight = {
			'font-weight-button': '700',
		};
		await setCustomize( fontWeight );
		await page.goto( createURL( 'buttonFontFamily' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.wp-block-button .wp-block-button__link .wp-block-button .wp-block-button__link, input#submit, input[type="submit"]' );
		await expect( {
			selector: '.wp-block-button .wp-block-button__link .wp-block-button .wp-block-button__link, input#submit, input[type="submit"]',
			property: 'font-weight',
		} ).cssValueToBe( `${ fontWeight[ 'font-weight-button' ] }` );
	} );

	it( 'button font text transform property should apply correctly', async () => {
		const textTransform = {
			'text-transform-button': 'uppercase',
		};
		await setCustomize( textTransform );
		await page.goto( createURL( 'buttonFontFamily' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.wp-block-button .wp-block-button__link, input#submit, input[type="submit"], .wp-block-search__button' );
		await expect( {
			selector: '.wp-block-button .wp-block-button__link, input#submit, input[type="submit"], .wp-block-search__button',
			property: 'text-transform',
		} ).cssValueToBe( `${ textTransform[ 'text-transform-button' ] }` );
	} );

	it( 'button font line height should apply correctly', async () => {
		const buttonLineHeight = {
			'theme-btn-line-height': '50px',
		};
		await setCustomize( buttonLineHeight );
		await page.goto( createURL( 'buttonFontFamily' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.wp-block-button .wp-block-button__link, #comments .submit' );
		await expect( {
			selector: '.wp-block-button .wp-block-button__link, #comments .submit',
			property: 'line-height',
		} ).cssValueToBe( `${ buttonLineHeight[ 'theme-btn-line-height' ] }` );
	} );

	it( 'button font letter spacing should apply correctly', async () => {
		const letterSpacing = {
			'theme-btn-letter-spacing': 3,
			'ast-range-unit': 'px',
		};
		await setCustomize( letterSpacing );
		await page.goto( createURL( 'buttonFontFamily' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.wp-block-button .wp-block-button__link, input#submit, input[type="submit"],' );
		await expect( {
			selector: '.wp-block-button .wp-block-button__link, input#submit, input[type="submit"]',
			property: 'letter-spacing',
		} ).cssValueToBe( `${ letterSpacing[ 'theme-btn-letter-spacing' ] }${ letterSpacing[ 'ast-range-unit' ] }` );
	} );
} );
