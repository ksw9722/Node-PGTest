
authUser=function(db,id,pw,callback){
	//console.log(db);
	console.log("SELECT * FROM MEMBER WHERE id='"+id+"' and pw='"+pw+"'");
	
	//const query = "SELECT * FROM MEMBER WHERE id='"+id+"' and pw='"+pw+"'";
	const query = {
		name:'kswtester',
		text:"SELECT * FROM MEMBER WHERE ID='$1' and pw='$2'",
		values:[id,pw]
	}
	db.query(query,(err,res)=>{
		//console.log('query');
		if(err){
			console.log('[*] error!!!');
			callback(null);
			return;
		}
		console.dir(res);
		const rows = res.rows;
		
		//console.log('query2');
		
		if(rows[0]!=null){
			
			console.dir(rows);
			rows.map(row=>{
				//console.log(JSON.stringify(row));
				console.log(row.id);
				//console.log('query3');
				callback(row.id);
				return;
			});
		}else{
			console.log('gdgd');
			callback(null);
		}
		
	});
	/*.catch(err =>{
		console.log('[*] error!!!');
		console.log(err);
		callback(err);
	});*/
	
};


module.exports.authUser=authUser;