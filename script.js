import { weapons } from "/weapons.js";

const strengthModifier = 4;
const strengthModifierShifted = 5;

const getElement = (type, content = "", classes = "", contentType = "text", id = "") => {
    let element;
    element = document.createElement(type);
    if (contentType == "text") {
        element.textContent = content;
    } else if (contentType == "html") {
        element.innerHTML = content;
    }
    if (classes.length != 0) {
        element.className = classes
    }
    if (id.toString().length != 0) {
        element.id = id.toString()
    }
    return element;
}

const createDice = (data) => {
    let dice = []
    data.forEach(die => {
        let content = `${die.count}d${die.type} (${die.damage})`
        let classes = `damage-die damage-type ${die.damage}`
        let dieElement = getElement("span", content, classes)
        dice.push(dieElement)
    })
    return dice;
}

const createWeapon = (element) => {
    let weapon = getElement("article", "", "weapon");
    let heading = getElement("h3", element.name, "name")
    let info = getElement("div", "", "info")
    let dice = createDice(element.dice);
    dice.forEach(die => {
        info.appendChild(die)
    })
    let modifier = getElement("span", `+${element.modifier}`, "modifier")
    info.appendChild(modifier)

    let button = getElement("button", "Roll", "roll", "text", element.id)
    let result = getElement("div", "n/a", "result")

    weapon.appendChild(heading)
    weapon.appendChild(info)
    weapon.appendChild(button)
    weapon.appendChild(result)

    return weapon;
}

const place = (data) => {
    data.forEach(element => {
        let weapon = createWeapon(element);
        document.querySelector(".weapons").appendChild(weapon);
    });
}

const getWeapon = (id) => {
    let weapon;
    weapons.forEach(element => {
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

const calculateDamage = (id) => {
    console.log(`#${id}`)
    let weaponInfo = getWeapon(id)
    let total = 0;
    let rolls = []

    weaponInfo.dice.forEach(die => {
        let rollAmount = roll(die);
        total += rollAmount;
        rolls.push({ "die": die, "amount": rollAmount });
    })

    total += weaponInfo.modifier;
    return { "total": total, "rolls": rolls, "modifier": weaponInfo.modifier };
}

const getFormattedRolls = (rolls) => {
    let result = ""
    rolls.forEach(roll => {
        result += `${roll.amount} (d${roll.die.type}: ${roll.die.damage}); `
    })
    return result;
}

const getFormattedRolls2 = (rolls) => {
    let result = []
    rolls.forEach(roll => {
        let rollInfo = `== ${roll.amount} (d${roll.die.type}: ${roll.die.damage}); `
        result.push(getElement("p", rollInfo, "result-roll-info", "text"))
    })
    return result;
}

const getFormattedResult = (result) => {
    let totalDamage = `${result.total + strengthModifier} (${result.total + strengthModifierShifted})`
    let rolls = getFormattedRolls(result.rolls);
    let modifier = `Mod: +${result.modifier}`
    let globalModifer = `G. Mod: +${strengthModifier} (${strengthModifierShifted})`
    return `${totalDamage} | ${rolls}; ${modifier}; ${globalModifer}`
}

const placeResults = (resultElement, rollResult) => {
    let totalDamage = `${rollResult.total + strengthModifier} (${rollResult.total + strengthModifierShifted})`
    let damageElement = getElement("p", totalDamage, "result-total", "text")
    resultElement.appendChild(damageElement);
    
    let formattedRolls = getFormattedRolls2(rollResult.rolls);
    formattedRolls.forEach(formattedRoll => {
        resultElement.appendChild(formattedRoll)
    })
    
    let modifier = `Mod: +${rollResult.modifier}`
    let modifierElement = getElement("p", modifier, "result-modifier", "text", "weapon-modifier")
    resultElement.appendChild(modifierElement);

    let globalModifer = `G. Mod: +${strengthModifier} (${strengthModifierShifted})`
    let globalModifierElement = getElement("p", globalModifer, "result-modifier", "text", "global-modifier")
    resultElement.appendChild(globalModifierElement);    
}

place(weapons)

document.querySelectorAll(".weapon").forEach(weapon => {
    let button = weapon.querySelector(".roll");
    button.addEventListener("click", () => {
        let resultElement = weapon.querySelector(".result")
        resultElement.textContent = "";
        let rollResult = calculateDamage(button.id);
        placeResults(resultElement, rollResult)
    })
})