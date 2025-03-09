const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTAxZDAwYWQ1YmQ5ZWI5YjdlZTJmMTJhZmI4MjMwZSIsIm5iZiI6MTc0MTM3ODU3Mi40ODk5OTk4LCJzdWIiOiI2N2NiNTQwY2U5NDYxYWRmNDE0ZjYwODgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-5a9NUP8mBBAzWS0s4J5OYFTjOG2KtXrPDn4wOyN0Y4'; // Bearer Token
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

function getMovies(url) {
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`Erro HTTP! Status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        console.log(data.results);
        if (data.results.length !== 0) {
            showMovies(data.results);
        } else {
            main.innerHTML = `<h1 class="no-results">No Results Found</h1>`;
        }
    })
    .catch(error => console.error("Erro ao buscar os filmes:", error));
}

function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview, id } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${poster_path ? IMG_URL + poster_path : "http://via.placeholder.com/1080x1580"}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
                <br/> 
                <button class="know-more" id="${id}">Know More</button>
            </div>
        `;
        main.appendChild(movieEl);

        document.getElementById(id).addEventListener('click', () => {
            console.log(id);
        });
    });
}

function getColor(vote) {
    if (vote >= 8) return 'green';
    if (vote >= 5.5) return 'orange';
    return 'red';
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(`${BASE_URL}/search/movie?query=${searchTerm}&api_key=${API_KEY}`);
    }
});
