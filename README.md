# Dojo Theme for DotCMS
Custom Dojo Theme built with SCSS.
 
### After you clone this repo
```shell
$ npm install
```

Then rename the file ```dotcmsConfig-example.js``` to ```dotcmsConfig.js``` and edit the path to match your DotCMS local path.

### DotCMS project structure
This project assume you have your DotCMS folder structure as the following:

```
dotcms/
├── core/
│   └── ...
└── tomcat8/
    └── ...

```

### Gulp taks

#### Default task
This is a dev mode to work in the dojo theme.

```shell
$ gulp
```

1. Compile all your ```.scss``` files
2. Start a web server in [http://localhost:9000](http://localhost:9000)
3. Watch for changes in ```.scss``` and ```.html``` files to recompile when necessary.
4. Live reload the browser.
 
#### DotCMS developer mode
 
```shell
$ gulp dev
```

1. Compile all your ```.scss``` files
    - And copy the result ```dotcms.css``` file to the proper location inside ```/tomcat8``` folder. 
2. Start a web server in [http://localhost:9000](http://localhost:9000)
3. Watch for changes in ```.scss``` and ```.html``` files to recompile when necessary.
    - After compile it will copy the ```dotcms.css```.
4. Live reload the browser (only on [http://localhost:9000](http://localhost:9000)): this will not reload your DotCMS admin the page, you need to do this manually for now.

#### DotCMS deploy css
 
```shell
$ gulp deploy
```

1. Compile all your ```.scss``` files
2. Copy the result ```dotcms.css``` file to proper location inside your ```/core``` folder.





