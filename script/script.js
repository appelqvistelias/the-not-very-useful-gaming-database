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


const fetchMonsterFromAPI = async (userSearchValue) => {
    const hruleURL =`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${userSearchValue}`;
    
    try {
        const response = await fetch(hruleURL);

        if (!response.ok) {
            throw new Error('Failed to fetch monster data');
        }

    const monster = await response.json();

    return monster;
    
} catch (error) {
    console.error('Something went wrong', error);
    monsterName.textContent = 'Could not fetch monster data';
    monsterLocations.textContent = 'Could not fetch monster locations';
    monsterLoot.textContent = 'Could not fetch monster loot';
    monsterDescription.textContent = 'Could not fetch monster description';
}
};

const monsterToObj = (monster) => {
    const info = {
        monsterName: toTitleCase(monster.data.name) || 'Unknown monster name!',
        locations: (monster.data.common_locations || []).join(', ') || 'No locations found!',
        loot: (monster.data.drops || []).map(toTitleCase).join(', ') || 'No loot found!',
        description: monster.data.description || 'No description data available!'
    };
    return info;
}

const addMonsterToDom = (monster) => {
    monsterName.textContent = monster.monsterName;
    monsterLocations.textContent = monster.locations;
    monsterLoot.textContent = monster.loot;
    monsterDescription.textContent = monster.description;
}

searchButton.addEventListener('click', async () => {
    const userSearchValue = searchField.value.trim();
    if (userSearchValue) {
        const sanitizedSearchValue = encodeURIComponent(userSearchValue.toLowerCase());
        
        // fetch from api
        const data = await fetchMonsterFromAPI(sanitizedSearchValue);

        // data -> obj
        const monster = monsterToObj(data);
        
        // obj -> add dom
        addMonsterToDom(monster);
    } else {
        alert('You need to name a monster!');
    }
});

searchField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});
