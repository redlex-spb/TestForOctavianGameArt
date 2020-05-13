import * as PIXI from 'pixi.js'

import Settings from '../settings.json'

export default class Button {

    private config: object;
    private isOver: boolean;
    private isActive: boolean;
    private readonly buttonImages: string[];
    private buttonTextureArray: any[];
    public button;

    constructor(config) {

        this.config = config;

        this.buttonImages = ["assets/" + Settings.buttonOffImage, "assets/" + Settings.buttonOnImage];

        this.buttonTextureArray = [];

        for (let i=0; i < this.buttonImages.length; i++)
        {
            let texture = PIXI.Texture.from(this.buttonImages[i]);
            this.buttonTextureArray.push(texture);
        }

        this.button = new PIXI.AnimatedSprite(this.buttonTextureArray);

        this.button.width = this.button.height = 100;
        this.button.x = Settings.appWidth/2 - this.button.width/2;
        this.button.y = Settings.appHeight - (this.button.height + 10);
        this.button.play();
        this.button.animationSpeed = 0.05;

        // Set the interactivity.
        this.button.interactive = true;
        this.button.buttonMode = true;


        // The button's state.
        /** Whether the cursor is over the button */
        this.isOver = false
        /** Whether we pressed on the button but didn't released yet */
        this.isActive = false

        /** Bind functions on this context as long as we will use them as event handlers */
        this.onTap = this.onTap.bind(this);
        this.onOver = this.onOver.bind(this);
        this.onOut = this.onOut.bind(this);
        this.onDown = this.onDown.bind(this);
        this.onUp = this.onUp.bind(this);

        this.button.on('pointertap', this.onTap); // The moment when we release (click/tap) the button
        this.button.on('pointerover', this.onOver); // The moment when we put the cursor over the button
        this.button.on('pointerout', this.onOut); // The moment when we put the cursor out of the button
        this.button.on('pointerdown', this.onDown); // The moment when we pressed on the button but didn't release yet
        this.button.on('pointerup', this.onUp); // The moment when we release the button
        this.button.on('pointerupoutside', this.onUp); // The moment when we release the button being outside of it (e.g. we press on the button, move the cursor out of it, and release)

    }

    onTap() {
        // @ts-ignore
        if (this.config.onTap) this.config.onTap()
    }

    onOver() {
        this.isOver = true;
        this.button.stop();
        this.button.texture = this.buttonTextureArray[1];
    }

    onOut() {
        this.isOver = false;
        this.button.play();
    }

    onDown() {
        this.isActive = true
    }

    onUp() {
        this.isActive = false
    }
}