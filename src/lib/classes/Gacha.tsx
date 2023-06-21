import p5 from 'p5';

export default class Gacha {

    p5: p5;

    array: any[];
    arrayNames: any[];
    squareSize: number;
    randomNumber: number;
    selectedValue: number;
    maxScrollAmount: number;
    scrollAmount: number;
    scrollCount: number;
    scrollVelocity: number;
    selectedIndex: any;
    indicatorValue: any;
    commonCuantities: any[];
    rarityChances: any[];


    common: any[];
    rare: any[];
    epic: any[];
    legendary: any[];

    width: number;
    startX: number;

    constructor(p5: any, array: any[], arrayNames: any[], commonCuantities: any[], rarityChances: any[], rarities: any[], width: number) {
        this.p5 = p5;
        this.array = array;
        this.arrayNames = arrayNames;

        this.commonCuantities = commonCuantities;
        this.rarityChances = rarityChances;
        this.common = rarities[0];
        this.rare = rarities[1];
        this.epic = rarities[2];
        this.legendary = rarities[3];

        this.randomNumber = 0;
        this.selectedValue = 0;
        this.maxScrollAmount = 0;
        this.scrollAmount = 0;
        this.scrollCount = 0;
        this.scrollVelocity = 0;
        this.width = width;
        this.squareSize = Math.floor(this.width / 100) * 10;
        this.startX = this.width / 2 - this.squareSize * 4.5;
        this.updateIndicatorValue();

    }

    generateRandomChoice() {
        this.randomNumber = Math.random(); // Generate a random number between 0 and 1 (exclusive)

        // Calculate the range percentages
        const commonRarityPercentage = this.rarityChances[0];
        const rareRarityPercentage = this.rarityChances[1];
        const epicRarityPercentage = this.rarityChances[2];

        // Calculate the cumulative amounts
        const commonAmount = this.commonCuantities[0];
        const rareAmount = commonAmount + this.commonCuantities[1];
        const epicAmount = rareAmount + this.commonCuantities[2];

        // Determine the selected value based on the random number
        if (this.randomNumber < commonRarityPercentage) {
            this.selectedValue = this.array[Math.floor(Math.random() * commonAmount)];
        } else if (this.randomNumber < commonRarityPercentage + rareRarityPercentage) {
            this.selectedValue = this.array[Math.floor(commonAmount + Math.random() * (rareAmount - commonAmount))];
        } else if (this.randomNumber < commonRarityPercentage + rareRarityPercentage + epicRarityPercentage) {
            this.selectedValue = this.array[Math.floor(rareAmount + Math.random() * (epicAmount - rareAmount))];
        } else {
            this.selectedValue = this.array[Math.floor(epicAmount + Math.random() * (this.array.length - epicAmount))];
        }

        let scrollDistance = (this.array.indexOf(this.selectedValue) - 5) * this.squareSize;
        if (scrollDistance < 0) {
            scrollDistance += this.array.length * this.squareSize;
        }

        // Calculate the random scroll amount
        const randomScrollMultiplier = Math.floor(Math.random() * 2) + 3; // Random value between 3 and 5
        this.maxScrollAmount = this.scrollAmount = Math.floor(scrollDistance + randomScrollMultiplier * this.array.length * this.squareSize + Math.random() * this.squareSize * 0.8);

    }

    rarityColor(rarity: string) {
        switch (rarity) {
            case ("common"):
                return "green";
            case ("rare"):
                return "blue";
            case ("epic"):
                return "purple";
            case ("legendary"):
                return "gold";
            default:
                return "red";
        }
    };

    drawArray(y: number) {
        for (let i = 0; i < this.array.length; i++) {
            const x = this.startX + i * (this.squareSize) + this.scrollCount;
            const value = this.array[i];

            this.p5.image(value, x, y, this.squareSize, this.squareSize);

            this.p5.push();
            this.p5.noFill();
            if (i == this.selectedIndex) {

                console.log(this.arrayNames[i])

                let rarity: string;

                if (this.common.includes(this.arrayNames[i])) {
                    rarity = "common";
                } else if (this.rare.includes(this.arrayNames[i])) {
                    rarity = "rare";
                } else if (this.epic.includes(this.arrayNames[i])) {
                    rarity = "epic";
                } else if (this.legendary.includes(this.arrayNames[i])) {
                    rarity = "legendary";
                } else {
                    rarity = "none"; // The skin name doesn't exist in any of the arrays
                }
                this.p5.strokeWeight(this.squareSize * 0.1);
                this.p5.stroke(this.rarityColor(rarity));
            }
            this.p5.rect(x, y, this.squareSize, this.squareSize);
            this.p5.pop();
        }

        this.p5.fill("red");
        this.p5.rect(this.width / 2, y, 5, this.squareSize * 1.2);

    }

    updateScrollVelocity() {

        // Check if the scroll amount reaches specific ranges
        const scrollRanges = [1, 0.5, 0.05, 0.02]; // Ranges in percentage

        for (const range of scrollRanges) {
            const rangeThreshold = this.maxScrollAmount * range;

            if (this.scrollAmount <= rangeThreshold) {
                // Scroll amount is within the range
                // Perform actions based on the specific range
                if (range === 1) {
                    // 100% of max scroll amount
                    this.scrollVelocity = 10;
                } else if (range === 0.5) {
                    // Reached 50% of max scroll amount
                    this.scrollVelocity = 5;
                } else if (range === 0.05) {
                    // Reached 5% of max scroll amount
                    this.scrollVelocity = 2.5;
                }
                else if (range === 0.02) {
                    // Reached 2% of max scroll amount
                    this.scrollVelocity = 1;
                }
            }
        }
    }

    updateIndicatorValue() {
        this.selectedIndex = 5;
        this.indicatorValue = this.array[this.selectedIndex];
    }

    scroll() {
        if (this.scrollAmount > 0) {
            this.scrollCount -= this.scrollVelocity;
            this.scrollAmount -= this.scrollVelocity;
        }

        if (Math.abs(this.scrollCount) >= this.squareSize) {
            this.array.push(this.array.shift());
            this.arrayNames.push(this.arrayNames.shift());
            this.scrollCount = 0;
            this.updateIndicatorValue();
        }

        this.updateScrollVelocity();
    }
}
