import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
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
            Alert.alert("Criado com id: " + result.lastInsertRowId.toLocaleString())
        } catch (error) {
            throw error;
        }
        console.log(email)

        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
            navigation.navigate('Home');
        }, 2000);
    };

    return (
        <View>
            <Text>Modelo: {car.nome_modelo}</Text>
            <Text>Ano: {car.ano}</Text>
            <Text>Combustível: {car.combustivel}</Text>
            <Text>Portas: {car.num_portas}</Text>
            <Text>Cor: {car.cor}</Text>
            <Text>Valor: {car.valor}</Text>

            <TextInput
                placeholder="Digite seu email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={{ borderColor: 'gray', borderWidth: 1, marginVertical: 10, padding: 5 }}
            />
            <Button title="Eu Quero" onPress={() => handleBuyCar()} />

            {showNotification && (
                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'green', padding: 10 }}>
                    <Text style={{ color: 'white' }}>Salvo com sucesso!</Text>
                </View>
            )}
        </View>
    );
};

export default DetailsScreen;
