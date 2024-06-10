import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native'; // Add this import

const QRScannerScreen = () => {
    const [scanned, setScanned] = useState(false);
    const navigation = useNavigation(); // Initialize navigation
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [hasPermission, setHasPermission] = useState(null);
    
    useEffect(() => {
        (async () => {
            const { status } = await requestPermission();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Scanned QR code with type ${type} and data: ${data}`);
        // Assuming the QR code contains the table number
        // You can navigate to the Menu screen with the table number
        navigation.navigate('Menu', { tableNumber: data });
    };

    if (!permission) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (permission && !permission.granted) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={facing}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
});

export default QRScannerScreen;
