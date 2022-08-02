const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;

    const id = nanoid(16); //nanoid agar id unik
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updatedAt
    };

    notes.push(newNote);
    // cek apa datanya sudah masuk atau belum
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    // jika masuk
    if( isSuccess ){
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id
            }
        });
        response.code(201);
        return response;
    }

    // jika belum
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan'
    });
    response.code(500); //masuk pada variabel const response
    return response;
};

const getAllNotesHandler = () => ({ // fungsi ini sama seperti cons response
    status: 'success',
    data : {
        notes
    }
});

const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const note = notes.filter((n) => n.id === id)[0];

    if( note !== undefined ){
        return{ // sama saja seperti di baris 21-29 hanya saja dipersingkat tidak pakai h.response()
            status: 'succes',
            data: {
                note
            }
        };
    };

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    // jika berhasil mendapatkan index notes ke sekian
    if( index !== -1 ){
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt
        };

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui'
        });
        response.code(200);
        return response;
    };

    // jika gagal
    const response = h.response({
        status: 'fail', 
        message: 'Gagal memperbarui catatan. Id tidak ditemukan'
    });
    response.code(404);
    return response;
};

const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = notes.findIndex((note) => note.id === id);

    // jika berhasil mendapatkan index notes ke sekian
    if( index !== -1 ){
        notes.splice(index, 1);
        const response =  h.response({
            status: 'succes',
            message: 'Catatan berhasil dihapus'
        });
        response.code(200);
        return response;
    };

    // jika gagal
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan'
    });
    response.code(404);
    return response;
};

module.exports = { 
    addNoteHandler, 
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler
};