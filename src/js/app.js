module.exports = function initApp(){
    const app = {
        menuAtivado: true,
        janelaAual: '.notificacoes',
        notificacao: require('./notificacoes')(),
        gerenciamento: require('./gerenciamento')(),

        btnNotificacoes: document.getElementById('btnNotificacoes'),
        btnGerenciarProdutos: document.getElementById('gerenciarProdutos'),
        btnControleEstoque: document.getElementById('controleEstoque'),
        btnEsconderMenu: document.getElementById('esconderMenu'),
        menuLateral: document.querySelector('aside'),
        main: document.querySelector('main'),
    
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

    app.btnEsconderMenu.addEventListener('click',()=>{
        if(app.menuAtivado){
            app.menuLateral.style.display = 'none';
            app.main.style.marginLeft = '0';
            app.main.style.maxWidth = '100%';
            app.btnEsconderMenu.style.transform = "rotate(180deg)";
            app.btnEsconderMenu.style.borderBottomLeftRadius = '20px';
            app.btnEsconderMenu.style.borderTopLeftRadius = '20px';
            app.btnEsconderMenu.style.borderBottomRightRadius = '0px';
            app.btnEsconderMenu.style.borderTopRightRadius = '0px';
            app.btnEsconderMenu.style.borderLeft = '2px solid #FFF';
            app.btnEsconderMenu.style.borderRight = 'none';
        }
        else{
            app.menuLateral.style.display = 'block';
            app.main.style.marginLeft = '250px';
            app.main.style.maxWidth = '85%';
            app.btnEsconderMenu.style.transform = "rotate(0)";
            app.btnEsconderMenu.style.borderBottomLeftRadius = '0px';
            app.btnEsconderMenu.style.borderTopLeftRadius = '0px';
            app.btnEsconderMenu.style.borderBottomRightRadius = '20px';
            app.btnEsconderMenu.style.borderTopRightRadius = '20px';
            app.btnEsconderMenu.style.borderRight = '2px solid #FFF';
            app.btnEsconderMenu.style.borderLeft = 'none';
        }

        app.menuAtivado = !app.menuAtivado;
    });

    app.btnNotificacoes.addEventListener('click', ()=>{
        app.trocarJanela(app.notificacoes);
    });

    app.btnGerenciarProdutos.addEventListener('click', ()=>{
        app.trocarJanela(app.gerenciamentoProdutos);
    });

    app.trocarJanela(app.gerenciamentoProdutos);
    
    return app;
}