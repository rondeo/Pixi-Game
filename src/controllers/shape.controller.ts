import {Shape} from './../shape.model'
import * as PIXI from "pixi.js";

export class ShapeController {
    public shapesArea: number = 0;
    public shapesPerSec: number;
    public movingSpeed: number;
    public currentShapes: number;
    public score: number;

    private SHAPE: Shape;
    private app: PIXI.Application;
    private tickerCounter: number;
    private defaultPosition: { hasCustomPosition: boolean; customPosition: { x: number; y: number } };

    constructor(app) {
        this.app = app;
        this.shapesPerSec = 1;
        this.movingSpeed = 4;
        this.tickerCounter = 0;
        this.createShapeGenerator();
        this.currentShapes = 0;
        this.score = 0;
    }


    private createShapeGenerator(): void {
        this.defaultPosition = {
            hasCustomPosition: false,
            customPosition: {
                x: 0,
                y: -50,
            }
        };

        this.app.ticker.add(() => {
            this.tickerCounter++;
            if (this.tickerCounter == Math.round(this.app.ticker.FPS / this.shapesPerSec)) {
                this.defaultPosition.customPosition.x = Math.random() * window.innerWidth;
                this.createShape(this.defaultPosition);
            } else if (this.tickerCounter > Math.round(this.app.ticker.FPS / this.shapesPerSec)) {
                this.tickerCounter = 0
            }
        });
    }


    public createShape(position): void {

        // if we get click coord. init shape at custom position, if not - init at default position
        this.SHAPE = new Shape(this.getRandomHEX(), position);

        // Set Interactivity to Model
        this.setShapeInteractive(this.SHAPE);

        // Push into Stage
        this.app.stage.addChild(this.SHAPE.shapeModel);

        // Init moving
        this.startMoving(this.SHAPE);

        this.shapesArea += this.SHAPE.shapeArea;
        this.currentShapes++;
    }


    private startMoving(shape: Shape): void {
        this.app.ticker.add(() => {
            if (shape.isActive) {
                if (shape.getShapePositionY() >= window.innerHeight) {
                    this.destroyShape(shape);
                } else {
                    shape.shapeModel.position.y += this.movingSpeed;
                }
            }
        });
        this.app.ticker.speed = this.shapesPerSec;
    }

    private setShapeInteractive(shape: Shape): void {
        shape.shapeModel.interactive = true;
        shape.shapeModel.on("mousedown", () => {
            this.destroyShape(shape);
            this.score += 2;
        })
    }

    public destroyShape(shape: Shape): void {

        this.animateAndDestroy(shape);

        this.currentShapes--;
        this.shapesArea -= shape.shapeArea;

        // Set status for Shape
        shape.isActive = false;
    }
    private animateAndDestroy(shape: Shape): void {
        let isDestroyed = false;
        this.app.ticker.add(() => {
            if (!isDestroyed) {
                if ( shape.shapeModel.alpha  >= 0) {
                    shape.shapeModel.alpha -= 0.1;
                } else {
                    //Destroy graphicss
                    shape.shapeModel.clear();
                    isDestroyed = true
                }
            }
        })
    };

    public getRandomHEX(): number {
        let letters: string;
        let color = '0x';
        letters = "0123456789ABCDEF";

        for (let i = 0; i < 6; i++)
            color += letters[(Math.floor(Math.random() * 16))];
        let hex: number = parseInt(color, 16);

        return hex;
    }

    // SHAPES PER SECOND Methods
    public shapesPerSecPlusOne(): void {
        this.shapesPerSec += 1;
        this.app.ticker.speed = this.shapesPerSec;
    }
    public shapesPerSecMinusOne(): void {
        if (this.shapesPerSec > 1) {
            this.shapesPerSec -= 1;
        } else if (this.shapesPerSec == 1) {
            this.shapesPerSec -= 1;
        }
        this.app.ticker.speed = this.shapesPerSec;
    }
    //END OF SHAPES PER SECOND Methods

    // GRAVITY Methods
    public gravityValueMinusOne(): void{
        if (this.movingSpeed != 0) {
            this.movingSpeed -= 1;
        }
    }
    public gravityValuePlusOne(): void {
        this.movingSpeed += 1;
    }
    // END OF GRAVITY Methods
}