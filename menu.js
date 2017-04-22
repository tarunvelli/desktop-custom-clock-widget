const {remote, ipcRenderer} = require('electron')

function toggle() {
  ipcRenderer.send('toggle-prefs')
}

function reload() {
  ipcRenderer.send('reload')
}
