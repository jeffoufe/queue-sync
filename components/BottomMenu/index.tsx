import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { BottomNavigation, BottomNavigationTab, Icon, IconProps } from '@ui-kitten/components';
import { SET_ROUTE } from '../../reducers/router/constants';

interface BottomMenuProps {
    navigation: any
}

const SearchIcon = (props: IconProps) => (
    <Icon {...props} name='search-outline' />
);

const QueueIcon = (props: IconProps) => (
    <Icon {...props} name='list-outline' />
);

const SettingsIcon = (props: IconProps) => (
    <Icon {...props} name='settings-outline' />
);

const LibraryIcon = (props: IconProps) => (
    <Icon {...props} name='book-open-outline' />
);

export default ({ navigation }: BottomMenuProps) => {
    const [_, setSelectedIndex] = useState(0);
    const dispatch = useDispatch();
    const selectedIndex = useSelector((state: any) => state.router.index)
    const titles = ['Queue', 'Search', 'Library', 'Settings'];
    const icons = [QueueIcon, SearchIcon, LibraryIcon, SettingsIcon];

    const onSelect = (index: number) => {
        const route = titles[index]
        dispatch({
            type: SET_ROUTE,
            payload: { 
                route,
                index: titles.findIndex((title: string) => route === title)
            }
        })
        navigation.navigate(route);
    };

    return (
        <BottomNavigation 
            style={styles.navigation}
            appearance='noIndicator'
            selectedIndex={selectedIndex}
            onSelect={onSelect}
        >
            {titles.map((title: string, index: number) => (
                <BottomNavigationTab
                    title={title}
                    icon={icons[index]}
                    key={`sub-item-${index}`}
                />
            ))}
        </BottomNavigation>
    )
};

const styles = StyleSheet.create({
    navigation: {
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
        position: 'absolute',
        width: '100%',
        bottom: 0
    }
})