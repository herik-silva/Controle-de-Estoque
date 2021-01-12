module.exports = function initApp(){
    const app = {
        notificacoes: require('./notificacoes')(),
    }

    return app;
}