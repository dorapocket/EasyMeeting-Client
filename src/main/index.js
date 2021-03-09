import { app, BrowserWindow, Menu, ipcMain } from "electron";
const fs = require("fs");
import "../renderer/store";
const Store = require("electron-store");
const store = new Store();
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== "development") {
  global.__static = require("path")
    .join(__dirname, "/static")
    .replace(/\\/g, "\\\\");
}

let mainWindow;
const winURL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:9090`
    : `file://${__dirname}/index.html`;
store.set('loginStatus',false);
function createWindow() {
  /**
   * Initial window options
   */
  Menu.setApplicationMenu(null);
  mainWindow = new BrowserWindow({
    height: 450,//563
    useContentSize: true,
    //titleBarStyle: 'customButtonsOnHover',
    //frame:false,
    width: 300,//1000
    maximizable: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  mainWindow.loadURL(winURL);
  let webContents=mainWindow.webContents;
  webContents.on('did-finish-load',()=>{
    webContents.setZoomFactor(1);
});

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  let config=require("../config.json")||{};
  store.set("baseURL", config.baseURL || "");
  store.set("rtcServer", config.rtcServer || "");
  store.set("wxSocketUrl", config.wxSocketUrl || "");
  store.set("matomoAnalytics",config.matomoAnalytics||"");
  mainWindow.loadURL(winURL);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}


app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

ipcMain.on("setStorageSync", (event, key, value) => {
  store.set(key, value);
  event.returnValue=true;
});
ipcMain.on("getStorageSync", (event, key) => {
  event.returnValue=store.get(key);
});
ipcMain.on("needLogin",(event)=>{
  store.set("loginStatus", false);
  mainWindow.setSize(300,400,true)
  mainWindow.reload()
})
ipcMain.on("loginSuccess",(event,token)=>{
  store.set("loginStatus", true);
  store.set('UserToken',token);
  mainWindow.setSize(1000,600,true)
})
