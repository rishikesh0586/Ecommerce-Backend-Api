const { connect } = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");
dotenv.config({path:'.env'});
//handling uncaught exception
process.on("uncaughtException",(err)=>{
	console.log(`error:${err.message}`);
	console.log(`server is dowwn `);
	process.exit(1);
});

//config
//dotenv.config({path:"/config/config.env"});

//CONNECT to database
connectDatabase();   
//cloudinary connect
cloudinary.config({ 
	cloud_name: 'dx4offzot', 
	api_key: '657582447878262', 
	api_secret: 'v9gUJXlpwKECXoMTqqEwHnQeHXw' 
  });

app.listen(process.env.PORT,()=>{
	console.log(`server is working on ${process.env.PORT}`)

	//unhandle promise error
	process.on("unhandledRejection",(err)=>{
		console.log(`Error:${err.message}`);
		console.log(`server is shut down `);
		server.close(()=>{
			process.exit(1);
		});
	});

})