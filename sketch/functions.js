
//Sobreescribe la variable lvl donde guarda las propiedades del nivel a mostrar
function inicializarlvl(filas, columnas, layout, tamcasilla,timing) {
    lvl = new nivel(filas, columnas, layout, tamcasilla,timing);
    px = lvl.xini; 
    py = lvl.yini;
    gx = lvl.xfin;
    gy = lvl.yfin;
  }
  
  /*
  //Movimiento invalido
  function miss(){  
    lvl.movfla=true;
    s_miss.play();
    lvl.misses+=1;
    combo='mal';
  }
  //Movimiento permitido
  function hit(){  
    lvl.movfla=true;
    lvl.timer=lvl.timing;
    combo='Bien';
  }
  */
  