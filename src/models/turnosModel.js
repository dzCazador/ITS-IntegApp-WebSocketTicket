const listaTurnos = ["Enzo Francescoli", "Ariel Ortega", "Franco Armani", "Miguel Borja", "Enzo Pérez"];
const listaAtendidos = [];

module.exports = {
    getListaTurnos: () => listaTurnos,
    getListaAtendidos: () => listaAtendidos,
    atenderTurno: (puesto) => {
        if (listaTurnos.length > 0) {
            const atendido = {
                nombre: listaTurnos.shift(),
                puesto: puesto,
                hora: Date.now()
            };
            listaAtendidos.unshift(atendido);
            return atendido;
        }
        return null;
    },
    crearTurno: (nombre) => {
        if (typeof nombre === 'string' && nombre.trim() !== '') {
            listaTurnos.push(nombre);
            return true;
        }
        return false;
    }
};
