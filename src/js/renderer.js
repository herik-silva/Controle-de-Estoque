function initRenderer(){
    const { ipcRenderer } = require('electron');

    const TAM_BARRA_TAREFAS = 40;

    const janela = {
        fechar: document.getElementById('fechar'),
        maximizar: document.getElementById('maximizar'),
        iconesMax: {
            atual: 'max',
            max: document.getElementById('max'),
            unmax: document.getElementById('unmax')
        },
        minimizar: document.getElementById('minimizar'),
        resolucao: {
            width: window.innerWidth,
            height: window.innerHeight+TAM_BARRA_TAREFAS
        }
    }

    janela.fechar.addEventListener('click',()=>{
        ipcRenderer.send('main/fechar', null);
    });

    janela.maximizar.addEventListener('click', ()=>{
        ipcRenderer.send('main/maximizar', null);
    })

    janela.minimizar.addEventListener('click',()=>{
        ipcRenderer.send('main/minimizar', null);
    });

    ipcRenderer.on('renderer/trocarIcone', (event, maximizar)=>{
        if(maximizar){
            janela.iconesMax.max.style.display = 'none';
            janela.iconesMax.unmax.style.display = 'block';
        }
        else{
            janela.iconesMax.unmax.style.display = 'none';
            janela.iconesMax.max.style.display = 'block';
        }
    })

    setInterval(()=>{
        janela.resolucao.width =  window.innerWidth;
        janela.resolucao.height = window.innerHeight+TAM_BARRA_TAREFAS;

        ipcRenderer.send('main/verificarTela', janela.resolucao);
    },300);
}

initRenderer();