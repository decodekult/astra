import { __ } from "@wordpress/i18n";
import apiFetch from '@wordpress/api-fetch';
import { useSelector, useDispatch } from 'react-redux';

const BulkExtensionController = () => {

	const dispatch = useDispatch();

	const blocksStatuses = useSelector( ( state ) => state.blocksStatuses );

	const handleDeactivateAllTrigger = () => {

		const value = { ...blocksStatuses };

		for ( const block in blocksStatuses ) {
			value[ block ] = '';
		}

		// Update modules Statuses.
		dispatch( {type:'UPDATE_BLOCK_STATUSES', payload: value} );

		const formData = new window.FormData();

		formData.append( 'action', 'astra_addon_bulk_deactivate_modules' );
		formData.append( 'security', astra_addon_admin.update_nonce );

		apiFetch( {
			url: astra_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( () => {
			dispatch( {type: 'UPDATE_SETTINGS_SAVED_NOTIFICATION', payload: __( 'Successfully saved!' ) } );
		} );
	};

	const handleActivateAllTrigger = () => {

		const value = { ...blocksStatuses };

		for ( const block in blocksStatuses ) {
			value[ block ] = block;
		}

		// Update modukes Statuses as deactivate.
		dispatch( {type:'UPDATE_BLOCK_STATUSES', payload: value} );

		const formData = new window.FormData();

		formData.append( 'action', 'astra_addon_bulk_activate_modules' );
		formData.append( 'security', astra_addon_admin.update_nonce );

		apiFetch( {
			url: astra_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( () => {
			dispatch( {type: 'UPDATE_SETTINGS_SAVED_NOTIFICATION', payload: __( 'Successfully saved!' ) } );
		} );
	};

	return (
		<span className="z-0 flex shadow-sm rounded-[0.2rem] justify-center">
			<button
				type="button"
				className="focus:bg-indigo-50 focus:text-slate-500 focus-visible:text-spectra hover:bg-indigo-50 hover:text-spectra -ml-px relative inline-flex items-center px-4 py-2 border border-slate-200 bg-white text-sm font-medium text-slate-500 focus:z-10 focus:outline-none rounded-l-md transition"
				onClick={handleActivateAllTrigger}
			>
				{__( 'Activate all', 'astra' )}
			</button>
			<button
				type="button"
				className="focus:bg-indigo-50 focus:text-slate-500 focus-visible:text-spectra hover:bg-indigo-50 hover:text-spectra -ml-px relative inline-flex items-center px-4 py-2 border border-slate-200 bg-white text-sm font-medium text-slate-500 focus:z-10 focus:outline-none rounded-r-md transition"
				onClick={handleDeactivateAllTrigger}
			>
				{__( 'Deactivate all', 'astra' )}
			</button>
		</span>
	);
};

export default BulkExtensionController;
