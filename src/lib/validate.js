export default function login_validate(values){
    const errors = {};
    if (!values.email) {
        errors.email = 'Escribe tu correo electronico *';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Corrreo invalido';
    }

    //validation for passoword
    if(!values.password){
        errors.password = "Escribe tu contraseña *";
    }else if(values.password.length < 8 || values.password.length > 20){
        errors.password = "La contrasena tiene que ser de minimo 8 caracteres y de maximo 20 caracteres";
    }
    else if(values.password.includes(" ")){
        errors.password = "Contraseña Invalida, no se pueden llevar espacios"
    }
    
    return errors;
}