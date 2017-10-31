var fs= require('fs')
newBlog=(title, split, jsFile)=>{
    fs.mkdirSync(`${title}Blog`);
        fs.mkdirSync(`${title}Blog/posts`);
        fs.mkdirSync(`${title}Blog/tags`);
var complete= `
# All Articles
---end---
# references
# Tags

`
    fs.writeFile(`${title}Blog/home.md`, complete, function(err){
        console.log('new blog created')
    }) 
        fs.readFile(jsFile+'.js', 'utf8', function(err,data){
            var content = data.split(split);
        var complete = content[0]+split+"'"+title+"',"+content[1]+split+content[2]
            fs.writeFile(jsFile+'.js', complete, function(err){
                
                })
        })


        fs.readFile('home.md', 'utf8', function(err,data){
            var content = `${data}\n- [${title} Blog](${title}Blog/home)`;        
            fs.writeFile('home.md', content, function(err){
                    
                })
        })


    }
todo=(list)=>{
    var title = this.title
    fs.readFile(`todo.md`, 'utf8', function(err, data){
        var content = `- ${list}\n${data}`
        fs.writeFile(`todo.md`, content, function(err){
            console.log('done')
        })
    })
}
