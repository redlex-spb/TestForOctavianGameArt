import * as PIXI from 'pixi.js'

import Symbol from "./Symbol";
import Settings from '../settings.json'

export default class Lines {

    public lines;

    constructor(symbols){
        this.lines = new PIXI.Container();

        this.lines.x = Settings.linesOffsetLeft;
        this.lines.y = Settings.linesOffsetTop;
        
        const symbolSize = Settings.symbolWidth - Settings.symbolOffset;
        
        for (let i = 0; i < Settings.linesCountHorizontal; i++) {

            const symbolContainer = new PIXI.Container();

            symbolContainer.x = i * Settings.symbolWidth;

            const symbolObject = {
                 container: symbolContainer,
                 symbols: [],
                 position: 0,
                 previousPosition: 0,
                 blur: new PIXI.filters.BlurFilter(),
            };
            symbolObject.blur.blurX = 0;
            symbolObject.blur.blurY = 0;
            symbolContainer.filters = [symbolObject.blur];

            // Build the symbols
            for (let j = 0; j < Settings.linesCountHorizontal; j++) {
                let symbol = new Symbol('X'+(j)+(i+1));
                symbol.symbol.y = j * symbolSize;
                symbol.symbol.x = 5;
                symbol.symbol.scale.x = symbol.symbol.scale.y = Math.min(symbolSize / symbol.symbol.width, symbolSize / symbol.symbol.height);
                symbolObject.symbols.push(symbol.symbol);
                symbolContainer.addChild(symbol.symbol);
            }

            symbols.push(symbolObject);

            this.lines.addChild(symbolContainer);

        }
    }
}
