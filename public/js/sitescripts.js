//$(alert("Documento Listo"));
//# es id 
//landa espresion ()=>{}
$(function(){
  var isHide = true;
  // Oculta y muestra el formulario
  $('#post-comment').hide();
  $('#btn-comment').on('click',function(event){
      event.preventDefault();
      if(isHide){
          $('#post-comment').show();
          isHide = false;
      }else{
          $('#post-comment').hide();
          isHide = true;
      }
  });

  //Petecion Ajax para el incremento de 1 like sobre la imagen
  $("#btn-like").on('click', () => {
    event.preventDefault();
    //Rescatando el metadato llamado "id" del boton like
    var imgId = $(this).data('id');
    $.post(`/images/like/${imgId}`).done((data) => {
      $('.likes-count').text(data.likes);
    });
  });
});