module.exports = function mainController(window){
    const { ipcMain, screen } = require('electron');

    ipcMain.on('main/fechar',()=>{
        window.close();
    });

    ipcMain.on('main/maximizar',(event)=>{
        if(!window.isMaximized()){
            window.maximize();
            event.reply('renderer/trocarIcone', true);
        }
        else{
            window.unmaximize();
            event.reply('renderer/trocarIcone', false);
        }
    });

    ipcMain.on('main/verificarTela', (event, tamanho_app)=>{
        const tamanho_tela = screen.getAllDisplays()[0].size;
        
        const isMaximized = (tamanho_tela.width == tamanho_app.width) && (tamanho_tela.height == tamanho_app.height);

        event.reply('renderer/trocarIcone', isMaximized);
    })

    ipcMain.on('main/trocarIcone',(event, trocar)=>{
        event.reply('renderer/trocarIcone', trocar);
    })

    ipcMain.on('main/minimizar',()=>{
        if(!window.isMinimized()){
            window.minimize();
        }
    })

}