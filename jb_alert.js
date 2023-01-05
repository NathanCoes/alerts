//Contador de las alertas, necesita ser 0.
var jb_alerts_count = 0;

//Titulo de la alerta >> Solo se acepta cadena de texto
//Mensaje a mostrar >> Solo se acepta cadena de texto
//Mostrar boton Aceptar >> valores aceptados: true / false
//Mostrar boton Cancelar >> valores aceptados: true / false
//Tiempo, en milisegundos (30s default), para remover el tiempo, solo pon 0 >> solo se aceptan numeros ejemplo "1000" que es igual 1 segundo.
//Mostrar el tiempo restante en el alert >> valores aceptados: true / false
function JBShowAlert( title , txt , acceptBTN, cancelBTN , timeOut , showTimeOut){
    
    //Contador de alertas
    jb_alerts_count++;

    //Inyecta la alerta
    $(".jb_alerts_API").append("<div class='jb_alerts' data-jb-alert-id='"+jb_alerts_count+"'> <div class='jb_alerts_controls' data-jb-alert-id='"+jb_alerts_count+"'> <i class='bi bi-x-lg'></i> </div><div class='jb_alerts_content'> <div class='jb_alerts_content_title'> <h3> "+title+" </h3> </div><div class='jb_alerts_content_txt'> <p>"+txt+"</p></div><div class='jb_alerts_content_options'> <div class='jb_alerts_content_option_btn jb_confirm_ok'> <span>Ok</span> </div><div class='jb_alerts_content_option_btn jb_confirm_cancel'> <span>Cancelar</span> </div></div></div><div class='jb_alerts_timeOut'> <div class='jb_alerts_timeOut_bar' style='width: 100%;'></div></div></div>");
    //Borra cualquier script inyectado en jb_alert_script_API
    $("#jb_alert_script_API").html("");
    //Inyecta el script de los control/es, por el momento solo esta activo el "X" y el "Aceptar" para ver correctamente el codigo hace falta unminifier o desimplificar
    //debido a que por motivos de desarrollo, el script se tuvo que simplicar en una linea para su correcta inyección.
    $("#jb_alert_script_API").html("<script type='text/javascript'>$('.jb_alerts_controls').click(function(){alert_id=$(this).data('jb-alert-id'),animationHideEngine(alert_id)});");
    

    //Simplicación de selecciones dinamicos
    let s_acceptBTN =  $("div[data-jb-alert-id='"+jb_alerts_count+"'].jb_alerts .jb_confirm_ok");
    let s_cancelBTN =   $("div[data-jb-alert-id='"+jb_alerts_count+"'].jb_alerts .jb_confirm_cancel");
    let s_showTimeOut = $("div[data-jb-alert-id='"+jb_alerts_count+"'].jb_alerts .jb_alerts_timeOut");

    //Aquí comienza la configuración dada por el usuario al hacer llamado a la función
    if ( acceptBTN == false && cancelBTN == false && timeOut == 0){
        $(s_acceptBTN).css("display" , "none");
        $(s_cancelBTN).css("display" , "none");
        $(s_showTimeOut).css("display" , "none");
    }else{
        if ( acceptBTN == true){s_acceptBTN.css("display" , "block");}else{s_acceptBTN.css("display" , "none");}
        if ( cancelBTN == true){s_cancelBTN.css("display" , "block");}else{s_cancelBTN.css("display" , "none");}
        if ( showTimeOut == true){s_showTimeOut.css("display" , "flex");}else{s_showTimeOut.css("display" , "none");}
        if ( timeOut == 0 ){s_showTimeOut.css("display" , "none");}
    }

    //Una vez configurado el output / salida de la alerta, se procede a mostrar unicamente la alerta creada.
    animationShowEngine(jb_alerts_count , timeOut);
}

//Animation Engine / Motor de animaciones - Estas funciones solo son llamadas por la función >> JBShowAlert(*parametros*); <<

//Debe pasar obligatoriamente el id de la alerta (se hace de manera automatica) y el tiempo de animación 
function animationShowEngine(jb_alert_id , timeOut){
    jb_alert = $(" div[data-jb-alert-id='"+jb_alert_id+"'].jb_alerts ");
    var jb_alert_barTime = $(" div[data-jb-alert-id='"+jb_alert_id+"'].jb_alerts .jb_alerts_timeOut_bar ");
    if ( timeOut != 0){
        jb_alert_barTime.animate({
            width: "0",
        },timeOut , function(){
            animationHideEngine(jb_alert_id);
        });
    }
}

//Debe pasar obligatoriamente el id de la alerta, se hace de manera automatica
function animationHideEngine(jb_alert_id){
    jb_alert = $(" div[data-jb-alert-id='"+jb_alert_id+"'].jb_alerts ");
    jb_alert.animate({
        right: "0",
    },500, function(){
        jb_alert.remove();
    });
}

//Así se hace llamado a la función, por el momento debe de ingresarse a fuerza todos los valores para cada parametro.
//Aquí una versión prueba de como se ve la función

//JBShowAlert("Test" , "Texto de prueba" , false, false , 0 , true);