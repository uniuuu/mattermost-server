import React, {useCallback, useMemo} from 'react';
import {useIntl} from 'react-intl';

import MenuWrapper from 'components/widgets/menu/menu_wrapper';
import Menu from 'components/widgets/menu/menu';

type Props = {
    selectedFilter: string;
    getGroups: (page: number) => void;
    getMyGroups: (page: number) => void;
    getArchivedGroups: (page: number) => void;
}

const UserGroupsFilter = (props: Props) => {
    const {
        selectedFilter,
        getGroups,
        getMyGroups,
        getArchivedGroups,
    } = props;

    const intl = useIntl();

    const allGroupsOnClick = useCallback(() => {
        getGroups(0);
    }, [getGroups]);

    const myGroupsOnClick = useCallback(() => {
        getMyGroups(0);
    }, [getMyGroups]);

    const archivedGroupsOnClick = useCallback(() => {
        getArchivedGroups(0);
    }, [getArchivedGroups]);

    const filterLabel = useCallback(() => {
        if (selectedFilter === 'all') {
            return intl.formatMessage({id: 'user_groups_modal.showAllGroups', defaultMessage: 'Show: All Groups'});
        } else if (selectedFilter === 'my') {
            return intl.formatMessage({id: 'user_groups_modal.showMyGroups', defaultMessage: 'Show: My Groups'});
        } else if (selectedFilter === 'archived') {
            return intl.formatMessage({id: 'user_groups_modal.showArchivedGroups', defaultMessage: 'Show: Archived Groups'});
        }
    }, [selectedFilter]);

    return (
        <div className='more-modal__dropdown'>
            <MenuWrapper id='groupsFilterDropdown'>
                <a>
                    <span>{filterLabel()}</span>
                    <span className='icon icon-chevron-down'/>
                </a>
                <Menu
                    openLeft={false}
                    ariaLabel={intl.formatMessage({id: 'user_groups_modal.filterAriaLabel', defaultMessage: 'Groups Filter Menu'})}
                >
                    <Menu.Group>
                        <Menu.ItemAction
                            id='groupsDropdownAll'
                            buttonClass='groups-filter-btn'
                            onClick={allGroupsOnClick}
                            text={intl.formatMessage({id: 'user_groups_modal.allGroups', defaultMessage: 'All Groups'})}
                            rightDecorator={selectedFilter === 'all' && <i className='icon icon-check'/>}
                        />
                        <Menu.ItemAction
                            id='groupsDropdownMy'
                            buttonClass='groups-filter-btn'
                            onClick={myGroupsOnClick}
                            text={intl.formatMessage({id: 'user_groups_modal.myGroups', defaultMessage: 'My Groups'})}
                            rightDecorator={selectedFilter === 'my' && <i className='icon icon-check'/>}
                        />
                    </Menu.Group>
                    <Menu.Group>
                        <Menu.ItemAction
                            id='groupsDropdownArchived'
                            buttonClass='groups-filter-btn'
                            onClick={archivedGroupsOnClick}
                            text={intl.formatMessage({id: 'user_groups_modal.archivedGroups', defaultMessage: 'Archived Groups'})}
                            rightDecorator={selectedFilter === 'archived' && <i className='icon icon-check'/>}
                        />
                    </Menu.Group>
                </Menu>
            </MenuWrapper>
        </div>
    )
}

export default React.memo(UserGroupsFilter);