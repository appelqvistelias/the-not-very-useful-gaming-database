let userInputMonster = "moblin";
const inputField = document.querySelector('.info-text');

const hruleURL =`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${userInputMonster}`;

const getHruleMonster = async () => {
const response = await fetch(hruleURL);
    const monster = await response.json();

    const info = {
        monsterName: monster.data.name,
        description: monster.data.description,
        locations: monster.data.common_locations
    };
    console.log(info);
    inputField.textContent = info.monsterName;
}

getHruleMonster();