module.exports = function initApp(){
    const app = {
        janelaAual: '.notificacoes',
        notificacao: require('./notificacoes')(),
        gerenciamento: require('./gerenciamento')(),

        btnNotificacoes: document.getElementById('btnNotificacoes'),
        btnGerenciarProdutos: document.getElementById('gerenciarProdutos'),
        btnControleEstoque: document.getElementById('controleEstoque'),
    
        notificacoes: '.notificacoes',
        gerenciamentoProdutos: '.gerenciamentoProdutos',

        trocarJanela: (nome_classe)=>{
            if(nome_classe != app.janelaAtual){
                document.querySelector(app.janelaAual).style.display = 'none';
                document.querySelector(nome_classe).style.display = 'flex';
            
                app.janelaAual = nome_classe;
            }
        }
    }

    app.btnNotificacoes.addEventListener('click', ()=>{
        app.trocarJanela(app.notificacoes);
    });

    app.btnGerenciarProdutos.addEventListener('click', ()=>{
        app.trocarJanela(app.gerenciamentoProdutos);
    });

    app.trocarJanela(app.gerenciamentoProdutos);
    
    return app;
}