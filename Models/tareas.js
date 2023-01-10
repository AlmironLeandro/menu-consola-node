const { Tarea } = require("./tarea")



class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = []
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key]
            listado.push(tarea)
        })
        return listado;
    }

    constructor() {
        this._listado = {}
    }

    cargarTareasFromArray(tareas) {

        tareas.forEach((t) => {

            this._listado[t.id] = t
        })
    }


    crearTarea(desc) {

        const tarea = new Tarea(desc)

        this._listado[tarea.id] = tarea

    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id]
        }
    }

    listadoCompleto() {
        let listado = ''
        for (let index = 0; index < this.listadoArr.length; index++) {
            const { id, desc, completadoEn } = this.listadoArr[index];
            const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red
            listado += `${index + 1}. ${desc} :: ${estado} \n`
        }
        return listado
    }
    listarPendientesCompletadas( completadas = true ) {

        console.log();
        let contador = 0;
        this.listadoArr.forEach( tarea => {

            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn ) 
                                ? 'Completada'.green
                                : 'Pendiente'.red;
            if ( completadas ) {
                // mostrar completadas
                if ( completadoEn ) {
                    contador += 1;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ completadoEn.green }`);
                }
            } else {
                // mostrar pendientes
                if ( !completadoEn ) {
                    contador += 1;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ estado }`);
                }
            }

        });     

    }


    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        })
        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                const tareaAct = this._listado[tarea.id]
                tareaAct.completadoEn = false;
            }
        })
    }
}




module.exports = { Tareas }