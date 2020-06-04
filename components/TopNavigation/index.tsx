import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, IconProps, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

interface TopNavigationProps {
  navigation: any
}

const SettingsIcon = (props: IconProps) => (
  <Icon {...props} name='settings' />
);

const SettingsAction = ({ navigation }: TopNavigationProps) => (
  <TopNavigationAction icon={SettingsIcon} onPress={() => navigation.navigate('Settings')} />
);

export default ({ navigation }: TopNavigationProps) => (
    <TopNavigation 
      style={styles.topNavigation}
      title='QueueSync'
      alignment='center' 
      rightControls={SettingsAction({ navigation })}
    />
);

const styles = StyleSheet.create({
  topNavigation: {
      marginTop: 30
  },
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
        },
      },
    },
    appearances: {
      default: {
        mapping: {
          // backgroundColor: 'color-primary-default',
        },
      },
    },
}