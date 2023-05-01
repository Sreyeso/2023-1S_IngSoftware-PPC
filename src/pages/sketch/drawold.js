/*
  switch(game){//Control del juego //0-menu inicial 1-juego 2-editor 3-exit
    case('0'): //Volver al menu
      clear();
      background('mediumpurple');
      exportlvl.hide();
      sldrtiming.hide();
      timingtxt.hide();
      score.hide();
      
    break;
    case('1'): //Juego
    background('mediumpurple');
    push();
    textSize(lvl.tamcasilla*0.3);
    text('Presiona ESC para ver el tutorial (El juego no se pausara!)',10,height-30);
    pop();
    //Imprimir el nivel
    lvl.dibujar();
    score.html(lvl.ranking+'<br>Misses: '+lvl.misses);
    //Imprimir la barra de timing
    push();
    stroke("black");
    fill('red');
    rect(lvl._ajustex, //Coordenada x
    lvl._ajustey-(lvl.tamcasilla*0.5), //Coordenada y
    map(lvl.timer,0,lvl.timing,0,((0.5*lvl.f)*lvl.tamcasilla)), //Ancho
    (0.2*lvl.tamcasilla)); //Largo
    pop();
    //Control de la barra de timing
    if (lvl.timer>0 && lvl.movfla){
        lvl.timer-=1;
    }
    if (lvl.timer==0){
      miss();
      lvl.timer=lvl.timing;
  }

    //Imprimir al jugador
    x = lvl._ajustex + (int(py) * lvl.tamcasilla);
    y = lvl._ajustey + (int(px) * lvl.tamcasilla);

    push();
    strokeWeight(5.5);
    stroke(pc[combo]);
    noFill();
    rect(x,y,lvl.tamcasilla,lvl.tamcasilla);
    pop();

    //Scoremeter
    if(lvl.misses>lvl.contcas*0.8){
      lvl.ranking='F';
    }
    else if (lvl.misses>lvl.contcas*0.7){
      lvl.ranking='E';
    }
    else if (lvl.misses>lvl.contcas*0.6){
      lvl.ranking='D';
    }
    else if (lvl.misses>lvl.contcas*0.5){
      lvl.ranking='C';
    }
    else if (lvl.misses>lvl.contcas*0.3){
      lvl.ranking='B';
    }
    else if (lvl.misses>0){
      lvl.ranking='A';
    }else{
      lvl.ranking='S';
    }

    if(escfla){
      image(tutogame,0,0,map(1920,0,1920,0,width),map(1080,0,1080,0,height));
      score.hide();
      text('Presiona ESC para ocultar',10,height-30);
    }else{
      score.show();
    }

    //Condicion de victoria 
    if (px == lvl.xfin && py == lvl.yfin) {
      if(lvl.compl!=lvl.contcas+1){
        game='0';
        Swal.fire({
          title: 'No completaste todas las casillas, has perdido!',
          toast: true,
          timer: 3000,
          confirmButtonColor: 'chartreuse'
        }).then(
          showMenu
        );
      }else{
      s_fin.play();
      game = '0';
      nlvl++;
      //alerta
      Swal.fire({
        title: '<b> Nivel Completado ! </b>',
        text:('Rango obtenido: '+ lvl.ranking +'- Numero de fallos: '+lvl.misses),
        color:'white',
        showDenyButton: true,
        focusConfirm: true,
        reverseButtons: true,
        allowOutsideClick: false,
        confirmButtonText: 'Siguiente',
        denyButtonText: 'Volver al menú',
        confirmButtonColor: 'chartreuse',
        cancelButtonColor: 'tomato',

      }).then((result) => {
        if (result.isConfirmed) {
          game = '1';
          loadLevel(nlvl,0); 
          //Ranking dinamico
          score.show();        
        }
        else {
          nlvl = 0;
          showMenu();
        }
      }
      );
    }
    }
    break;

    case('2'): //Editor
      background('mediumpurple');
      text('Presiona ESC para ver informacion',10,height-30);
      sldrtiming.style('width', 2.3*lvl.tamcasilla+'px');
      timingtxt.html('Timing: '+str(sldrtiming.value()));
      push();
      textSize(lvl.tamcasilla*0.5);
      pop();
      //Imprimir el nivel
      lvl.dibujar();
     //Imprimir al jugador
      x = lvl._ajustex + (int(py) * lvl.tamcasilla);
      y = lvl._ajustey + (int(px) * lvl.tamcasilla);
  
      push();
      strokeWeight(5.5);
      stroke("darkorchid");
      noFill();
      rect(x,y,lvl.tamcasilla,lvl.tamcasilla);
      pop();

      if(escfla){
        image(tutoedit,0,0,map(1920,0,1920,0,width),map(1080,0,1080,0,height));
        exportlvl.hide();
        sldrtiming.hide();
        timingtxt.hide();
        score.hide();
        text('Presiona ESC para ocultar',10,height-30);
      }else{
        exportlvl.show();
        sldrtiming.show();
        timingtxt.show();
        score.show();
      }
    break;
    default:
      alert('chao');
    break;
  }
*/