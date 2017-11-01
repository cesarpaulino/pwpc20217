//$(alert("Documento Listo"));
//# es id 
//landa espresion ()=>{}
$(()=>{
//Variable que registra el estado del formulario visible u oculto
var isHide = null;
$("#post-comment").hide(()=>{
  isHide = true;
});
$("#btn-comment").on('click', ()=>{
    //Nulificart todod comportamiento pre asignado
    //para el onclick de este boton
    event.preventDefault();
    if(isHide){
      //Muestralo
      $("#post-comment").show(()=>{
        isHide = false;
      });
    }else{
      //oculto
      $("#post-comment").hide(()=>{
        isHide = true;
      });
    }
  });
});
//Petecion Ajax para el incremento de 1 like sobre la imagen
$("#btn-like").on('click',()=>{
    event.preventDefault();
    //Rescatando el metadato llamado "id" del boton like
    var imgId = $(this).data('id');
    $.post(`/images/like/${imgId}`).done((data)=>{
      $('.likes-count').text(data.likes);
    });
});