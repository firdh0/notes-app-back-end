const Hapi = require('@hapi/hapi');
const routes =  require('./routes');

const init = async() => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        // untuk CORS
        routes: {
            cors: {
                origin: ['*'] //agar data dapat diakses semua origin + jangan lupa disabled Block insecure private network requests kalo pake chrome
            }
        }
    });

    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();