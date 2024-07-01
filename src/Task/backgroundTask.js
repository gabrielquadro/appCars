import * as TaskManager from 'expo-task-manager';
import axios from 'axios';
import * as SQLite from 'expo-sqlite';

//pega a base local
const db = SQLite.openDatabaseSync('leads.db');

//função para pegar dados do sqlite, enviar pra api e remover do sqlite
async function getListbyDb() {
    console.log("Get info do sqlite");

    try {
        //get all de leads do sqlite
        const query = 'SELECT * FROM leads';

        const allRows = await db.getAllAsync(query)

        console.log("Dados da tabela leads que serao enviados para api: ");

        //nada no sqlite,  todos dados enviados pra api
        if (allRows.length <= 0) {
            console.log("Não há dados no sqlite no momento.");
        }

        //percorro cada linha pra enviar pra api e excluir do banco local
        for (const row of allRows) {
            console.log(row.id, row.car_id, row.user_info);

            axios.post('https://www.wswork.com.br/cars/leads', row)
                .then(() => {
                    db.runAsync('DELETE FROM leads WHERE id = $value', { $value: row.id });
                    console.log("Linha enviada pra api excluida do sqlite com id = " + row.id)
                })
                .catch(error => console.error(error));

        }

        console.log("Fim da rotina em : " + new Date())

    } catch (error) {
        console.log(error)
    }

};

TaskManager.defineTask('SEND_LEADS', () => {
    console.log("----------------------------------------------------------------");
    console.log("Realizando a rotina, inicio em: " + new Date());
    getListbyDb();

    return TaskManager.TaskManagerResult;
});
