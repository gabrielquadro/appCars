import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';

const DetailsScreen = ({ route, navigation }) => {
    const { car } = route.params;
    const [email, setEmail] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    const db = SQLite.openDatabaseSync("leads.db");

    async function handleBuyCar() {

        const statement = await db.prepareAsync(
            "INSERT INTO leads (car_id, user_info) VALUES ($carId, $user_info)"
        )
        try {
            const result = await statement.executeAsync({
                $carId: car.id,
                $user_info: email
            })
            // Alert.alert("Criado com id: " + result.lastInsertRowId.toLocaleString())
        } catch (error) {
            throw error;
        }

        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
            navigation.navigate('Home');
        }, 1500);
    };
    return (
        <View style={styles.container}>
            <View style={styles.detailsContainer}>
                <Text style={styles.label}>Modelo: {car.nome_modelo}</Text>
                <Text style={styles.label}>Ano: {car.ano}</Text>
                <Text style={styles.label}>Combustível: {car.combustivel}</Text>
                <Text style={styles.label}>Portas: {car.num_portas}</Text>
                <Text style={styles.label}>Cor: {car.cor}</Text>
                <Text style={styles.label}>Valor: R${car.valor} mil</Text>
            </View>

            <TextInput
                placeholder="Digite seu email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input} // Aumentar a altura do TextInput
            />

            <TouchableOpacity style={styles.button} onPress={handleBuyCar}>
                <Text style={styles.buttonText}>Eu Quero</Text>
            </TouchableOpacity>

            {showNotification && (
                <View style={styles.notification}>
                    <Text style={styles.notificationText}>Salvo com sucesso!</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0', // Cor de fundo suave
    },
    label: {
        fontSize: 18,
        color: '#6a6a6a',
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#212121',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#FFD700',
        fontSize: 18,
    },
    notification: {
        backgroundColor: '#d4edda',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    notificationText: {
        color: '#155724',
        fontSize: 16,
    },
    detailsContainer: {
        backgroundColor: '#d9d9d9',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
    },
});

export default DetailsScreen;