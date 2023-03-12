import { calculateDamage, place, placeResults } from "/utils.js";
import { weapons } from "/weapons.js";

const CSS_SELECTORS = {
    "weapon": ".weapon",
    "button": {
        "roll": ".roll"
    },
    "result": ".result"
}

place(weapons)

document.querySelectorAll(CSS_SELECTORS.weapon).forEach(weapon => {
    let button = weapon.querySelector(CSS_SELECTORS.button.roll);
    button.addEventListener("click", () => {
        let resultElement = weapon.querySelector(CSS_SELECTORS.result)
        resultElement.textContent = "";
        let rollResult = calculateDamage(button.id);
        placeResults(resultElement, rollResult)
    })
})