import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, StyleSheet, View } from 'react-native';
import { Button } from '@ui-kitten/components';
import { CREATE_PARTY_ACTIONS } from '../../reducers/queue/constants';
import { useDispatch } from 'react-redux';

interface QRScannerProps {
    onClose: () => void,
    navigation: any
}

export default ({ onClose }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        dispatch({
            type: CREATE_PARTY_ACTIONS.success,
            payload: {
                _id: data
            }
        })
    };

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
            }}
        >
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            <Button onPress={onClose}>CANCEL</Button>
        </View>
    );
}