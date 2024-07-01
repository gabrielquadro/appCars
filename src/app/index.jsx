import React, {useEffect} from 'react';
import Routes from "../routes"
import * as BackgroundFetch from 'expo-background-fetch';
import '../Task/backgroundTask';

export default function Index() {

    useEffect(() => {
        const registerBackgroundTask = async () => {
            try {
                await BackgroundFetch.registerTaskAsync('SEND_LEADS', {
                    minimumInterval: 60 * 1, // a cada 1 minuto faz a tarefa
                    stopOnTerminate: false,
                    startOnBoot: true,
                });
            } catch (error) {
                console.error('Erro ao registrar a tarefa!', error);
            }
        };
    
        registerBackgroundTask();
    }, []);

    return (
        <Routes />
    )
}