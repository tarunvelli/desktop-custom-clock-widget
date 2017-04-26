const {app, BrowserWindow, ipcMain} = require('electron')
const json2css = require('json-2-css')
const path = require('path')
const url = require('url')
const fs = require('fs')

json2css("./json/config.json","./css/config.css")


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let setwin

app.on('ready', function(){

  var data=JSON.parse(fs.readFileSync('./json/config.json','utf-8'))
  win = new BrowserWindow({width: data["bounds"]["width"], height: data["bounds"]["height"], frame:false, resizeable:true})

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  setwin = new BrowserWindow({width: 600, height: 550, show: false, frame: false})

  setwin.loadURL(url.format({
    pathname: path.join(__dirname, 'settings.html'),
    protocol: 'file:',
    slashes: true
  }))

  ipcMain.on('toggle-prefs', function () {
    if (setwin.isVisible())
      setwin.hide()
    else
      setwin.show()
  })

  ipcMain.on('reload', function () {
    json2css("./json/config.json","./css/config.css")

    var data=JSON.parse(fs.readFileSync('./json/config.json','utf-8'))
    var rect=win.getBounds()
    rect["width"]=data["bounds"]["width"]
    rect["height"]=data["bounds"]["height"]

    win.setBounds(rect)

    win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))

  })

  win.on('closed', () => {
    win = null
    setwin = null
  })

})


app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
