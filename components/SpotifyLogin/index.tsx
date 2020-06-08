import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, RadioGroup, Radio, Card, CardHeader } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { AUTHORIZE_SPOTIFY, SELECT_DEVICE_SPOTIFY, LOGOUT_SPOTIFY, GET_DEVICES_SPOTIFY } from '../../reducers/user/constants';
import { SpotifyDeviceObject } from '../../reducers/user/types';

export default () => {
    const { spotify } = useSelector((state: any) => state.user)
    const dispatch = useDispatch();

    const findDeviceIndex = (id: string) => spotify.devices.findIndex((device: SpotifyDeviceObject) => device.id === id)

    const onPressButton = async () => {
        dispatch({ type: AUTHORIZE_SPOTIFY })
    }

    const onPressDisconnectButton = () => {
        dispatch({ type: LOGOUT_SPOTIFY })
    }

    const onPressRefreshButton = () => {
        dispatch({ type: GET_DEVICES_SPOTIFY })
    }

    const onSelectDevice = (selectedIndex: number) => {
        dispatch({
            type: SELECT_DEVICE_SPOTIFY,
            payload: { deviceID: spotify.devices[selectedIndex].id }
        })
    }

    const Header = () => (
        <CardHeader title='Spotify' />
    );

    const Footer = () => (
        <View style={styles.footerContainer}>
            {!(spotify && spotify.accessToken) && (
                <Button 
                    style={styles.spotifyButton} 
                    onPress={onPressButton}
                >
                    LOGIN
                </Button>
            )}
            {spotify && spotify.accessToken && (
                <>
                    <Button 
                        status='basic'
                        style={styles.refreshButton} 
                        onPress={() => {
                            
                            onPressRefreshButton();
                        }}
                    >
                        REFRESH DEVICES
                    </Button>
                    <Button 
                        status='basic'
                        onPress={onPressDisconnectButton}
                    >
                        LOGOUT
                    </Button>
                </>
            )}
        </View>
    );

    return (
        <Card header={Header} footer={Footer} style={styles.card}>
            {spotify && spotify.devices && (
                <>
                    <Text>Available devices : </Text>
                    {spotify.devices.length
                        ? (
                            <RadioGroup
                                selectedIndex={findDeviceIndex(spotify.deviceID)}
                                onChange={onSelectDevice}
                            >
                                {spotify.devices.map((device: SpotifyDeviceObject) => (
                                    <Radio text={device.name}></Radio>
                                ))}
                            </RadioGroup>
                        )
                        : (
                            <Text>
                                {spotify.accessToken
                                    ? 'Please turn on your Spotify app'
                                    : 'Please login to see available devices'
                                }
                            </Text>
                        )
                    }
                </>
            )}
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        marginTop: 10
    },
    refreshButton: {
        marginRight: 10
    },
    spotifyButton: {
        backgroundColor: '#20D760',
        borderColor: '#20D760',
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
});