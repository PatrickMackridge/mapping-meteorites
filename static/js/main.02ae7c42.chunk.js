(this["webpackJsonpmetorite-landings"]=this["webpackJsonpmetorite-landings"]||[]).push([[0],{185:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(25),i=a.n(r),s=(a(80),a(74)),c=a(19),l=a(10),u=a(11),m=a(13),p=a(12),h=a(14),g=(a(50),function(e){return o.a.createElement("div",{className:"tableContainer"},o.a.createElement("table",null,o.a.createElement("thead",null,o.a.createElement("tr",null,o.a.createElement("th",null,"Name"),o.a.createElement("th",null,"Mass (kg)"),o.a.createElement("th",null,"Geolocation"),o.a.createElement("th",null,"Year"))),e.meteorites.map((function(e){return o.a.createElement("tbody",{key:e.id},o.a.createElement("tr",null,o.a.createElement("td",null,e.name),o.a.createElement("td",null,e.mass/1e3),o.a.createElement("td",null,"(",e.geolocation.latitude,"\xb0, ",e.geolocation.longitude,"\xb0)"),o.a.createElement("td",null,e.year)))}))))}),d=a(51),f=a(54),E=a(70),v=a.n(E),b=function(e){var t=[0,0,0,0,0];return e.forEach((function(e){e.mass<=5e4?t[0]+=1:e.mass<=1e5?t[1]+=1:e.mass<=2e5?t[2]+=1:e.mass<=3e5?t[3]+=1:t[4]+=1})),t},y=function(e){var t=[0,0,0,0,0];return e.forEach((function(e){e.mass<=5e5?t[0]+=1:e.mass<=1e6?t[1]+=1:e.mass<=2e6?t[2]+=1:e.mass<=5e6?t[3]+=1:t[4]+=1})),t},k=function(e){var t=[0,0,0,0,0];return e.forEach((function(e){e.geolocation.latitude>0&&e.geolocation.longitude>0?t[0]+=1:e.geolocation.latitude<0&&e.geolocation.longitude>0?t[1]+=1:e.geolocation.latitude<0&&e.geolocation.longitude<0?t[2]+=1:e.geolocation.latitude>0&&e.geolocation.longitude<0?t[3]+=1:t[4]+=1})),t},j=function(e){var t=[0,0,0,0,0];return e.forEach((function(e){e.year<1700?t[0]+=1:e.year<1800?t[1]+=1:e.year<1900?t[2]+=1:e.year<2e3?t[3]+=1:t[4]+=1})),t},D=function(e){return e.filter((function(e){return!isNaN(e.geolocation.latitude)&&!isNaN(e.geolocation.longitude)})).map((function(e){return Object(c.a)({},e.geolocation,{intensity:100})}))},O=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(m.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(o)))).state={meteorites:a.props.meteorites,locationData:[]},a.componentDidUpdate=function(e,t){e.meteorites!==a.props.meteorites&&a.setState({locationData:D(a.props.meteorites)})},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.setState((function(e){return{locationData:D(e.meteorites)}}))}},{key:"render",value:function(){var e=this.state.locationData;return o.a.createElement(v.a,{points:e,longitudeExtractor:function(e){return e.longitude},latitudeExtractor:function(e){return e.latitude},intensityExtractor:function(e){return e.intensity},radius:25,blur:10})}}]),t}(n.Component),M=a(52),w=a(53),C=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(m.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(o)))).state={meteorites:a.props.meteorites},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"componentDidUpdate",value:function(e,t){e.meteorites!==this.props.meteorites&&this.setState({meteorites:this.props.meteorites})}},{key:"render",value:function(){var e=this.state.meteorites;return o.a.createElement(o.a.Fragment,null," ",e.map((function(e){return"Unknown"!==e.geolocation.latitude?o.a.createElement(M.a,{key:e.id,position:[e.geolocation.latitude,e.geolocation.longitude]},o.a.createElement(w.a,{style:{height:0,width:0}},o.a.createElement("div",{id:"popup-info"},o.a.createElement("h3",null,e.name),o.a.createElement("p",{id:"popup-info"},"Mass: ",e.mass/1e3+" kg"),o.a.createElement("p",{id:"popup-info"},"Geolocation: ",e.geolocation.latitude," lat.,"," ",e.geolocation.longitude," long."),o.a.createElement("p",{id:"popup-info"},"Year: ",e.year)))):null})))}}]),t}(n.Component),S=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(m.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(o)))).state={meteorites:a.props.meteorites,heatMap:a.props.heatMap},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"componentDidUpdate",value:function(e,t){this.props.meteorites!==e.meteorites&&this.setState({meteorites:this.props.meteorites}),this.props.heatMap!==e.heatMap&&this.setState({heatMap:this.props.heatMap})}},{key:"render",value:function(){var e=this.state,t=e.meteorites,a=e.heatMap;return o.a.createElement(d.a,{center:[20,20],zoom:2},o.a.createElement(f.a,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:'\xa9 <a href="https://osm.org.copyright">OpenStreetMap</a> contributors'}),!0===a?o.a.createElement(O,{meteorites:this.props.meteorites}):o.a.createElement(C,{meteorites:t}))}}]),t}(o.a.Component),L=a(72),N=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(m.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(o)))).state={chartData:{labels:[],datasets:[{label:"Meteorite Landings",data:[],backgroundColor:["#FF6384","#36A2EB","#FFCE56","#001cac","#29ac00"],hoverBackgroundColor:["#FF6384","#36A2EB","#FFCE56","#001cac","#29ac00"],borderColor:"rgb(255, 255, 255)"}]},chartCreated:!1},a.formatData=function(e){"sizeRange"===e?a.formatSizes():"hemisphere"===e?a.formatHemispheres():"century"===e&&a.formatCenturies()},a.formatSizes=function(){var e,t,n=a.state.chartData,o=a.props.meteorites;100===o.length?(e=y(o),t=["500kg or less","501kg-1000kg","1001kg - 2000kg","2001kg-5000kg","More than 5000kg"]):(e=b(o),t=["50kg or less","51kg-100kg","101kg - 200kg","201kg-300kg","More than 300kg"]);var r=Object(c.a)({},n);r.datasets[0].data=e,r.labels=t,a.setState({chartData:r,chartCreated:!0})},a.formatHemispheres=function(){var e=a.state.chartData,t=a.props.meteorites,n=k(t),o=Object(c.a)({},e);o.datasets[0].data=n,o.labels=["NE Hem","SE Hem","SW Hem","NW Hem","Unknown Location"],a.setState({chartData:o,chartCreated:!0})},a.formatCenturies=function(){var e=a.state.chartData,t=a.props.meteorites,n=j(t),o=Object(c.a)({},e);o.datasets[0].data=n,o.labels=["Pre 1700","1700-1799","1800-1899","1900-1999","200s"],a.setState({chartData:o,chartCreated:!0})},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"componentDidUpdate",value:function(e,t){var a=this.props,n=a.dropdownVal,o=a.meteorites;e.dropdownVal===n&&e.meteorites.length===o.length||this.formatData(n)}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this.state.chartData;return o.a.createElement("div",{className:"doughnutContainer"},o.a.createElement(L.a,{data:e,options:{maintainAspectRatio:!1}}))}}]),t}(n.Component),F=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(m.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(o)))).state={meteorites:[],largestMeteorites:[],doughnutDataVal:"sizeRange",isLoading:!0,showLargest100:!1,heatMap:!1},a.fetchData=function(){fetch("https://data.nasa.gov/resource/gh4g-9sfh.json?$order=mass DESC&$where=mass > 0").then((function(e){return e.json()})).then((function(e){var t=e.map((function(e){var t=Object(c.a)({},e);return void 0===t.geolocation&&(t.geolocation={latitude:"Unknown",longitude:"Unknown"}),t.year?t.year=t.year.slice(0,4):t.year||(t.year="Unknown"),t.mass||(t.mass="Unknown"),t.mass=parseFloat(t.mass).toFixed(0),t})),n=Object(s.a)(t).slice(0,100);a.setState({isLoading:!1,meteorites:t,largestMeteorites:n})}))},a.getLargest100=function(){a.setState((function(e){return{showLargest100:!e.showLargest100}}))},a.toggleHeatMap=function(){a.setState((function(e){return{heatMap:!e.heatMap}}))},a.changeDropdown=function(e){e.target.value!==a.state.doughnutDataVal&&a.setState({doughnutDataVal:e.target.value})},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.fetchData()}},{key:"componentDidUpdate",value:function(){}},{key:"render",value:function(){var e,t=this.state,a=t.meteorites,n=t.largestMeteorites,r=t.doughnutDataVal,i=t.isLoading,s=t.heatMap,c=t.showLargest100;return e=!0===c?n:a,o.a.createElement("div",{className:"App"},o.a.createElement("h1",null,"Meteorite Landings"),o.a.createElement("button",{className:"heatButton",onClick:this.toggleHeatMap},"Heat Map"),!0===i?o.a.createElement("p",null,"...loading..."):o.a.createElement(S,{meteorites:e,heatMap:s}),o.a.createElement("div",{className:"tableChart"},o.a.createElement("div",{className:"table-area"},o.a.createElement("button",{className:"largest100Button",onClick:this.getLargest100},c?"Show Largest 1000":"Show Largest 100 Only"),!0===i?o.a.createElement("p",null,"...loading..."):o.a.createElement(g,{meteorites:e})),o.a.createElement("div",{className:"doughnutArea"},o.a.createElement("label",null,"Doughnut Data:"," ",o.a.createElement("select",{id:"",onChange:this.changeDropdown},o.a.createElement("option",{value:"sizeRange"},"Size Range"),o.a.createElement("option",{value:"hemisphere"},"Hemisphere"),o.a.createElement("option",{value:"century"},"Century"))),o.a.createElement(N,{meteorites:e,dropdownVal:r,isLoading:i}))))}}]),t}(o.a.Component);i.a.render(o.a.createElement(F,null),document.getElementById("root"))},50:function(e,t,a){},75:function(e,t,a){e.exports=a(185)},80:function(e,t,a){}},[[75,1,2]]]);
//# sourceMappingURL=main.02ae7c42.chunk.js.map