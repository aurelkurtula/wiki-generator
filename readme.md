I love having a private place to keep all my notes somewhat organized. After trying tools such as evernote and always finding one reason or another to dislike them, I discovered that I could use gitlab wiki pages. Basically markdown pages linked together in which ever way I wish.

To help me quickly generate the markdown files and link them together, I created this script. Inspired by site generators like jekyll but with the desire to keep the generation and build time very short. 

These are the terminal commands (run `node create.js run info` to see the same instructions)

     node create.js new folderName - create new notebook-type folder
     node create.js folderName "Post title" firstTag secondTag - to create an entry. The entry goes in ./folderName/posts/{firstTag} folder
     node create.js build - generates links on the folderName/home.md for all your entries
     npm run gitit - just a quick way to push to your wiki repo

First a notebook should be generated. I think of it as a sublog, or notebook.

Then the second command adds notes to the notebook. For example the following command

    node create.js folderName "Post title" firstTag secondTag 

generates a markdown file at `folderNameBlog/posts/firstTag/post-title.md`

That line of code also creates a page for every tag you use. So with the above example two files are generated 

    folderNameBlog/tags/firstTag.md 
    folderNameBlog/tags/secondTag.md

And, of course each file contains a link to the post `folderNameBlog/posts/firstTag/post-title.md`. Further more, if the tag already exists in the `./tags` folder then just the corresponding post is added. 

Finally, when the nodebook was generated, it got a `home.md` which is the homepage of the notebook. By running `node create.js build` that page is injected with all the created posts. 

As for the `gitit` command, since this is just a personal diary and the comments for each commit aren't important, it simply adds, commits, and pushes the changes to your repo 

All you need is node installed