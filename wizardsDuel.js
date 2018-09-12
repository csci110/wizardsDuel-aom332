import { game, Sprite } from "./sgc/sgc.js";
game.setBackground("floor.png");

class PlayerWizard extends Sprite {
    constructor() {
        super();
        this.name = "MarcusTheWizard";
        this.setImage("marcusSheet.png");
        this.width = 48;
        this.height = 48;
        this.x = this.width;
        this.y = this.y;
        this.defineAnimation("down", 6, 8);
        this.speedWhenWalking = 100;
        this.defineAnimation("up", 0, 2);
        this.defineAnimation("right", 3, 5);

    }
    handleGameLoop() {
        this.y = Math.max(5, this.y);
        this.y = Math.min(552, this.y);
        // keep Marcus in the display area
        this.speed = 0;
    }
    handleDownArrowKey() {
        this.playAnimation("down");
        this.speed = this.speedWhenWalking;
        this.angle = 270;
    }
    handleUpArrowKey() {
        this.playAnimation("up");
        this.speed = this.speedWhenWalking;
        this.angle = 90;
    }
    handleSpacebar() {
        let spell = new Spell();
        spell.x = this.x;
        // sets the position of the spell object equal to
        spell.y = this.y;
        // the position of any object created from the PlayerWizard class
        spell.name = "A spell cast by Marcus";
        spell.setImage("marcusSpellSheet.png");
        spell.angle = 0;
        this.playAnimation("right");
        spell.x = this.x + this.width;
    }
}

let marcus = new PlayerWizard();

class Spell extends Sprite {
    constructor() {
        super();
        this.speed = 200;
        this.width = 48;
        this.height = 48;
        this.defineAnimation("magic", 0, 7);
        this.playAnimation("magic", true);

    }
    handleBoundryContact() {
        // Delete spell when it leaves display area
        game.removeSprite(this);
    }
}