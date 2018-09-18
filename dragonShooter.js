import { game, Sprite } from "./sgc/sgc.js";
game.setBackground("dragonBackground.png");

class PlayerWizard extends Sprite {
    constructor() {
        super();
        this.name = "The Blue Eyed Dragon";
        this.setImage("dragonSprite.png");
        this.width = 48;
        this.height = 48;
        this.x = this.width;
        this.y = this.y;
        this.defineAnimation("down");
        this.speedWhenWalking = 100;
        this.defineAnimation("up");
        this.defineAnimation("right");

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
        spell.name = "A spell cast by Dragon";
        spell.setImage("dragonSpellSheet.png");
        spell.angle = 0;
        this.playAnimation("right");
        spell.x = this.x + this.width;
    }
}
let dragon = new PlayerWizard();

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
    handleCollision(otherSprite) {
        // Compare images so Stranger's spells don't destroy each other.
        if (this.getImage() !== otherSprite.getImage()) {
            // Adjust mostly blank spell image to vertical center.
            let verticalOffset = Math.abs(this.y - otherSprite.y);
            if (verticalOffset < this.height / 2) {
                game.removeSprite(this);
                new Fireball(otherSprite);
            }
        }
        return false;
    }
}

class NonPlayerWizard extends Sprite {
    constructor() {
        super();
        this.name = "The mysterious stranger";
        this.setImage("strangerSheet.png");
        this.width = 48;
        this.height = 48;
        this.x = game.displayWidth - 2 * this.width;
        this.y = this.height;
        this.angle = 270;
        this.defineAnimation("up", 0, 2);
        this.speed = 150;
        this.defineAnimation("down", 6, 8);
        this.defineAnimation("left", 9, 11);
        this.playAnimation("down");
    }
    handleGameLoop() {
        if (this.y <= 0) {
            // Upward motion has reached top, so turn down
            this.y = 0;
            this.angle = 270;
            this.playAnimation("down");

        }
        if (this.y >= game.displayHeight - this.height) {
            // Downward motion has reached bottom, so turn up
            this.y = game.displayHeight - this.height;
            this.angle = 90;
            this.playAnimation("up");
        }
        let spell = new Spell();
        spell.name = "A spell cast by Stranger";
         spell.x = this.x - this.width;
        spell.y = this.y;

        spell.setImage("strangerSpellSheet.png");
        spell.angle = 180;
        this.playAnimation("left");

    }
    handleAnimationEnd() {
        if (this.angle === 90) {
            this.playAnimation("up");
        }
        if (this.angle === 270) {
            this.playAnimation("down");
        }
    }
}
let stranger = new NonPlayerWizard();

class Fireball extends Sprite {
    constructor(deadSprite) {
        super();
        this.x = deadSprite.x;
        this.y = deadSprite.y;
        this.setImage("fireballSheet.png");
        this.name = ("A ball of fire");
        this.deadSprite = game.removeSprite(deadSprite);
        this.defineAnimation("explode", 0, 16);
        this.playAnimation("explode");
    }
    handleAnimationEnd() {
        game.removeSprite(this);
        if (!game.isActiveSprite(stranger)) {
            game.end("Congratulations!\n\nMarcus has defeated the mysterious" +
                "\nstranger in the dark cloak!");
        }
        game.removeSprite(this);
        if (!game.isActiveSprite(dragon)) {
            game.end("Marcus is defeated by the mysterious\nstranger in the dark cloak!\n\nBetter luck next time.");
        }
    }
}
