const {remote, ipcRenderer} = require('electron')
const fs = require('fs')

function toggle() {
  ipcRenderer.send('toggle-prefs')
}

function updateConfig() {
  var data=JSON.parse(fs.readFileSync('./json/config.json','utf-8'))

  data["body"]["border-style"]=document.getElementById('body-border-style').value
  data["body"]["border-width"]=document.getElementById('body-border-width').value
  data["body"]["border-color"]=document.getElementById('body-border-color').value
  data["body"]["background-color"]=document.getElementById('body-background-color').value
  data["body"]["margin"]=document.getElementById('body-margin').value

  data["#setToggle"]["border-style"]=document.getElementById('button-border-style').value
  data["#setToggle"]["border-width"]=document.getElementById('button-border-width').value
  data["#setToggle"]["border-color"]=document.getElementById('button-border-color').value
  data["#setToggle"]["background-color"]=document.getElementById('button-background-color').value
  data["#setToggle"]["font-family"]=document.getElementById('button-font-family').value
  data["#setToggle"]["font-size"]=document.getElementById('button-font-size').value
  data["#setToggle"]["color"]=document.getElementById('button-font-clor').value

  data["h1"]["font-family"]=document.getElementById('time-font-family').value
  data["h1"]["font-size"]=document.getElementById('time-font-size').value
  data["h1"]["color"]=document.getElementById('time-font-clor').value

  data["bounds"]["width"]=Number(document.getElementById('window-width').value)
  data["bounds"]["height"]=Number(document.getElementById('window-height').value)

  data=JSON.stringify(data,null,2)
  fs.writeFileSync('./json/config.json',data)
  reload()
}

function reload() {
  ipcRenderer.send('reload')
}
