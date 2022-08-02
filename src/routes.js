const { 
    addNoteHandler, 
    getAllNotesHandler, 
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler
} = require("./handler");

const routes = [
    {   
        // Menyimpan Catatan
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler
    },
    {   
        // Menampilkan Catatan
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler
    },
    {   
        // Menampilkan Catatan spesifik
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler
    },
    {   
        // Mengubah Catatan spesifik
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler
    },
    {   
        // Menghapus Catatan spesifik
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler
    }
];

module.exports = routes;