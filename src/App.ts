import * as PIXI from 'pixi.js'

import Settings from './settings.json'

import Lines from "./components/Lines";
import Background from "./components/Background";
import Button from "./components/Button";
import Fps from "./components/Fps";

export default class App {

    private lines: Lines;
    private background: Background;
    private button: Button;
    private running: boolean;
    private symbols: any[];
    private fps: Fps;
    private tweening: any[];
    public app;

    constructor() {

        this.app = new PIXI.Application({
            width: Settings.appWidth,
            height: Settings.appHeight
        });

        document.body.appendChild(this.app.view);

        this.init();
    }

    init() {

        // Build the lines
        this.symbols = [];
        this.lines = new Lines(this.symbols);

        this.app.stage.addChild(this.lines.lines);

        this.background = new Background();
        this.app.stage.addChild(this.background.background);

        this.button = new Button({
            onTap: () => this.startPlay()
        });
        this.app.stage.addChild(this.button.button);

        this.fps = new Fps();
        this.app.stage.addChild(this.fps.fpsContainer);

        this.running = false;

        // Very simple tweening utility function. This should be replaced with a proper tweening library in a real product.
        this.tweening = [];

        this.startPlay(true);

        // Listen for animate update.
        this.app.ticker.add((delta) => {

            const symbolSize = Settings.symbolWidth - Settings.symbolOffset;

            // Update the slots.
            for (let i = 0; i < this.symbols.length; i++) {
                const r = this.symbols[i];
                // Update blur filter y amount based on speed.
                // This would be better if calculated with time in mind also. Now blur depends on frame rate.
                r.blur.blurY = (r.position - r.previousPosition) * 50;
                r.previousPosition = r.position;

                // Update symbol positions on reel.
                for (let j = 0; j < r.symbols.length; j++) {
                    const s = r.symbols[j];
                    s.y = ((r.position + j) % r.symbols.length) * symbolSize - symbolSize;
                }
            }

            const now = Date.now();
            const remove = [];
            for (let i = 0; i < this.tweening.length; i++) {
                const t = this.tweening[i];
                const phase = Math.min(1, (now - t.start) / t.time);

                t.object[t.property] = this.lerp(t.propertyBeginValue, t.target, t.easing(phase));
                if (t.change) t.change(t);
                if (phase === 1) {
                    t.object[t.property] = t.target;
                    if (t.complete) t.complete(t);
                    remove.push(t);
                }
            }
            for (let i = 0; i < remove.length; i++) {
                this.tweening.splice(this.tweening.indexOf(remove[i]), 1);
            }

            if ( this.tweening.length == 0 ) this.running = false;

            this.fps.fpsCounter.text = 'FPS: ' + Math.round(PIXI.Ticker.shared.FPS);

        });
    }

    startPlay(onInit = false) {
        if (this.running) return;
        this.running = true;

        for (let i = 0; i < this.symbols.length; i++) {
            const r = this.symbols[i];
            let extra = 0, target = 0, time = 0;
            if (onInit) {
                extra = 0;
                target = r.position + 1;
                time = 1000 + i * 200;
            } else {
                extra = Math.floor(Math.random() * 3);
                target = r.position + 10 + i * 5 + extra;
                time = 4000 + i * 200;
            }

            this.tweenTo(r, 'position', target, time, this.backout(0.5), null, i === this.symbols.length - 1 ? this.reelsComplete : null);
        }
    }

    //Reels done handler.
    reelsComplete() {
        this.running = false;
    }

    tweenTo(object, property, target, time, easing, onchange, oncomplete) {
        const tween = {
            object,
            property,
            propertyBeginValue: object[property],
            target,
            easing,
            time,
            change: onchange,
            complete: oncomplete,
            start: Date.now(),
        };

        this.tweening.push(tween);
        return tween;
    }

    // Basic lerp funtion.
    lerp(a1, a2, t) {
         return a1 * (1 - t) + a2 * t;
    }

    // Backout function from tweenjs.
    // https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
    backout(amount) {
         return (t) => (--t * t * ((amount + 1) * t + amount) + 1);
    }
}