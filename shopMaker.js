on("chat:message",function(msg){
    if(msg.type=="api" && msg.content.match(/^!shopMaker\b/)){
        var magicItems;
        
		args = msg.content.split(/\s+/);
		var cantidadItems;
		if(args[2]=='Aldea'){
			cantidadItems = Math.floor(Math.random()*4) + 2
		}else if(args[2]=='Pueblo'){
		  cantidadItems = Math.floor(Math.random()*6) + 4
		}else if(args[2]=='Ciudad_Pequeña'){
		 cantidadItems = Math.floor(Math.random()*8) + 6
		}else if(args[2]=='Ciudad_Grande'){
		 cantidadItems = Math.floor(Math.random()*10) + 4
		}else if(args[2]=='Metropolis'){
		 cantidadItems = Math.floor(Math.random()*12) + 8
		}
		
	    magicItems = getTableItems("ItemShop",cantidadItems);

		if (magicItems === null){
            return;
        }
        createMenuHandout(magicItems, cantidadItems);
    }
    
})

function createMenuHandout(shopList, numItems){
	var ubicacion = args[2].split('_');
	if(ubicacion.length>1){
		ubicacion = ubicacion[0]+' '+ubicacion[1]
	}else {
		ubicacion = ubicacion[0]
	}
    var menu = createObj("handout",{
        name:args[1] +' de '+ ubicacion,
        inplayerjournals:"all"
    });
    var food = makeHTMLTable(args[1] +' de '+ ubicacion,shopList);
    menu.set("notes",food);
}

function makeHTMLTable(heading,list){
    let tableContents;
	if(args[1]=='Armeria') {
		tableContents = "<tr style='width: 100%; text-align: left;background: transparent;font-family: Verdana, sans-serif !important;font-weight: bold;font-size: 13px;border: 0px solid #ffffff !important;'><th>Item</th><th>Tipo</th><th>Attunement</th><th>Daño / AC </th><th>Propiedades</th><th>Precio</th><th>Moneda</th><th>Cantidad</th></tr>";
	} else if (args[1]=='Alquemista') {
		tableContents = "<tr style='width: 100%; text-align: left;background: transparent;font-family: Verdana, sans-serif !important;font-weight: bold;font-size: 13px;border: 0px solid #ffffff !important;'><th>Item</th><th>Tipo</th><th>Modo de Aplicación</th><th>DC</th><th>Precio</th><th>Moneda</th><th>Cantidad</th></tr>";
	}else if (args[1]=='Bazar') {
		tableContents = "<tr style='width: 100%; text-align: left;background: transparent;font-family: Verdana, sans-serif !important;font-weight: bold;font-size: 13px;border: 0px solid #ffffff !important;'><th>Item</th><th>Tipo</th><th>Precio</th><th>Moneda</th><th>Cantidad</th></tr>";
	}else if (args[1]=='Magia') {
		tableContents = "<tr style='width: 100%; text-align: left;background: transparent;font-family: Verdana, sans-serif !important;font-weight: bold;font-size: 13px;border: 0px solid #ffffff !important;'><th>Item</th><th>Tipo</th><th>Attunement</th><th>Precio</th><th>Moneda</th><th>Cantidad</th></tr>";
	}
	let indice=1;
	
	let cantDesc;
	let desc1 = getRandomInt(3)
	if(desc1==0) {
		// console.log('descuento')
		cantDesc =  Math.floor(Math.random()*15) + 1;

	} else if(desc1==1){
		// console.log('aumento')
		cantDesc =  Math.floor(Math.random()*25) + 1;
		
	} else {
		// console.log('nada')
		cantDesc =  1
		
	}
	
	if(desc1==1){
		cantDesc = 1+cantDesc/100
	}else if(desc1==0){
		cantDesc =  1-cantDesc/100
	} else {
		cantDesc =  1
		
	}
	
    _.each(list,function(listItem){
       let item = listItem.split('_');
	   console.log(item)
	   let tax;
	   let cantidad;
	   if (item[3]=='Common'){
		cantidad = Math.floor(Math.random()*50) + 1
	   } else if(item[3]=='Uncommon') {
		cantidad = Math.floor(Math.random()*20) + 1
	   }else if(item[3]=='Rare') {
		cantidad = Math.floor(Math.random()*10) + 1
	   }else if(item[3]=='Very Rare') {
		cantidad = Math.floor(Math.random()*5) + 1
	   }else if(item[3]=='Legendary') {
		cantidad = Math.floor(Math.random()*1) + 1
	   }
	   if(args[1]=='Armeria'){
		   if(item[5]=='Armor'){
			 if(indice%2==1){
				tableContents+=`<tr style='width: 100%;text-align: left;background: transparent;font-family: Verdana, sans-serif !important;font-size: 13px;border: 0px solid #ffffff !important;'><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[1]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[0]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[4]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[9]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[11]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${Math.ceil(item[2]*cantDesc)}</td><td>${item[14]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${cantidad}</td></tr>`;
			 }else {
			 }
				tableContents+=`<tr style='width: 100%;text-align: left;background: #E0E5C1;font-family: Verdana, sans-serif !important;font-size: 13px;border: 0px solid #ffffff !important;'><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[1]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[0]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[4]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[9]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[11]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${Math.ceil(item[2]*cantDesc)}</td><td>${item[14]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${cantidad}</td></tr>`;
		   } else {
			 if(indice%2==1){
				tableContents+=`<tr style='width: 100%;text-align: left;background: transparent;font-family: Verdana, sans-serif !important;font-size: 13px;border: 0px solid #ffffff !important;'>
									<td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;
												padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[1]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;
												border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[0]}</td>
												<td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;
												padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[4]}</td><td style='border-collapse:collapse;
												border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;
												text-align: center;'>${item[6]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[8]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${Math.ceil(item[2]*cantDesc)}</td><td>${item[14]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${cantidad}</td></tr>`;
			 }else {
				tableContents+=`<tr style='width: 100%;text-align: left;background: #E0E5C1;font-family: Verdana, sans-serif !important;font-size: 13px;border: 0px solid #ffffff !important;'><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[1]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[0]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[4]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[6]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[8]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${Math.ceil(item[2]*cantDesc)}</td><td>${item[14]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${cantidad}</td></tr>`;
			 }  
		   }
	   } else if (args[1]=='Alquemista') {
			if(indice%2==1){
				tableContents+=`<tr style='width: 100%;text-align: left;background: transparent;font-family: Verdana, sans-serif !important;font-size: 13px;border: 0px solid #ffffff !important;'><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[1]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[0]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[13]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[12]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${Math.ceil(item[2]*cantDesc)}</td><td>${item[14]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${cantidad}</td></tr>`;
			 }else {
				tableContents+=`<tr style='width: 100%;text-align: left;background: #E0E5C1;font-family: Verdana, sans-serif !important;font-size: 13px;border: 0px solid #ffffff !important;'><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[1]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[0]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[13]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[12]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${Math.ceil(item[2]*cantDesc)}</td><td>${item[14]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${cantidad}</td></tr>`;
			 }
	   } else if (args[1]=='Bazar') {
			if(indice%2==1){
				tableContents+=`<tr style='width: 100%;text-align: left;background: transparent;font-family: Verdana, sans-serif !important;font-size: 13px;border: 0px solid #ffffff !important;'><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[1]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[0]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${Math.ceil(item[2]*cantDesc)}</td><td>${item[14]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${cantidad}</td></tr>`;
			 }else {
				tableContents+=`<tr style='width: 100%;text-align: left;background: #E0E5C1;font-family: Verdana, sans-serif !important;font-size: 13px;border: 0px solid #ffffff !important;'><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[1]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[0]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${Math.ceil(item[2]*cantDesc)}</td><td>${item[14]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${cantidad}</td></tr>`;
			 }
	   } else if (args[1]=='Magia') {
			if(indice%2==1){
				tableContents+=`<tr style='width: 100%;text-align: left;background: transparent;font-family: Verdana, sans-serif !important;font-size: 13px;border: 0px solid #ffffff !important;'><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[1]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[0]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[4]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${Math.ceil(item[2]*cantDesc)}</td><td>${item[14]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${cantidad}</td></tr>`;
			 }else {
				tableContents+=`<tr style='width: 100%;text-align: left;background: #E0E5C1;font-family: Verdana, sans-serif !important;font-size: 13px;border: 0px solid #ffffff !important;'><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[1]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[0]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${item[4]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${Math.ceil(item[2]*cantDesc)}</td><td>${item[14]}</td><td style='border-collapse:collapse;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline:none;padding-top: 2px;padding-bottom: 2px;text-align: center;'>${cantidad}</td></tr>`;
			 }
	   } 
	   indice = indice +1;
    });
	
    let table;
	// let cantDesc;
	// var desc = getRandomInt(3)
	if(desc1==0) {
		// console.log('descuento')
		// cantDesc =  Math.floor(Math.random()*20) + 1;
		if(args[1]=='Armeria') {
			table = `<h3 style="font-family: 'mrs eaves', 'times new roman', times, baskerville, garamond;color: #58170D;font-weight: bolder;font-variant: small-caps;text-transform: capitalize;font-size: 20px;margin-top: 10px;margin-bottom: 2px;line-height: 80%;border-bottom: 2px solid #c9ad6a;clear: both;">${heading}</h3><h5>Descuento de: ${Math.ceil((1-cantDesc)*100)} % </h5><hr><img src='https://i.pinimg.com/564x/51/4d/aa/514daaf31ab6b8f92ccb306b6feec913.jpg' style='height: 350px; width: auto;  border: 1px solid #ddd;  border-radius: 4px;  padding: 5px; display: block;  margin-left: auto;  margin-right: auto;'><hr><table style='width: 100%;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline: none;'>${tableContents}</table>`;
		} else if (args[1]=='Alquemista') {
			table = `<h3 style="font-family: 'mrs eaves', 'times new roman', times, baskerville, garamond;color: #58170D;font-weight: bolder;font-variant: small-caps;text-transform: capitalize;font-size: 20px;margin-top: 10px;margin-bottom: 2px;line-height: 80%;border-bottom: 2px solid #c9ad6a;clear: both;">${heading}</h3><h5>Descuento de: ${Math.ceil((1-cantDesc)*100)} % </h5><hr><img src='https://i.pinimg.com/564x/61/1f/ac/611facc0794553bd9b3aa31dff443a22.jpg' style='height: 350px; width: auto;  border: 1px solid #ddd;  border-radius: 4px;  padding: 5px; display: block;  margin-left: auto;  margin-right: auto;'><hr><table style='width: 100%;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline: none;'>${tableContents}</table>`;
		}else if (args[1]=='Bazar') {
			table = `<h3 style="font-family: 'mrs eaves', 'times new roman', times, baskerville, garamond;color: #58170D;font-weight: bolder;font-variant: small-caps;text-transform: capitalize;font-size: 20px;margin-top: 10px;margin-bottom: 2px;line-height: 80%;border-bottom: 2px solid #c9ad6a;clear: both;">${heading}</h3><h5>Descuento de: ${Math.ceil((1-cantDesc)*100)} % </h5><hr><img src='https://i.pinimg.com/564x/9e/22/f9/9e22f96e36446df93e0ebf4626d9813d.jpg' style='height: 350px; width: auto;  border: 1px solid #ddd;  border-radius: 4px;  padding: 5px; display: block;  margin-left: auto;  margin-right: auto;'><hr><table style='width: 100%;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline: none;'>${tableContents}</table>`;
		}else if (args[1]=='Magia') {
			table = `<h3 style="font-family: 'mrs eaves', 'times new roman', times, baskerville, garamond;color: #58170D;font-weight: bolder;font-variant: small-caps;text-transform: capitalize;font-size: 20px;margin-top: 10px;margin-bottom: 2px;line-height: 80%;border-bottom: 2px solid #c9ad6a;clear: both;">${heading}</h3><h5>Descuento de: ${Math.ceil((1-cantDesc)*100)} % </h5><hr><img src='https://i.pinimg.com/564x/19/11/19/191119c3148f71df48336961fabd998b.jpg' style='height: 350px; width: auto;  border: 1px solid #ddd;  border-radius: 4px;  padding: 5px; display: block;  margin-left: auto;  margin-right: auto;'><hr><table style='width: 100%;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline: none;'>${tableContents}</table>`;
		}

	} else if(desc1==1){
		// console.log('aumento')
		// cantDesc =  Math.floor(Math.random()*50) + 1;
		if(args[1]=='Armeria') {
			table = `<h3 style="font-family: 'mrs eaves', 'times new roman', times, baskerville, garamond;color: #58170D;font-weight: bolder;font-variant: small-caps;text-transform: capitalize;font-size: 20px;margin-top: 10px;margin-bottom: 2px;line-height: 80%;border-bottom: 2px solid #c9ad6a;clear: both;">${heading}</h3><h5>Impuesto de: ${Math.ceil((cantDesc-1)*100)} % </h5><hr><img src='https://i.pinimg.com/564x/51/4d/aa/514daaf31ab6b8f92ccb306b6feec913.jpg' style='height: 350px; width: auto;  border: 1px solid #ddd;  border-radius: 4px;  padding: 5px; display: block;  margin-left: auto;  margin-right: auto;'><hr><table style='width: 100%;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline: none;'>${tableContents}</table>`;
		} else if (args[1]=='Alquemista') {
			table = `<h3 style="font-family: 'mrs eaves', 'times new roman', times, baskerville, garamond;color: #58170D;font-weight: bolder;font-variant: small-caps;text-transform: capitalize;font-size: 20px;margin-top: 10px;margin-bottom: 2px;line-height: 80%;border-bottom: 2px solid #c9ad6a;clear: both;">${heading}</h3><h5>Impuesto de: ${Math.ceil((cantDesc-1)*100)} % </h5><hr><img src='https://i.pinimg.com/564x/61/1f/ac/611facc0794553bd9b3aa31dff443a22.jpg' style='height: 350px; width: auto;  border: 1px solid #ddd;  border-radius: 4px;  padding: 5px; display: block;  margin-left: auto;  margin-right: auto;'><hr><table style='width: 100%;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline: none;'>${tableContents}</table>`;
		}else if (args[1]=='Bazar') {
			table = `<h3 style="font-family: 'mrs eaves', 'times new roman', times, baskerville, garamond;color: #58170D;font-weight: bolder;font-variant: small-caps;text-transform: capitalize;font-size: 20px;margin-top: 10px;margin-bottom: 2px;line-height: 80%;border-bottom: 2px solid #c9ad6a;clear: both;">${heading}</h3><h5>Impuesto de: ${Math.ceil((cantDesc-1)*100)} % </h5><hr><img src='https://i.pinimg.com/564x/9e/22/f9/9e22f96e36446df93e0ebf4626d9813d.jpg' style='height: 350px; width: auto;  border: 1px solid #ddd;  border-radius: 4px;  padding: 5px; display: block;  margin-left: auto;  margin-right: auto;'><hr><table style='width: 100%;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline: none;'>${tableContents}</table>`;
		}else if (args[1]=='Magia') {
			table = `<h3 style="font-family: 'mrs eaves', 'times new roman', times, baskerville, garamond;color: #58170D;font-weight: bolder;font-variant: small-caps;text-transform: capitalize;font-size: 20px;margin-top: 10px;margin-bottom: 2px;line-height: 80%;border-bottom: 2px solid #c9ad6a;clear: both;">${heading}</h3><h5>Impuesto de: ${Math.ceil((cantDesc-1)*100)} % </h5><hr><img src='https://i.pinimg.com/564x/19/11/19/191119c3148f71df48336961fabd998b.jpg' style='height: 350px; width: auto;  border: 1px solid #ddd;  border-radius: 4px;  padding: 5px; display: block;  margin-left: auto;  margin-right: auto;'><hr><table style='width: 100%;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline: none;'>${tableContents}</table>`;
		}
	} else {
		// console.log('nada')
		// cantDesc =  0
		if(args[1]=='Armeria') {
			table = `<h3 style="font-family: 'mrs eaves', 'times new roman', times, baskerville, garamond;color: #58170D;font-weight: bolder;font-variant: small-caps;text-transform: capitalize;font-size: 20px;margin-top: 10px;margin-bottom: 2px;line-height: 80%;border-bottom: 2px solid #c9ad6a;clear: both;">${heading}</h3><hr><img src='https://i.pinimg.com/564x/51/4d/aa/514daaf31ab6b8f92ccb306b6feec913.jpg' style='height: 350px; width: auto;  border: 1px solid #ddd;  border-radius: 4px;  padding: 5px; display: block;  margin-left: auto;  margin-right: auto;'><hr><table style='width: 100%;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline: none;'>${tableContents}</table>`;
		} else if (args[1]=='Alquemista') {
			table = `<h3 style="font-family: 'mrs eaves', 'times new roman', times, baskerville, garamond;color: #58170D;font-weight: bolder;font-variant: small-caps;text-transform: capitalize;font-size: 20px;margin-top: 10px;margin-bottom: 2px;line-height: 80%;border-bottom: 2px solid #c9ad6a;clear: both;">${heading}</h3><hr><img src='https://i.pinimg.com/564x/61/1f/ac/611facc0794553bd9b3aa31dff443a22.jpg' style='height: 350px; width: auto;  border: 1px solid #ddd;  border-radius: 4px;  padding: 5px; display: block;  margin-left: auto;  margin-right: auto;'><hr><table style='width: 100%;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline: none;'>${tableContents}</table>`;
		}else if (args[1]=='Bazar') {
			table = `<h3 style="font-family: 'mrs eaves', 'times new roman', times, baskerville, garamond;color: #58170D;font-weight: bolder;font-variant: small-caps;text-transform: capitalize;font-size: 20px;margin-top: 10px;margin-bottom: 2px;line-height: 80%;border-bottom: 2px solid #c9ad6a;clear: both;">${heading}</h3><hr><img src='https://i.pinimg.com/564x/9e/22/f9/9e22f96e36446df93e0ebf4626d9813d.jpg' style='height: 350px; width: auto;  border: 1px solid #ddd;  border-radius: 4px;  padding: 5px; display: block;  margin-left: auto;  margin-right: auto;'><hr><table style='width: 100%;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline: none;'>${tableContents}</table>`;
		}else if (args[1]=='Magia') {
			table = `<h3 style="text-align: center;'>${heading}</h3><hr><img src='https://i.pinimg.com/564x/19/11/19/191119c3148f71df48336961fabd998b.jpg' style='height: 350px; width: auto;  border: 1px solid #ddd;  border-radius: 4px;  padding: 5px; display: block;  margin-left: auto;  margin-right: auto;'><hr><table style='width: 100%;border: none !important;border-spacing: 0;border: 0px solid #ffffff !important;outline: none;'>${tableContents}</table>`;
		}
	}
	table = `<div style="background-image: url('https://i.imgur.com/vjL1blE.jpg'); padding: 30px; padding-top: 1px; margin: -30px;"><br>`+table+'</div>'
    return table;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getTableItems(tableName,numItems){
    var table = findObjs({
        type:"rollabletable",
        name:tableName
    })[0];
    
    if (table===undefined){
        sendChat("API",`/w gm no se encontro el rollable table llamado ${tableName}`);
        return null;
    }
    
    var tableList = findObjs({
        type:"tableitem",
        rollabletableid:table.get("id")
    })
    
    var tableItems = [];
    var usedItems = [];
    
    if (numItems>tableList.length){
        sendChat("API",`/w gm ${tableName} tiene menos de ${numItems} items.`);
        return null;
    }
	
	
	
	while (tableItems.length<numItems){
		var itemIndex = randomInteger(tableList.length)-1;
        while(usedItems.includes(itemIndex)){
            itemIndex = randomInteger(tableList.length)-1;
        }
		let tipo = tableList[itemIndex].get("name").split('_');
		rareza = tipo[3]
		tipo = tipo[0]
		// console.log(rareza)
		if(args[1]=='Armeria'){
			if(tipo=='Combat Items' || tipo=='Simple Melee Weapons' || tipo=='Simple Ranged Weapons' 
				|| tipo=='Martial Melee Weapons' || tipo=='Martial Ranged Weapons' || tipo=='Light Armor' 
				|| tipo=='Medium Armor' || tipo=='Heavy Armor' || tipo=='Shields' || tipo=='Ammunition'){
				if(rareza!=='Legendary'){
					if(args[2] =='Aldea') {
						if(rareza!=='Very Rare' & rareza!=='Rare'){
							tableItems.push(tableList[itemIndex].get("name"));
							usedItems.push(itemIndex);	
						}
					}else if (args[2] =='Pueblo' || args[2] =='Ciudad_Pequeña'){
						if(rareza!=='Very Rare'){
							tableItems.push(tableList[itemIndex].get("name"));
							usedItems.push(itemIndex);	
						}
					}else if (args[2] =='Ciudad_Grande' || args[2] =='Metropolis'){
						tableItems.push(tableList[itemIndex].get("name"));
						usedItems.push(itemIndex);	
					}					
				}	
			}
		}else if (args[1]=='Alquemista'){
			if(tipo=='Potion' || tipo == 'Poison'){
				if(rareza!=='Legendary'){
					if(args[2] =='Aldea') {
						if(rareza!=='Very Rare' & rareza!=='Rare'){
							tableItems.push(tableList[itemIndex].get("name"));
							usedItems.push(itemIndex);	
						}
					}else if (args[2] =='Pueblo' || args[2] =='Ciudad_Pequeña'){
						if(rareza!=='Very Rare'){
							tableItems.push(tableList[itemIndex].get("name"));
							usedItems.push(itemIndex);	
						}
					}else if (args[2] =='Ciudad_Grande' || args[2] =='Metropolis'){
						tableItems.push(tableList[itemIndex].get("name"));
						usedItems.push(itemIndex);	
					}
				}	
			}
		}else if (args[1]=='Bazar'){
			if(tipo=='Adventuring Gear' || tipo=="Artisan's Tools" || tipo=='Gaming Sets' || tipo=='Musical instrument'){
				if(rareza!=='Legendary'){
					if(args[2] =='Aldea') {
						if(rareza!=='Very Rare' & rareza!=='Rare'){
							tableItems.push(tableList[itemIndex].get("name"));
							usedItems.push(itemIndex);	
						}
					}else if (args[2] =='Pueblo' || args[2] =='Ciudad_Pequeña'){
						if(rareza!=='Very Rare'){
							tableItems.push(tableList[itemIndex].get("name"));
							usedItems.push(itemIndex);	
						}
					}else if (args[2] =='Ciudad_Grande' || args[2] =='Metropolis'){
						tableItems.push(tableList[itemIndex].get("name"));
						usedItems.push(itemIndex);	
					}
				}	
			}
		}else if (args[1]=='Magia'){
			if(tipo=='Consumable Items' || tipo=='Non Combat Items' || tipo=='Summons / Pets' 
				|| tipo=='Arcane Focus' || tipo=='Druidic Focus' || tipo=='Holy Symbol'){
				if(rareza!=='Legendary'){
					if(args[2] =='Aldea') {
						if(rareza!=='Very Rare' & rareza!=='Rare'){
							tableItems.push(tableList[itemIndex].get("name"));
							usedItems.push(itemIndex);	
						}
					}else if (args[2] =='Pueblo' || args[2] =='Ciudad_Pequeña'){
						if(rareza!=='Very Rare'){
							tableItems.push(tableList[itemIndex].get("name"));
							usedItems.push(itemIndex);	
						}
					}else if (args[2] =='Ciudad_Grande' || args[2] =='Metropolis'){
						tableItems.push(tableList[itemIndex].get("name"));
						usedItems.push(itemIndex);	
					}
				}	
			}
		}
	}
    
    return tableItems;
}