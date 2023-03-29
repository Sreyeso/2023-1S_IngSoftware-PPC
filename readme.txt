# ProyectoPOO
Este es un prototipo para un juego de ritmo basado en cuadriculas, para el curso de Programación Orientada a Objetos, UNAL 2021-2.

Integrantes:
Santiago Reyes Ochoa
Miguel Angel Suárez Cortés

* Objetivo
Emplear los conceptos de la POO introducidos en el curso, y aprovechar las librerias de terceros para construir un videojuego de ritmo con p5.js

* Solución
Para el trabajo conjunto se realizo Github como base del trabajo colaborativo, y utilizamos A Dance of Fire and Ice como referencia para nuestro juego. Con un sistema de casillas, implementamos una experiencia que le permite al jugador interactuar con el tablero al tiempo que los patrones del mismo crean melodias, dando la sensacion de un juego de ritmo. 

El codigo esta organizado de la siguiente manera:
1 - Las variables globales. Estas se organizaron por categorías, separandolas por su uso en el codigo. Se destacan las variables de control multimedia (Imagenes, DOM, Sonido), variables graficas (relacionadas al canvas), de control logico.

2 - Las clases. El objeto principal sobre el cual se desarrolla el juego es el tablero, que se basa de una matriz de objetos tipo casilla, cada una con ciertas propiedades que le brindan al usuario varias maneras de interactuar con  el tablero. Los metodos relacionados a estas clases, controlan el flujo del juego con respecto a la entrada del jugador.

3 - Funciones propias. Aqui se encuentran todas las funciones relacionadas con el control tanto del flujo del juego como de los menus, la funcionalidad del editor y la carga de niveles.

4 - Funciones definidas por P5. Aqui encontramos el setup y el draw donde se realiza todo el control del juego en si, y el flujo de operaciones en tiempo real para el control de la GUI. Además de esto encontramos funciones como la de la precarga de archivos multimedia, el ajuste dinamico del tamaño y el control por teclado. 

* Conclusiones, limitaciones y trabajo futuro

Conclusiones - 
Este proyecto nos brinda las bases, un framework reutilizable del que podemos plantear nuevas ideas de tile-based games. 
El trabajo colaborativo por medio de Github nos adentra en la experiencia colaborativa que se vive al trabajar, para prepararnos a un ambito profesional.

Limitaciones -
Implementacion de una GUI completamente dinamica, nos vemos limitados a un mapeo que no es 100% confiable.
La capacidad de exportar niveles y compartirlos de forma global con otros usuarios.

Trabajo futuro -
Implementacion de nuevas mecanicas de juego (coleccionables, bgm, etc.)
Brindar una experiencia para usuarios móviles.
Servidor para la subida de niveles hechos por usuarios.
