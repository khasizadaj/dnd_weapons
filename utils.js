import { roll, rollD20 } from "./die.js";
import { ElementParams, getElement } from "./htmlElement.js";

const STRENGTH_MODIFIER = 5;
const PROFICIENCY_BONUS = 5;
const STRENGTH_MODIFIER_SHIFTED = 6;

const CSS_SELECTORS = {
    "weapon": ".weapon",
    "weapons": ".weapons",
    "button": {
        "roll": ".roll"
    },
    "result": ".result"
}

class AttackResult {
    constructor({ roll, modifier_weapon = 0 }) {
        this.roll = roll;
        this.modifier_weapon = modifier_weapon;
    }

    total() {
        return this.roll.amount + this.modifier_weapon + STRENGTH_MODIFIER + PROFICIENCY_BONUS;
    }
}

const getWeaponParams = (id, data) => {
    let weapon;
    data.forEach(element => {
        if (element.id == id) {
            weapon = element
        }
    })
    return weapon;
}

const calculateAttack = (weapon) => {
    let roll = {"die": {
        "type":20,
        "damage": "default"
    }, "amount": rollD20()}
    return new AttackResult({"roll": roll, "modifier_weapon": weapon.modifier});
}

const calculateDamage = ({ weapon, great_weapon_fighting = false }) => {
    let total = 0;
    let rolls = []

    weapon.dice.forEach(die => {
        for (let i = 0; i < die.count ;i++) {
            let rollAmount = roll(die.type);
            if (great_weapon_fighting && (rollAmount === 1 || rollAmount === 2) ) {
                let message = `Rolled low... ${rollAmount}... Huh?`
                rollAmount = roll(die.type)
                message += `Rolling again... New damage is ${rollAmount}`
                console.log(message)
            }
            total += rollAmount;
            rolls.push({ "die": die, "amount": rollAmount });
        }
    })

    total += weapon.modifier + STRENGTH_MODIFIER;
    return { "total": total, "rolls": rolls, "modifier": weapon.modifier };
}

function getInfoElement(weapon) {
    let info = getElement(
        new ElementParams(
            { "type": "div", "classes": "info" }
        )
    );

    let dice = createDice(weapon.dice);
    dice.forEach(die => {
        info.appendChild(die);
    });

    let modifier = getElement(
        new ElementParams(
            { "type": "span", "content": `+${weapon.modifier}`, "classes": "modifier" }
        )
    );
    info.appendChild(modifier);
    return info;
}

const createDice = (data) => {
    let dice = []

    data.forEach(die => {
        let content = `${die.count}d${die.type}`
        let classes = `damage-die`

        let dieElement = getElement(
            new ElementParams(
                { "type": "span", "content": content, "classes": classes, "id": 10 }
            )
        )

        let icon = getElement(new ElementParams(
            { "type": "i", "classes": `icon ${die.damage}` }
        ))

        dieElement.appendChild(icon)

        dice.push(dieElement)
    })
    return dice;
}

const createWeapon = (data) => {
    let weaponElement = getElement(
        new ElementParams(
            { "type": "article", "classes": "weapon" }
        )
    );
    let headingElement = getElement(
        new ElementParams(
            { "type": "h3", "content": data.name, "classes": "name" }
        )
    );
    let infoElement = getInfoElement(data);
    let buttonElement = getElement(
        new ElementParams(
            { "type": "button", "content": "Roll", "classes": "roll", "id": data.id }
        )
    );
    let resultElement = getElement(
        new ElementParams(
            { "type": "div", "content": "N/A", "classes": "result" }
        )
    );

    weaponElement.appendChild(headingElement)
    weaponElement.appendChild(infoElement)
    weaponElement.appendChild(buttonElement)
    weaponElement.appendChild(resultElement)

    return weaponElement;
}

const getFormattedRolls = (rolls) => {
    let result = []
    rolls.forEach(roll => {
        result.push(formatRoll(roll));
    })
    return result;
}

function formatRoll(roll) {
    let rollInfo = `== ${roll.amount} [d${roll.die.type}]`;
    if (roll.die.damage != "default") {
        rollInfo += ` [${roll.die.damage}]`;
    }
    return getElement(
        new ElementParams(
            { "type": "p", "content": rollInfo, "classes": "result-roll-info" }
        )
    );
}

function getGlobalModiferElement() {
    let content = `G. Mod: +${STRENGTH_MODIFIER} (${STRENGTH_MODIFIER_SHIFTED})`;
    let element = getElement(
        new ElementParams(
            { "type": "p", "content": content, "classes": "modifier", "id": "global-modifier" }
        )
    );
    return element;
}

function getProficiencyBonusElement() {
    let content = `Prof. Bonus: +${PROFICIENCY_BONUS}`;
    let element = getElement(
        new ElementParams(
            { "type": "p", "content": content, "classes": "proficiency-bonus", "id": "proficiency-bonus" }
        )
    );
    return element;
}

function getWeaponModifierElement(modifier) {
    let content = `Mod: +${modifier}`;
    let element = getElement(
        new ElementParams(
            { "type": "p", "content": content, "classes": "modifier", "id": "weapon-modifier" }
        )
    );
    return element;
}

function getTotalDamageElement(totalDamage) {
    let content = `${totalDamage} (${totalDamage - STRENGTH_MODIFIER + STRENGTH_MODIFIER_SHIFTED})`;
    let element = getElement(
        new ElementParams(
            { "type": "p", "content": content, "classes": "result-total" }
        )
    );
    return element;
}

function getAttackRollElement(attackRollResult) {
    console.log(attackRollResult)
    let content = `${attackRollResult.total()} (${attackRollResult.total() - STRENGTH_MODIFIER + STRENGTH_MODIFIER_SHIFTED})`;
    let element = getElement(
        new ElementParams(
            { "type": "p", "content": content, "classes": "attack" }
        )
    );
    return element;
}

const placeWeapons = (data) => {
    data.forEach(element => {
        let weapon = createWeapon(element);
        document.querySelector(CSS_SELECTORS.weapons).appendChild(weapon);
    });
}

const placeResults = (resultElement, damageRollResult, attackRollResult) => {
    resultElement.appendChild(getAttackRollElement(attackRollResult))
    resultElement.appendChild(formatRoll(attackRollResult.roll))
    resultElement.appendChild(getTotalDamageElement(damageRollResult.total));

    getFormattedRolls(damageRollResult.rolls).forEach(formattedRoll => {
        resultElement.appendChild(formattedRoll)
    })

    resultElement.appendChild(getWeaponModifierElement(damageRollResult.modifier));
    resultElement.appendChild(getProficiencyBonusElement());
    resultElement.appendChild(getGlobalModiferElement());
}

export {
    placeWeapons, calculateDamage, placeResults, getWeaponParams, calculateAttack,
    CSS_SELECTORS, roll
};

