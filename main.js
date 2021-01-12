const { app, BrowserWindow, ipcMain } = require('electron');

function criarJanela(){
    const mainController = require('./Controller/mainController');

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        show: false,
        frame: false,
        icon: './assets/logo.png',
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('./src/index.html');

    win.on('ready-to-show',()=>{
        win.show();
    });
    
    mainController(win);
}

app.whenReady().then(criarJanela);

app.on('window-all-closed',()=>{
    if(process.platform !== 'darwin'){
        app.quit();
    }
})

app.on('activate', ()=>{
    if(BrowserWindow.getAllWindows.length === 0){
        criarJanela();
    }
})