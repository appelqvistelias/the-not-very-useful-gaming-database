function toTitleCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const monsterName = document.querySelector('.monster-name');
const monsterLocations = document.querySelector('.monster-locations');
const monsterLoot = document.querySelector('.monster-loot');
const monsterDescription = document.querySelector('.monster-description');


const getHruleMonster = async (userSearchValue) => {
    const hruleURL =`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${userSearchValue}`;
    
    try {
        const response = await fetch(hruleURL);

        if (!response.ok) {
            throw new Error('Failed to fetch monster data');
        }

    const monster = await response.json();

    console.log(monster);
    
    const info = {
        monsterName: toTitleCase(monster.data.name) || 'Unknown monster name!',
        locations: (monster.data.common_locations || []).join(', ') || 'No locations found!',
        loot: (monster.data.drops || []).map(toTitleCase).join(', ') || 'No loot found!',
        description: monster.data.description || 'No description data available!'
    };

    monsterName.textContent = info.monsterName;
    monsterLocations.textContent = info.locations;
    monsterLoot.textContent = info.loot;
    monsterDescription.textContent = info.description;

    } catch (error) {
        console.error('Something went wrong', error);
        monsterName.textContent = 'Could not fetch monster data';
        monsterLocations.textContent = 'Could not fetch monster locations';
        monsterLoot.textContent = 'Could not fetch monster loot';
        monsterDescription.textContent = 'Could not fetch monster description';
    }
};

searchButton.addEventListener('click', () => {
    const userSearchValue = searchField.value.trim();
    if (userSearchValue) {
        const sanitizedSearchValue = encodeURIComponent(userSearchValue.toLowerCase());
        getHruleMonster(sanitizedSearchValue);
    } else {
        alert('You need to name a monster!');
    }
});
