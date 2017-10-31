var md5 = require('md5');
module.exports ={
    newest:function(){
        //obteniendo un arreglo
        //con los comentarios
        //mas pupulares
        var comments=[
            {
                image_id: 1,
                email: 'cesar_paulino@icloud.com',
                name: "Cesar Paulino",
                gravatar: md5("cesar_paulino@icloud.com"),
                comment: "Asi me pondre cuando pase PCII",
                timestamp: Date.now()
            },
            {
                image_id: 1,
                email: 'cesar_paulino@icloud.com',
                name: "Cesar Paulino",
                gravatar: "eef5ce9485974e743540b05224686ba5",
                comment: "Asi me pondre cuando nos acepten el Proyecto de Mundo",
                timestamp: Date.now()
            },
            {
                image_id: 1,
                email: 'cesar_paulino@icloud.com',
                name: "Cesar Paulino",
                gravatar: md5("cesar_paulino@icloud.com"),
                comment: "Asi me pondre cuando sea Papa",
                timestamp: Date.now()
            }
        ];
        return comments;
    }
};