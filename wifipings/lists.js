const bots = [
    {name: "WR_001", realname: "RABBIT", color:"PINK"},
    {name: "WR_002", realname: "THE SPINE", color:"GREEN"},
    {name: "WR_003", realname: "HATCHWORTH", color:"ORANGE"},
    {name: "WR_004", realname: "UPGRADE", color:"DEEPPINK"},
    {name: "WR_005", realname: "THE JON", color:"YELLOW"},
    {name: "WR_006", realname: "ZER0", color:"GOLD"},
    {name: "WR_007", realname: "TOAST", color:"PURPLE"},
    {name: "WRAI_001", realname: "BEEBOP", color:"BLUE"},
    {name: "WRAI_002", realname: "QWERTY", color:"GREEN"},
    {name: "WG_002", realname: "GG", color:"LIGHTBLUE"}
];

const walterWorkers = [
    {name: "C_PENYAK01", realname: "CHELSEA", color:"DARKBLUE"},
    {name: "C_PENYAK02", realname: "CAMILLE", color:"DARKBLUE"},
    {name: "G_GONZALEZ", realname: "GABI", color:"DARKBLUE"},
    {name: "L_JOHNSON", realname: "LACEY", color:"DARKBLUE"},
    {name: "A_AURELIA", realname: "ASTRUD", color:"DARKBLUE"},
    {name: "D_BUTTERFIELD", realname: "DAVEY", color:"DARKBLUE"}
];

const walters = [
    {name: "PW06", realname: "PETES", color:"LIGHTBLUE"},
    {name: "VBECILE", realname: "VIVIAN", color:"LIGHTGREEN"},
    {name: "LKEATON", realname: "LORENE", color:"LIGHTBLUE"},
    {name: "PW05", realname: "PETER", color:"LIGHTBLUE"},
    {name: "ABURNETTE", realname: "ANNIE", color:"LIGHTBLUE"},
    {name: "WBECILE", realname: "WANDA", color:"LIGHTBLUE"},
    {name: "NBECILE", realname: "NORMAN", color:"LIGHTBLUE"}
];

// Combine all characters into one master list for easier lookups
const allCharacters = [...bots, ...walterWorkers, ...walters];


const convo1 = [
    {text: "hello world", name: "WR_001", order: 1},
    {text: "this is a test", name: "WR_002", order: 2}
];

const convo2 = [
    {text: "Has anyon seen my Bobby Darin CD?", name: "WR_002", order: 1},
    {text: "HOLY BOBBY DARIN", name: "WR_004", order: 2},
    {text: "BOBBBYYYYY DARINNNNNNNNN", name: "WR_005", order: 3},
    {text: "BIG MAC TONIGHT!!!!!!!", name: "WR_001", order: 4}
];

const convo3 = [
    {text: "Has anyon seen my Bobby Darin CD?", name: "WR_002", order: 1},
    {text: "HOLY FUCK BOBBY DARIN", name: "WR_004", order: 2},
    {text: "BOBBBYYYYY DARINNNNNNNNN", name: "WR_005", order: 3},
    {text: "BIG MAC TONIGHT!!!!!!!", name: "WR_001", order: 4}
];

const convo4 = [
    {text: "rabbit.", name: "C_PENYAK02", order: 1},
    {text: "yes camille :3", name: "WR_001", order: 2},
    {text: "rabbit. give. me. back. my. wrench.", name: "C_PENYAK02", order: 3},
    {text: ">:3 >:3 >:3", name: "WR_001", order: 4}
];

const convo5 = [
    {text: "Zer0... Zer0, are you okay?", name: "WR_002", order: 1},
    {text: "Zer0... Zer0, are you okay?", name: "WR_002", order: 1},
    {text: "Zer0... Zer0, are you okay?", name: "WR_002", order: 1},
    {text: "Nothing beats a Jet2 holiday!", name: "WR_002", order: 1},
    {text: "dfgjkhfdghjkdfkjg.", name: "C_PENYAK02", order: 3},
    {text: ">:3 >:3 >:3", name: "WR_001", order: 4}
];

// Spine: 
// Zer0: ...
// Spine: Zer0?
// Zer0: nothing beats a jet2 holiday and right now you can save £50 per person. that's £200 off for a family of 4. we've got millions of free child place holidays available with 22kg of baggage included. book now with jet2holidays. package holidays you can trust!


const masterconvolist = [
    {text: "TEST", name: "WR_001", order: 1},
    {text: "TEST", name: "WR_002", order: 2},
    {text: "TEST", name: "WR_003", order: 3},
    {text: "TEST", name: "WR_004", order: 4},
    {text: "TEST", name: "WR_005", order: 5},
    {text: "TEST", name: "WR_006", order: 6},
    {text: "TEST", name: "WR_007", order: 7},
    {text: "TEST", name: "WRAI_001", order: 8},
    {text: "TEST", name: "WRAI_002", order: 9},
    {text: "TEST", name: "WG_002", order: 10},
    {text: "TEST", name: "C_PENYAK01", order: 11},
    {text: "TEST", name: "C_PENYAK02", order: 12},
    {text: "TEST", name: "G_GONZALEZ", order: 13},
    {text: "TEST", name: "L_JOHNSON", order: 14},
    {text: "TEST", name: "A_AURELIA", order: 15},
    {text: "TEST", name: "PW06", order: 16},
    {text: "TEST", name: "VBECILE", order: 17}
];


const convolist = [convo1, convo2, convo3, convo4, convo5];

window.onload = async function() {
    convo2.sort((a, b) => a.order - b.order);
    const listContainer = document.getElementById("myList");
    const randomElement = convolist[Math.floor(Math.random() * convolist.length)];
    listContainer.innerHTML = "";
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    for (const message of randomElement) {
        const listItem = document.createElement("ul");
        const character = allCharacters.find(c => c.name === message.name);
        const nameSpan = document.createElement("strong");
        nameSpan.textContent = message.name;

        if (character) {
            nameSpan.style.color = character.color.toLowerCase();
        }
        const messagelens = message.text; 
        const delay = messagelens.length * 50; 
        console.log("Text length:", messagelens.length); 
        console.log("Calculated delay:", delay);

        const messageText = document.createTextNode(`: ${message.text}`);
        listItem.appendChild(nameSpan);
        listItem.appendChild(messageText);
        
        listContainer.appendChild(listItem);
        
        await sleep(delay);
    }
};
