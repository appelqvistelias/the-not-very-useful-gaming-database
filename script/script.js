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

// Theme management
const themeToggle = document.getElementById('theme-toggle');
const themeToggleText = document.querySelector('.theme-toggle-text');
const body = document.body;

// Check for saved theme preference or default to system preference
const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Apply theme and update toggle button
const setTheme = (theme) => {
    // Remove existing theme classes
    body.classList.remove('theme-light', 'theme-dark');
    
    if (theme === 'light') {
        body.classList.add('theme-light');
        themeToggleText.textContent = '☀️';
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    } else {
        body.classList.add('theme-dark');
        themeToggleText.textContent = '🌙';
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
    }
    
    localStorage.setItem('theme', theme);
};

// Initialize theme on page load
const initializeTheme = () => {
    const currentTheme = getPreferredTheme();
    setTheme(currentTheme);
};

// Toggle theme
const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme') || getPreferredTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
};

// Initialize theme
initializeTheme();

// Listen for system theme changes only if no manual preference is set
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Theme toggle event listener
themeToggle.addEventListener('click', toggleTheme);

const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const randButton = document.getElementById('random-button');

const inputCategory = document.querySelector('.input-category');
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

    console.log(input);
    return input;
    
} catch (error) {
    console.error('Something went wrong', error);
    inputCategory.textContent = 'Could not fetch input category';
    inputName.textContent = 'Could not fetch input name';
    inputLocations.textContent = 'Could not fetch input locations';
    inputLoot.textContent = 'Could not fetch input loot';
    inputDescription.textContent = 'Could not fetch input description';
}
};

const inputToObj = (input) => {
    const info = {
        category: toTitleCase(input.data.category) || 'Not found!',
        inputName: toTitleCase(input.data.name) || 'Not found!',
        locations: (input.data.common_locations || []).join(', ') || 'Not found!',
        loot: (input.data.drops || []).map(toTitleCase).join(', ') || 'Not found!',
        description: input.data.description || 'Not found!'
    };
    return info;
}

const addInputToDom = (input) => {
    inputCategory.textContent = input.category;
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
        alert('You need to submit a monster, animal, item or ID!');
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