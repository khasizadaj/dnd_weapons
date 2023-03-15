const STRENGTH_MODIFIER = 4;
const STRENGTH_MODIFIER_SHIFTED = 5;

const CSS_SELECTORS = {
    "weapon": ".weapon",
    "weapons": ".weapons",
    "button": {
        "roll": ".roll"
    },
    "result": ".result"
}

class ElementParams {
    constructor({ type, content = "", classes = "", contentType = "text", id = "" }) {
        this.type = type;
        this.content = content;
        this.classes = classes;
        this.contentType = contentType;
        this.id = id;
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

const roll = (die) => {
    let min = 1;
    let max = Math.floor(die.type);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const calculateDamage = (data) => {
    let total = 0;
    let rolls = []

    data.dice.forEach(die => {
        let rollAmount = roll(die);
        total += rollAmount;
        rolls.push({ "die": die, "amount": rollAmount });
    })

    total += data.modifier;
    return { "total": total, "rolls": rolls, "modifier": data.modifier };
}

const getElement = (elementParams) => {
    let element = document.createElement(elementParams.type);

    if (elementParams.contentType == "text") {
        element.textContent = elementParams.content;
    } else if (elementParams.contentType == "html") {
        element.innerHTML = elementParams.content;
    }

    if (elementParams.classes.length != 0) {
        element.className = elementParams.classes
    }

    if (elementParams.id.toString().length != 0) {
        element.id = elementParams.id.toString()
    }
    return element;
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
        let content = `${die.count}d${die.type} (${die.damage})`
        let classes = `damage-die damage-type ${die.damage}`

        let dieElement = getElement(
            new ElementParams(
                { "type": "span", "content": content, "classes": classes, "id": 10 }
            )
        )
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
        let rollInfo = `== ${roll.amount} (d${roll.die.type}: ${roll.die.damage}); `
        result.push(getElement(
            new ElementParams(
                { "type": "p", "content": rollInfo, "classes": "result-roll-info" }
            )
        ))
    })
    return result;
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
    let content = `${totalDamage + STRENGTH_MODIFIER} (${totalDamage + STRENGTH_MODIFIER_SHIFTED})`;
    let element = getElement(
        new ElementParams(
            { "type": "p", "content": content, "classes": "result-total" }
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

const placeResults = (resultElement, rollResult) => {
    resultElement.appendChild(getTotalDamageElement(rollResult.total));

    let formattedRolls = getFormattedRolls(rollResult.rolls);
    formattedRolls.forEach(formattedRoll => {
        resultElement.appendChild(formattedRoll)
    })

    resultElement.appendChild(getWeaponModifierElement(rollResult.modifier));
    resultElement.appendChild(getGlobalModiferElement());
}

export { placeWeapons, calculateDamage, placeResults, getWeaponParams, CSS_SELECTORS };

