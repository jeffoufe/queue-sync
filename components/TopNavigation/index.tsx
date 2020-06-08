import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { debounce } from 'lodash';
import { Icon, IconProps, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

interface TopNavigationControl {
  icon: string,
  onPress: () => void
}

interface TopNavigationProps {
  navigation: any,
  title?: string,
  onSearch?: (search: string) => void,
  leftControl?: TopNavigationControl,
  rightControls?: Array<TopNavigationControl>
}

const generateAction = (control: TopNavigationControl) => (
  <TopNavigationAction
    icon={(props: IconProps) => <Icon {...props} name={control.icon} height={25} width={25} />}
    onPress={control.onPress}
  />
)

export default ({ title, rightControls, onSearch, leftControl }: TopNavigationProps) => {
  const [isSearchEnabled, setSearchEnabled] = useState(false);

  const props = {
    title: '',
    style: styles.topNavigation,
    accessoryRight: () => <View />,
    accessoryLeft: () => <View />,
  }

  if (rightControls) {
    props.accessoryRight = () => (
      <>
        {rightControls.map((rightControl: TopNavigationControl) => generateAction(rightControl))}
      </>
    );
  }
  
  if (leftControl) {
    props.accessoryLeft = () => generateAction(leftControl)
  }

  if (onSearch) {
    const debouncedSearch = debounce((search: string) => onSearch(search), 500);
    const onDebouncedSearch = (search: string) => {
      debouncedSearch(search)
    }

    if (!isSearchEnabled) {
      return (
        <TouchableOpacity onPress={() => setSearchEnabled(true)}>
          <TopNavigation 
            {...props} 
            alignment='center' 
            title='Search' 
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <View>
          <TopNavigation {...props} alignment='start' />
          <TextInput 
            style={styles.search}
            autoFocus={true}
            onChangeText={onDebouncedSearch}
          />
        </View>
      );
    }
  }
  
  else {
    if (title) {
      props.title = title;
    } 
    return <TopNavigation {...props} alignment='center' />
  }
}

const styles = StyleSheet.create({
  search: {
    position: 'absolute',
    // border: 'none',
    width: '70%',
    top: getStatusBarHeight() + 18,
    fontSize: 16,
    // outline: 'none',
    height: 20,
    left: 65
  },
  topNavigation: {
    marginTop: getStatusBarHeight(),
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  }
});

export const topNavigationMapping = {
  meta: {
    parameters: {
      backgroundColor: {
        type: 'string',
      }
    },
    appearances: {
      default: {
        default: true,
      }
    }
  }
}