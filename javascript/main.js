//EFECTO ACORDEÓN//
        //Variables
        let visible;
        let años = document.querySelectorAll('.year');
        let publicaciones = document.querySelectorAll('.articulos');
        //Bucle para tener las alturas de los ul
        for (let i = 0; i < publicaciones.length; i++) {
            const altura = publicaciones[i].scrollHeight;
            publicaciones[i].dataset.alto = altura;
            publicaciones[i].style.height = '0px';
        }
        //Función para mostrar los párrafos
        function muestraParrafo(elemento) {
            let nodo = elemento.nextElementSibling;
            if (nodo == visible) {
                ocultaParrafo(nodo);
                visible = undefined;
            } else {
                ocultaParrafo(visible);
                let altura = nodo.dataset.alto;
                nodo.style.height = altura + 'px';
                visible = nodo;
                let arr_h3 = [...años];
                let pos = arr_h3.indexOf(elemento);
                let scroll_top = tops[pos];
                window.scrollTo({
                    top: scroll_top,
                    behavior: "smooth"
                });
            }
        }
        //Función para obtener las posiciones de cada año y desplazar la ventana
        const tops = [];
        for (let i = 0; i < años.length; i++) {
            tops[i] = años[i].offsetTop;
        }
        //Función para ocultar el elemento visible
        function ocultaParrafo(elemento) {
            //si el elemento está visible lo ocultamos
            if (elemento != undefined) {
                elemento.style.height = '0px';
            }
        }
        //Asignación dinámica de función a cada pregunta
        for (let año of años) {
            año.onclick = function () {
                muestraParrafo(this);
            }
        }

        //EFECTO COPIA DE REFERENCIAS//
        //variable
        const BTN_COPY = document.querySelectorAll('.btn-copiar');
        //Función para copiar el texto
        function copiarCita(boton) {
            // Busca el texto de la cita dentro del mismo elemento <li>
            const itemLista = boton.closest('.li-item');
            const textoCita = itemLista.querySelector('.cita-texto').innerText.trim();

            // Copia al portapapeles
            navigator.clipboard.writeText(textoCita).then(() => {
                const contenidoOriginal = boton.innerHTML;

                // Cambia el aspecto del botón
                boton.innerHTML = '✓ Copied!';
                boton.classList.add('copiado');

                // Restaura el botón tras 2 segundos
                setTimeout(() => {
                    boton.innerHTML = contenidoOriginal;
                    boton.classList.remove('copiado');
                }, 1000);
            }).catch(err => {
                console.error('Error al copiar la cita: ', err);
            });
        }
        //Evento
        for (const boton of BTN_COPY) {
            boton.onclick = () => copiarCita(boton);
        }
