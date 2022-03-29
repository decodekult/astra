import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { scrollToElement } from './scroll-to-element';
import { setBrowserViewport } from '../../e2e/utils/set-browser-viewport';
import { publishPost } from './publish-post';
export const createNewMenu = async () => {
	let ppStatus = false;
	while ( false === ppStatus ) {
		await createNewPost( {
			postType: 'page',
			title: 'Test Page',
			content: 'This is simple test page',
		} );
<<<<<<< HEAD

=======
>>>>>>> 9b5c233a452854e97666ee88ce33e8e9f31c4f0b
		ppStatus = await publishPost();
	}
	await createNewPost( {
		postType: 'page',
		title: 'Sub Test Page',
		content: 'This is simple sub test page',
	} );
	ppStatus = await publishPost();
	await page.goto( createURL( '/wp-admin/nav-menus.php' ), {
		waitUntil: 'networkidle0',
	} );
	await setBrowserViewport( 'large' );
	await scrollToElement( '#nav-menu-footer' );
	if ( await page.$( '.menu-delete' ) ) {
		await page.click( '.menu-delete' );
	}
	await page.focus( '#menu-name' );
	await page.type( '#menu-name', 'Menu' );
	await page.focus( '#locations-primary' );
	await page.click( '#locations-primary' );
	await page.focus( '#save_menu_footer' );
	await page.click( '#save_menu_footer' );
	await page.waitForSelector( '.accordion-section-content' );
	await page.focus( '#page-tab' );
	await page.click( '#page-tab' );
	await page.click( '#submit-posttype-page' );

	await page.waitForSelector( '.menu-item-depth-0:nth-child(2) .menu-item-handle' );

	const menuToSubMenu = await page.$( '.menu-item-depth-0:nth-child(2) .menu-item-handle' );
	const boundingBox = await menuToSubMenu.boundingBox();

	await page.mouse.move( boundingBox.x + ( boundingBox.width / 2 ), boundingBox.y + ( boundingBox.height / 2 ) );
	await page.mouse.down();
	await page.mouse.move( 126, 19 );
	await page.mouse.up();

	await page.waitForSelector( '#save_menu_footer' );
	await page.focus( '#save_menu_footer' );
	await page.click( '#save_menu_footer' );
};
