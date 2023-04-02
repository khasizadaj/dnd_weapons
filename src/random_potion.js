import { POTIONS } from "./potions.js";
import { ElementParams, getElement, roll } from "./utils.js";

const NUMBER_OF_POTIONS = 3;

const generateButton = document.querySelector("#generate");
const potionGeneratorSection = document.querySelector(".potion-generator");


generateButton.addEventListener("click", () => {
    generateRandomPotion();
})

const getPotionElement = (potion) => {
    let potionElement = getElement(
        new ElementParams(
            { "type": "div", "classes": "potion", "id": "selected" }
        )
    );

    let title = getElement(
        new ElementParams(
            { "type": "h3", "classes": "potion-title", "content": potion.title }
        )
    )

    let description = getElement(
        new ElementParams(
            { "type": "p", "classes": "potion-description", "content": potion.description }
        )
    )

    let source = getElement(
        new ElementParams(
            { "type": "p", "classes": "potion-source", "content": `<b>Source: </b>${potion.source}`, contentType: "html" }
        )
    )

    potionElement.appendChild(title);
    potionElement.appendChild(description);
    potionElement.appendChild(source);
    return potionElement;
}

const generateRandomPotion = () => {
    let randomPotionNumber = roll(NUMBER_OF_POTIONS);
    let selectedPotion = POTIONS[randomPotionNumber - 1];

    let potionElement = getPotionElement(selectedPotion);

    if (document.querySelector(".potion")) {
        potionGeneratorSection.removeChild(document.querySelector(".potion"));
        potionGeneratorSection.appendChild(potionElement);
    } else {
        potionGeneratorSection.appendChild(potionElement);
    }
} 
