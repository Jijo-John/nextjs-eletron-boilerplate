import { app, BrowserWindow, Menu } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL('http://localhost:3000');
}

 // Define a custom menu template
 const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        click: () => {
          console.log('Open clicked');
        }
      },
      {
        label: 'Save',
        click: () => {
          console.log('Save clicked');
        }
      },
      { type: 'separator' },
      {
        label: 'Exit',
        click: () => {
          app.quit();
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { label: 'Undo', role: 'undo' },
      { label: 'Redo', role: 'redo' },
      { type: 'separator' },
      { label: 'Cut', role: 'cut' },
      { label: 'Copy', role: 'copy' },
      { label: 'Paste', role: 'paste' },
      { label: 'Select All', role: 'selectAll' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { label: 'Reload', role: 'reload' },
      { label: 'Toggle Developer Tools', role: 'toggleDevTools' },
      { type: 'separator' },
      { label: 'Reset Zoom', role: 'resetZoom' },
      { label: 'Zoom In', role: 'zoomIn' },
      { label: 'Zoom Out', role: 'zoomOut' },
      { type: 'separator' },
      { label: 'Toggle Fullscreen', role: 'togglefullscreen' }
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron');
          await shell.openExternal('https://electronjs.org');
        }
      }
    ]
  }
];

// Create the menu from the template
const menu = Menu.buildFromTemplate(menuTemplate);

// Set the application menu
Menu.setApplicationMenu(menu);


app.on('ready', createWindow);
