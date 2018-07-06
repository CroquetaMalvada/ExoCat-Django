/////IDIOMA DATATABLES
var opciones_idioma = {
//    "decimal":        separador_decimales,
//    "thousands":      separador_miles,
    "emptyTable":     "No s'han trobat dades",
    "info":           "Mostrant d'_START_ a _END_ de _TOTAL_ resultats",
    "infoEmpty":      "0 resultats",
    "infoFiltered":   "(filtrats d'un total de _MAX_)",
    "infoPostFix":    "",
    "lengthMenu":     "Mostrar _MENU_ resultats",
    "loadingRecords": "Carregant...",
    "processing":     "Processant...",
    "search":         "Buscar:",
    "zeroRecords":    "No s'han trobat resultats",
    "paginate": {
        "first":      "Primer",
        "last":       "Últim",
        "next":       "Següent",
        "previous":   "Anterior"
    },
    "aria": {
        "sortAscending":  ": activar per ordenar de forma ascendent",
        "sortDescending": ": activar per ordenar de forma descendent"
    }
}

$(document).on({

    ajaxStart: function(){
        $("#boton_filtrar").hide();
        $("#limpiar_filtros").hide();
        $("#generar_csv").hide();
        $("#filtrar_loading").show();
//            if($(this).find(".dataTables_empty")){
//                var mensaje=$(this).find(".dataTables_empty");
//                mensaje.html("Carregant...");
//            }
//            load = loading("Carregant...");
    },
    ajaxStop: function(){
        $("#boton_filtrar").show();
        $("#limpiar_filtros").show();
        $("#generar_csv").show();
        $("#filtrar_loading").hide();
//            if($(this).find(".dataTables_empty")){
//                var mensaje=$(this).find(".dataTables_empty");
//                mensaje.html("No s'han trobat dades");
//            }

    }
});

var filtros=null;
var taula_especies;
var taula_especies_map;
var taula_especies_info_localitzacio;
var taula_especies_info_masses;
var taula_resum_localitats_especie;
var taula_documentacio_especie;
var taula_actuacions_especie;

$(document).ready(function(){

    // Si se esta cargando especies:


    taula_especies = $("#taula_especies").DataTable({
                    processing:true,
                    serverSide:true,
//                    ajax: '/ajax_taula_especies/',
//                    deferLoading: 10,
                    ajax: {
                        url: '/ajax_taula_especies/',
                        dataSrc: 'data',
                        type:"POST",
                        data:function(d){
                            d.genere=$("#genere").val();
                            d.especie=$("#especie").val();
                            d.subespecie=$("#subespecie").val();
                            d.grups=$("#grups").val();
                            d.estatuscatalunya=$("#estatuscatalunya").val();
                            d.varietat=$("#varietat").val();
                            d.regionativa=$("#regionativa").val();
                            d.viaentrada=$("#viaentrada").val();
                            d.estatushistoric=$("#estatushistoric").val();
                            d.present_catalog=$("#present_catalog").val();
                            d.present_reglament_eur=$("#present_reglament_eur").val();
//                            d.=$("#").val();
                        }
                    },
                    "deferRender": true,
                    columns:[
                        {'data': 'id'},
                        {'data': 'especie'},
                        {'data': 'grup'},
//                        {'data': 'estatuscat'},
//                        {'data': 'varietat'},
//                        {'data': 'regionativa'},
//                        {'data': 'viaentrada'},
//                        {'data': 'estatushistoric'},
//                        {'data': 'present'},
                        {'data':{'id':'id'},"render": function(data){return '<a class="btn btn-info mostrar_info_especie" value="'+data["id"]+'" title="Info" href="#"><i class="fa fa-eye fa-lg"></i></a>';}}
                    ],
                    columnDefs:[
                        {"visible":false,"targets":[0]},
                        { "width": "5%", "targets": [3] }
                    ],
                    order: [[ 1, "asc" ]],
//                    fnDrawCallback:function(){// OJO es sensible a mayusculas y minusculas
//                        var total = $(this).DataTable().column( 5 ).data().sum();
//                        $("#total_periodicitat_partida").val(total);
//                    },
                    scrollY:        '50vh',
                    scrollCollapse: true,
                    searching:false,
//                    "pagingType": "full_numbers",
//                    paging:         false,
                    autowidth:      true,
                    overflow:       "auto",
                    language: opciones_idioma,
        });
        // Ojo ESTO SIRVE PARA OBTENER EL JSON DE LA TABLA
        taula_especies.on( 'xhr', function () {
            var json = taula_especies.ajax.json();
            //console.log(json["ids_especies"]);
            $("#ids_especies_filtradas").attr("value",json["ids_especies"]);
            $("#ids_especies_filtradas").attr("num_elem",json["num_elem"]);
        } );


        taula_especies_map = $("#table_info_map").DataTable({
                    columnDefs:[
                        { "width": "5%", "targets": [6] },
                        { "width": "15%", "targets": [0,1,2,3,4,5] }
                    ],
                    dom: 'Bfrtip',
                    buttons:[{
                            extend: 'print',
                            header: true,
                            footer: true,
                            title: function(){return "Informació de area geogràfica"},
                            text: '<span aria-hidden="true"><i class="fa fa-print fa-lg"></i> Imprimir</span>',
                            autoPrint: true,
                            exportOptions: {
                                columns: [0,1,2,3,4,5],
                            }
                    },{
                        extend: 'excel',
                        filename: function(){return  "Informació de area geogràfica"},
                        text: '<span aria-hidden="true"><i class="fa fa-file-excel-o fa-lg"></i> Excel</span>',
                        exportOptions: {
                            columns: ':visible',
                        }
                    },{
                        extend: 'pdf',
                        title: function(){return  "Informació de area geogràfica"},
                        text: '<span aria-hidden="true"><i class="fa fa-file-pdf-o fa-lg"></i> PDF</span>',
                        exportOptions: {
                            columns: [0,1,2,3,4,5],
                        }
                    },{
                        extend: 'csv',
                        filename: function(){return  "Informació de area geogràfica"},
                        text: '<span aria-hidden="true"><i class="fa fa-table fa-lg"></i> CSV</span>',
                        exportOptions: {
                            columns: [0,1,2,3,4,5],
                        }
                    }],
                    order: [[ 0, "asc" ]],
                    scrollY:        '50vh',
                    scrollCollapse: true,
                    searching:false,
                    autowidth:      true,
                    overflow:       "auto",
                    paging: false,
                    language: opciones_idioma,
        });

        /// RESUM DE LOCALITATS
        taula_resum_localitats_especie = $("#table_resum_localitats_especie").DataTable({
                    columnDefs:[
                        { "width": "20%", "targets": [0] }
                    ],
                    dom: 'Bfrtip',
                    buttons:[{
                            extend: 'print',
                            header: true,
                            footer: true,
                            title: function(){return '<h4>Resum de localitats de <b>'+taula_resum_localitats_especie.cell(0,1).data()+'</b></h4>'},
                            text: '<span aria-hidden="true"><i class="fa fa-print fa-lg"></i> Imprimir</span>',
                            autoPrint: true
                    },{
                        extend: 'excel',
                        filename: function(){return 'Resum de localitats de '+taula_resum_localitats_especie.cell(0,1).data()},
                        text: '<span aria-hidden="true"><i class="fa fa-file-excel-o fa-lg"></i> Excel</span>',
                    },{
                        extend: 'pdf',
                        title: function(){return 'Resum de localitats de '+taula_resum_localitats_especie.cell(0,1).data()},
                        text: '<span aria-hidden="true"><i class="fa fa-file-pdf-o fa-lg"></i> PDF</span>'
                    },{
                        extend: 'csv',
                        filename: function(){return 'Resum de localitats de '+taula_resum_localitats_especie.cell(0,1).data()},
                        text: '<span aria-hidden="true"><i class="fa fa-table fa-lg"></i> CSV</span>'
                    }],
                    order:false,
                    scrollY:        '50vh',
                    scrollCollapse: true,
                    searching:      false,
                    autowidth:      true,
                    overflow:       "auto",
                    paging: false,
                    language: opciones_idioma,
                    info:false
        });
        ////////////////////////
        /// DOCUMENTACIO ESPECIE
        taula_documentacio_especie = $("#table_documentacio_especie").DataTable({
                    columnDefs:[
                        { "width": "5%", "targets": [1] }
                    ],
                    order: [[ 0, "asc" ]],
                    scrollY:        '50vh',
                    scrollCollapse: true,
                    searching:false,
                    autowidth:      true,
                    overflow:       "auto",
                    paging: false,
                    language: opciones_idioma,
        });

        ////////////////////////

        /// ACTUACIONS DE CONTROL
        taula_actuacions_especie = $("#table_actuacions_especie").DataTable({
                    columnDefs:[
                        { "width": "5%", "targets": [1] }
                    ],
                    order: [[ 0, "asc" ]],
                    scrollY:        '50vh',
                    scrollCollapse: true,
                    searching:false,
                    autowidth:      true,
                    overflow:       "auto",
                    paging: false,
                    language: opciones_idioma,
        });

        ////////////////////////

//        taula_especies_info_localitzacio = $("#taula_localitzacio_info_especie").DataTable({
////                    columnDefs:[
////                        { "width": "30%", "targets": [1,2] }
////                    ],
//                    order: [[ 0, "asc" ]],
//                    scrollY:        '50vh',
//                    scrollCollapse: true,
//                    searching:false,
//                    autowidth:      true,
//                    overflow:       "auto",
//                    paging: false,
//                    language: opciones_idioma,
//        });
//
//        taula_especies_info_masses = $("#taula_localitzacio_info_especie_masses").DataTable({
////                    columnDefs:[
////                        { "width": "30%", "targets": [1,2] }
////                    ],
//                    order: [[ 0, "asc" ]],
//                    scrollY:        '50vh',
//                    scrollCollapse: true,
//                    searching:false,
//                    autowidth:      true,
//                    overflow:       "auto",
//                    paging: false,
//                    language: opciones_idioma,
//        });



        $('a.visibilidad').on( 'click', function (e) {
            e.preventDefault();

            if($(this).children("strike").length>0)
                $(this).html($(this).find("strike").html());
            else
                $(this).html("<strike>"+$(this).html()+"</strike>");

            var column = taula_especies.column( $(this).attr('columna') );

            column.visible( ! column.visible() );
        } );

        // FILTROS PARA LA TABLA!
        $("#form_filtres").submit(function(event){
            taula_especies.page( 'first' );
            event.preventDefault();
            taula_especies.ajax.url("/ajax_taula_especies_filtres/");
            taula_especies.ajax.reload(null,false);
        });

        // GENERAR CSV
        $("#generar_csv").click(function(){
            var num = parseInt($("#ids_especies_filtradas").attr("num_elem"));
            if(num > 100){
                $.confirm({
                    title: 'Alerta',
                    content: "Es mostraran les dades de més de 100 espècies ("+num+"). Això podria fer que la generació del document trigui una mica.",
                    confirmButton: 'Endavant',
                    cancelButton: 'Cancel·lar',
                    confirmButtonClass: 'btn-info',
                    cancelButtonClass: 'btn-danger',
                    closeIcon: false,
                    confirm: function(){
                        window.open("/generar_csv_especies/"+$("#ids_especies_filtradas").attr("value"));
                    },
                    cancel: function(){
                    }
                });
            }
            else{
                window.open("/generar_csv_especies/"+$("#ids_especies_filtradas").attr("value"));
            }


        });


        // ajustar columnas al cargar un tab
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            $.fn.dataTable.tables( {visible: false, api: true} ).columns.adjust().draw();
        });

        // Limpiar filtros
        $("#limpiar_filtros").on("click",function(){
            limpiar_filtros();
        });

        //tooltip de las herramientas
        $(".boton_herramientas").tooltip();
});

function limpiar_filtros(){
    $("#form_filtres .form-control").each(function(){
    $(this).val($(this).data("original-value"));
    });
}

function cargando_datos_mapa(tipo){
    if(tipo==0){//si se ha empezado a cargar
        taula_especies_map.clear().draw();
        $("#table_info_map").find(".dataTables_empty").html("Buscant dades...") //<img src='https://loading.io/spinners/magnify/lg.searching-for-loading-icon.gif' width='10%'></img>
    }else if(tipo==1){// si ya se han cargado los datos
        $("#table_info_map").find(".dataTables_empty").html("No s'han trobat dades.")
    }else if(tipo==2){// si ha habido un error
        $("#table_info_map").find(".dataTables_empty").html("Error.")
    }

}

function rellenar_table_especies_click(data){ // esta funcion se llama en funciones_leaflet.js
    taula_especies_map.clear();
    $(data).each(function(){

//                    console.log(this);
        var total=this.nutm10000+this.nutm1000+this.ncitacions+this.nmassesaigua
        taula_especies_map.row.add([
            this.nom,
            this.grup,
            this.nutm10000,
            this.nutm1000,
            this.ncitacions,
            this.nmassesaigua,
            total,
            '<a class="btn btn-info mostrar_info_especie" value="'+this.id+'" title="Info" href="#"><i class="fa fa-eye fa-lg"></i></a>'
        ]).draw();
        //alert(this.properties.IDSPINVASORA);
    });
}
function rellenar_table_especies_seleccion(data){ // esta funcion se llama en funciones_leaflet.js
    taula_especies_map.clear();

    $(data).each(function(){
//                console.log(this);
        var total=this.nutm1000+this.nutm10000+this.ncitacions+this.nmassesaigua

        taula_especies_map.row.add([
            this.nom,
            this.grup,
            this.nutm10000,
            this.nutm1000,
            this.ncitacions,
            this.nmassesaigua,
            total,
            '<a class="btn btn-info mostrar_info_especie" value="'+this.id+'" title="Info" href="#"><i class="fa fa-eye fa-lg"></i></a>'
        ]);
    });
    taula_especies_map.draw();
}

function rellenar_table_resum_localitats_especie(data){ // esta funcion se llama en info_especie.js
    //taula_resum_localitats_especie.columns(0).clear();
    taula_resum_localitats_especie.cell(0,1).data(data["genere"]+" "+data["especie"]);
    //taula_resum_localitats_especie.cell(1,1).data(data["grup"]);
    taula_resum_localitats_especie.cell(1,1).data(data["nutm10000"]);
    taula_resum_localitats_especie.cell(2,1).data(data["nutm1000"]);
    taula_resum_localitats_especie.cell(3,1).data(data["ncitacions"]);
    taula_resum_localitats_especie.cell(4,1).data(data["nmassesaigua"]);
    taula_resum_localitats_especie.cell(5,1).data(data["nutm10000"]+data["nutm1000"]+data["ncitacions"]+data["nmassesaigua"]);
    $.fn.dataTable.tables( {visible: false, api: true} ).columns.adjust().draw();///IMPORTANTE sirve para alinear correctamente las cabezeras de las datatables,ya que con divs que estan hidden no se alineaban automaticamente
//    $(data["citacions"]).each(function(){
//
//    });
}

function rellenar_table_documentacio_especie(data){ // esta funcion se llama en info_espcie,js
    taula_documentacio_especie.clear();
    $(data).each(function(){
//                console.log(this);
        taula_documentacio_especie.row.add([
            this.titol,
            '<a class="btn btn-info mostrar_info_especie" target="_blank" title="Obrir arxiu" href="'+this.fitxer+'"><i class="fa fa-file fa-lg"></i></a>'
        ]);
    });
    taula_documentacio_especie.draw();
}


function rellenar_table_actuacions_especie(data){ // esta funcion se llama en info_espcie,js
    taula_actuacions_especie.clear();
    $(data).each(function(){
//                console.log(this);
        taula_actuacions_especie.row.add([
            this.titol,
            '<a class="btn btn-info mostrar_info_especie" target="_blank" title="Obrir arxiu" href="'+this.fitxer+'"><i class="fa fa-file fa-lg"></i></a>'
        ]);
    });
    taula_actuacions_especie.draw();
}
//function ajustar_columnas_actual_tab(){
//    $.fn.dataTable.tables( {visible: false, api: true} ).columns.adjust().draw();
//}

