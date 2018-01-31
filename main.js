const electron = require('electron');
const Menu = electron.Menu;
const app = electron.app;
const globalShortcut = electron.globalShortcut;
const BrowserWindow = electron.BrowserWindow;

let menu;
let mainWindow;
let aboutWindow;

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600, resizable: false, icon: __dirname + '/public/icon.png'});
  aboutWindow = createAboutWindow();
  mainWindow.loadURL(`file://${__dirname}/public/index.html`);

  mainWindow.on('closed', function () 
  {
    mainWindow = null;    
  });
  
  /*mainWindow.on('focus', function () 
  {
    Menu.setApplicationMenu(menu);   
  });*/
  
  aboutWindow.on('closed', function () 
  {
    aboutWindow = null;
  });
}

app.on('ready', function () {
    /*globalShortcut.register('CommandOrControl+R', () => {
        let allBrowserWindows = BrowserWindow.getAllWindows().slice();
        if (allBrowserWindows.length === 1)
            mainWindow.reload();        
        else
        {
            if (BrowserWindow.getFocusedWindow() === aboutWindow)
            {
                aboutWindow.reload();
                return;
            }
            for (var i = 0; i < allBrowserWindows.length; i++)
            {
                if (allBrowserWindows[i].id === 1)
                    continue;
                else
                    allBrowserWindows[i].close();
            }
        }
        mainWindow.reload();
  });
  globalShortcut.register('CommandorControl+Shift+I', () => {
        mainWindow.webContents.openDevTools();
  });*/
  menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  createWindow();
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') 
        app.quit();
});

let template = [/*{
  label: 'View',
  submenu: [{
    label: 'Reload',
    accelerator: 'CmdOrCtrl+R',
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        if (focusedWindow.id === 1) {
          BrowserWindow.getAllWindows().forEach(function (win) {
            if (win.id > 1) {
              win.close();
            }
          });
        }
        focusedWindow.reload();
      }
    }
  },{
    label: 'Toggle Developer Tools',
    accelerator: (function () {
      if (process.platform === 'darwin') {
        return 'Alt+Command+I';
      } else {
        return 'Ctrl+Shift+I';
      }
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.toggleDevTools();
      }
    }
  }]
},*/{
  label: 'Help',
  role: 'help',
  submenu: [{
    label: 'About',
    click: function () {
        aboutWindow = createAboutWindow();
        aboutWindow.loadURL(`file://${__dirname}/public/about.html`);
        //aboutWindow.setMenuBarVisibility(false);
        aboutWindow.setMenu(null);
        aboutWindow.once('ready-to-show', () => {
            aboutWindow.show();
          });
    }
  }]
}];

function createAboutWindow()
{
    return new BrowserWindow({width: 400, height: 530, parent: mainWindow, resizable: false, modal: true, show: false, icon: __dirname + '/public/icon.png'});
}