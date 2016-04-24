ReactBone
============
Backbone/React serverless website template. Ideal for hosting from AWS S3, and similar.

Build Pipeline
=============

We're using gulp to copy/concatenate/compile/minify into the build folder, and also to run deploy jobs. See gulpfile.js 
and package.json for details. 

Build and deploy commands:

    $ gulp clean
    $ gulp build
    $ gulp deploy
    
    $ gulp prod-deploy
