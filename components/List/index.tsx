import React from 'react';
import { StyleSheet, View, Text, GestureResponderEvent } from 'react-native';
import { Icon, ListItem, List, Avatar } from '@ui-kitten/components';

interface ListItemProps {
    title: string,
    description?: string,
    progress?: number,
    icon?: string,
    avatar?: string
    onPress?: () => void,
    accessory?: {
        icon: string,
        onPress: () => void,
    },
    noBorder?: boolean
};

interface ListProps {
    data: Array<ListItemProps>
};

export const renderItem = ({ item: { icon, avatar, title, description, progress, onPress, accessory }, noBorder }: { item: ListItemProps, noBorder: boolean }, key?: number) => {
    const renderIcon = icon && typeof icon !== 'string' ? icon : (style: any) => {
        if (icon) {
            if (typeof icon === 'string') {
                return <Icon {...style} name={icon} height={25} />;
            }
        }
        if (avatar) {
            return <Avatar style={styles.avatar} source={{ uri: avatar }} />
        }
        return <View />;
    }

    const renderItemAccessory = (style: any) => {
        if (progress && progress != 100) {
            return (
                <View>
                    <Text>
                        {`${Math.round(progress)}%`}
                    </Text>
                </View>
            );
        }
        if (accessory) {
            const onPress = (e: GestureResponderEvent) => {
                e.stopPropagation();
                accessory.onPress();
            }
            return <Icon {...style} name={accessory.icon} onPress={onPress} height={25} width={25} color='black' />
        }
        return <View />;
    }

    const listItemStyle = StyleSheet.create({
        listItem: {
            borderBottomWidth: noBorder ? 0 : 1,
            borderBottomColor: '#eee',
        },
    })

    return (
        <ListItem
            key={key}
            title={title}
            description={description}
            accessoryLeft={renderIcon}
            style={listItemStyle.listItem}
            onPress={onPress}
            accessoryRight={renderItemAccessory}
        />
    )
}

export default ({ data }: ListProps) => (
    <List 
        data={data}
        renderItem={({ item }) => renderItem({ item, noBorder: false })}
        style={styles.list}
    />
)

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#F2F2F2'
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
        marginRight: 5
    },
    icon: {
        height: 40,
        width: 40
    }
});