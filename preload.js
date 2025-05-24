const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    
  getSSIDs: () => {
    console.log("preload call hua")
    return ipcRenderer.invoke('get-ssids')},  
  getIP: async () => {
    return ipcRenderer.invoke('get-ip')},  
  getIP2: async () => {
    return ipcRenderer.invoke('get-ip-2')},  
  getIPQUICKLY: () => {
    return ipcRenderer.invoke('get-ip-quickly')},  
  startEXPRESS: async (particular_host) => {
    return ipcRenderer.invoke('start-express',particular_host)},  
  stopEXPRESS: async () => {
    return ipcRenderer.invoke('stop-express')},  
  sendFILES: () => {
    return ipcRenderer.invoke('send-the-files')},  
  refuseSENDFILES: () => {
    return ipcRenderer.invoke('stop-send-the-files')},  
  allowRECIEVE: () => {
    return ipcRenderer.invoke("allow-to-recieve")
  },
  refuseRECIEVE: () => {
    return ipcRenderer.invoke("refuse-to-recieve")
  },
  onUpdateSpan: (object) => {
    return ipcRenderer.on('update-span',object)
  }
});


