import * as PIXI from "pixi.js";

export class Shape {
    private readonly graphics: PIXI.Graphics;
    private readonly color: number;
    private figure: any;
    private width: number;
    private height: number;
    public shapeArea: number;
    public shapeModel: PIXI.Graphics;

    private coordinates: {hasCustomPosition : boolean , customPosition: { x: number, y:number }};

    public isActive: boolean;

    private shapeType: {[key: number]: string} = {
        0: 'rect',
        1: 'circle',
        2: 'ellipse',
        3: 'rhombus',
        4: 'rand',
        5: 'triangle',
        6: 'hexagon'
    };

    private static randomInteger(min: number = 0, max: number = 6): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    constructor(color: number, coordinates: {hasCustomPosition : boolean , customPosition: { x: number, y:number }}) {
        this.color = color;
        this.coordinates = coordinates;
        this.graphics = new PIXI.Graphics();
        this.shapeArea = 1;
        this.isActive = true;
        this.shapeModel = this.getRandShape();
    }

    // Shape models
    public rect(): PIXI.Graphics {
        this.graphics.beginFill(this.color);
        this.graphics.moveTo(0, 0);
        this.graphics.lineTo(80, 0);
        this.graphics.lineTo(80, 80);
        this.graphics.lineTo(0, 80);
        this.graphics.lineTo(0, 0);
        this.graphics.endFill();
        this.figure = this.graphics;

        //setup custom position
        if (this.coordinates.hasCustomPosition) {
            this.figure.position.y = this.coordinates.customPosition.y - 40;
            this.figure.position.x = this.coordinates.customPosition.x - 40;
        }

        // options
        this.shapeArea = 6400;
        this.width = 80;
        this.height = 80;

        return this.figure;
    }

    public circle(): PIXI.Graphics {
        this.graphics.beginFill(this.color);
        let radius = 45;
        this.figure = this.graphics.drawCircle(0, 0, radius);
        this.graphics.endFill();

        this.figure.position.set(this.coordinates.customPosition.x, this.coordinates.customPosition.y);

        // options
        this.shapeArea = Math.floor(Math.PI * radius * radius);
        this.width = 45;
        this.height = 90;

        return this.figure;
    }

    public ellipse(): PIXI.Graphics {
        this.graphics.beginFill(this.color, 1);
        this.figure = this.graphics.drawEllipse(0, 0, 60, 35);
        this.graphics.endFill();
        this.figure.position.set(this.coordinates.customPosition.x, this.coordinates.customPosition.y);

        // options
        this.shapeArea = 6552;
        this.width = 60;
        this.height = 35;

        return this.figure;
    }

    public rhombus(): PIXI.Graphics {
        this.graphics.beginFill(this.color);
        this.graphics.moveTo(0, 0);
        this.graphics.lineTo(25, 0);
        this.graphics.lineTo(50, -50);
        this.graphics.lineTo(0, -80);
        this.graphics.lineTo(-50, -50);
        this.graphics.lineTo(-25, 0);
        this.graphics.endFill();
        this.figure = this.graphics;

        // options
        this.shapeArea = 5250;
        this.width = 100;
        this.height = 130;


        if (this.coordinates.hasCustomPosition) {
            this.figure.position.y = this.coordinates.customPosition.y + 40;
            this.figure.position.x = this.coordinates.customPosition.x;
        }

        return this.figure;
    }

    public rand(): PIXI.Graphics {
        this.graphics.beginFill(this.color, 1);
        this.graphics.moveTo(0, 0);
        this.graphics.quadraticCurveTo(40, 20, 60, 0);
        this.graphics.lineTo(60, 0);
        this.graphics.quadraticCurveTo(96, 20, 120, 0);
        this.graphics.lineTo(120, 0);
        this.graphics.quadraticCurveTo(156, 20, 180, 0);
        this.graphics.lineTo(180, 0);
        this.graphics.quadraticCurveTo(220, -20, 180, -40);
        this.graphics.lineTo(180, -40);
        this.graphics.quadraticCurveTo(160, -60, 120, -40);
        this.graphics.lineTo(120, -40);
        this.graphics.quadraticCurveTo(90, -80, 60, -40);
        this.graphics.lineTo(60, -40);
        this.graphics.quadraticCurveTo(20, -60, 0, -40);
        this.graphics.lineTo(0, -40);
        this.graphics.quadraticCurveTo(-35, -20, 0, 0);
        this.graphics.endFill();
        this.figure = this.graphics;

        // options
        this.shapeArea = 7200;
        this.width = 180;
        this.height = 40;

        if (this.coordinates.hasCustomPosition) {
            this.figure.position.y = this.coordinates.customPosition.y + 20;
            this.figure.position.x = this.coordinates.customPosition.x - 90;
        }
        return this.figure;
    }

    public triangle(): PIXI.Graphics {
        this.graphics.beginFill(this.color, 1);
        this.graphics.moveTo(0, 0);
        this.graphics.lineTo(-50, -100);
        this.graphics.lineTo(-100, 0);
        this.graphics.endFill();
        this.figure = this.graphics;

        // options
        this.shapeArea = (100*100)/2;
        this.width = 100;
        this.height = 100;

        if (this.coordinates.hasCustomPosition) {
            this.figure.position.y = this.coordinates.customPosition.y + 50;
            this.figure.position.x = this.coordinates.customPosition.x + 50;
        }

        return this.figure;
    }

    public hexagon(): PIXI.Graphics {
        this.graphics.beginFill(this.color, 1);
        this.graphics.moveTo(0, 0);
        this.graphics.lineTo(40, 50);
        this.graphics.lineTo(100, 50);
        this.graphics.lineTo(140, 0);
        this.graphics.lineTo(100, -50);
        this.graphics.lineTo(40, -50);
        this.graphics.lineTo(0, 0);
        this.graphics.endFill();
        this.figure = this.graphics;

        // options
        this.shapeArea = 6000;
        this.width = 140;
        this.height = 100;

        if (this.coordinates.hasCustomPosition) {
            this.figure.position.y = this.coordinates.customPosition.y;
            this.figure.position.x = this.coordinates.customPosition.x - 70;
        }
        return this.figure;
    }

    public getRandShape(): PIXI.Graphics {
        this.figure = this[this.shapeType[Shape.randomInteger()]]();

        this.setDefaultPosition();

        return this.figure;
    }

    // віддаю перевагу ранньому ретурну, так менша вкладеність
    private setDefaultPosition(): void {
        if(this.coordinates.hasCustomPosition) return;

        if(this.coordinates.customPosition.x < this.width){
            this.figure.position.x = this.width;
        }else if(this.coordinates.customPosition.x > window.innerWidth - this.width  ){
            this.figure.position.x = this.coordinates.customPosition.x - this.width ;
        }else {
            this.figure.position.x = this.coordinates.customPosition.x
        }
        this.figure.position.y = this.coordinates.customPosition.y;
    }

    public getShapePositionY(): number {
        return this.figure.position.y;
    }

}