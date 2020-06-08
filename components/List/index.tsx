import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Icon, ListItem, List, Avatar } from '@ui-kitten/components';

interface ListItemProps {
    title: string,
    description?: string,
    icon?: string,
    avatar?: string
    onPress?: () => void,
    accessory?: {
        icon: string,
        onPress: () => void,
    }
};

interface ListProps {
    data: Array<ListItemProps>
};

const renderItem = ({ item: { icon, avatar, title, description, onPress, accessory }}: { item: ListItemProps }) => {
    const renderIcon = (style: any) => {
        if (icon) {
            return <Icon {...style} name={icon} height={25} />;
        }
        if (avatar) {
            return <Avatar style={styles.avatar} source={{ uri: avatar }} />
        }
        return <View />;
    }

    const renderItemAccessory = (style: any) => {
        if (accessory) {
            const onPress = (e: GestureResponderEvent) => {
                e.stopPropagation();
                accessory.onPress();
            }
            return <Icon {...style} name={accessory.icon} onPress={onPress} height={25} width={25} color='black' />
        }
        return <View />;
    }

    return (
        <ListItem
            title={title}
            description={description}
            accessoryLeft={renderIcon}
            style={styles.listItem}
            onPress={onPress}
            accessoryRight={renderItemAccessory}
        />
    )
}

export default ({ data }: ListProps) => (
    <List 
        data={data}
        renderItem={renderItem}
    />
)

const styles = StyleSheet.create({
    listItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    iconText: {
        textAlign: 'center',
        lineHeight: 40
    },
    avatar: {
        opacity: 1, 
        width: 35, 
        height: 35,
        marginLeft: 10,
        marginRight: 4
    },
    icon: {
        height: 40,
        width: 40
    }
});