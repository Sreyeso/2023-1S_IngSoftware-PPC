import p5 from 'p5';

export default class Gacha {

    p5:p5;

    array: any[];
    squareSize: number;
    randomNumber: number;
    selectedValue: number;
    maxScrollAmount: number;
    scrollAmount: number;
    scrollCount: number;
    scrollVelocity: number;
    selectedIndex: any;
    indicatorValue: any;
    rarityChances: any[];

    constructor(p5:any,array: any[], rarityChances: any[]) {
        this.p5=p5;
        this.array = array;
        this.rarityChances = rarityChances;
        this.squareSize = 130;
        this.randomNumber = 0;
        this.selectedValue = 0;
        this.maxScrollAmount = 0;
        this.scrollAmount = 0;
        this.scrollCount = 0;
        this.scrollVelocity = 0;
        this.updateIndicatorValue();
    }

    generateRandomChoice() {
        this.randomNumber = Math.random(); // Generate a random number between 0 and 1 (exclusive)

        // Calculate the range percentages
        const commonRarityPercentage = this.rarityChances[0];
        const rareRarityPercentage = this.rarityChances[1];
        const epicRarityPercentage = this.rarityChances[2];

        // Calculate the cumulative amounts
        const commonAmount = Math.floor(this.array.length * commonRarityPercentage);
        const rareAmount = commonAmount + Math.floor(this.array.length * rareRarityPercentage);
        const epicAmount = rareAmount + Math.floor(this.array.length * epicRarityPercentage);

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

        let scrollDistance = (this.array.indexOf(this.selectedValue) - this.selectedIndex) * this.squareSize;
        if (scrollDistance < 0) {
            scrollDistance += this.array.length * this.squareSize;
        }

        // Calculate the random scroll amount
        const randomScrollMultiplier = Math.floor(Math.random() * 5) + 5; // Random value between 5 and 10
        this.maxScrollAmount = this.scrollAmount = Math.floor(scrollDistance + randomScrollMultiplier * this.array.length * this.squareSize + Math.random() * this.squareSize * 0.8);

    }

    drawArray(startX: number, y: number) {
        for (let i = 0; i < this.array.length; i++) {
            const x = startX + i * (this.squareSize) + this.scrollCount;
            const value = this.array[i];

            this.p5.image(value, x, y,this.squareSize,this.squareSize);

            this.p5.push();
            this.p5.noFill();
            if (i == this.selectedIndex) {
                this.p5.strokeWeight(this.squareSize*0.1);
                this.p5.stroke("gold");
            }
            this.p5.rect(x, y, this.squareSize, this.squareSize);
            this.p5.pop();
        }

    }

    drawIndicator(x: number, y: number) {
        this.p5.fill("red");
        this.p5.rect(x, y, 5, this.squareSize * 1.2);
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
        this.selectedIndex = Math.floor(this.array.length / 2)-2;
        this.indicatorValue = this.array[this.selectedIndex];
    }

    scroll(){
        if (this.scrollAmount > 0) {
            this.scrollCount -= this.scrollVelocity;
            this.scrollAmount -= this.scrollVelocity;
        }

        if (Math.abs(this.scrollCount) >= this.squareSize) {
            this.array.push(this.array.shift());
            this.scrollCount = 0;
            this.updateIndicatorValue();
        }

        this.updateScrollVelocity();
    }
}
