module.exports={
    popular:function(){
        var images = [ 
                {
                  uniqueId: 1,
                  title: "Sample Image 1",
                  description: "Awesome Description",
                  filename: "1.png",
                  views : Math.floor(Math.random()*100),
                  likes : Math.floor(Math.random()*50),
                  timestamp: Date.now()
                },
                {
                  uniqueId: 2,
                  title: "Sample Image 1",
                  description: "Awesome Description",
                  filename: "1.png",
                  views : Math.floor(Math.random()*100),
                  likes : Math.floor(Math.random()*50),
                  timestamp: Date.now()
                },
                {
                  uniqueId: 3,
                  title: "Sample Image 1",
                  description: "Awesome Description",
                  filename: "1.png",
                  views : Math.floor(Math.random()*100),
                  likes : Math.floor(Math.random()*50),
                  timestamp: Date.now()
                },
                {
                  uniqueId: 4,
                  title: "Sample Image 1",
                  description: "Awesome Description",
                  filename: "1.png",
                  views : Math.floor(Math.random()*100),
                  likes : Math.floor(Math.random()*50),
                  timestamp: Date.now()
                },
                {
                  uniqueId: 5,
                  title: "Sample Image 1",
                  description: "Awesome Description",
                  filename: "1.png",
                  views : Math.floor(Math.random()*100),
                  likes : Math.floor(Math.random()*50),
                  timestamp: Date.now()
                }
        ];
        return images;
    }
}