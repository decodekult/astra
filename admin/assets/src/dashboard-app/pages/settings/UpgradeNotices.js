import { __ } from '@wordpress/i18n';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import apiFetch from '@wordpress/api-fetch';

const UpgradeNotices = () => {

	if( astra_admin.pro_available ) {
		return '';
	}

	const dispatch = useDispatch();

	const useUpgradeNotices = useSelector( ( state ) => state.useUpgradeNotices );
	const [ upgradeNoticesState, setUpgradeNoticesState ] = useState( false );

	const updateUpgradeNoticesVisibility = () => {

		setUpgradeNoticesState( 'updating' );

		let assetStatus;
		if ( useUpgradeNotices === false ) {
			assetStatus = true;
		} else {
			assetStatus = false;
		}

		dispatch( { type: 'UPGRADE_NOTICES', payload: assetStatus } );

		const formData = new window.FormData();

		formData.append( 'action', 'ast_disable_pro_notices' );
		formData.append( 'security', astra_admin.update_nonce );
		formData.append( 'status', assetStatus );

		apiFetch( {
			url: astra_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( (data) => {
			if ( data.success ) {
				let payloadStatus = __( 'Deactivated!', 'astra' );
				if( assetStatus ) {
					payloadStatus = __( 'Activated!', 'astra' );
				}
				dispatch( { type: 'UPDATE_SETTINGS_SAVED_NOTIFICATION', payload: payloadStatus } );
				setUpgradeNoticesState( false );
			}
		} );
	};

	const onGetAstraPro = ( e ) => {
		if( astra_admin.pro_installed_status ) {
			const formData = new window.FormData();
			formData.append( 'action', 'astra_recommended_plugin_activate' );
			formData.append( 'security', astra_admin.plugin_manager_nonce );
			formData.append( 'init', 'astra-addon/astra-addon.php' );
			e.target.innerText = astra_admin.plugin_activating_text;

			apiFetch( {
				url: astra_admin.ajax_url,
				method: 'POST',
				body: formData,
			} ).then( ( data ) => {
				if( data.success ) {
					window.open( astra_admin.astra_base_url, '_self' );
				}
			} );
		} else {
			onUpgradeLinkTrigger();
		}
	};

	const onUpgradeLinkTrigger = () => {
		window.open(
			astra_admin.upgrade_url,
			'_blank'
		);
	};

	const getAstraProTitle = () => {
		return astra_admin.pro_installed_status ? __( 'Activate Now', 'astra' ) : __( 'Upgrade Now', 'astra' );
	}

	return (
		<section className='block px-8 py-8 justify-between'>
			<div className='mr-16 w-full flex flex-col sm:flex-row sm:items-center'>
				<h3 className="p-0 flex-1 justify-right inline-flex text-xl leading-8 font-semibold text-slate-800">
					{ __( 'Build Better Websites with Astra Pro', 'astra' ) }
				</h3>
				<button
					type="button"
					className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-astra transition focus:bg-astra-hover hover:bg-astra-hover focus:outline-none h-9"
					onClick={onGetAstraPro}
				>
					{ getAstraProTitle() }
				</button>
			</div>
			<p className="mt-2 w-full md:w-9/12 text-sm text-slate-500 tablet:w-full">
				{
					__(
						`Access powerful features for painless WordPress design without the high costs. Powerful tools, premium support, limitless opportunity with Pro! Toggle upgrade notices on or off `,
						"astra"
					)
				}
				<span onClick={updateUpgradeNoticesVisibility} className='cursor-pointer text-astra focus:text-astra-hover active:text-astra-hover hover:text-astra-hover' rel="noreferrer">
					{ 'updating' === upgradeNoticesState ? __( 'updating...', 'astra' ) : __( 'here.', 'astra' ) }
				</span>
			</p>
		</section>
	);
};

export default UpgradeNotices;
