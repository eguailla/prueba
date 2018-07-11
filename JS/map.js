var map;
require([
	"esri/Map",
	//"esri/WebMap",
	"esri/views/MapView",
	"esri/layers/FeatureLayer",
	"esri/widgets/Search",
	"esri/widgets/Home",
	"esri/widgets/Locate",
	"esri/widgets/BasemapToggle",
	"esri/widgets/ScaleBar",
	"esri/symbols/SimpleFillSymbol",
	"esri/renderers/SimpleRenderer",
	"esri/widgets/LayerList",
	"esri/widgets/Expand",
	"esri/widgets/Print",
	"esri/widgets/Track",
	"dojo/domReady!"], function(Map,MapView,FeatureLayer,Search,Home,Locate,BasemapToggle,ScaleBar,SimpleFillSymbol,SimpleRenderer,LayerList,
								Expand,Track,Print,/*WebMap*/){

  	map = new Map({
    	basemap: "topo",
   	});
	
	var view= new MapView({
		container:"viewMap",
		map:map,
		center: [-74, 4],
    	zoom: 5
	});

	var template = {
		title: "Departamento: {DPTO} ",
		content:"<p>Codigo DANE: {DPTO_DPTO_} </p>"
	};


	  	

	var dptosRenderer={
  		type:"simple",
  		symbol:{
  			type:"simple-fill",
  			color:"red",
  			width:1,
  			outline:{
  					color: "white",
  					width:1
  			}
  		}

  	};

   	//capa DPTOS
     var divDeptos= new FeatureLayer({
     	url: "http://54.187.22.10:6080/arcgis/rest/services/COLOMBIA/MapServer/2",
     	outFields:["DPTO","DPTO_DPTO_"],
     	opacity: "0.5",

     	popupTemplate: template,
     	renderer: dptosRenderer
     });
     


     //CAPA CENTROS POBLADOS
     var centrosPoblados= new FeatureLayer({
     	url: "http://54.187.22.10:6080/arcgis/rest/services/COLOMBIA/MapServer/0",
     	opacity: "0.5"
     });
     //rios colombia
     var riosCol= new FeatureLayer({
     	url: "http://services.arcgis.com/deQSb0Gn7gDPf3uV/arcgis/rest/services/Rios_Principales_Colombia/FeatureServer/0",
     	opacity: "0.55",
     	visible: false
     });

    var search = new Search({
  			view:view,
  			allPlaceholder: "búsqueda rápida"
  		});

  	view.ui.add(search,{
		position:"top-left",
		index:0
  	});

  	var HomeButton= new Home({
  		view:view
  	});
  	view.ui.add(HomeButton, "top-left");

  	var LocateButton=new Locate({
  		view:view
  	});
  	view.ui.add(LocateButton,"top-left");

  	var basemapTo=new BasemapToggle({
  		view:view,
  		nextBasemap: "satellite"
  	});
  	view.ui.add(basemapTo,"top-right");

  	var scale=new ScaleBar({
  		view:view,
  		unit: "dual"
  	});
  	view.ui.add(scale,{ 
  		position:"bottom-left"
  	});

  var layerlst= new LayerList({
  	container:document.createElement("div"),
  	view:view
  });

  layerlstExpand=new Expand({
  	expandIconClass:"esri-icon-left-triangle-arrow",
  	view:view,
  	content: layerlst.domNode
  });

  view.ui.add(layerlstExpand,"top-right");
  /*view.ui.add(layerlst,{
  	position:"top-left"
  });*/
  	
  	var track= new Track({
  		view:view
  	});
  	view.ui.add(track, "top-right");

  	map.add(divDeptos);
  	map.add(centrosPoblados);
  	map.add(riosCol);

  	//IMPRESION
  	view.then(function(){
  		var print= new Print({
  			container:"export",
  			view:view,
  			printServiceUrl:"https://utility.arcgisonline.com/rest/services/Utilities/PrintingTools/GPServer/Exportt%20Web%20Map%20Task"
  		});

  		var printExpand= new Expand({
  			expandIconClass:"esri-icon-left-triangle-arrow",
  			view:view,
  			content:print.domNode
  		});
  		view.ui.add(print);
  	});

  	


	

   
    

});

