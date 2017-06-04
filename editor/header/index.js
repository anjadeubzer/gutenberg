/**
 * External dependencies
 */
import { connect } from 'react-redux';

/**
 * WordPress dependencies
 */
import { sprintf, _n, __ } from 'i18n';
import { IconButton } from 'components';

/**
 * Internal dependencies
 */
import './style.scss';
import ModeSwitcher from './mode-switcher';
import SavedState from './saved-state';
import Tools from './tools';
import { getSelectedBlocks } from '../selectors';

function Header( { selectedBlocks, onRemove, onDeselect } ) {
	const count = selectedBlocks.length;

	if ( count ) {
		return (
			<header className="editor-header editor-header-multi-select">
				<div className="editor-selected-count">
					{ sprintf( _n( '%d block selected', '%d blocks selected', count ), count ) }
				</div>
				<div className="editor-selected-delete">
					<IconButton
						icon="trash"
						label={ __( 'Delete selected blocks' ) }
						onClick={ () => onRemove( selectedBlocks ) }
						focus={ true }
					>
						{ __( 'Delete' ) }
					</IconButton>
				</div>
				<div className="editor-selected-clear">
					<IconButton
						icon="no"
						label={ __( 'Clear selected blocks' ) }
						onClick={ () => onDeselect() }
					/>
				</div>
			</header>
		);
	}

	return (
		<header className="editor-header">
			<ModeSwitcher />
			<SavedState />
			<Tools />
		</header>
	);
}

export default connect(
	( state ) => ( {
		selectedBlocks: getSelectedBlocks( state ),
	} ),
	( dispatch ) => ( {
		onDeselect: () => dispatch( {
			type: 'CLEAR_SELECTED_BLOCK',
		} ),
		onRemove: ( uids ) => dispatch( {
			type: 'REMOVE_BLOCKS',
			uids,
		} ),
	} )
)( Header );
