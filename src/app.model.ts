import {AppController} from "./controllers/app.controller";

import * as PIXI from 'pixi.js'

const app = new PIXI.Application();

document.body.appendChild(app.view);

app.renderer.backgroundColor = 0x061639;
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

let controller = new AppController(app);
controller.init();


document.addEventListener("DOMContentLoaded", ()=> {
    app.renderer.view.style.width = window.innerWidth.toString();
    app.renderer.view.style.height = window.innerHeight.toString();
});
