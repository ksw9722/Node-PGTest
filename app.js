
var express=require('express');
var bodyparser=require('body-parser');
var http=require('http');
var cookieParser=require('cookie-parser');
var expressSession=require('express-session');
var member=require('./member');
var path=require('path');
var pg = require('pg');

var connectDB=function(){
	
	
	var db = new pg.Pool({
		user: 'postgres',
		host: '127.0.0.1',
		database: 'node_test',
		password: 'your-pw',
		port: '5432'
	});
	
	return db;
}
var app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(expressSession({secret:'my kswTE5t! key',resave:true,saveUninitialized:true}));
app.set('views',__dirname+'/views');
app.set('view engine','ejs');

app.use('/public',express.static(path.join(__dirname,'public')));
console.log(member);
var db=connectDB();

//console.log(db);
app.post('/process/login',function(req,res){
	var id=req.param('id');
	var pw=req.param('pw');
	
	if(req.session.user){
		res.redirect('/views/login_success.ejs');
	}
	
	console.dir(member);
	member.authUser(db,id,pw,function(data){
		if(data!=null){
			res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
			html = '<h1> hello '+data+'</h1>';
			res.end(html);
		}else{
			res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
			html = '<script>alert("Login Failed!!");history.back(-1);</script>';
			res.end(html);
		}
	});
	/*
	member.authUser(db,id,pw,function(err,docs){
		
		if(err){
			console.log('[-] error 발생!!');
			throw err;
		}
		
		if(docs==null){
			
				res.writeHead('222',{'Content-Type':'text/html;charset=utf8'});
				res.write('<script>alert("로그인 실패!!");</script>');
				res.write("<script>window.location='/public/login.html'</script>");
				res.end();
			
			
		}
		else if(docs.length>0){
			console.log('[+] Login 성공');
			req.session.user={id:id,age:docs[0].age};
			var context={id:req.session.user.id,age:req.session.user.age};
			
			req.app.render('login_success',context,function(err,html){
				if(err){throw err;}
				res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
				res.end(html);
			});
			
		}
		
	});
		*/
});

http.createServer(app).listen(3000,function(){
	console.log('[*] Express Start...!!');
})
