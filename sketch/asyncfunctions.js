
//Sobreescribe la variable lvl donde guarda las propiedades del nivel a mostrar
function inicializarlvl(filas, columnas, layout, tamcasilla,timing) {
    lvl = new nivel(filas, columnas, layout, tamcasilla,timing);
    px = lvl.xini; 
    py = lvl.yini;
    gx = lvl.xfin;
    gy = lvl.yfin;
  }
  //Carga de nivel con 2 opciones, desde JSON y desde localstorage
  async function loadLevel(n,mode){
    switch(mode){
      case(0): //Carga JSON
        clvl=lvls;
        try{
        clvl= (clvl.level[n]);
        inicializarlvl(clvl.x, clvl.y, clvl.layout,clvl.tamcasilla,clvl.timing);
        }
        catch{
          nlvl=0;
          showMenu();
          //Ranking dinamico
          score.show();
        }
        break;
      case(1): //Carga localstorage
        let { value: odioname } = await Swal.fire({
          title: 'Nombre del nivel?',
          input: 'text',
          reverseButtons: true,
          confirmButtonColor: 'chartreuse',
          allowOutsideClick: false,
          inputValidator: (value) => {
            return new Promise((resolve) => {
              if (value) {
                  resolve();
              }
              else {
                Swal.fire({
                  title: 'Nivel no existe',
                  toast: true,
                  timer: 3000,
                  confirmButtonColor: 'chartreuse'
                }).then(
                  showMenu
                );
              }
            })
          }
        });
        if(odioname){      
        try{
        clvl = localStorage.getItem(odioname);
        clvl = JSON.parse(clvl);
        let clayout=[];         //Declaracion de variables locales para empaque del nivel a formato estandar
        let cvalcas;
        let ccas;
        for (let i = 0; i < clvl.y; i++) {
          for (let j = 0; j < clvl.x; j++) {
            ccas = clvl.tablero[i][j];
            cvalcas = join([str(ccas.tipo),str(ccas.n),str(ccas.objeto)],"");
            clayout.push(cvalcas);
          }
        }
        inicializarlvl(clvl.x, clvl.y, clayout, 45,clvl.timing);
        //Ranking dinamico
        score.show();
      }
        catch{
          Swal.fire({
            title:'Nivel no existe',
            toast: true,
            timer:3000,
            confirmButtonColor: 'chartreuse'
          }).then(
            showMenu
          );
        }
        }      
        break;
      default:
        alert('nani?!');
        break;  
    }
  }
  //Esta funcion se utiliza para grabar niveles a formato JSON
  async function saveLevel() {
    /* request.open("POST", "/levels/made/" + 'test' +"_ug"+ ".json", true);
    request.setRequestHeader("Content-type","application/json");
    request.setRequestHeader("Content-length", clvl.length);
    request.setRequestHeader("Connection", "Keep-Alive");
    request.send(clvl); */
    let { value: ename } = await Swal.fire({
      title: 'Nombre del nivel?',
      input: 'text',
      showDenyButton: true,
      reverseButtons: true,
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (!value) {
          return 'Escribe un nombre!'
        }
      }
    })
  
    if (ename) {
      clvl = JSON.stringify({ x: lvl.f, y: parseInt(lvl.c), tablero: lvl.tablero, tamcasilla: 45, timing: sldrtiming.value()});
      Swal.fire({
        title: 'Estas seguro?',
        color:'white',
        text: "Tu nivel llamado "+ename+" de "+lvl.f+"X"+lvl.c+" se guardará!",
        icon: 'warning',
        showDenyButton: true,
        reverseButtons: true,
        allowOutsideClick: false,
        confirmButtonColor: 'chartreuse',
        cancelButtonColor: 'tomato',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Regresar'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem(ename, clvl);
          game = '0';
          Swal.fire({
            title: 'Tu nivel ha sido guardado!',
            showCancelButton: true,
            reverseButtons: true,
            allowOutsideClick: false,
            confirmButtonColor: 'chartreuse',
            cancelButtonColor: 'tomato',
            confirmButtonText: 'Testear',
            cancelButtonText: 'Volver al menú'
          }).then((result)=>{
            if (result.isConfirmed) {
              clvl = JSON.parse(clvl);
              let clayout = [];         
              let cvalcas;
              let ccas;
              let coutput;
              let cloutput = [];
              for (let i = 0; i < clvl.y; i++) {
                for (let j = 0; j < clvl.x; j++) {
                  ccas = clvl.tablero[i][j];
                  coutput = join(['"',str(ccas.tipo), str(ccas.n), str(ccas.objeto),'"'],"");
                  cvalcas = join([str(ccas.tipo), str(ccas.n), str(ccas.objeto)], "");
                  clayout.push(cvalcas);
                  cloutput.push(coutput);
  
                }
              }
              game='0';
              inicializarlvl(clvl.x, clvl.y, clayout, 45, clvl.timing);
              game='1';
              console.log(('"x":' + clvl.x + ',' + '"y": ' + clvl.y +','+ '"layout": ' + join([clayout,'",']) +','+ '"tamcasilla": ' + 45 +','+'"timing": '+ clvl.timing));
              alert(('"x":' + clvl.x + ',' + '"y": ' + clvl.y +','+ '"layout": ' + join(["[",cloutput,"]"]) +','+ '"tamcasilla": ' + 45 +','+'"timing": '+ clvl.timing));
              //Ranking dinamico
              score.show();
            }
            if (result.isDismissed){
              showMenu();
            }
            else{
              //showMenu();
            }
          })
          
        }
      })
      
    } 
  }
  //Muestra el menu principal
  function showMenu() {
    game = '0';
    menu = Swal.fire({
      title: 'Quadrhythm',
      showDenyButton: true,
      showCancelButton: true,
      reverseButtons: true,
      allowOutsideClick: false,
      confirmButtonText: 'Jugar',
      denyButtonText: 'Editor',
      cancelButtonText: 'Cargar',
      confirmButtonColor: 'chartreuse',
      cancelButtonColor: 'magenta',
    }).then((result) => {
      if (result.isConfirmed) {
        escfla=true;
        loadLevel(nlvl,0);
        game = '1';
        //Ranking dinamico
        score.show();
      }
      if (result.isDismissed) {
        game = '1';
        inicializarlvl(1, 2,["30n","20n"], 45,150);
        escfla=true;
        lvl.timing=0;
        nlvl=-1;
        loadLevel(nlvl,1);
  
    
      }
      if(result.isDenied) {
        startEditor();
        escfla=true;
        game = '2';
        
      }
    });
  }
  // Generador de arreglo para tablero vacio
  function genArray(x) {  
    let array = [];
    for (let i = 0; i < x; i++) {
      array[i] = "00n";
    }
    return array;
  }
  // Empieza el editor de niveles
  async function startEditor(){   
    let {value:elx}=await Swal.fire({
      title: 'Escoje valor x',
      input: 'select',
      inputOptions: {
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '10': '10',
        '11': '11',
        '12': '12',
        '13': '13',
        '14': '14',
        '15': '15'
    },
      inputPlaceholder: 'Selecciona un tamaño',
      showDenyButton: false,
      reverseButtons: true,
      allowOutsideClick: false,
      //confirmButtonColor: 'chartreuse',
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {
            resolve();
          } else {
            resolve('ERROR');
          }
        });
      }
    
    });
    let { value: ely } = await Swal.fire({
      title: 'Escoje valor y',
      input: 'select',
      inputOptions: {
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '10': '10',
        '11': '11',
        '12': '12',
        '13': '13',
        '14': '14',
        '15': '15'
  
      },
      inputPlaceholder: 'Selecciona un tamaño',
      showDenyButton: false,
      reverseButtons: true,
      allowOutsideClick: false,
      //confirmButtonColor: 'chartreuse',
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {
            resolve();
          } else {
            resolve('ERROR');
          }
        });
      }
  
    });
    
    if (elx && ely) {
      Swal.fire('Elegiste: ' +elx+" X "+ ely);
    }
    inicializarlvl(parseInt(elx),parseInt(ely),genArray(elx*ely),45,150);
    //Imprimir el boton
    exportlvl.show();
    sldrtiming.show();
    timingtxt.show();
  }
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
  