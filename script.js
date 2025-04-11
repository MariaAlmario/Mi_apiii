document.addEventListener('DOMContentLoaded', () => {
    // Ocultar el splash screen después de 3 segundos
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
    }, 3000);

    // Funcionalidad de búsqueda
    document.getElementById('buscador').addEventListener('input', (e) => {
        console.log("Buscando:", e.target.value);
    });

    // Funcionalidad de filtro
    document.getElementById('filtro').addEventListener('change', (e) => {
        console.log("Filtrando por:", e.target.value);
    });

    // Espacio para vincular API
    const apiURL = "https://picsum.photos/";
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Manejo de elementos obtenidos
        })
        .catch(error => console.error('Error al consumir API:', error));

    // CRUD en almacenamiento local
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    function agregarFavorito(item) {
        favoritos.push(item);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }

    function eliminarFavorito(item) {
        const index = favoritos.indexOf(item);
        if (index > -1) {
            favoritos.splice(index, 1);
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
        }
    }

    function listarFavoritos() {
        console.log('Favoritos:', favoritos);
    }

    // Función original: Ejemplo de un hechizo interactivo
    document.getElementById('hechizo-interactivo').addEventListener('click', () => {
        alert('¡Expelliarmus!');
    });
});