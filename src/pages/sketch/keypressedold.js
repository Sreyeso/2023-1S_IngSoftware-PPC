
function keyPressed(){
  // switch(game){//Control del juego
  //               //Control del jugador
  //               //CONDICIONES DE MOVIMIENTO
  //               //No se puede mover hacia una casilla gris
  //               //al salir de una casilla, la anterior se marca como completada
  //               //No se puede mover hacia una casilla completada
  //   case('1'):  //Juego
  //   switch(keyCode){
  //     case(RIGHT_ARROW):
  //     if (py+1<=lvl.f){
  //       if(
  //         lvl.tablero[px][py+1].tipo!=0 &&
  //         lvl.tablero[px][py].n==0 &&
  //         lvl.tablero[px][py+1].tipo!=4
  //         ){
  //         py+=1;
  //         lvl.tablero[px][py-1].completar();
  //         s_normal.play();
  //         hit();
  //         }else{
  //           miss();
  //         }
  //     }else{
  //       miss();
  //     }
  //     break;
  //     case(LEFT_ARROW):
  //     if (py-1>=0){
  //       if(
  //         lvl.tablero[px][py-1].tipo!=0 &&
  //         lvl.tablero[px][py].n==0 &&
  //         lvl.tablero[px][py-1].tipo!=4
  //         ){
  //         py-=1;
  //         lvl.tablero[px][py+1].completar();
  //         s_normal.play();
  //         hit();
  //         }else{
  //           miss();
  //         }
  //     }else{
  //       miss();
  //     }
  //     break;
  //     case(UP_ARROW):
  //     if (px-1>=0){
  //       if(
  //         lvl.tablero[px-1][py].tipo!=0 &&
  //         lvl.tablero[px][py].n==0 &&
  //         lvl.tablero[px-1][py].tipo!=4
  //         ){
  //         px-=1;
  //         lvl.tablero[px+1][py].completar();
  //         s_normal.play();
  //         hit();
  //         }else{
  //           miss();
  //         }
  //     }else{
  //       miss();
  //     }
  //     break;
  //     case(DOWN_ARROW):
  //     if (px+1<=lvl.c){
  //       if(
  //         lvl.tablero[px+1][py].tipo &&
  //         lvl.tablero[px+1][py].tipo!=0 &&
  //         lvl.tablero[px][py].n==0 &&
  //         lvl.tablero[px+1][py].tipo!=4
  //         ){
  //         px+=1;
  //         lvl.tablero[px-1][py].completar();
  //         s_normal.play();
  //         hit();
  //       }else{
  //         miss();
  //       }
  //     }
  //     else{
  //       miss();
  //     }
  //     break;
  //     case(90):
  //     if(
  //       lvl.tablero[px][py].tipo==5 &&
  //       lvl.tablero[px][py].n>0
  //       ){
  //         lvl.tablero[px][py].n-=1;
  //         if(lvl.tablero[px][py].n==0){
  //             lvl.tablero[px][py].vaciar();  
  //         }
  //       s_zeta.play();
  //       hit();
  //     }else{
  //       miss();
  //     }
  //     break;
  //     case(88):
  //     if(
  //       lvl.tablero[px][py].tipo==6 &&
  //       lvl.tablero[px][py].n>0
  //       ){
  //         lvl.tablero[px][py].n-=1;
  //         if(lvl.tablero[px][py].n==0){
  //           lvl.tablero[px][py].vaciar();  
  //       }
  //       s_equis.play();
  //       hit();
  //     }else{
  //       miss();
  //     }
  //     break;
  //     case(27): //ESC
  //     if(!escfla){
  //       escfla=true;
  //     }
  //     else{
  //       escfla=false;
  //     }
  //     break;
  //     default:
  //       miss();
  //     break;
  //   }
  //   break;
  //   case('2')://Editor
  //   switch(keyCode){
  //     //Movimiento de seleccionar casilla
  //     case(RIGHT_ARROW):
  //       py+=1;
  //       py=py%lvl.f;
  //     break;
  //     case(LEFT_ARROW):
  //       if(py<=0){
  //       py=lvl.f-1;
  //       }else{
  //         py-=1;
  //       }
  //     break;
  //     case(DOWN_ARROW):
  //       px+=1;
  //       px=px%lvl.c;
  //     break;
  //     case(UP_ARROW):
  //       if(px<=0){
  //       px=lvl.c-1;
  //       }else{
  //         px-=1;
  //       }
  //     break;
  //     //Asignar propiedades a la casilla hovereada
  //     case(90): //Z
  //       lvl.tablero[px][py].tipo=5;
  //       lvl.tablero[px][py].n=1;
  //       lvl.tablero[px][py].inicializar();
  //     break;
  //     case(88): //X
  //       lvl.tablero[px][py].tipo=6;
  //       lvl.tablero[px][py].n=1;
  //       lvl.tablero[px][py].inicializar();
  //     break;
  //     case(49): //1
  //       lvl.tablero[px][py].n=1;
  //       lvl.tablero[px][py].inicializar();
  //     break;
  //     case(50): //2
  //       lvl.tablero[px][py].n=2;
  //       lvl.tablero[px][py].inicializar();
  //     break;
  //     case(51): //3
  //       lvl.tablero[px][py].n=3;
  //       lvl.tablero[px][py].inicializar();
  //     break;
  //     case(52): //4
  //       lvl.tablero[px][py].n=4;
  //       lvl.tablero[px][py].inicializar();
  //     break;
  //     case(53): //5
  //       lvl.tablero[px][py].n=5;
  //       lvl.tablero[px][py].inicializar();
  //     break;
  //     case(54): //6
  //       lvl.tablero[px][py].n=6;
  //       lvl.tablero[px][py].inicializar();
  //     break;
  //     case(55): //7
  //       lvl.tablero[px][py].n=7;
  //       lvl.tablero[px][py].inicializar();
  //     break;
  //     case(56): //8
  //       lvl.tablero[px][py].n=8;
  //       lvl.tablero[px][py].inicializar();
  //     break;
  //     case(57): //9
  //       lvl.tablero[px][py].n=9;
  //       lvl.tablero[px][py].inicializar();
  //     break;
  //     case(48): //0
  //       lvl.tablero[px][py].n=0;
  //       lvl.tablero[px][py].inicializar();
  //     break;
  //     case(67): //C
  //       lvl.tablero[px][py].tipo=1;
  //       lvl.tablero[px][py].inicializar();
  //       break;
  //     case(66): //B
  //       lvl.tablero[px][py].tipo=0;
  //       lvl.tablero[px][py].inicializar();
  //     break;
  //     case(83): //S
  //     if (!lvl.hasstart()){
  //       lvl.tablero[px][py].tipo=2;
  //       lvl.tablero[px][py].inicializar();
  //     }
        
  //     break;
  //     case(70): //F
  //     if (!lvl.hasfinish()){
  //       lvl.tablero[px][py].tipo=3;
  //       lvl.tablero[px][py].inicializar();
  //     }
  //     break;
  //     case(27): //ESC
  //     if(!escfla){
  //       escfla=true;
  //     }
  //     else{
  //       escfla=false;
  //     }
  //     break;
  //     default:
  //       break;
  //   }
  //   break;
  // }
}
