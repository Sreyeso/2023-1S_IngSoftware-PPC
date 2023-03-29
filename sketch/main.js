
/*
function preload() { 
  soundFormats('wav');
  s_zeta= loadSound('media/z.wav');
  s_equis= loadSound('media/x.wav');
  s_fin= loadSound('media/fin.wav');
  s_normal= loadSound('media/normal.wav');
  s_miss= loadSound('media/combobreak.wav');
  tutogame=loadImage('media/tutorialgame.png');
  tutoedit=loadImage('media/tutorialeditor.png');
  lvls =loadJSON('levels/levels.json');
}
*/

function windowResized() {
  width = windowWidth;
  height = windowHeight;
}

function setup() {
/*
  frameRate(60);
  //Ajuste del canvas por posicion absoluta
  canvas = createCanvas(windowWidth, windowHeight);
  background('mediumpurple');
  width = windowWidth;
  height = windowHeight;

  //Cargo nivel inicial
  //Inicializar el Player Color (Depende de si el movimiento del jugador es valido o no)
  pc = {'Bien' : 'darkorchid' , 'mal' : 'red'}

  //Volumen
  outputVolume(0.2);

   //Elementos DOM
  score = createElement('h1',"");
  score.hide();
    //boton exportar
  exportlvl=createButton('Exportar');
  exportlvl.position(0,0);
  exportlvl.hide();
  exportlvl.mouseClicked(saveLevel);
    //slider timing
  sldrtiming = createSlider(50,300,150,50);
  sldrtiming.position(0,0);
  sldrtiming.style('width', '100px');
  sldrtiming.hide();
  //texto slider timing
  timingtxt = createElement('p'," ");
  timingtxt.position(0,0);
  timingtxt.hide();
  showMenu();
  //Volumen
  outputVolume(0.2);
  inicializarlvl(1,1,["20n"],45,150);
*/
canvas = createCanvas(windowWidth,windowHeight);
background('tomato');
}
function draw() {
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
  */
}

function keyPressed(){
  switch(game){//Control del juego
                //Control del jugador
                //CONDICIONES DE MOVIMIENTO
                //No se puede mover hacia una casilla gris
                //al salir de una casilla, la anterior se marca como completada
                //No se puede mover hacia una casilla completada

    case('1'):  //Juego
    switch(keyCode){
      case(RIGHT_ARROW):
      if (py+1<=lvl.f){
        if(
          lvl.tablero[px][py+1].tipo!=0 &&
          lvl.tablero[px][py].n==0 &&
          lvl.tablero[px][py+1].tipo!=4
          ){
          py+=1;
          lvl.tablero[px][py-1].completar();
          s_normal.play();
          hit();
          }else{
            miss();
          }
      }else{
        miss();
      }
      break;
      case(LEFT_ARROW):
      if (py-1>=0){
        if(
          lvl.tablero[px][py-1].tipo!=0 &&
          lvl.tablero[px][py].n==0 &&
          lvl.tablero[px][py-1].tipo!=4
          ){
          py-=1;
          lvl.tablero[px][py+1].completar();
          s_normal.play();
          hit();
          }else{
            miss();
          }
      }else{
        miss();
      }
      break;
      case(UP_ARROW):
      if (px-1>=0){
        if(
          lvl.tablero[px-1][py].tipo!=0 &&
          lvl.tablero[px][py].n==0 &&
          lvl.tablero[px-1][py].tipo!=4
          ){
          px-=1;
          lvl.tablero[px+1][py].completar();
          s_normal.play();
          hit();
          }else{
            miss();
          }
      }else{
        miss();
      }
      break;
      case(DOWN_ARROW):
      if (px+1<=lvl.c){
        if(
          lvl.tablero[px+1][py].tipo &&
          lvl.tablero[px+1][py].tipo!=0 &&
          lvl.tablero[px][py].n==0 &&
          lvl.tablero[px+1][py].tipo!=4
          ){
          px+=1;
          lvl.tablero[px-1][py].completar();
          s_normal.play();
          hit();
        }else{
          miss();
        }
      }
      else{
        miss();
      }
      break;
      case(90):
      if(
        lvl.tablero[px][py].tipo==5 &&
        lvl.tablero[px][py].n>0
        ){
          lvl.tablero[px][py].n-=1;
          if(lvl.tablero[px][py].n==0){
              lvl.tablero[px][py].vaciar();  
          }
        s_zeta.play();
        hit();
      }else{
        miss();
      }
      break;
      case(88):
      if(
        lvl.tablero[px][py].tipo==6 &&
        lvl.tablero[px][py].n>0
        ){
          lvl.tablero[px][py].n-=1;
          if(lvl.tablero[px][py].n==0){
            lvl.tablero[px][py].vaciar();  
        }
        s_equis.play();
        hit();
      }else{
        miss();
      }
      break;
      case(27): //ESC
      if(!escfla){
        escfla=true;
      }
      else{
        escfla=false;
      }
      break;
      default:
        miss();
      break;
    }
    break;

    /*
    case('2')://Editor
    switch(keyCode){
      //Movimiento de seleccionar casilla
      case(RIGHT_ARROW):
        py+=1;
        py=py%lvl.f;
      break;
      case(LEFT_ARROW):
        if(py<=0){
        py=lvl.f-1;
        }else{
          py-=1;
        }
      break;
      case(DOWN_ARROW):
        px+=1;
        px=px%lvl.c;
      break;
      case(UP_ARROW):
        if(px<=0){
        px=lvl.c-1;
        }else{
          px-=1;
        }
      break;
      //Asignar propiedades a la casilla hovereada
      case(90): //Z
        lvl.tablero[px][py].tipo=5;
        lvl.tablero[px][py].n=1;
        lvl.tablero[px][py].inicializar();
      break;
      case(88): //X
        lvl.tablero[px][py].tipo=6;
        lvl.tablero[px][py].n=1;
        lvl.tablero[px][py].inicializar();
      break;
      case(49): //1
        lvl.tablero[px][py].n=1;
        lvl.tablero[px][py].inicializar();
      break;
      case(50): //2
        lvl.tablero[px][py].n=2;
        lvl.tablero[px][py].inicializar();
      break;
      case(51): //3
        lvl.tablero[px][py].n=3;
        lvl.tablero[px][py].inicializar();
      break;
      case(52): //4
        lvl.tablero[px][py].n=4;
        lvl.tablero[px][py].inicializar();
      break;
      case(53): //5
        lvl.tablero[px][py].n=5;
        lvl.tablero[px][py].inicializar();
      break;
      case(54): //6
        lvl.tablero[px][py].n=6;
        lvl.tablero[px][py].inicializar();
      break;
      case(55): //7
        lvl.tablero[px][py].n=7;
        lvl.tablero[px][py].inicializar();
      break;
      case(56): //8
        lvl.tablero[px][py].n=8;
        lvl.tablero[px][py].inicializar();
      break;
      case(57): //9
        lvl.tablero[px][py].n=9;
        lvl.tablero[px][py].inicializar();
      break;
      case(48): //0
        lvl.tablero[px][py].n=0;
        lvl.tablero[px][py].inicializar();
      break;
      case(67): //C
        lvl.tablero[px][py].tipo=1;
        lvl.tablero[px][py].inicializar();
        break;
      case(66): //B
        lvl.tablero[px][py].tipo=0;
        lvl.tablero[px][py].inicializar();
      break;
      case(83): //S
      if (!lvl.hasstart()){
        lvl.tablero[px][py].tipo=2;
        lvl.tablero[px][py].inicializar();
      }
        
      break;
      case(70): //F
      if (!lvl.hasfinish()){
        lvl.tablero[px][py].tipo=3;
        lvl.tablero[px][py].inicializar();
      }
      break;
      case(27): //ESC
      if(!escfla){
        escfla=true;
      }
      else{
        escfla=false;
      }
      break;
      default:
        break;
    }
    break;
    */
  }
}

