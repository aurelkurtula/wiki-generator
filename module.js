require('./_helpers')
require('./tags-with-promisse')

var fs= require('fs')
var args = [... process.argv]

// node test2.js book "testing" tar1



var [ , , operator, title, ... tags] = [... process.argv]









/**
*
**/
indexTag=(dir,tag,fileName,title)=>{
    for (var i = tag.length - 1; i >= 0; i--) {
        fs.readFile(`${dir}/tags/${tag[i]}.md`, 'utf8', function(err,data){
        var content = data.split(`# ${tag[i]}\n`);
        var complete = data + `\n- [${title}](/${dir}/posts/${tag[i]}/${fileName})`;

        fs.writeFile(`${dir}/tags/${tag[i]}.md`, complete, function(err){
                    console.log('option A')
                })
        })
    };
}
/**
*
**/
addTagLinkToTagHome=(tag, fileName, title, dir)=>{
    fs.readFile(`${dir}/tags/${tag}.md`, 'utf8', function(err,data){
        var content = data.split(`# ${tag}\n`);
        var complete = data + `\n- [${title}](${dir}/posts/${tag}/${fileName}.md)`;
        fs.writeFile(`${dir}/posts/tags/${tag}.md`, complete, function(err){
                console.log('option B')
            })
    })
}
/**
* add the new page to 'pists/firstTag/title-page.md`
**/
addNotePage=(tag, fileName, dir)=>{
    var content = `[home](../../home) \n\n\n# tagged with\n\n`
    for (var i = tag.length - 1; i >= 0; i--) {
        content += `\n-[${tag[i]}](${dir}/tags/${tag[i]})\n`        
    };
    writeToDir=()=>{
        fs.writeFile(`${dir}/posts/${tag[0]}/${fileName}.md`, 
        content, function(err) {
            if(err) {
                return console.log(err);
            }
            
            console.log(`sublime ${dir}/posts/${tag[0]}/${fileName}.md`)
        });
    }
    doesDirExists(`${dir}/posts/${tag[0]}`, function(){
        fs.mkdirSync(`${dir}/posts/${tag[0]}`);
        writeToDir()
    }, writeToDir)
}


/**
* Default method that runs the other methods
**/
web=(title, tagS, homeDir, dir, fileName)=>{

    if (fileName.split('.').length == 1) {
        var tag = tagS[0];
    doesFileExists(`${dir}/posts/${tag}/${fileName}.md`, function(){
        createTagIndexFile(tagS, title, fileName, dir)
        addNotePage(tagS,fileName, dir)
        
    }, function(){
        console.log('File Already Exists')
    })
    }else{
        console.log('Cant have dots in the title name')
    }


}// web


