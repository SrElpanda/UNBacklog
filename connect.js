document.querySelector('.search-bar + button').addEventListener('click', function() {
      const keyword = document.querySelector('.search-bar').value;
      
      // Show loading state
      document.getElementById('loading-state').classList.remove('hidden');
      
      // Simulate API call with timeout
      setTimeout(() => {
        document.getElementById('loading-state').classList.add('hidden');
      }, 1000);
    });
    
    // Add event listener for pressing Enter in search field
    document.querySelector('.search-bar').addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        document.querySelector('.search-bar + button').click();
      }
    });


function mostrarTramites(tramites) {
              const contenedor = document.getElementById('tramites');
              contenedor.innerHTML = '';
              tramites.forEach(tramite => {
                  const item = document.createElement('div');
                  item.className = "p-4 bg-gray-100 rounded-lg mb-4";
                  item.innerHTML = `
                      <h3 class="text-lg font-semibold text-gray-800 mb-2">${tramite.titulo}</h3>
                      <p class="article-text text-gray-600">${tramite.descripcion}</p>
                      <p class="article-text text-gray-600">Enlace para más información: <a class="text-blue-600" href = "${tramite.enlace}" target="_blank">${tramite.enlace}</a> </p>
                      <p class="article-text text-gray-600">Fecha de cierre: </p><p class="article-text text-red-600" >${tramite.date_cierre}</p>
                  `;
                  contenedor.appendChild(item);
              });
          }
      const inputBusqueda = document.getElementById("busqueda");
      const contenedorResultados = document.getElementById("tramites");
      const botonBuscar = document.getElementById("boton-buscar");


      
      inputBusqueda.addEventListener("input", async function () {
        const query = inputBusqueda.value.trim();

        if (query === "") {
          contenedorResultados.innerHTML = ""; // limpia si no hay texto
          return;
        }

        try {
          const res = await fetch(`https://unbacklog.onrender.com/api/tramites?q=${encodeURIComponent(query)}`);
          const data = await res.json();

          if (data.length === 0) {
            contenedorResultados.innerHTML = "<h3 class='text-lg font-semibold text-gray-800 mb-2'>No se encontraron resultados</h3>";
            return;
          }
          mostrarTramites(data);
          // Mostrar resultados
          
          
        } catch (err) {
          console.error("Error al buscar:", err);
          contenedorResultados.innerHTML = "<p>Error al buscar trámites</p>";
        }
      });
      
