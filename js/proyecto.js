var all_data = [];

/* Nombres de las imagenes de banderas para cada país */
var country_codes = {
	"Albania": "al",
    "Andorra": "ad",
    "Armenia": "am",
    "Australia": "au",
    "Austria": "at",
    "Azerbaijan": "az",
    "Belarus": "by",
    "Belgium": "be",
    "Bosnia & Herzegovina": "ba",
    "Bulgaria": "bg",
    "Croatia": "hr",
    "Cyprus": "cy",
    "Czech Republic": "cz",
    "Denmark": "dk",
    "Estonia": "ee",
    "Finland": "fi",
    "France": "fr",
    "Georgia": "ge",
    "Germany": "de",
    "Greece": "gr",
    "Hungary": "hu",
    "Iceland": "is",
    "Ireland": "ie",
    "Israel": "il",
    "Italy": "it",
    "Latvia": "lv",
    "Lithuania": "lt",
    "Luxembourg": "lu",
    "Malta": "mt",
    "Moldova": "md",
    "Monaco": "mc",
    "Montenegro": "me",
    "Morocco": "ma",
    "Netherlands": "nl",
    "North Macedonia": "mk",
    "Norway": "no",
    "Poland": "pl",
    "Portugal": "pt",
    "Romania": "ro",
    "Russia": "ru",
    "San Marino": "sm",
    "Serbia": "rs",
    "Serbia & Montenegro": "cs",
    "Slovakia": "sk",
    "Slovenia": "si",
    "Spain": "es",
    "Sweden": "se",
    "Switzerland": "ch",
    "Turkey": "tr",
    "Ukraine": "ua",
    "United Kingdom": "gb",
    "Yugoslavia": "yu"
};

/* Nombres de las fases en español */
var fases = {
    'grand-final':"Gran Final",
    'final':"Final",
    "first-semi-final":"1ª Semifinal",
    "second-semi-final":"2ª Semifinal",
    "semi-final":"Semifinal",
};

/* Nombres de los paises en español */
var paises = {
    "Albania": "Albania",
    "Andorra": "Andorra",
    "Armenia": "Armenia",
    "Australia": "Australia",
    "Austria": "Austria",
    "Azerbaijan": "Azerbaijan",
    "Belarus": "Bielorrusia",
    "Belgium": "Bélgica",
    "Bosnia & Herzegovina": "Bosnia & Herzegovina",
    "Bulgaria": "Bulgaria",
    "Croatia": "Croacia",
    "Cyprus": "Chipre",
    "Czech Republic": "Chequia",
    "Denmark": "Dinamarca",
    "Estonia": "Estonia",
    "Finland": "Finlandia",
    "France": "Francia",
    "Georgia": "Georgia",
    "Germany": "Alemania",
    "Greece": "Grecia",
    "Hungary": "Hungría",
    "Iceland": "Islandia",
    "Ireland": "Irlanda",
    "Israel": "Israel",
    "Italy": "Italia",
    "Latvia": "Letonia",
    "Lithuania": "Lituania",
    "Luxembourg": "Luxemburgo",
    "Malta": "Malta",
    "Moldova": "Moldovia",
    "Monaco": "Mónaco",
    "Montenegro": "Montenegro",
    "Morocco": "Marruecos",
    "Netherlands": "Países Bajos",
    "North Macedonia": "Macedonia del Norte",
    "Norway": "Noruega",
    "Poland": "Polonia",
    "Portugal": "Portugal",
    "Romania": "Rumania",
    "Russia": "Rusia",
    "San Marino": "San Marino",
    "Serbia": "Serbia",
    "Serbia & Montenegro": "Serbia & Montenegro",
    "Slovakia": "Eslovaquia",
    "Slovenia": "Eslovenia",
    "Spain": "España",
    "Sweden": "Suecia",
    "Switzerland": "Suiza",
    "Turkey": "Turquía",
    "Ukraine": "Ucrania",
    "United Kingdom": "Reino Unido",
    "Yugoslavia": "Yugoslavia",
};

/* Nombres de las paises 'acortados' en español para el eje X del grafico */
var abv_paises = {
    "Albania": "Albania",
    "Andorra": "Andorra",
    "Armenia": "Armenia",
    "Australia": "Australia",
    "Austria": "Austria",
    "Azerbaijan": "Azerb.",
    "Belarus": "B.rrusia",
    "Belgium": "Bélgica",
    "Bosnia & Herzegovina": "B&H",
    "Bulgaria": "Bulgaria",
    "Croatia": "Croacia",
    "Cyprus": "Chipre",
    "Czech Republic": "Chequia",
    "Denmark": "Dinam.",
    "Estonia": "Estonia",
    "Finland": "Finlandia",
    "France": "Francia",
    "Georgia": "Georgia",
    "Germany": "Alemania",
    "Greece": "Grecia",
    "Hungary": "Hungría",
    "Iceland": "Islandia",
    "Ireland": "Irlanda",
    "Israel": "Israel",
    "Italy": "Italia",
    "Latvia": "Letonia",
    "Lithuania": "Lituania",
    "Luxembourg": "Luxemburgo",
    "Malta": "Malta",
    "Moldova": "Moldovia",
    "Monaco": "Mónaco",
    "Montenegro": "M.negro",
    "Morocco": "Marruecos",
    "Netherlands": "P. Bajos",
    "North Macedonia": "Macedonia",
    "Norway": "Noruega",
    "Poland": "Polonia",
    "Portugal": "Portugal",
    "Romania": "Rumania",
    "Russia": "Rusia",
    "San Marino": "S. Marino",
    "Serbia": "Serbia",
    "Serbia & Montenegro": "S&M",
    "Slovakia": "Eslovaquia",
    "Slovenia": "Eslovenia",
    "Spain": "España",
    "Sweden": "Suecia",
    "Switzerland": "Suiza",
    "Turkey": "Turquía",
    "Ukraine": "Ucrania",
    "United Kingdom": "UK",
    "Yugoslavia": "Yugoslavia",
};

// Se cargan los datos
d3.csv('datos.csv').then((data) => {
    // Se convierten los campos numericos a numero
    data.forEach(function(d) {
        d.year              = +d.year;
        d.running_order     = +d.running_order;
        d.total_points      = +d.total_points;
        d.rank              = +d.rank;
    });

    all_data = data;
    // se obtienen los nombres de todas las ediciones de Eurovision
    events = getEvents(data);

    // Se crea la subseccion que contendra el selector de la edicion de eurovision
    d3.select('#section1')
        .append('h4')
        .attr("class","titles_section1")
        .text('Edición:')

    // Se crea el selector
    var select_event = d3.select('#section1')
        .append('select')
        .attr('id','selector_eventos')
        .attr('size',10)
        .style("width","100%")
        .style("min-height","200px")
        .on('change', click_event)  // Se selecciona otra edicion (cambia algo en el selector)

    // Se introducen las ediciones de Eurovision en el selector
    select_event
        .selectAll('option')
	    .data(getEvents(data)).enter()
	    .append('option')
		.text(function (d) { return d; });

    // Por defecto, se selecciona la 1 opcion (Turin 2022)
    select_event
        .select('option').attr('selected','')

    // Se crea la subseccion que contendra el selector de la fase de la edicion seleccionada
    d3.select('#section1')
        .append('hr')
    d3.select('#section1')
        .append('h4')
        .attr("class","titles_section1")
        .text('Fase:')
    
    // Se establece el texto por defecto (sin ningun pais seleccionado) en la seccion 3 (derecha)
    default_section3();
    // Se crea el grafico de la edicion seleccionada (Turin 2022) y la fase seleccionada por defecto (Final)
    create_graph(change_event(data));

    // Crea el grafico con los resultados de la edicion y fase seleccionada
    function create_graph(data) {
        // Se vacian los datos relativos a un pais en la seccion 3 si los hubiera
        erase_section3();
        // Se establece el texto por defecto (sin ningun pais seleccionado) en la seccion 3 (derecha)
        default_section3();
        
        // Se ordenan los paises segun el ranking (resultado de Eurovision)
        data = data.sort(function(a, b) {
            return d3.ascending(a.rank, b.rank)
          })

        // Se establecen los parametros del grafico
        var margin = {top: 20, right: 10, bottom: 40, left: 30};
        w = 750 - margin.left - margin.right;
        h = 460 - margin.top - margin.bottom;
        var x = d3.scaleBand().rangeRound([0,w]).padding(.1);
        var y = d3.scaleLinear().range([h, 0]);
        // Escala de color personalizada: Oro, plata, bronce, y degradado verde-amarillo-rojo
        var colors = d3.scaleLinear().range(["#D4AF37","#BEBEBE","#a46628","#33cc33", "#ffca00", "#ff0000"])
        colors.domain([1, 2, 3, 4, d3.max(data, d => d.rank/1.9), d3.max(data, d => d.rank)])
        var xAxis = d3.axisBottom(x);
        var yAxis = d3.axisLeft(y).ticks(5)

        // Se crea el grafico
        var svg = d3.select("#section2").append("svg")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
     
        // Se establecen los posibles valores de cada eje (X-Y)
        x.domain(data.map(function(d) { return abv_paises[d.artist_country]; }));
        y.domain([0, d3.max(data, function(d) { return d.total_points; })]);

        // Se crean las barras con puntuacion 0 para realizar una transicion hasta su respectivo valor
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(abv_paises[d.artist_country]); })
            .attr("width", x.bandwidth())
            .attr("y", function() { return y(0); })
            .transition()
            .duration(1000)
            .on("start", function(){
                d3.select(this)
                .attr("height",0)
                })
            .attr("y", function(d) { return y(d.total_points); })
            .attr("height", function(d) { return h - y(d.total_points); })

        // Se crea el eje X
        svg.append("g")
            .attr("class", "xaxis")
            .attr("transform", "translate(0, " + h + ")")
            .style("font-size","6.5px")
            .call(xAxis)

        // Se crea el eje Y
        svg.append("g")
            .attr("class", "yaxis")
            .call(yAxis);

        // Se añade interactividad: Se muestra la informacion del pais (seccion derecha) clickado del eje X
        d3.selectAll(".xaxis text")
        .data(data)
        .on("click", (event, d) => { create_section3(d, colors) })

        // Se crean las etiquetas del eje Y (puntos)
        var labels = svg.append("g")
            .attr("class", "labels");

        // Se adecuan las etiquetas del eje Y (puntos) al eje Y
        labels.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");

        // Se crea el recuadro que se mostrara al pasar el cursor encima de la barra
        var Tooltip = d3.select("#section2")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")

        // Se colorean las barras con el color que le toca y se añade interactividad
        svg.selectAll(".bar")
            .attr("fill", d=>colors(d.rank))
            // Se muestra el recuadro sobre la barra con el cursor encima actualizandolo con la info de ese pais en dicha fase
            .on("mousemove",  function(event, d) {
                Tooltip
                .html("<b>"+paises[d.artist_country]+": <span style=\"color:"+colors(d.rank)+"\">"+d.rank+"º con "+d.total_points+" puntos</span></b><br><br><b>Artista:</b> "+d.artist+"<br><b>Canción:</b> "+d.song)
                .style("left", (event.clientX-195) + "px")
                .style("top", (event.clientY-100) + "px")
                .style("opacity", 1)
              })
            // Se oculta el recuadro
            .on("mouseout",  function(d) {
                Tooltip
                  .style("opacity", 0)
              })
            // Se muestra la informacion del pais (seccion derecha) de la barra clickada
            .on("click", (event,d) => { create_section3(d,colors) });

        // Se muestra la puntuacion obtenida de cada pais en el grafico, acompañado
        // de la misma transicion que la creacion de las barras
        svg.selectAll(".text_points")
            .data(data)
            .enter()
            .append("text")
            .attr("x", function(d) { return x(abv_paises[d.artist_country])+x.bandwidth()/2; })
            .attr("y", function() { return y(0)-5; })
            .transition()
            .duration(1000)
            .attr("y", function(d) { return y(d.total_points)-5; })
            .style("text-anchor", "middle")
            .style("font-size","10px")
            .text(function(d){ return d.total_points; });

        // Se muestra informacion (si fuese el caso) sobre las ediciones 'especiales' de
        // 2020 (no se celebro por covid) y 1956 (no se conocen los puntos, solo la ganadora)
        if(data[0].year == 2020) year2020();
        else if((data[0].year == 1956)) year1956();
    }

    // Se actualiza la seccion 3 con la informacion del pais seleccionado
    function create_section3(data,colors) {
        // Se vacian los datos relativos a un pais en la seccion 3 si los hubiera
        erase_section3();

        // Se establece la ruta relativa de la bandera del pais
        link_img = "./banderas/"+country_codes[data.artist_country]+".png"
        
        // Se crea la cabecera de la seccion 3 y se inserta la bandera
        d3.select('#section3')
            .append("div")
            .attr("id","s3_header")
            .append("div")
            .attr("id","s3_flag")
            .append("img")
            .attr("src",link_img)

        // Se inserta en la cabecera el nombre de pais al lado de la bandera
        d3.select('#section3 div')
            .append("div")
            .attr("id","s3_title")
            .append("span")
            .text(paises[data.artist_country])

        // Se crea el titulo para la subseccion de la edicion actual
        d3.select('#section3')
            .append("div")
            .attr("class","titles_section3")
            .append("span")
            .text("Eurovisión "+data.event)

        // Se crea la subseccion para montrar info de la edicion actual
        var event_section = d3.select('#section3')
        .append("div")
        .attr("class","s3_subsection")
        .attr("id","section_event")

        // Se actualiza la subseccion con la info del pais de la edicion actual
        event_section
            .append("div")
            .style("float",'left')
            .style("width",'60%')
            .html("<b>Posicion: <span style=\"color:"+colors(data.rank)+"\">"+data.rank+"º con "+data.total_points+" puntos</span></b><br><br><b>Artista:</b> "+data.artist+"<br><br><b>Canción:</b> "+data.song)

        // Se crea el comando para abrir una nueva ventana con la info del artista seleccionado
        link = 'window.open(\''+data.artist_url+'\',\'_blank\')'

        // Se añade el boton de "Saber mas sobre el artista"
        event_section
            .append("div")
            .style("width",'39%')
            .append('button')
            .attr("id","button_artist")
            .attr('onclick',link)
            .text('Saber más sobre el artista')

        // Se crea el titulo para la subseccion del resumen general del pais en Eurovision
        d3.select('#section3')
            .append("div")
            .attr("class","titles_section3")
            .append("span")
            .text("Resumen General")
            
        // Se crea la subseccion para el resumen general del pais en Eurovision
        var resume_section = d3.select('#section3')
            .append("div")
            .attr("class","s3_subsection")

        // Se obtienen los datos de todas las ediciones de ese pais
        country_data = getCountryData(all_data, data.artist_country)

        // Se calcula el numero de victorias (si las hay) y la ultima vez que gano
        country_wins = getWins(country_data)
        if (country_wins.length == 0) {
            best_event = getBestPosition(country_data)
        } else {
            best_event = country_wins[0]
        }

        // Se actualiza la subseccion con la info del resumen general del pais
        resume_section
            .append("div")
            .html("<b>Mejor resultado (más reciente): <span style=\"color:"+colors(best_event.rank)+"\">"+best_event.rank+"º con "+best_event.total_points+" puntos </span></b>")
            .append("div")
            .attr("id","section_resumen")
            .html("<b>Edición: </b>"+best_event.event+"<br><br><b>Artista:</b> "+best_event.artist+"<br><br><b>Canción:</b> "+best_event.song)

        // Se calcula la ultima vez que albergo el festival (si fuese el caso)
        lastHost = getLastHost(country_data)
        if(lastHost == null) { lastHost = "Nunca"}

        // Se actualiza la subseccion con la info del resumen general del pais
        resume_section
            .append("div")
            .html("<b>Primera participación:</b> "+getFirstEvent(country_data)+"<br><br><b>Número de victorias:</b> "+country_wins.length+"<br><br><b>Albergó el festival por última vez:</b> "+lastHost)
    }

    // Crea un nuevo grafico al seleccionar otra edicion con la fase final seleccionada por defecto
    function click_event() {
        d3.select('form').remove()
        d3.select('#button_event').remove()
        d3.select('svg').remove()
        create_graph(change_event(data));
    }

    // Crea un nuevo grafico al seleccionar otra fase de la misma edicion
    function click_stage() {
        d3.select('svg').remove()
        create_graph(getData(data, select_event.property('value'), stages[d3.select('input[name="selector_stages"]:checked').property("value")]));
    }

    // Actualiza las fases segun la edicion seleccionada y el boton de mas info sobre dicha edicion
    function change_event(data) {
        // Se eliminan los recuadros informativos de las ediciones especiales
        erase_specialYears();

        // Obtiene las fases para esta edicion seleccionada
        stages = getStages(data, select_event.property('value'))

        // Se crea el contener de los Radio-buttons para seleccionar las fases
        form = d3.select('#section1')
        .append('form')
        
        var labelEnter = form.selectAll('span')
            .data(stages)
            .enter().append('span')

        // Se crean y etiquetan los selectores de fase (Radio-buttons)
        labelEnter.append('input')
            .attr('type','radio')
            .attr('name','selector_stages')
            .attr('id', function(d, i) {return "stage".concat(i);})
            .attr('value', function(d, i) {return i;})
            .on('change',click_stage)
        labelEnter.append('span')
        labelEnter.append("label")
            .attr('class','selector_fase')
            .text(function(d) {return fases[d];});
        labelEnter.append("br")

        // Se selecciona por defecto el primero (Final)
        d3.select('#stage0').attr('checked','');

        // Se obtienen los datos de la fase seleccionada para esa edicion
        new_data = getData(data, select_event.property('value'), stages[d3.select('input[name="selector_stages"]:checked').property("value")])
    
        // Se crea el comando para abrir una nueva ventana con la info del artista seleccionado
        link = 'window.open(\''+new_data[0].event_url+'\',\'_blank\')'

        // Se crea el boton para mas info de la edicion seleccionada
        d3.select('#section1')
            .append('div')
            .attr('id','button_event')
            .append('button')
            .attr('onclick',link)
            .style('width','100%')
            .text('Más info aquí')

        return new_data
    };

    // Vacia los datos relativos a un pais en la seccion 3 si los hubiera
    function erase_section3() {
        d3.select('#section3')
         .selectAll('div')
         .remove()
    }

    // Se establece el texto por defecto (sin ningun pais seleccionado) en la seccion 3 (derecha)
    function default_section3() {
        d3.select('#section3')
            .append('div')
            .append('h2')
            .style("padding-left","10px")
            .text('Haga click sobre cualquier barra o país para obtener más información')
    }

    // Añade un recuadro en el grafico informando sobre la organizacion de la edicion 2020 de Eurovision
    function year2020() {
        d3.select('.tooltip')
        .attr("id","year2020")
        .style("opacity",1)
        .style("padding","20px")
        .html("<h2>No se celebró Eurovision en 2020 debido a la pandemia del covid.<br>Se enviaron las canciones pero la situación epidemiológica impidió<br>la celebración del festival  de forma presencial en el último momento.</h2>")
        .style("left", "150px")
        .style("top", "150px")
    }

    // Añade un recuadro en el grafico informando sobre la organizacion de la edicion 1956 de Eurovision
    function year1956() {
        d3.select('.tooltip')
        .attr("id","year1956")
        .style("opacity",1)
        .style("padding","20px")
        .html("<h2>Los resultados del festival, aparte de la canción ganadora, son desconocidos.</h2>")
        .style("left", "150px")
        .style("top", "150px")
    }

    // Elimina los recuadros informativos de las ediciones especiales
    function erase_specialYears(){
        d3.select('#year2020').remove();
        d3.select('#year1956').remove();
    }
});

// Obtiene los nombres de todos los eventos de Eurovision
function getEvents(data) {
    var events = [];
    for (i=0;i<data.length;i++) {
        if(!events.includes(data[i].event)) {
            events = events.concat(data[i].event)
        }
    }
    return events;
}

// Obtiene los nombres de todas las fases para una edicion concreta
// Coloca siempre primero la Final, y despues (si las hubiera) las otras fases
function getStages(data, event) {
    var stages = [];
    for (i=0;i<data.length;i++) {
        if(event === data[i].event && !stages.includes(data[i].section)) {
            stages = stages.concat(data[i].section).sort();
        }
    }
    if(stages[0] === 'first-semi-final') {
        temp = stages[1]
        stages[1] = stages[0]
        stages[0] = temp
    }
    return stages;
}

// Obtiene un sub data set del evento y fase seleccionados
function getData(data, event, stage) {
    var indexes = [];
    for (i=0;i<data.length;i++) {
        if(event === data[i].event && stage === data[i].section) {
            indexes = indexes.concat(i)
        }
    }
    new_data = indexes.map(i => data[i])
    return new_data;
}

// Obtiene un sub data set del pais seleccionado con todas sus participaciones en eurovision
function getCountryData(data, country) {
    var indexes = [];
    for (i=0;i<data.length;i++) {
        if(country === data[i].artist_country) {
            indexes = indexes.concat(i)
        }
    }
    country_data = indexes.map(i => data[i])
    return country_data;
}

// Obtiene las victorias de un pais
function getWins(data) {
    var wins = [];
    for (i=0;i<data.length;i++) {
        if(data[i].winner === "TRUE") {
            wins=wins.concat(data[i]);
        }
    }
    return wins;
}

// Obtiene la mejor ultima posicion de un pais
function getBestPosition(data){
    var best_rank = 99;
    var best = null;
    for (i=0;i<data.length;i++) {
        if(data[i].rank < best_rank && (data[i].section === "grand-final" || data[i].section === "final")) {
            best = data[i];
            best_rank = best.rank;
        }
    }
    return best;
}

// Obtiene la primera participacion de un pais
function getFirstEvent(data){
    var year = data[0].year
    for (i=0;i<data.length;i++) {
        if(data[i].year < year ) {
            year = data[i].year;
            firstEvent = data[i].event;
        }
    }
    return firstEvent;
}

// Obtiene la ultima vez que un pais albergo el festival (si asi fuese)
function getLastHost(data) {
    for (i=0;i<data.length;i++) {
        if(data[i].host_country === data[0].artist_country ) {
            return data[i].event;
        }
    }
    return null;
}
