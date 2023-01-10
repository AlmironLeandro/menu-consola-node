require('colors');
const { inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    mostrarListadoCheckList,
    confirmar } = require('./helpers/inquirer');
// const { Tarea } = require('./Models/tarea');
const { Tareas } = require('./Models/Tareas');

const { guardarDB, leerDb } = require('./helpers/guardarArchivo')


// const { mostrarMenu, pausa } = require('./helpers/mensajes')

const main = async () => {
    let opt = ''
    const tareas = new Tareas()
    const tareasDB = leerDb();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB)
    }
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc)
                break;
            case '2':
                console.log(tareas.listadoArr);
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids)
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id != 0) {
                    const ok = await confirmar('Esta seguro?')
                    if (ok) {
                        console.log(`La tarea ${tareas._listado[id].desc} fue borrada correctamente`.blue);
                        tareas.borrarTarea(id)
                    }
                }

                break;
            default:
                break;
        }

        // guardarDB(tareas.listadoArr);
        await pausa();


    } while (opt !== '0');

}





main()