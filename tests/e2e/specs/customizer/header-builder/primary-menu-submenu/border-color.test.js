import { createURL } from '@wordpress/e2e-test-utils';
import { createNewMenu } from '../../../../utils/create-menu';
import { setCustomize } from '../../../../utils/customize';
describe( 'Add sub menu for primary menu and add border to the sub menu', () => {
	it( 'sub menu should be added successfully', async () => {
		await createNewMenu();
		const headerMenuAlignment = {
			'header-desktop-items': {
				primary: {
					primary_right: {
						0: 'menu-1',
					},
				},
			},
		};
		await setCustomize( headerMenuAlignment );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#primary-site-navigation' );
		await expect( true ).toBe( true );
	} );
	it( 'border color to the submenu should be added correctly', async () => {
		const submenuBorderColor = {
			'header-menu1-submenu-b-color': 'rgb(242, 33, 217)',
			'header-menu1-submenu-border': {
				top: 10,
				bottom: 10,
				left: 10,
				right: 10,
			},
		};
		await setCustomize( submenuBorderColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.hover( '.menu-link' );
		await expect( {
<<<<<<< HEAD:tests/e2e/specs/customizer/header-builder/primary-menu-submenu/border-color.test.js
			selector: '.sub-menu',
			property: 'border-color',
=======
			selector: '.ast-builder-menu-1 .sub-menu',
			property: 'width',
>>>>>>> 9b5c233a452854e97666ee88ce33e8e9f31c4f0b:tests/e2e/specs/customizer/header-builder/primary-menu-submenu/width.test.js
		} ).cssValueToBe(
			`${ submenuBorderColor[ 'header-menu1-submenu-b-color' ] }`,
		);
	} );
} );

