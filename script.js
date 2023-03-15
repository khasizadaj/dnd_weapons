import { calculateDamage, placeResults, placeWeapons } from "/utils.js";
import { weapons } from "/weapons.js";

const CSS_SELECTORS = {
    "weapon": ".weapon",
    "button": {
        "roll": ".roll"
    },
    "result": ".result"
}

placeWeapons(weapons)

document.querySelectorAll(CSS_SELECTORS.weapon).forEach(weapon => {
    let button = weapon.querySelector(CSS_SELECTORS.button.roll);
    button.addEventListener("click", () => {
        let resultElement = weapon.querySelector(CSS_SELECTORS.result)
        resultElement.textContent = "";
        let rollResult = calculateDamage(button.id, weapons);
        placeResults(resultElement, rollResult)
    })
})