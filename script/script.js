let userInputMonster = "moblin";
const monsterName = document.querySelector('.monster-name');
const monsterDescription = document.querySelector('.monster-description');
const monsterLocations = document.querySelector('.monster-locations');

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
    monsterName.textContent = info.monsterName;
    monsterDescription.textContent = info.description;
    monsterLocations.textContent = info.locations;
}

getHruleMonster();