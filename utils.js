const STRENGTH_MODIFIER = 4;
const STRENGTH_MODIFIER_SHIFTED = 5;

class ElementParams {
    constructor({ type, content = "", classes = "", contentType = "text", id = "" }) {
        this.type = type;
        this.content = content;
        this.classes = classes;
        this.contentType = contentType;
        this.id = id;
    }
}

const getElement = (params) => {
    let element;
    element = document.createElement(params.type);
    if (params.contentType == "text") {
        element.textContent = params.content;
    } else if (params.contentType == "html") {
        element.innerHTML = params.content;
    }

    if (params.classes.length != 0) {
        element.className = params.classes
    }
    if (params.id.toString().length != 0) {
        element.id = params.id.toString()
    }
    return element;
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

const createWeapon = (weapon) => {
    let weaponElement = getElement(
        new ElementParams(
            { "type": "article", "classes": "weapon" }
        )
    );
    let headingElement = getElement(
        new ElementParams(
            { "type": "h3", "content": weapon.name, "classes": "name" }
        )
    );
    let infoElement = getInfoElement(weapon);

    let buttonElement = getElement(
        new ElementParams(
            { "type": "button", "content": "Roll", "classes": "roll", "id": weapon.id }
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

const placeWeapons = (data) => {
    data.forEach(element => {
        let weapon = createWeapon(element);
        document.querySelector(".weapons").appendChild(weapon);
    });
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

const calculateDamage = (id, weapons) => {
    console.log(`#${id}`)
    let weaponParams = getWeaponParams(id, weapons)
    let total = 0;
    let rolls = []

    weaponParams.dice.forEach(die => {
        let rollAmount = roll(die);
        total += rollAmount;
        rolls.push({ "die": die, "amount": rollAmount });
    })

    total += weaponParams.modifier;
    return { "total": total, "rolls": rolls, "modifier": weaponParams.modifier };
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

const placeResults = (resultElement, rollResult) => {
    let totalDamage = `${rollResult.total + STRENGTH_MODIFIER} (${rollResult.total + STRENGTH_MODIFIER_SHIFTED})`
    let damageElement = getElement(
        new ElementParams(
            { "type": "p", "content": totalDamage, "classes": "result-total" }
        )
    );

    resultElement.appendChild(damageElement);

    let formattedRolls = getFormattedRolls(rollResult.rolls);
    formattedRolls.forEach(formattedRoll => {
        resultElement.appendChild(formattedRoll)
    })

    let modifier = `Mod: +${rollResult.modifier}`
    let modifierElement = getElement(
        new ElementParams(
            { "type": "p", "content": modifier, "classes": "modifier", "id": "weapon-modifier" }
        )
    );
    resultElement.appendChild(modifierElement);

    let globalModifer = `G. Mod: +${STRENGTH_MODIFIER} (${STRENGTH_MODIFIER_SHIFTED})`
    let globalModifierElement = getElement(
        new ElementParams(
            { "type": "p", "content": globalModifer, "classes": "modifier", "id": "global-modifier" }
        )
    );
    resultElement.appendChild(globalModifierElement);
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

export { placeWeapons, calculateDamage, placeResults };

