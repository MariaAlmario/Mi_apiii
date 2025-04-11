document.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splash-screen');
    setTimeout(() => {
      splash.style.display = 'none';
    }, 2000);
  
    const imageList = document.getElementById('image-list');
    const searchInput = document.getElementById('search-input');
    const filterSelect = document.getElementById('filter-select');
  
    // ⭐ Espacio para conectar a la API de Picsum
    async function fetchImages() {
      try {
        const res = await fetch('https://picsum.photos/v2/list?page=1&limit=20');
        const data = await res.json();
        displayImages(data);
      } catch (err) {
        console.error('Error al obtener imágenes:', err);
      }
    }
  
    function displayImages(images) {
      imageList.innerHTML = '';
      images.forEach(img => {
        const imgDiv = document.createElement('div');
        imgDiv.innerHTML = `
          <img src="${img.download_url}" alt="${img.author}" width="100%" />
          <p>${img.author}</p>
          <button onclick="addToFavorites('${img.id}')">⭐ Favorito</button>
        `;
        imageList.appendChild(imgDiv);
      });
    }
  
    // Buscar (simple por nombre de autor)
    searchInput.addEventListener('input', async () => {
      const query = searchInput.value.toLowerCase();
      const res = await fetch('https://picsum.photos/v2/list?page=1&limit=50');
      const data = await res.json();
      const filtered = data.filter(img => img.author.toLowerCase().includes(query));
      displayImages(filtered);
    });
  
    // Filtro (grayscale, blur)
    filterSelect.addEventListener('change', () => {
      const filter = filterSelect.value;
      const images = document.querySelectorAll('#image-list img');
      images.forEach(img => {
        let url = img.src.split('?')[0];
        if (filter === 'grayscale') {
          img.src = `${url}?grayscale`;
        } else if (filter === 'blur') {
          img.src = `${url}?blur`;
        } else {
          img.src = url;
        }
      });
    });
  
    // CRUD Favoritos en localStorage
    window.addToFavorites = function (id) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      if (!favorites.includes(id)) {
        favorites.push(id);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Agregado a favoritos');
      }
    };
  
    // 🔥 Feature única: Galería tipo carrusel automático (opcional)
    // Aquí podrías crear una sección con una galería automática, si quieres te ayudo con eso.
  
    fetchImages();
  });
  