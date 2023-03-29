//Variables gráficas
let width;        //Ancho de la ventana
let height;       //Largo de la ventana
let x;            //Imprimir el jugador en la coordenada
let y;            //Imprimir el jugador en la coordenada

//Variables del juego
let game='0';     //0-menu inicial 1-juego 2-editor 3-exit
let px;           //Coordenada en x del jugador 
let py;           //Coordenada en y del jugador
let gx;           //Coordenada en x de la meta
let gy;           //Coordenada en y de la meta
let lvl;          //Objeto donde se guarda el nivel actual (modo jugar)
let pc;           //Diccionario donde se guarda el color del jugador
let combo="Bien"; //Control del movimiendo valido
let clvl;         //Objeto donde se guarda el JSON para carga de nivel
let nlvl=0;       //Contador de nivel para carga sequencial de niveles
let lvls;         //Pre-carga de los niveles de JSON a Objeto
let escfla=false; //Indica si se presiono ESC para ver los tutoriales

//Variables multimedia
//Sonido
let s_zeta;
let s_equis;
let s_fin;
let s_normal;
let s_miss;
//Imagenes
let tutogame;    
let tutoedit;

//Elementos DOM
let canvas;
let menu;
let score;
let exportlvl;
let sldrtiming;
let timingtxt;
