import * as PIXI from 'pixi.js'

import Settings from '../settings.json'

export default class Background {

    private readonly offsetLeft: number;
    private readonly holeX: number;
    private readonly holeY: number;
    public background;

    constructor() {
        this.background = new PIXI.Graphics();

        this.background.beginFill(Settings.backgroundColor);
        this.background.drawRect(0, 0, Settings.appWidth, Settings.appHeight);

        const symbolSize = Settings.symbolWidth - Settings.symbolOffset;

        for (let i = 0; i < Settings.linesCountHorizontal; i++) {

            this.offsetLeft = i == 0 ? Settings.linesOffsetLeft : Settings.linesOffsetLeft + (Settings.symbolWidth - symbolSize) * i;
            this.holeX = i * symbolSize + this.offsetLeft;
            this.holeY = Settings.linesOffsetTop;

            this.background.beginHole();
            this.background.drawRoundedRect(this.holeX, this.holeY, symbolSize, symbolSize * Settings.linesCountVertical, 20);
            this.background.endHole();
        }
    }
}