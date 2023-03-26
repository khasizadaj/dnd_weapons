import { roll } from "./utils.js";

const NUMBER_OF_POTIONS = 3;

const POTIONS = [
    {
        "title": "Potion of Diminution 1",
        "description":"When you drink this potion, you gain the 'reduce' effect of the Enlarge/Reduce spell for 1d4 hours (no concentration required). The red in the potion's liquid continuously contracts to a tiny bead and then expands to color the clear liquid around it. Shaking the bottle fails to interrupt this process.",
        "source":"Dungeon Master's Guide"
    },
    {
        "title": "Potion of Diminution 2",
        "description":"When you drink this potion, you gain the 'reduce' effect of the Enlarge/Reduce spell for 1d4 hours (no concentration required). The red in the potion's liquid continuously contracts to a tiny bead and then expands to color the clear liquid around it. Shaking the bottle fails to interrupt this process.",
        "source":"Dungeon Master's Guide"
    },
    {
        "title": "Potion of Diminution 3",
        "description":"When you drink this potion, you gain the 'reduce' effect of the Enlarge/Reduce spell for 1d4 hours (no concentration required). The red in the potion's liquid continuously contracts to a tiny bead and then expands to color the clear liquid around it. Shaking the bottle fails to interrupt this process.",
        "source":"Dungeon Master's Guide"
    },
]

const generateButton = document.querySelector("#generate");

generateButton.addEventListener("click", () => {
    generateRandomPotion();
})

const generateRandomPotion = () => {
    let randomPotionNumber = roll(NUMBER_OF_POTIONS);
    let potion = POTIONS[randomPotionNumber - 1];
    console.log(potion)
} 
