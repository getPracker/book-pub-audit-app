import app from "./app";

const start = async () => {
    try {
        await app.listen({port: 3000, host: '0.0.0.0'});
        app.log.info("Server is running");
    }catch(err) {
        app.log.error(err);
        process.exit(1);
    }
}

start();