var fs= require('fs')
build=(blogs)=>{
	// build the indexes
	var dirs = [];
	for (var i = blogs.length - 1; i >= 0; i--) {
		var dir = `/${blogs[i]}Blog/posts`
		//get sub-directories of every blog
		fs.readdirSync(`${__dirname}${dir}`).forEach(folder => {
		  if (folder != '.DS_Store' && folder.split('.').length != 2) {
		    dirs.push(`${dir}/${folder}`) 
		  };
		})
	};
	var files= []
	for (var i = dirs.length - 1; i >= 0; i--) {
		
	  fs.readdirSync(`${__dirname}/${dirs[i]}`)
	        .map(function(v){
	          files.push({
	          	blog: dirs[i].split('/')[1],
	            name: v ,
	            url: `${dirs[i]}/${v.split('.')[0]}`,
	            date:  new Date(fs.statSync(`${__dirname}/${dirs[i]}/${v}`).mtime.getTime())
	          })
	        })
	};
	
	//displaying the urls in the homepages of sub-blogs
	function compare(a,b) {
  if (a.date > b.date)
    return 1;
  if (a.date < b.date)
    return -1;
  return 0;
}

	blogs.map((b)=>{
		var blog = `${b}Blog`
		var blogDir = files.filter(function(dir){
		  return dir.blog == blog
		})
		//removing the dublicates
		blogDir = blogDir.filter( (blogDir, index, self) => 
			self.findIndex((t) => {
				return t.blog === blogDir.blog && t.name === blogDir.name; 
			}) === index)

		blogDir.sort(compare)
		var mydata = '';
		for (var i = blogDir.length - 1; i >= 0; i--) {
		  mydata += '\n- ['+blogDir[i].name+']('+blogDir[i].url+')'
		};
		fs.readFile(__dirname + `/${blog}/home.md`, 'utf8', function(err,data){
		  var content = data.split('# All Articles')
		  var a = content[1].split('---end---')

		  var complete = content[0]+'# All Articles\n\n'+mydata+'\n\n---end---\n\n'+a[1]
		  fs.writeFile(__dirname + `/${blog}/home.md`, complete, function(err){
		    
		  })
		})
	})
	console.log('build done')
}//build