const randomJokeHtmlElement = document.querySelector('.random-joke')
const selectHtmlELement = document.querySelector('#categories')
const buttonElement = document.querySelector('.generate-joke-button')

const base_url="https://api.chucknorris.io/jokes"
let selectedCategories = null


const fetchRandomJokes = async (category = '') => {
    try {
        const response = await fetch(`${base_url}/random?categpry=${category}`)
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error('Something went terribly wrong!')
    }
}

const displayRandomJokes = async () => {
    const joke = await fetchRandomJokes()
    randomJokeHtmlElement.textContent = joke.value
}


const fetchCategories = async () => {
    try {
        const response = await fetch(`${base_url}/categories`)
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error('Something went wrong :(')
    }
}


const fillSelectWithOptions = async () => {
    const categories = await fetchCategories()

    if(!categories) return

    categories.forEach((category) => {
        const option = new Option(category, category)
        selectHtmlELement.append(option)
    })
}

selectHtmlELement.addEventListener('change', async (event) => {
    selectedCategories = event.currentTarget.value
    const respose = await fetchRandomJokes(selectedCategories)
    randomJokeHtmlElement.textContent = respose.value
})

buttonElement.addEventListener('click', async (event) => {
    const response = await fetchRandomJokes(selectedCategories)
    randomJokeHtmlElement.textContent = response.value
})


fetchRandomJokes()
fetchCategories()
fillSelectWithOptions()