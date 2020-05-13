import * as PIXI from 'pixi.js'

import Settings from '../settings.json'

export default class Fps {

    public fpsContainer;
    private readonly fpsBlock;
    public fpsCounter;

    constructor() {

        this.fpsContainer = new PIXI.Container();
        this.fpsBlock = new PIXI.Graphics();
        this.fpsCounter = new PIXI.Text('FPS: **');

        this.fpsContainer.x = Settings.appWidth / 4 - 75;
        this.fpsContainer.y = Settings.appHeight - 70;

        this.fpsBlock.beginFill(0xFFFFFF, 1);
        this.fpsBlock.drawRoundedRect(0, 0, 150, 50, 10);

        this.fpsCounter.x = this.fpsBlock.width/2 - this.fpsCounter.width/2;
        this.fpsCounter.y = this.fpsBlock.height/2 - this.fpsCounter.height/2;

        this.fpsContainer.addChild(this.fpsBlock);
        this.fpsContainer.addChild(this.fpsCounter);
    }
}