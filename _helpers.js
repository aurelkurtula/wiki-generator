var fs = require('fs')
doesFileExists=(filePath, successCallback, failureCallback=()=>console.log('file exists') )=>{
	fs.stat(filePath, function(err, stat){
        if (!stat) {
            return successCallback()
        }else{
        		
            return failureCallback()
        }
    })
}

doesDirExists=(filePath, successCallback=()=>console.log('file NOT exists'), failureCallback=()=>console.log('file exists') )=>{
	fs.stat(filePath, function(err, stat){
        if (err) {
            return successCallback()
        }else if(!stat.isDirectory()){
        console.log('something')	
            
        }else{
        	return failureCallback()
        }
    })
}