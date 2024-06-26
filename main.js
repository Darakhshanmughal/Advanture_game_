#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Player {
    constructor(name) {
        this.fuel = 100;
        this.name = name;
    }
    attack(opponent) {
        console.log(chalk.red(`${this.name} attacks ${opponent.name}!`));
        opponent.fuel -= 10;
    }
    defend() {
        console.log(chalk.blue(`${this.name} defends!`));
        this.fuel += 5;
    }
    run() {
        console.log(chalk.yellow(`${this.name} runs away!`));
    }
}
class Opponent {
    constructor(name) {
        this.fuel = 100;
        this.name = name;
    }
    attack(player) {
        console.log(chalk.red(`${this.name} attacks ${player.name}!`));
        player.fuel -= 10;
    }
    defend() {
        console.log(chalk.blue(`${this.name} defends!`));
        this.fuel += 5;
    }
}
async function main() {
    // Prompt for the player's name
    const playerResponse = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "Please enter your name:"
    });
    // Prompt for the opponent selection
    const opponentResponse = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "Please select your opponent:",
        choices: ["Skeleton", "Assassin", "Zombie"]
    });
    // Create instances of Player and Opponent
    let player = new Player(playerResponse.name);
    let opponent = new Opponent(opponentResponse.select);
    console.log(chalk.yellow(`Player: ${player.name}, Fuel: ${player.fuel}`));
    console.log(chalk.magenta(`Opponent: ${opponent.name}, Fuel: ${opponent.fuel}`));
    // Game logic based on opponent selection
    if (opponentResponse.select === "Skeleton") {
        console.log(chalk.red('You selected Skeleton as your opponent!'));
    }
    else if (opponentResponse.select === "Assassin") {
        console.log(chalk.blue('You selected Assassin as your opponent!'));
    }
    else if (opponentResponse.select === "Zombie") {
        console.log(chalk.green('You selected Zombie as your opponent!'));
    }
    let continueGame = true;
    do {
        const actionResponse = await inquirer.prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: ["Attack", "Defend", "Run for your life.."]
        });
        switch (actionResponse.action) {
            case "Attack":
                player.attack(opponent);
                break;
            case "Defend":
                player.defend();
                break;
            case "Run for your life..":
                player.run();
                continueGame = false;
                break;
        }
        // Opponent randomly chooses an action if the game continues
        if (continueGame) {
            const opponentAction = Math.random() < 0.5 ? "Attack" : "Defend";
            if (opponentAction === "Attack") {
                opponent.attack(player);
            }
            else {
                opponent.defend();
            }
        }
        // Display updated fuel levels
        console.log(chalk.yellow(`Player: ${player.name}, Fuel: ${player.fuel}`));
        console.log(chalk.magenta(`Opponent: ${opponent.name}, Fuel: ${opponent.fuel}`));
        // Check if the game should continue
        if (opponent.fuel <= 0) {
            console.log(chalk.green(`${opponent.name} has been defeated!`));
            continueGame = false;
        }
        if (player.fuel <= 0) {
            console.log(chalk.red(`${player.name} has run out of fuel and lost the game!`));
            continueGame = false;
        }
    } while (continueGame);
    // Determine and display the final outcome
    if (player.fuel > 0 && opponent.fuel <= 0) {
        console.log(chalk.green(`${player.name} is the winner! Congratulations!`));
    }
    else if (player.fuel <= 0) {
        console.log(chalk.red(`${player.name} has been defeated. Better luck next time!`));
    }
    console.log(chalk.cyan('Game Over!'));
}
main();
