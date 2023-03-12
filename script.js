const strengthModifier = 4;
const strengthModifierShifted = 5;
const weapons = [
    {
        "id": "aa",
        "name": "Greatsword of Artorius",
        "dice": [
            {
                "count": 1,
                "type": 6,
                "damage": "default"
            },
            {
                "count": 1,
                "type": 6,
                "damage": "default"
            },
            {
                "count": 1,
                "type": 4,
                "damage": "force"
            },
            {
                "count": 1,
                "type": 6,
                "damage": "radiant"
            },
        ],
        "modifier": 0
    },
    {
        "id": "bb",
        "name": "Star Sickle",
        "dice": [
            {
                "count": 1,
                "type": 6,
                "damage": "default"
            },
            {
                "count": 1,
                "type": 4,
                "damage": "default"
            },
            {
                "count": 1,
                "type": 4,
                "damage": "force"
            },
        ],
        "modifier": 1
    },
    {
        "id": "cc",
        "name": "Star Razor",
        "dice": [
            {
                "count": 1,
                "type": 8,
                "damage": "default"
            },
        ],
        "modifier": 2
    }
]

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
    min = 1;
    max = Math.floor(die.type);
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

const getFormattedResult = (result) => {
    let totalDamage = `${result.total + strengthModifier} (${result.total + strengthModifierShifted})`
    let rolls = getFormattedRolls(result.rolls);
    let modifier = `Mod: +${result.modifier}`
    let globalModifer = `G. Mod: +${strengthModifier} (${strengthModifierShifted})`
    return `${totalDamage} | ${rolls}; ${modifier}; ${globalModifer}`
}

place(weapons)

document.querySelectorAll(".weapon").forEach(weapon => {
    let button = weapon.querySelector(".roll");
    button.addEventListener("click", () => {
        let resultElement = weapon.querySelector(".result")
        let rollResult = calculateDamage(button.id);
        resultElement.textContent = getFormattedResult(rollResult);
        console.log(rollResult)
    })
})