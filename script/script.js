const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const monsterName = document.querySelector('.monster-name');
const monsterDescription = document.querySelector('.monster-description');
const monsterLocations = document.querySelector('.monster-locations');


const getHruleMonster = async (userSearchValue) => {
    const hruleURL =`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${userSearchValue}`;
    
    try {
        const response = await fetch(hruleURL);

        if (!response.ok) {
            throw new Error('Failed to fetch monster data');
        }

    const monster = await response.json();
    
    const info = {
        monsterName: monster.data.name || 'Unknown monster name!',
        description: monster.data.description || 'No description data available!',
        locations: (monster.data.common_locations || []).join(', ') || 'No locations found!'
    };

    console.log(info);

    monsterName.textContent = info.monsterName;
    monsterDescription.textContent = info.description;
    monsterLocations.textContent = info.locations;

    } catch {
        console.error('Something went wrong', error);
        monsterName.textContent = 'Error';
        monsterDescription.textContent = 'Error';
        monsterLocations.textContent = 'Error';
    }
};

searchButton.addEventListener('click', () => {
    const userSearchValue = searchField.value.trim();
    if (userSearchValue) {
        getHruleMonster(userSearchValue.toLowerCase());
    } else {
        alert('You need to name a monster!');
    }
});
