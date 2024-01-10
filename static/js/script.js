import { CSS_SELECTORS, calculateAttack, calculateDamage, getWeaponParams, placeResults, placeWeapons } from "./utils.js";
import { weapons } from "../../data/weapons.js";

// TODO Have a switch for this fighting style
const GREAT_WEAPON_FIGHTING = true;

placeWeapons(weapons)

document.querySelectorAll(CSS_SELECTORS.weapon).forEach(weapon => {
    let button = weapon.querySelector(CSS_SELECTORS.button.roll);
    button.addEventListener("click", () => {
        
        let weaponParams = getWeaponParams(button.id, weapons)
        let rollResult = calculateDamage({"weapon":weaponParams, "great_weapon_fighting": GREAT_WEAPON_FIGHTING});
        let attackRollResult = calculateAttack(weaponParams);
        
        let resultElement = weapon.querySelector(CSS_SELECTORS.result)
        resultElement.textContent = "";
        placeResults(resultElement, rollResult, attackRollResult)
    })
})
