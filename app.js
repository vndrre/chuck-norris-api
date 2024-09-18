import chuckNorrisAPI from "./api/chuckNorrisApi"

const RandomJokeHTMLElement = document.querySelector('.random-jokes');
const CategoriesHTMLElement = document.querySelector('#categories');
const buttonElement = document.querySelector('.generate-joke-button');
const searchElement = document.querySelector('#search');
const searchResultWrapper = document.querySelector('.search-results');
const resultCountWrapper = document.querySelector('.result-count');


let selectedCategory = null;


const fetchRandomJokes = async (category = '') => {
    try {
        const response = await chuckNorrisAPI.get(`/random?category=${category}`);

        return response.data;
    } catch (error) {
        throw new Error('Something went terribly wrong!');
    }
};


const OptionCategory = async () => {
    try {
        const response = await chuckNorrisAPI.get(`/categories`)

        return response.data;
    } catch (error) {
        throw new Error('Something went terribly wrong!');
    }
};


const displayRandomJoke = async () => {
    const joke = await fetchRandomJokes();
    RandomJokeHTMLElement.innerHTML = ''; 
    appendJokeToRandomJokes(joke.value);  
};


const appendJokeToRandomJokes = (jokeText) => {
    const jokeElement = document.createElement('div');
    jokeElement.classList.add('joke-box'); 
    jokeElement.textContent = jokeText;
    RandomJokeHTMLElement.appendChild(jokeElement);
};


const fillSelectWithOptions = async () => {
    const categories = await OptionCategory();
    if (!categories) return;
    categories.forEach((category) => {
        const option = new Option(category, category);
        CategoriesHTMLElement.append(option);
    });
};


CategoriesHTMLElement.addEventListener('change', async (event) => {
    selectedCategory = event.currentTarget.value;
    const response = await fetchRandomJokes(selectedCategory);
    RandomJokeHTMLElement.innerHTML = ''; 
    appendJokeToRandomJokes(response.value); 
});


buttonElement.addEventListener('click', async (event) => {
    const response = await fetchRandomJokes(selectedCategory);
    RandomJokeHTMLElement.innerHTML = ''; 
    appendJokeToRandomJokes(response.value); 
});


searchElement.addEventListener('input', async (event) => {
    const query = event.currentTarget.value;
    if (query.length < 3) {
        searchResultWrapper.innerHTML = ''; 
        resultCountWrapper.textContent = '';
        return;
    }

    const response = await searchQuery(query);

    
    const resultCountPrural = response.total === 1 ? 'joke' : 'jokes';
    resultCountWrapper.innerText = `Found ${response.total} ${resultCountPrural}.`;

   
    searchResultWrapper.innerHTML = '';

    
    response.result.forEach(joke => {
        const jokeElement = document.createElement('div');
        jokeElement.classList.add('joke-box');
        jokeElement.textContent = joke.value;
        searchResultWrapper.appendChild(jokeElement);
    });
});


const searchQuery = async (query) => {
    const response = await chuckNorrisAPI.get(`/search?query=${query}`);

    return response.data;
};


fetchRandomJokes();
displayRandomJoke();
fillSelectWithOptions();