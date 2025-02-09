import { __ } from '@wordpress/i18n';
import { useSelector } from 'react-redux';

import LoadFontsLocally from '@DashboardApp/pages/settings/LoadFontsLocally';
import PreloadLocalFonts from '@DashboardApp/pages/settings/PreloadLocalFonts';
import FlushLocalFonts from '@DashboardApp/pages/settings/FlushLocalFonts';
import OldHeaderFooter from '@DashboardApp/pages/settings/OldHeaderFooter';
import UpgradeNotices from '@DashboardApp/pages/settings/UpgradeNotices';

function SettingsWrapper({ state }) {
	const wrappers = wp.hooks.applyFilters(
		'astra_dashboard.settings_tab_wrappers',
		{
			'global-settings': <> <OldHeaderFooter/> <UpgradeNotices/> </>,
			'fonts-performance': <> <LoadFontsLocally/> <PreloadLocalFonts/> <FlushLocalFonts /> </>,
		}
	);
	return <div>{wrappers[state]}</div>;
}

const ContainerSettings = () => {

	const activeSettingsNavigationTab = useSelector( ( state ) => state.activeSettingsNavigationTab );

	// Parent Div is Required to add Padding to the Entire Structure for Smaller Windows.
	return (
		<>
			<div className='lg:col-span-9 border-l'>
				{ wp.hooks.applyFilters( `astra_dashboard.settings_screen_before_${activeSettingsNavigationTab}`, <span/> ) }
				<SettingsWrapper state={activeSettingsNavigationTab}></SettingsWrapper>
				{ wp.hooks.applyFilters( `astra_dashboard.settings_screen_after_${activeSettingsNavigationTab}`, <span/> ) }
			</div>
		</>
	);
};

export default ContainerSettings;
