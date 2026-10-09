const { app, BrowserWindow } = require('electron');
const path = require('path');
const { WebSocket } = require('ws');

// ⚠️ CORE connects to HARDWARE via Local WebSocket
const hwSocket = new WebSocket('ws://localhost:8081');
hwSocket.on('open', () => console.log('[Core] Connected to Hardware Sidecar!'));
hwSocket.on('message', (data) => {
  const payload = JSON.parse(data);
  console.log('[Core] Received from HW:', payload);
  // TODO: Emit to Renderer via IPC
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1024, height: 768,
    webPreferences: { 
      preload: path.join(__dirname, 'preload.js'), 
      contextIsolation: true, 
      nodeIntegration: false 
    }
  });
  win.loadFile(path.join(__dirname, '../renderer/index.html'));
}

app.whenReady().then(() => {
  console.log('[Core] AKA Scale Core starting...');
  // TODO: Init SQLite WAL here
  createWindow();
});
