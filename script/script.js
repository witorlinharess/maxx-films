    const API_KEY = '3768af77daf09e55427b9e33fd7bc822'; // Substitua aqui
    const BASE_URL = 'https://api.themoviedb.org/3';
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';

    const featuredTitle = document.getElementById('featuredTitle');
    const featuredOverview = document.getElementById('featuredOverview');
    const featuredBackdrop = document.getElementById('featuredBackdrop');
    const moviesGrid = document.getElementById('moviesGrid');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const watchBtn = document.getElementById('watchBtn');

    // Função para buscar filmes populares
    async function fetchPopularMovies() {
      const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`);
      const data = await res.json();
      return data.results;
    }

    // Função para buscar filme por busca
    async function searchMovies(query) {
      const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}&page=1&include_adult=false`);
      const data = await res.json();
      return data.results;
    }

    // Exibir filmes na grid
    function displayMovies(movies) {
      moviesGrid.innerHTML = '';
      movies.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('cursor-pointer', 'transform', 'hover:scale-105', 'transition', 'duration-300', 'rounded', 'overflow-hidden', 'shadow-lg', 'bg-gray-900');
        movieEl.innerHTML = `
          <img src="${movie.poster_path ? IMG_URL + movie.poster_path : 'https://via.placeholder.com/500x750?text=Sem+Imagem'}" alt="${movie.title}" class="w-full h-auto" />
          <div class="p-2">
            <h4 class="text-sm font-semibold truncate">${movie.title}</h4>
            <p class="text-xs text-gray-400">${movie.release_date ? movie.release_date.substring(0,4) : ''}</p>
          </div>
        `;
        movieEl.addEventListener('click', () => setFeaturedMovie(movie));
        moviesGrid.appendChild(movieEl);
      });
    }

    // Definir filme em destaque
    function setFeaturedMovie(movie) {
      featuredTitle.textContent = movie.title;
      featuredOverview.textContent = movie.overview || 'Sem descrição disponível.';
      featuredBackdrop.style.backgroundImage = movie.backdrop_path ? `url(${IMG_URL + movie.backdrop_path})` : 'none';
      watchBtn.onclick = () => {
        alert(`Assistindo: ${movie.title}`);
      };
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Inicialização
    async function init() {
      const popularMovies = await fetchPopularMovies();
      displayMovies(popularMovies);
      if (popularMovies.length > 0) {
        setFeaturedMovie(popularMovies[0]);
      }
    }

    // Evento de busca
    searchBtn.addEventListener('click', async () => {
      const query = searchInput.value.trim();
      if (!query) return;
      const results = await searchMovies(query);
      if (results.length > 0) {
        displayMovies(results);
        setFeaturedMovie(results[0]);
      } else {
        moviesGrid.innerHTML = '<p class="col-span-full text-center text-gray-400">Nenhum filme encontrado.</p>';
      }
    });

    // Enter no input também faz busca
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        searchBtn.click();
      }
    });

    init();