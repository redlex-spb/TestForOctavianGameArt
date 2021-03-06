import * as PIXI from 'pixi.js'

export default class Symbol {

    private symbolStyle;
    private symbolText: string;
    public symbol;

    constructor(text) {

        this.symbolText = text;

        this.symbolStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 50,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440
        });

        this.symbol = new PIXI.Text(this.symbolText, this.symbolStyle);

    }
}