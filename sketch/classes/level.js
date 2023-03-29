class nivel {
  //añadir variable nombre y tutorial,
  //dependiendo del nivel, puede haber o no tutorial.
  //añadir metodo para imprimir este nombre encima del nivel,
  //y el tutorial por debajo
  constructor(filas, columnas, layout, tamcasilla, timing) {
    //Definidos por constructor
    this.f = filas;
    this.c = columnas;
    this.layout = layout; //Disposicion del nivel (arreglo)
    this.timing = timing; //Valor en ms de la ventana para hacer un movimiento
    //antes de que mande miss (limite superior)
    this.timer = this.timing; //Valor actual del timer
    this.tamcasilla = tamcasilla;

    //Definidos por inicializacion
    this.tablero = []; //Representacion del nivel (matriz)
    this.xini = 0; //Posicion inicial del jugador en x
    this.yini = 0; //Posicion inicial del jugador en y
    this.xfin = 0; //Posicion en x de la casilla final
    this.yfin = 0; //Posicion en y de la casilla final
    this.contcas = 0; //Cantidad de casillas asociadas al ranking final del nivel

    //Definido por calculo dinamico
    this.compl = 0;
    this.movfla = false; //Registro de cuando el usuario interacciona por primera vez con el tablero
    //(para que inicie el contador de timing)
    this.misses = 0; //Misses en 0 al inicio del lvl
    this.ranking = "S"; //Ranking inicial de cada lvl

    //Centrado del tablero
    this._ajustex = (width - this.f * this.tamcasilla) * 0.5;
    this._ajustey = (height - this.c * this.tamcasilla) * 0.5;

    this.inicializar();
  }

  inicializar() {
    for (let i = 0; i < this.c; i++) {
      let fila = [];
      for (let j = 0; j < this.f; j++) {
        //leer la disposicion del tablero (guardar las propiedades de la casilla)
        let prop = this.layout[i * this.f + j];
        let propcomp = prop[0] + prop[1] + prop[2];

        //Contar las casillas de juego
        if (propcomp != "00n") {
          this.contcas += 1;
        }
        //Ubicar la casilla inicial
        if (propcomp == "20n") {
          this.xini = i;
          this.yini = j;
          this.contcas -= 1;
        }
        //Ubicar la casilla final
        if (propcomp == "30n") {
          this.xfin = i;
          this.yfin = j;
          this.contcas -= 1;
        }

        //crear el objeto casilla con las propiedades que va en esa posicion del tbalero
        let cas = new casilla(int(prop[0]), int(prop[1]), prop[2]);
        fila.push(cas);
      }
      this.tablero.push(fila);
    }
  }

  dibujar() {
    this.tamcasilla = map(max(this.f, this.c), 1, 15, 80, 40);
    this._ajustex = (width - this.f * this.tamcasilla) * 0.5;
    this._ajustey = (height - this.c * this.tamcasilla) * 0.5;

    score.position(lvl._ajustex, lvl._ajustey - 2 * lvl.tamcasilla);
    exportlvl.position(
      lvl._ajustex + int(lvl.f * 0.485) * lvl.tamcasilla,
      lvl._ajustey + (lvl.c + 0.2) * lvl.tamcasilla
    );
    sldrtiming.position(
      lvl._ajustex - lvl.tamcasilla * 3,
      lvl._ajustey + 2 * lvl.tamcasilla
    );
    timingtxt.position(
      lvl._ajustex - lvl.tamcasilla * 3,
      lvl._ajustey + lvl.tamcasilla
    );
    timingtxt.style("font-size", +str(lvl.tamcasilla * 0.45) + "px");
    score.style("font-size", +str(lvl.tamcasilla * 0.45) + "px");

    //Recorrer el tablero
    for (let i = 0; i < this.c; i++) {
      for (let j = 0; j < this.f; j++) {
        //Ajuste centrado
        let x = this._ajustex + j * this.tamcasilla;
        let y = this._ajustey + i * this.tamcasilla;
        //Traer las propiedades de la casilla actual
        let cas = this.tablero[i][j];

        push(); //Graba la configuración actual de estilo de dibujo
        stroke("black");
        fill(cas.color);

        //Imprimir la casilla
        rect(x, y, this.tamcasilla, this.tamcasilla);
        if (cas.tipo != 0) {
          fill("white");
          textStyle("italic");
          textSize(this.tamcasilla * 0.45);

          if (cas.n != 0) {
            //Imprimir el numero de la casilla
            text(cas.n, x + this.tamcasilla / 2.6, y + this.tamcasilla / 1.5);
          }
        }
        pop(); //Deja la configuracion del estilo de dibujo como estaba antes del push
      }
    }
  }

  hasstart() {
    for (let i = 0; i < this.c; i++) {
      for (let j = 0; j < this.f; j++) {
        let cas = this.tablero[i][j];
        if (cas.tipo == 2) {
          return true;
        }
      }
    }
    return false;
  }

  hasfinish() {
    for (let i = 0; i < this.c; i++) {
      for (let j = 0; j < this.f; j++) {
        let cas = this.tablero[i][j];
        if (cas.tipo == 3) {
          return true;
        }
      }
    }
    return false;
  }
}
