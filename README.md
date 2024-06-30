
# Creating an Executable File for an Electron and Next.js Application

  

This guide covers the steps to create an executable file for an Electron application combined with a Next.js app, as well as how to customize the top bar menu options in the Electron window.

  

## 1. Set Up Your Project

  

Ensure you have a working Electron and Next.js project. If not, you can set them up using the following commands:

  

```bash

npx  create-next-app@latest  my-nextjs-app

cd  my-nextjs-app

npm  install  electron  electron-builder
```

2.  Configure  Electron

Create  a  new  file  named  main.js  in  the  root  of  your  project  for  your  Electron  main  process.

  


```javascript
//  main.js

import  {  app,  BrowserWindow  }  from  'electron';
import  {  fileURLToPath  }  from  'url';
import  {  dirname,  join  }  from  'path';

  

//  Define  __filename  and  __dirname

const  __filename  =  fileURLToPath(import.meta.url);

const  __dirname  =  dirname(__filename);

  

function  createWindow() {

const  mainWindow  =  new  BrowserWindow({

width:  800,

height:  600,

webPreferences:  {

preload:  join(__dirname,  'preload.js'),  //  if  you  have  a  preload  script

},

});

  

mainWindow.loadURL('http://localhost:3000'); //  URL  to  your  Next.js  app

}

  

app.on('ready',  createWindow);

  

app.on('window-all-closed', () => {

if (process.platform  !==  'darwin') {

app.quit();

}

});

  

app.on('activate', () => {

if (BrowserWindow.getAllWindows().length === 0) {

createWindow();

}

});
```

3.  Add  Start  Scripts

Modify  your  package.json  to  include  scripts  for  running  your  Electron  app  and  building  your  Next.js  app.

  

```javascript

{

"name":  "my-nextjs-app",

"version":  "1.0.0",

"main":  "main.js",

"scripts":  {

"dev":  "next dev",

"build":  "next build",

"start":  "next start",

"electron":  "electron .",

"dist":  "next build && electron-builder"

},

"dependencies":  {

"electron":  "^12.0.0",

"next":  "latest",

"react":  "latest",

"react-dom":  "latest"

},

"devDependencies":  {

"electron-builder":  "^22.11.7"

}

}
```
4.  Configure  Electron  Builder

Create  a  configuration  file  for  Electron  Builder  by  adding  a  build  field  to  your  package.json.

  

```javascript
{

"name":  "my-nextjs-app",

"version":  "1.0.0",

"main":  "main.js",

"scripts":  {

"dev":  "next dev",

"build":  "next build",

"start":  "next start",

"electron":  "electron .",

"dist":  "next build && electron-builder"

},

"dependencies":  {

"electron":  "^12.0.0",

"next":  "latest",

"react":  "latest",

"react-dom":  "latest"

},

"devDependencies":  {

"electron-builder":  "^22.11.7"

},

"build":  {

"appId":  "com.example.myapp",

"directories":  {

"output":  "dist"

},

"files": [

"main.js",

"preload.js",

"out/**"

],

"mac":  {

"category":  "public.app-category.productivity"

},

"win":  {

"target":  "nsis"

},

"linux":  {

"target":  "AppImage",

"category":  "Utility"

}

}

}
```
Ensure  your  Next.js  build  output  directory (.next) is included in the files array.

  

5.  Build  and  Package  Your  App

Run  the  following  commands  to  build  your  Next.js  app  and  package  your  Electron  app  into  an  executable:

  

bash

Copy  code

npm  run  build

npm  run  dist

The  electron-builder  will  create  the  executable  file  in  the  dist  directory.

  

6.  Serve  Next.js  App  Statically (Optional)

If  you  prefer  to  serve  your  Next.js  app  statically,  you  can  build  it  and  serve  the  static  files.  Update  your  main.js  to  load  the  static  files:

  

```javascript

const  {  app,  BrowserWindow  }  =  require('electron');

const  path  =  require('path');

const  isDev  =  require('electron-is-dev');

  

function  createWindow() {

const  mainWindow  =  new  BrowserWindow({

width:  800,

height:  600,

webPreferences:  {

preload:  path.join(__dirname,  'preload.js'),

},

});

  

mainWindow.loadURL(

isDev

?  'http://localhost:3000'

:  `file://${path.join(__dirname, 'out', 'index.html')}`

);

}

  

app.on('ready',  createWindow);

  

app.on('window-all-closed', () => {

if (process.platform  !==  'darwin') {

app.quit();

}

});

  

app.on('activate', () => {

if (BrowserWindow.getAllWindows().length === 0) {

createWindow();

}

});
```
7.  Customize  the  Top  Bar  Menu

To  customize  the  top  bar  menu  options,  use  the  Menu  module  provided  by  Electron.

  

```javascript

import  {  app,  BrowserWindow,  Menu  }  from  'electron';

import  {  fileURLToPath  }  from  'url';

import  {  dirname,  join  }  from  'path';

  

//  Define  __filename  and  __dirname

const  __filename  =  fileURLToPath(import.meta.url);

const  __dirname  =  dirname(__filename);

  

function  createWindow() {

const  mainWindow  =  new  BrowserWindow({

width:  800,

height:  600,

webPreferences:  {

preload:  join(__dirname,  'preload.js'),

},

});

  

mainWindow.loadURL('http://localhost:3000');

  
//  Define  a  custom  menu  template

const  menuTemplate  = [

{

label:  'File',

submenu: [

{

label:  'Open',

click: () => {

console.log('Open clicked');

}

},

{

label:  'Save',

click: () => {

console.log('Save clicked');

}

},

{ type:  'separator'  },

{

label:  'Exit',

click: () => {

app.quit();

}

}

]

},

{

label:  'Edit',

submenu: [

{ label:  'Undo',  role:  'undo'  },

{ label:  'Redo',  role:  'redo'  },

{ type:  'separator'  },

{ label:  'Cut',  role:  'cut'  },

{ label:  'Copy',  role:  'copy'  },

{ label:  'Paste',  role:  'paste'  },

{ label:  'Select All',  role:  'selectAll'  }

]

},

{

label:  'View',

submenu: [

{ label:  'Reload',  role:  'reload'  },

{ label:  'Toggle Developer Tools',  role:  'toggleDevTools'  },

{ type:  'separator'  },

{ label:  'Reset Zoom',  role:  'resetZoom'  },

{ label:  'Zoom In',  role:  'zoomIn'  },

{ label:  'Zoom Out',  role:  'zoomOut'  },

{ type:  'separator'  },

{ label:  'Toggle Fullscreen',  role:  'togglefullscreen'  }

]

},

{

label:  'Help',

submenu: [

{

label:  'Learn More',

click:  async () => {

const  {  shell  }  =  require('electron');

await  shell.openExternal('https://electronjs.org');

}

}

]

}

];

  

//  Create  the  menu  from  the  template

const  menu  =  Menu.buildFromTemplate(menuTemplate);

  

//  Set  the  application  menu

Menu.setApplicationMenu(menu);

}

  

app.on('ready',  createWindow);

  

app.on('window-all-closed', () => {

if (process.platform  !==  'darwin') {

app.quit();

}

});

  

app.on('activate', () => {

if (BrowserWindow.getAllWindows().length === 0) {

createWindow();

}

});
```
In  this  example,  we  define  a  custom  menu  template  with  File,  Edit,  View,  and  Help  menus,  each  containing  various  submenu  items.

  

By  following  these  steps,  you  can  create  an  executable  file  for  your  Electron  app  that  runs  your  Next.js  application  and  customize  the  top  bar  menu  options.

  

Additional  Resources

Electron  Documentation

Next.js  Documentation

Electron  Builder  Documentation

Feel  free  to  customize  the  project  further  based  on  your  needs.  If  you  encounter  any  issues  or  have  questions,  refer  to  the  documentation  or  seek  help  from  the  community.