//. app.js
var express = require( 'express' ),
    bodyParser = require( 'body-parser' ),
    fs = require( 'fs' ),
    multer = require( 'multer' ),
    app = express();

require( 'dotenv' ).config();

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );
app.use( express.Router() );
app.use( express.static( __dirname + '/public' ) );


var upload = multer({ dest: 'tmp/' });
var uploads = upload.fields([
  { name: 'file1', maxCount: 1 },
  { name: 'file2', maxCount: 1 }
]);
app.post( '/api/uploads', uploads, async function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );

  if( req.files ){
    Object.keys( req.files ).forEach( function( key ){
      req.files[key].forEach( function( obj ){
        console.log( obj );
        fs.unlinkSync( obj.path );
      });
    });
  }

  res.write( JSON.stringify( { status: true, body: req.body, files: req.files }, null, 2 ) );
  res.end();
});

var port = process.env.PORT || 8080;
app.listen( port );
console.log( "server starting on " + port + " ..." );

module.exports = app;
