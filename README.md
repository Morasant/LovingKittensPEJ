# Lovingkittens

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.4.

## Instrucciones para ejecutar el proyecto

1. Es imprescindible tener instalado node.js y el gestor de paquetes npm para poder ejecutar el proyecto. 

- Para Windows/Mac: Instalamos node.js desde [aquí](https://nodejs.org/es/download)
- En Linux: `sudo apt install nodejs` y `sudo apt install npm`

2. Es Recomendable tener Git para poder clonar el proyecto directamente desde GitHub.

- Para Windows: [aquí](http://git-scm.com/download/win)  
- Para Mac: [aquí](http://mac.github.com)  
- Para Linux: `sudo apt install git`  

3. Una vez que se han instalado estas dos aplicaciones pasamos a descargarnos el repositorio donde se encuentra la aplicación que vamos a ejecutar.  Desde el cmd de Windows o el terminal de linux creamos y/o nos situamos en la carpeta donde queremos descargar la aplicación y escribimos los siguientes comandos:  

- `git clone https://github.com/Morasant/LovingKittensPEJ` 
- `cd LovingKittensPEJ`  

4. Ahora necesitaremos descargar todos los paquetes requeridos por la aplicación.  

- Escribimos `npm install` dentro de la carpeta de la aplicación.  

5. Por último, arrancamos el servidor con el comando `ng serve` dentro de la aplicación y cuando cargue en el navegador ponemos `http://localhost:4200/`.  

## Funcionalidades que faltan

1. 'Subiendo el nivel del Reto'  

- El resto de APIs: Esta función no he podido realizarla por falta de tiempo, creo que hubiese podido implementarla, buscando la relación con el usuario, creando los servicios correspondientes y enlazando con el controlador y la vista.

- La pantalla de búsqueda: Esta es la función que no he podido llevar al cabo del todo y la que ha dejado sin tiempo para hacer el resto. He implementado el formulario reactivo con el módulo ReactiveForms y los métodos FormBuilder y FormGroup en controlador y FormControl y FormControlName en la vista. Hacía todo lo indicado en el enunciado pero las peticiones las hacia letra a letra, he probado varias formas de hacerlo con setTimeout() y .debouncetime() y ninguna me ha llegado a funcionar, al final decidí dejarlo con el botón ya que de la otra forma morían demasiados gatitos...  

2. 'Becoming a pro'

- Con el formulario reactivo funcionando correctamente esta parte la habría implementado añadiendo el componente owner-list a la página nueva, a los métodos getOwnerList y getSearchDetail del servicio owner-list le añadiría el parámetro 'id?' y a la {ruta}?sort${id} que cuando id es '-id' devuelve la lista de usuarios de forma inversa y haciendo unos retoques en el componente para que estos cambios en el servicio se implementen bien con el controlador del componente.

3. 'Nivel God del Junior'

- Leyendo el apartado de este enunciado me resultó contradictorio al enunciado de los detalles en la lista de dueños al principio, ya que el motivo de hacer peticiones de nuevo al servidor para sacar el detalle es que el 'status' cambiaba con relativa facilidad y en este último paso nos aseguran que no es así, por lo tanto se me ocurre sacar el detalle directamente del array ownerList donde se van guardando la lista de usuarios y evitar hacer más peticiones al servidor con lo que se conseguiría el objetivo de hacer la aplicación más 'gatito friendly'.  

4. 'Funcionalidades extra'

- Me hubiera gustado añadirle algunas funcionalidades (más bien detallitos) más a la aplicación que no he podido realizar por falta de tiempo, cómo por ejemplo, avisos varios con alerts al usuario, para cuando el scroll llega al final de la página, cuando añade un favorito con éxito, cuando no se han encontrado dueños tanto en el listado general como en el de favoritos y situar los contadores siempre visibles cuando se haga infinite scroll.  

## Funcionalidades extras añadidas  

1. Durante la realización del proyecto he ido añadiendo algunos 'detalles' que me parecían interesantes y con los que me encontraba más a gusto mientras hacía pruebas, por ejemplo, botones de volver en ambas páginas, spinner de carga en el listado, alert cuando ya hay un dueño agregado a favoritos y no lo vuelve a meter en la lista ni aumenta el contador y hacer que el detalle baje según se vaya haciendo el infinite scroll.
 
 
 
 
 
 
 
 
 
 
 
