class casilla {
  constructor(tipo, numero, objeto) {
    //Definidas por constructor
    this.n = numero;
    this.objeto = objeto;
    this.tipo = tipo;

    //Valor por defecto (definida por inicializacion)
    this.color = "white";

    this.inicializar();
  }
  inicializar() {
    switch (this.tipo) {
      case 0: //Casilla limite (limite del nivel)
        this.color = "lightsteelblue";
        if (this.n != 0) {
          this.n = 0;
        }
        break;
      case 1: //Casilla vacía (cualquier dirección)
        this.color = "white";
        if (this.n != 0) {
          this.n = 0;
        }
        break;
      case 2: //Casilla de inicio
        this.color = "darkkhaki";
        if (this.n != 0) {
          this.n = 0;
        }
        break;
      case 3: //Casilla final
        this.color = "chartreuse";
        if (this.n != 0) {
          this.n = 0;
        }
        break;
      case 4: //Casilla completada
        this.color = "aquamarine";
        break;
      case 5: //Casilla azul (tecla z)
        this.color = "lightskyblue";
        if (this.n == 0) {
          this.n = 1;
        }
        break;
      case 6: //Casilla roja (tecla x)
        this.color = "firebrick";
        if (this.n == 0) {
          this.n = 1;
        }
        break;
      default:
        this.color = "purple";
    }
  }
  /*
    completar(){
      this.tipo=4;
      this.inicializar();
      lvl.compl+=1;
    }
    vaciar(){
      this.tipo=1;
      this.inicializar();
    }
    */
}
