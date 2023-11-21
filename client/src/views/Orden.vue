<template>
    <v-container>            
        <!--MENU DE NUEVA ORDEN-->
        <v-app-bar dense height="60%" color="indicador" dark>            
            <v-toolbar-title>
                <h2>
                    <v-icon large>
                        fas fa-bell
                    </v-icon>
                    Órdenes
                </h2>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color='success' @click="nl_dialog = true">
                <v-icon class="mx-1">
                    far fa-plus-square
                </v-icon>
                <h3>Nueva Orden</h3>
            </v-btn>
        </v-app-bar>
        <v-spacer></v-spacer>

        <!--COMENZANDO TABLA PARA CÓDIGO PARA MOSTRAR LOS DATOS-->
        <v-data-table
        :headers="encabezados"
        :items="ordenes"
        :items-per-page="20"
        class="mt-8"
        height="600px"
        >
            <template v-slot:[`item.actions`]="{item}" >
                <v-icon @click="eliminar_orden(item)" small class="mr-3">
                    fas fa-trash-alt
                </v-icon>
                <v-icon @click="editar_orden_fun(item)" small class="mr-3">
                    fas fa-edit
                </v-icon>
            </template>
            <!--COMENZANDO BOTONES DE ACCIÓN PARA COMIDA Y BEBIDAS-->
            <template v-slot:[`item.actions_comida`]="{item}">
                <v-icon @click="agregar_comida(item)" small class="mr-3">
                    fas fa-plus
                </v-icon>
                <v-icon @click="detalle_comida(item)" small >
                    fas fa-list
                </v-icon>
            </template>
            <template v-slot:[`item.actions_bebida`]="{item}">
                <v-icon @click="agregar_bebida(item)" small class="mr-3">
                    fas fa-plus
                </v-icon>
                <v-icon @click="detalle_bebidas(item)" small >
                    fas fa-list
                </v-icon>
            </template>
            <template v-slot:[`item.recibo`]="{item}">
                <v-btn color="primary" @click="ver_recibo(item)" small class="mr-3">
                    Ver recibo
                </v-btn>
            </template>
        </v-data-table>

        <!--COMENZANDO EL FORMULARIO PARA NUEVAS ÓRDENES-->
        <v-dialog v-model='nl_dialog' max-width="500px">
            <v-card>
            <v-card-title>
                Nueva Orden
            </v-card-title>
            <v-card-text>
                <v-container>
                <!--{{nuevo_orden}}-->
                <v-row>
                    <v-col cols="12">
                        <v-select
                            :items= "meseros"
                            v-model= "nuevo_orden.ord_mese_num"
                            label= "Mesero"
                        >
                        </v-select>
                    </v-col>
                </v-row>                    
                <v-row>
                    <v-col cols="4">
                        <v-select
                            :items= "mesas"
                            v-model= "nuevo_orden.ord_mes_num"
                            label= "Mesa"
                        >
                        </v-select>
                    </v-col>

                    <v-col cols='4'>
                        <v-menu
                            v-model="date_picker"
                            :close-on-content-click="true"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                        <template v-slot:activator="{ on, attrs }">
                           <v-text-field
                                v-model="nuevo_orden.ord_fecha"
                                label="Fecha de orden"
                                prepend-icon="far fa-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="nuevo_orden.ord_fecha"
                                @input="data_picker = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>

                    <v-col cols="4">
                        <v-select
                            :items= "estado"
                            v-model= "nuevo_orden.ord_activo"
                            label= "Estado"
                        >
                        </v-select>
                    </v-col>

                </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color='success' @click="guardar_orden()">Guardar</v-btn>
                <v-btn color='error' @click="cancelar()">Cancelar</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>

        <!--COMENZANDO EL FORMULARIO PARA AGREGAR COMIDA-->   
        <v-dialog v-model='co_dialog' max-width="1000px">
            <v-card>
                <v-card-title>
                    Agregar comida
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click= "agregar_renglon_com()">Agregar comida</v-btn>
                </v-card-title>
                <v-card-text>
                    <!--{{det_comida}}-->
                    <v-container>
                        <v-row v-for="(comida, index) in det_comida" v-bind:key="index">
                            <v-col cols="4">
                                <v-select
                                    :items="comidas"
                                    label="Nombre comida"
                                    v-model="comida.co_com_codigo"
                                >                                    
                                </v-select>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="comida.co_cantidad" label='Cantidad'>
                                </v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="comida.co_notas" label='Notas'>
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn color="success" @click="guardar_comidas()">Guardar</v-btn>
                        <v-btn color="error" @click="cancelar()">Cancelar</v-btn>                       
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!--COMENZANDO EL FORMULARIO PARA DETALLES COMIDA-->
        <v-dialog v-model='co_de_dialog' max-width="1000px">
            <v-card>
                <v-card-title>
                    Comida ordenada
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row v-for="(comida, index) in comida_ordenada" v-bind:key="index">
                            <!--{{comida}}-->
                            <v-col cols="4">
                                <v-text-field
                                    label="Platillo:"
                                    v-model="comida.com_nombre"
                                    disabled
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="1">
                                <v-text-field
                                    label="Precio:"
                                    v-model="comida.com_precio"
                                    disabled
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="1">
                                <v-text-field
                                    label="Cantidad:"
                                    v-model="comida.co_cantidad"
                                    disabled
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="5">
                                <v-text-field
                                    label="Notas:"
                                    v-model="comida.co_notas"
                                    disabled
                                >
                                </v-text-field>
                            </v-col>
                            
                            <v-col cols="1">
                                <v-icon small @click="eliminar_comida_orden(comida.co_com_codigo)">fas fa-trash</v-icon>
                                <v-icon small @click="editar_comida_orden(comida)" class="ml-3">fas fa-edit</v-icon>
                            </v-col>
                        </v-row>
                        
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="co_de_dialog=false">Cerrar</v-btn>
                </v-card-actions>            
            </v-card>
        </v-dialog>

        <!--COMENZANDO EL FORMULARIO PARA EDITAR LA COMIDA-->
        <v-dialog v-model='md_dialog' max-width="600px">
            <v-card>
                <v-card-title>
                    Editar comidas
                    <v-spacer></v-spacer>                    
                </v-card-title>
                <v-card-text>
                    <!--{{editar_comida}}-->
                    <v-container>
                        <v-row>
                            <v-cols cols="4" class="mr-1">
                                <v-text-field
                                    label="Cantidad:"
                                    v-model="editar_comida.co_cantidad"        
                                >
                                </v-text-field>
                            </v-cols>
                            <v-cols cols="7">
                                <v-text-field
                                    label="Notas:"
                                    v-model="editar_comida.co_notas"                                    
                                >
                                </v-text-field>
                            </v-cols>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn color="success" @click="guardar_comida_editada()">Guardar</v-btn>
                        <v-btn color="error" @click="cancelar()">Cancelar</v-btn>                       
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!--COMENZANDO EL FORMULARIO PARA AGREGAR BEBIDAS-->   
        <v-dialog v-model='be_dialog' max-width="1000px">
            <v-card>
                <v-card-title>
                    Agregar bebidas
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click= "agregar_renglon_beb()">Agregar bebida</v-btn>
                </v-card-title>
                <v-card-text>
                    <!--{{det_bebida}}-->
                    <v-container>
                        <v-row v-for="(bebida, index) in det_bebida" v-bind:key="index">
                            <v-col cols="4">
                                <v-select
                                    :items="bebidas"
                                    label="Nombre bebida"
                                    v-model="bebida.bo_beb_codigo"
                                >                                    
                                </v-select>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="bebida.bo_cantidad" label='Cantidad'>
                                </v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="bebida.bo_notas" label='Notas'>
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn color="success" @click="guardar_bebidas()">Guardar</v-btn>
                        <v-btn color="error" @click="cancelar()">Cancelar</v-btn>                       
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!--COMENZANDO EL FORMULARIO PARA DETALLES BEBIDAS-->
        <v-dialog v-model='be_de_dialog' max-width="1000px">
            <v-card>
                <v-card-title>
                    Bebida ordenada
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row v-for="(bebida, index) in bebida_ordenada" v-bind:key="index">
                            <v-col cols="4">
                                <v-text-field
                                    label="Bebida:"
                                    v-model="bebida.beb_nombre"
                                    disabled
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="1">
                                <v-text-field
                                    label="Precio:"
                                    v-model="bebida.beb_precio"
                                    disabled
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="1">
                                <v-text-field
                                    label="Cantidad:"
                                    v-model="bebida.bo_cantidad"
                                    disabled
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="5">
                                <v-text-field
                                    label="Notas:"
                                    v-model="bebida.bo_notas"
                                    disabled
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="1">
                                <v-icon small @click="eliminar_bebida_orden(bebida.bo_beb_codigo)">fas fa-trash</v-icon>
                                <v-icon small @click="editar_bebida_orden(bebida)" class="ml-3">fas fa-edit</v-icon>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="be_de_dialog=false">Cerrar</v-btn>
                </v-card-actions>            
            </v-card>
        </v-dialog> 

        <!--COMENZANDO EL FORMULARIO PARA EDITAR LA BEBIDA-->
        <v-dialog v-model='md2_dialog' max-width="600px">
            <v-card>
                <v-card-title>
                    Editar bebidas
                    <v-spacer></v-spacer>                    
                </v-card-title>
                <v-card-text>
                    <!--{{editar_bebida}}-->
                    <v-container>
                        <v-row>
                            <v-cols cols="4" class="mr-1">
                                <v-text-field
                                    label="Cantidad:"
                                    v-model="editar_bebida.bo_cantidad"        
                                >
                                </v-text-field>
                            </v-cols>
                            <v-cols cols="7">
                                <v-text-field
                                    label="Notas:"
                                    v-model="editar_bebida.bo_notas"                                    
                                >
                                </v-text-field>
                            </v-cols>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn color="success" @click="guardar_bebida_editada()">Guardar</v-btn>
                        <v-btn color="error" @click="cancelar()">Cancelar</v-btn>                       
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!--COMENZANDO EL FORMULARIO PARA VER RECIBO-->
        <v-dialog v-model='v_dialog' max-width="800px">
            <v-card class="mt-5">
                <v-card-title>
                    <h2 class="my-5"><v-icon x-large>fas fa-piggy-bank</v-icon> Recibo de orden</h2>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <h2 class="my-2"><i class="fas fa-hamburger"></i> Comida</h2>
                        <v-row v-for="(comida, index) in comida_ordenada" v-bind:key="index">
                            <!--{{comida}}-->
                            <v-col cols="5">
                                <v-text-field
                                    label="Descripción:"
                                    v-model="comida.com_nombre"
                                    disabled
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="1">
                                <v-text-field
                                    label="Precio:"
                                    v-model="comida.com_precio"
                                    disabled
                                >
                                
                                </v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field
                                    label="Cantidad:"
                                    v-model="comida.co_cantidad"
                                    disabled
                                >
                                </v-text-field>
                            </v-col>
                            
                            <v-col cols="4">                                
                                Total por unidades: ${{comida.com_precio*comida.co_cantidad}}
                            </v-col>             
                        </v-row>                        
                    </v-container>
                </v-card-text>
                
                <v-card-text>
                    <v-container>
                        <h2 class="my-2"><v-icon medium>fas fa-coffee</v-icon> Bebidas</h2>
                        <v-row v-for="(bebida, index) in bebida_ordenada" v-bind:key="index">
                            <v-col cols="5">
                                <v-text-field
                                    label="Descripción:"
                                    v-model="bebida.beb_nombre"
                                    disabled
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="1">
                                <v-text-field
                                    label="Precio:"
                                    v-model="bebida.beb_precio"
                                    disabled
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field
                                    label="Cantidad:"
                                    v-model="bebida.bo_cantidad"
                                    disabled
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="2">
                                Total por unidades: ${{bebida.beb_precio*bebida.bo_cantidad}}
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-spacer></v-spacer>
                <v-container>
                    <v-card-text align="center">
                        <h3 class="my-2">Total de comida: ${{tot_com}}</h3>
                        <v-spacer></v-spacer>
                        <h3 class="my-2">Total de bebidas: ${{tot_beb}}</h3>
                        <v-spacer></v-spacer>
                        <h1 class="my-2">Total a pagar: ${{tot_com+tot_beb}}</h1>
                    </v-card-text>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn                                                          
                            x-large
                            color="primary"
                            @click="cancelar()"
                    >
                    Aceptar
                    </v-btn>
                </v-card-actions>            
            </v-card>
        </v-dialog>

        <!--COMENZANDO EL FORMULARIO PARA EDITAR ÓRDENES-->
        <v-dialog v-model='ed_dialog' max-width="500px">
            <v-card>
            <v-card-title>
                Editar Orden
            </v-card-title>
            <v-card-text>
                <v-container>
                <!--{{editar_orden}}-->
                <v-row>
                    <v-col cols="12">
                        <v-select
                            :items= "meseros"
                            v-model= "editar_orden.ord_mese_num"
                            label= "Mesero"
                        >
                        </v-select>
                    </v-col>
                </v-row>                    
                <v-row>
                    <v-col cols="4">
                        <v-select
                            :items= "mesas"
                            v-model= "editar_orden.ord_mes_num"
                            label= "Mesa"
                        >
                        </v-select>
                    </v-col>

                    <v-col cols='4'>
                        <v-menu
                            v-model="date_picker"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                        <template v-slot:activator="{ on, attrs }">
                           <v-text-field
                                v-model="editar_orden.ord_fecha"
                                label="Fecha de orden"
                                prepend-icon="far fa-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="editar_orden.ord_fecha"
                                @input="data_picker = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>

                    <v-col cols="4">
                        <v-select
                            :items= "estado"
                            v-model= "editar_orden.ord_activo"
                            label= "Estado"
                        >
                        </v-select>
                    </v-col>

                </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color='success' @click="guardar_orden_editada()">Guardar</v-btn>
                <v-btn color='error' @click="cancelar()">Cancelar</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>                
    </v-container>
</template>

<!--COMENZANDO CÓDIGO DEL SCRIPT-->
<script>
    export default {
        name: 'ordenes',
        data () {
            return{

                estado: ['Abierta', 'Pagada'],

                encabezados: [
                {
                    text: 'No. orden',
                    align: 'end',
                    sortable: false,
                    value: 'ord_num',
                    
                },
                { text: 'No. de mesa', value: 'ord_mes_num', align: 'center'},
                { text: 'Nombre de mesero', value: 'mese_nombre', align: 'start' },
                { text: 'Fecha', value: 'ord_fecha_real', align: 'center', sortable: false,  },
                { text: 'Activo', value: 'ord_activo', align: 'center', sortable: false  },               
                { text: 'Comida de orden', value: 'actions_comida', align: 'center', sortable: false},
                { text: 'Bebida de orden', value: 'actions_bebida', align: 'center', sortable: false },
                { text: 'Acciones', value: 'actions', align: 'center', sortable: false },
                { text: 'Recibos', value: 'recibo', align: 'center', sortable: false }
                ],
                //ARREGLOS PARA OBTENER DATOS
                ordenes: [],
                comidas: [],
                bebidas: [],
                meseros: [],
                mesas: [],

                //VARIABLES PARA LOS DIALOGS
                nl_dialog: false,
                np_dialog: false,
                p_dialog: false,
                v_dialog: false,
                ed_dialog: false,
                md_dialog: false,
                md2_dialog: false,

                //VARIABLES PARA SACAR TOTALES
                tot_com: 0,
                tot_beb: 0,

                //VARIABLE PARA LA FECHA
                date_picker: false,

                //VARIABLES PARA TEMAS DE COMIDA
                co_dialog: false,
                co_de_dialog: false,
                det_comida: [] ,
                co_ord_num: '',
                bo_ord_num: '',
                co_notas: '',
                comida_ordenada: [],

                //VARIABLES PARA TEMAS DE BEBIDAS
                be_dialog: false,
                be_de_dialog: false,
                det_bebida: [] ,
                be_ord_num: '',
                bo_notas: '',
                bebida_ordenada: [],

                //JSONS PARA INSERCIONES/EDICIONES/DELETES
                nuevo_orden: {
                    ord_mes_num: '',
                    ord_mese_num: '',
                    ord_fecha: null,
                    ord_activo: null                                        
                },
                editar_comida: {
                    co_ord_num: 0,
                    co_com_codigo: 0,
                    co_cantidad: 0,
                    co_notas: ''
                },
                editar_bebida: {
                    bo_ord_num: 0,
                    bo_beb_codigo: 0,
                    bo_cantidad: 0,
                    bo_notas: ''
                },
                editar_orden: {
                    ord_num: 0,
                    ord_mes_num: '',
                    ord_mese_num: '',
                    ord_fecha: null,
                    ord_activo: null                                        
                },
            }
        },
        //FUNCIONES PARA REFRESCAR LOS DATOS
        created(){
            this.llenar_ordenes();
            this.llenar_comidas();
            this.llenar_bebidas();
            this.llenar_meseros();
            this.llenar_mesas();
        },
        //MÉTODOS PARA LA APLICACIÓN 
        methods: {
            async ver_recibo(item){
                this.v_dialog = true;                            
                this.ord_num = item.ord_num;
                const api_data = await this.axios.get('/ordenes/calcular_precio_comida/'+ this.ord_num.toString());                
                const api_data2 = await this.axios.get('/ordenes/calcular_precio_bebida/'+ this.ord_num.toString());
                const api_data3 = await this.axios.get('/ordenes/leer_det_comidas/' + item.ord_num.toString());
                const api_data4 = await this.axios.get('/ordenes/leer_det_bebida/' + item.ord_num.toString());                
                this.tot_com = api_data.data[0].total;
                this.tot_beb = api_data2.data[0].total;                
                this.comida_ordenada = api_data3.data;
                this.bebida_ordenada = api_data4.data;                              
            },

            async llenar_ordenes(){
                const api_data = await this.axios.get('/ordenes/todas_las_ordenes');
                this.ordenes = api_data.data;
            },

            async llenar_meseros(){
                const api_data = await this.axios.get('/meseros/todos_los_meseros');
                api_data.data.forEach((item) => {
                    this.meseros.push({
                        text: item.mese_nombre, 
                        value: item.mese_num
                    });
                });
            },

            async llenar_mesas(){
                const api_data = await this.axios.get('/mesas/todas_las_mesas');
                api_data.data.forEach((item) => {                    
                    this.mesas.push({
                        text: item.mes_num, 
                        value: item.mes_num
                    });
                });
            },

            async editar_orden_fun(item){
                this.ed_dialog = true;
                this.editar_orden.ord_num = item.ord_num;                
            },

            async guardar_orden_editada(item){
                //console.log(this.editar_orden);
                await this.axios.post('/ordenes/editar_orden/', this.editar_orden);
                this.llenar_ordenes();
                this.cancelar();
            },

            async eliminar_orden(item){
                const body = {
                    ord_num: item.ord_num
                };
                await this.axios.post('/ordenes/eliminar_orden', body);
                this.llenar_ordenes();
            },

            async guardar_orden(){
                await this.axios.post('/ordenes/nueva_orden/', this.nuevo_orden);
                this.llenar_ordenes();
                this.cancelar();
            },

            cancelar(){
                this.nuevo_orden = {};
                this.editar_orden = {};
                this.editar_comida = {};
                
                this.det_comida = [];
                this.co_notas = '';

                this.co_dialog= false;
                this.co_de_dialog= false;

                this.det_bebida = [];
                this.bo_notas = '';

                this.be_dialog = false;
                this.be_de_dialog = false;

                this.nl_dialog = false;
                this.v_dialog = false;
                this.ed_dialog = false;
                this.md_dialog = false;
                this.md2_dialog = false;

                
            },

            //FUNCIONES PARA INTERACTUAR CON DATOS COMIDA

            async agregar_renglon_com(){
                this.det_comida.push({
                    co_com_codigo: ''
                });
            },

            async agregar_comida(item){
                this.co_ord_num = item.ord_num;
                this.co_notas = item.co_notas;
                this.co_dialog = true;                
            },

            async llenar_comidas(){
                const api_data = await this.axios.get('/comidas/todas_las_comidas');
                api_data.data.forEach((item) => {
                    this.comidas.push({
                        text: item.com_nombre, 
                        value: item.com_codigo
                    });
                });
            },

            async guardar_comidas(){
                const body = {
                    co_ord_num: this.co_ord_num,
                    co_com_codigo: 0,
                    co_cantidad: 0,
                    co_notas: ''
                }; 
                this.det_comida.forEach(async (comida) =>{
                    body.co_com_codigo = comida.co_com_codigo;
                    body.co_cantidad = comida.co_cantidad;
                    body.co_notas = comida.co_notas;
                    await this.axios.post('/ordenes/nuevo_det_comida/', body);
                });
                this.cancelar();
            },

            async detalle_comida(item){
                this.co_de_dialog = true;
                this.co_ord_num = item.ord_num;
                const api_data = await this.axios.get('/ordenes/leer_det_comidas/' + item.ord_num.toString());
                this.comida_ordenada = api_data.data;
                //console.log(this.comida_ordenada);
            },

            async eliminar_comida_orden(item){                
                const body = {
                    co_ord_num : this.co_ord_num,
                    co_com_codigo : item
                };
                //console.log(body);
                await this.axios.post('/ordenes/eliminar_co', body);
                this.cancelar();
            },

            async editar_comida_orden(item){                      
                this.md_dialog = true;                          
                this.editar_comida.co_ord_num = item.co_ord_num;
                this.editar_comida.co_com_codigo = item.co_com_codigo;                                
            },

            async guardar_comida_editada(){
                const body = {
                    co_ord_num: this.editar_comida.co_ord_num,
                    co_com_codigo: this.editar_comida.co_com_codigo,
                    co_cantidad: this.editar_comida.co_cantidad,
                    co_notas: this.editar_comida.co_notas
                };
                //console.log(body);
                await this.axios.post('/ordenes/editar_co/', body);                
                this.cancelar();
                
            },

            //FUNCIONES PARA INTERACTUAR CON DATOS BEBIDA

            async agregar_renglon_beb(){
                this.det_bebida.push({
                    bo_beb_codigo: ''
                });
            },

            async agregar_bebida(item){
                this.bo_ord_num = item.ord_num;                
                this.be_dialog = true;                
            },

            async llenar_bebidas(){
                const api_data = await this.axios.get('/bebidas/todas_las_bebidas');
                api_data.data.forEach((item) => {
                    this.bebidas.push({
                        text: item.beb_nombre, 
                        value: item.beb_codigo
                    });
                });
            },

            async guardar_bebidas(){
                const body = {
                    bo_ord_num: this.bo_ord_num,
                    bo_beb_codigo: 0,
                    bo_cantidad: 0,
                    bo_notas: ''
                }; 
                this.det_bebida.forEach(async (bebida) =>{
                    body.bo_beb_codigo = bebida.bo_beb_codigo;
                    body.bo_cantidad = bebida.bo_cantidad;
                    body.bo_notas = bebida.bo_notas;
                    await this.axios.post('/ordenes/nuevo_det_bebida/', body);
                });
                this.cancelar();
            },

            async detalle_bebidas(item){
                this.be_de_dialog = true;
                this.bo_ord_num = item.ord_num;
                const api_data = await this.axios.get('/ordenes/leer_det_bebida/' + item.ord_num.toString());
                this.bebida_ordenada = api_data.data;
            },

            async eliminar_bebida_orden(item){                
                const body = {
                    bo_ord_num : this.bo_ord_num,
                    bo_beb_codigo : item
                };
                //console.log(body);
                await this.axios.post('/ordenes/eliminar_bo', body);
                this.cancelar();
            },

            async editar_bebida_orden(item){                      
                this.md2_dialog = true;                          
                this.editar_bebida.bo_ord_num = item.bo_ord_num;
                this.editar_bebida.bo_beb_codigo = item.bo_beb_codigo;                                
            },

            async guardar_bebida_editada(){
                const body = {
                    bo_ord_num: this.editar_bebida.bo_ord_num,
                    bo_beb_codigo: this.editar_bebida.bo_beb_codigo,
                    bo_cantidad: this.editar_bebida.bo_cantidad,
                    bo_notas: this.editar_bebida.bo_notas
                };
                //console.log(body);
                await this.axios.post('/ordenes/editar_bo/', body);                
                this.cancelar();
                
            },
        },        
    }
</script>