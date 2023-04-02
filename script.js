import { calculateDamage, CSS_SELECTORS, getWeaponParams, placeResults, placeWeapons } from "./utils.js";
import { weapons } from "./weapons.js";

placeWeapons(weapons)

document.querySelectorAll(CSS_SELECTORS.weapon).forEach(weapon => {
    let button = weapon.querySelector(CSS_SELECTORS.button.roll);
    button.addEventListener("click", () => {
        
        let weaponParams = getWeaponParams(button.id, weapons)
        let rollResult = calculateDamage(weaponParams);
        
        let resultElement = weapon.querySelector(CSS_SELECTORS.result)
        resultElement.textContent = "";
        placeResults(resultElement, rollResult)
    })
})