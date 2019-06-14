import * as PIXI from "pixi.js";
import InteractionEvent = PIXI.interaction.InteractionEvent;
import {ShapeController} from "./shape.controller";
import {Shape} from "../shape.model";


export class AppController {
    public app: PIXI.Application;
    private shapeController: ShapeController;
    public stage: any;
    private score: number;

    constructor(App: PIXI.Application) {
        this.app = App;
        this.stage = this.app.stage;
    }

    public init():void {
        // Create black background for game
        this.createBackground();

        // Init Shapes Controller
        this.shapeController = new ShapeController(this.app);

        // Init Bottom Controls
        this.shapesPerSencondsControl();
        this.gravityValueControl();


        // Init Top Statistic
        this.currentShapesStatistic();
        this.currentShapesArea();
        this.scoreChecker();
    }


    // INIT Background
    private createBackground(): void {
        // Create Black Background
        let texture = PIXI.Texture.WHITE;
        let sprite = new PIXI.Sprite(texture);
        sprite.width = window.innerWidth;
        sprite.height = window.innerHeight;
        sprite.tint = 0x000000;
        sprite.interactive = true;

        this.setBgInteractive(sprite);

        this.stage.addChild(sprite);
    }
    private setBgInteractive(sprite): void {
        sprite.on('pointerdown', (e: InteractionEvent)=> {
            let customPosition = {
                hasCustomPosition: true,
                customPosition: {
                    x: e.data.global.x,
                    y: e.data.global.y,
                }
            };
            this.shapeController.createShape(customPosition);
            customPosition = null;
            this.shapeController.score -= 10;
        });
    }
    // END OF INIT Background


    // METHODS For SHAPES PER SECOND
    private shapesPerSencondsControl(): void {
        // Wrapper 4 statistic
        let statisticWrapper: HTMLSpanElement = document.querySelector('.shapes_per_sec span');
        // Init Default value of "Shapes Per Second"
        this.insertDataInElement(statisticWrapper, this.shapeController.shapesPerSec);
        // Init events 4 buttons
        this.initEvents4ShapesPerSecond(statisticWrapper);
    }
    private initEvents4ShapesPerSecond(DomElement: HTMLElement): void {
        let btnUp: HTMLDivElement = document.querySelector('.shapes_per_sec .up');
        let btnDown: HTMLDivElement = document.querySelector('.shapes_per_sec .down');
        btnUp.addEventListener('click', ()=>{
            this.shapeController.shapesPerSecPlusOne();
            this.insertDataInElement(DomElement, this.shapeController.shapesPerSec);
        });
        btnDown.addEventListener('click', ()=>{
            this.shapeController.shapesPerSecMinusOne();
            this.insertDataInElement(DomElement, this.shapeController.shapesPerSec);
        });
    }
    //END OF METHODS For SHAPES PER SECOND


    // METHODS For Gravity Value
    private gravityValueControl(): void {
        // Wrapper 4 statistic
        let statisticWrapper: HTMLSpanElement = document.querySelector('.gravity_value span');
        // Init Default value of "Gravity Value"
        this.insertDataInElement(statisticWrapper,this.shapeController.movingSpeed);
        // Init events 4 buttons
        this.initEvents4GravityControls(statisticWrapper);
    }
    private initEvents4GravityControls(DomElement: HTMLElement): void {
        let btnUp: HTMLDivElement = document.querySelector('.gravity_value .up');
        let btnDown: HTMLDivElement = document.querySelector('.gravity_value .down');
        btnUp.addEventListener('click', ()=>{
            this.shapeController.gravityValuePlusOne();
            this.insertDataInElement(DomElement,this.shapeController.movingSpeed);
        });
        btnDown.addEventListener('click', ()=>{
            this.shapeController.gravityValueMinusOne();
            this.insertDataInElement(DomElement,this.shapeController.movingSpeed);
        });
    }
    //END OF METHODS For Gravity Value


    // insert something into HtmlDomElement
    private insertDataInElement(elem: HTMLElement , data: any): void {
        elem.innerHTML = data.toString();
    }



    // Current Shapes
    public currentShapesStatistic(): void {
        let statisticWrapper: HTMLSpanElement = document.querySelector('.currentShapes span');
        let oldValueCurrentShapes = this.shapeController.currentShapes;
        this.insertDataInElement(statisticWrapper, this.shapeController.currentShapes);
        this.app.ticker.add(() => {
            if (this.shapeController.currentShapes != oldValueCurrentShapes) {
                this.insertDataInElement(statisticWrapper, this.shapeController.currentShapes);
                oldValueCurrentShapes = this.shapeController.currentShapes;
            }
        });
    }

    private currentShapesArea() {
        let statisticWrapper: HTMLSpanElement = document.querySelector('.shapesArea span');
        let oldValue = 0;

        this.insertDataInElement(statisticWrapper, this.shapeController.shapesArea);

        this.app.ticker.add(() => {
            if (this.shapeController.shapesArea != oldValue) {
                this.insertDataInElement(statisticWrapper, this.shapeController.shapesArea);
                oldValue = this.shapeController.shapesArea;
            }
        });
    }
    private calcShapesArea(arr: Array<Shape>) {
        let totalArea = 0;
        arr.map((shape)=>{
            totalArea += shape.shapeArea;
        });
        return totalArea;
    }


    private scoreChecker() {
        let statisticWrapper: HTMLSpanElement = document.querySelector('.score span');
        let oldValue = 0;

        this.insertDataInElement(statisticWrapper, this.shapeController.score);

        this.app.ticker.add(() => {
            if (this.shapeController.score != oldValue) {
                this.insertDataInElement(statisticWrapper, this.shapeController.score);
                oldValue = this.shapeController.score;
            }
        });
    }
}