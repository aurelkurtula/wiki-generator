var fs= require('fs')
require('./fixed-modules.js')
require('./module.js')
require('./standAlone.js')
checkFile=(dir, tag, fileName)=>{
    fs.stat(fileName, function(err, stat){
        if (!stat) {
            if (!fs.existsSync(`${dir}/posts/${tag}/${fileName}.md`)){
                // new
                return true
            }else{
            	return false
            }
        }
    })
}
var args = [... process.argv],
		blog = ['home',],
		[ , , operator, title, ... tags] = [... process.argv],
		fileName = title ? title.split(' ').join('-') : 'non';
		blogs = [ ...new Set(blog) ]


switch(operator){
	case 'todo':
		todo(title);
		break;
	case 'new':
		newBlog(title, "blog = [", 'create');
		break;
	case 'build':
		build(blog)
		break;
	case 'info':

		console.log(' node create.js new folderName - create new notebook-type folder ')
		console.log(' node create.js folderName "Post title" firstTag secondTag - to create an entry. The entry goes in ./folderName/posts/{firstTag} folder ')
		console.log(' node create.js build - generates links on the folderName/home.md for all your entries ')
		console.log(' npm run gitit - just a quick way to push to your wiki repo ')
		

		break;
}


stickyLink=(blog, link)=>{
console.log(`### ${blog} blog sticky`)
	fs.readFile('home.md', 'utf8', function(err,data){
		var heading = `### ${blog} blog sticky\n`;
		var linkTitle = link.split('/');
		var content = data.split(heading)
		var complete = content[0]+heading+`\n- [${linkTitle[linkTitle.length-1].split('-').join(' ')}](${link})`+content[1]
		fs.writeFile('home.md', complete, function(err){
			console.log('stick added')
		})
	})
}

for (var i = blogs.length - 1; i >= 0; i--) {
	switch(operator){
		case blogs[i]:
			web(title, tags, 'home', `${operator}Blog`, fileName)
			build(blog)
			break;
		case 'stick'+blogs[i]:
			stickyLink(blogs[i], args[3].split('.')[0])
			break;

	}
};

//--


