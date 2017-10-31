var fs= require('fs')


addTagLinkHome=(data,tag,homeDir, dir)=>{

    var complete = data ;
    for (var i = tag.length - 1; i >= 0; i--) {
        if(data.split(tag[i]).length == 1){
                complete += `\n- [${tag[i]}](${dir}/tags/${tag[i]})`;}
    };
    fs.writeFile(`${dir}/home.md`, complete, function(err){
        console.log('option E - only if doesnt exist noExist ')
    })
}
createTagIndexFile=(tags, title, fileName, dir)=>{
var funcs = [];

function createfunc(i, tagS) {
    return function() { 
        doesFileExists(`${dir}/tags/${i}.md`, function(me='test'){
            var content = `[home](../home) \n# ${i}\n\n- [${title}](${dir}/posts/${tags[0]}/${fileName})`
            fs.writeFile(`${dir}/tags/${i}.md`, 
                content, { flag: 'wx' }, function (err) {
            })
            fs.readFile(`${dir}/home.md`, 'utf8', function(err, data){
                var content = data.split('# Tags\n');
                if(content.length> 1){
                    addTagLinkHome(data,tagS,'home', dir)
                }
            })// add home
        }, function(){
            fs.readFile(`${dir}/tags/${i}.md`, 'utf8', function(err,data){
           
                var content = `${data}\n- [${title}](${dir}/posts/${tags[0]}/${fileName})`
                fs.writeFile(`${dir}/tags/${i}.md`, 
                    content, function (err) {
                    //if (err) {throw err;}else{ console.log("new tag page added");}
                })    
            })
        })

    };
}

for (var i = 0; i < tags.length; i++) {
    funcs[i] = createfunc(tags[i], tags);
}
for (var j = 0; j < funcs.length; j++) {
    funcs[j]();                        // and now let's run each one to see
}
}

//node create.js new Intro && node create.js Intro "Eminem" artist rapper && node create.js Intro "jZey" artist rapper && node create.js Intro "picaso" artist painer && node create.js Intro "tupac" artist rapper