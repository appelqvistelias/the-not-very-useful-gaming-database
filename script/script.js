function reloadPage() {
    location.reload();  
}

function toTitleCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const randButton = document.getElementById('random-button');

const inputName = document.querySelector('.input-name');
const inputLocations = document.querySelector('.input-locations');
const inputLoot = document.querySelector('.input-loot');
const inputDescription = document.querySelector('.input-description');

const fetchInputFromAPI = async (userSearchValue) => {
    const hruleURL =`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${userSearchValue}`;
    
    try {
        const response = await fetch(hruleURL);

        if (!response.ok) {
            throw new Error('Failed to fetch input data');
        }

    const input = await response.json();

    return input;
    
} catch (error) {
    console.error('Something went wrong', error);
    inputName.textContent = 'Could not fetch input name';
    inputLocations.textContent = 'Could not fetch input locations';
    inputLoot.textContent = 'Could not fetch input loot';
    inputDescription.textContent = 'Could not fetch input description';
}
};

const inputToObj = (input) => {
    const info = {
        inputName: toTitleCase(input.data.name) || 'Unknown input name!',
        locations: (input.data.common_locations || []).join(', ') || 'No locations found!',
        loot: (input.data.drops || []).map(toTitleCase).join(', ') || 'No loot found!',
        description: input.data.description || 'No description data available!'
    };
    return info;
}

const addInputToDom = (input) => {
    inputName.textContent = input.inputName;
    inputLocations.textContent = input.locations;
    inputLoot.textContent = input.loot;
    inputDescription.textContent = input.description;
}

searchButton.addEventListener('click', async () => {
    const userSearchValue = searchField.value.trim();
    if (userSearchValue) {
        const sanitizedSearchValue = encodeURIComponent(userSearchValue.toLowerCase());

        // fetch from api
        const data = await fetchInputFromAPI(sanitizedSearchValue);

        // data -> obj
        const input = inputToObj(data);
        
        // obj -> add dom
        addInputToDom(input);
    } else {
        alert('You need to name a monster, animal, item or ID!');
    }
});

searchField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});

randButton.addEventListener('click', async () => {
    let randomSearchResult = Math.floor(Math.random() * 389) + 1;

    const data = await fetchInputFromAPI(randomSearchResult);
    const input = inputToObj(data);
    addInputToDom(input);
})