<template>
    <v-container>
        <!--AQUI COMIENZA LA BARRA DE CONSULTAS-->
        <v-app-bar dense height="60%" color="indicador" dark>            
            <v-toolbar-title>
                <h2>
                    <v-icon large>
                        fas fa-server
                    </v-icon>
                    Consultas
                </h2>
            </v-toolbar-title>
        </v-app-bar>
        <v-spacer></v-spacer>
        <!--AQUI SE ENCUENTRAN LOS BOTONES PARA CONSULTAS-->
        <v-container>
            <v-btn color='success' @click="consulta1 = true" class="mx-3">
                <v-icon class="mx-1">
                    far fa-bell
                </v-icon>
                <h3>Mesero - fecha</h3>
            </v-btn>
            <v-btn color='success' @click="consulta2 = true" class="mx-3">
                <v-icon class="mx-1">
                    far fa-bell
                </v-icon>
                <h3>Mesa - fecha</h3>
            </v-btn>
            <v-btn color='success' @click="consulta3 = true" class="mx-3">
                <v-icon class="mx-1">
                    far fa-bell
                </v-icon>
                <h3>fecha</h3>
            </v-btn>
            <v-spacer></v-spacer>
        </v-container>
        <!--AQUI COMIENZA LA PRIMERA TABLA PARA IMPRIMIR DATOS -->
        <v-data-table
            :headers="encabezados"
            :items="consultas"
            :items-per-page="20"
            class="mt-8"
            height="180px"
        >
        </v-data-table>        
        <!--DIALOGS NECESARIOS PARA LAS CONSULTAS-->
        <!--DIALOGO PARA CONSULTA 1-->
        <v-dialog v-model='consulta1' max-width="500px">
            <v-card>
                <v-card-title>
                    Consulta uno
                </v-card-title>
                <v-card-text>
                    <!--{{consulta1_nuevo}}-->
                    <v-container>                        
                        <v-row>
                            <v-col cols="12">
                                <v-select
                                    :items= "meseros"
                                    v-model= "consulta1_nuevo.ord_mese_num"
                                    label= "Mesero"
                                >
                                </v-select>
                            </v-col>
                        </v-row>                    
                        <v-row>
                            <v-col cols="12">
                                <v-menu
                                    v-model="date_picker1"
                                    :close-on-content-click="true"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                        v-model="consulta1_nuevo.ord_fecha"
                                        label="Fecha de orden"
                                        prepend-icon="far fa-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="consulta1_nuevo.ord_fecha"
                                        @input="data_picker1 = false"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color='success' @click="consulta1_fun()">Guardar</v-btn>
                    <v-btn color='error' @click="cancelar()">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!--DIALOGO PARA CONSULTA 2-->
        <v-dialog v-model='consulta2' max-width="500px">
            <v-card>
                <v-card-title>
                    Consulta dos
                </v-card-title>
                <v-card-text>
                    <!--{{consulta2_nuevo}}-->
                    <v-container>                        
                        <v-row>
                            <v-col cols="12">
                                <v-select
                                    :items= "mesas"
                                    v-model= "consulta2_nuevo.ord_mes_num"
                                    label= "Mesa"
                                >
                                </v-select>
                            </v-col>
                        </v-row>                    
                        <v-row>
                            <v-col cols="12">
                                <v-menu
                                    v-model="date_picker2"
                                    :close-on-content-click="true"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                        v-model="consulta2_nuevo.ord_fecha"
                                        label="Fecha de orden"
                                        prepend-icon="far fa-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="consulta2_nuevo.ord_fecha"
                                        @input="data_picker2 = false"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color='success' @click="consulta2_fun()">Guardar</v-btn>
                    <v-btn color='error' @click="cancelar()">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>          
        <!--DIALOGO PARA CONSULTA 3-->
        <v-dialog v-model='consulta3' max-width="500px">
            <v-card>
                <v-card-title>
                    Consulta tres
                </v-card-title>
                <v-card-text>
                    <!--{{consulta3_nuevo}}-->
                    <v-container>                                         
                        <v-row>
                            <v-col cols="12">
                                <v-menu
                                    v-model="date_picker3"
                                    :close-on-content-click="true"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                        v-model="consulta3_nuevo.ord_fecha"
                                        label="Fecha de orden"
                                        prepend-icon="far fa-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="consulta3_nuevo.ord_fecha"
                                        @input="data_picker3 = false"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color='success' @click="consulta3_fun()">Buscar</v-btn>
                    <v-btn color='error' @click="cancelar()">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!--DIALOGO PARA CONSULTA 4-->
        <v-dialog v-model='consulta4' max-width="500px">
            <v-card>
                <v-card-title>
                    Consulta cuatro
                </v-card-title>
                <v-card-text>
                    <!--{{consulta4_nuevo}}-->
                    <v-container>                                         
                        <v-row>
                            <v-col cols="12">
                                <v-menu
                                    v-model="date_picker4"
                                    :close-on-content-click="true"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                        v-model="consulta4_nuevo.ord_fecha"
                                        label="Fecha de orden"
                                        prepend-icon="far fa-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="consulta4_nuevo.ord_fecha"
                                        @input="data_picker4 = false"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color='success' @click="consulta4_fun()">Buscar</v-btn>
                    <v-btn color='error' @click="cancelar()">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!--DIALOGO PARA CONSULTA 5-->
        <v-dialog v-model='consulta5' max-width="500px">
            <v-card>
                <v-card-title>
                    Consulta cinco
                </v-card-title>
                <v-card-text>
                    <!--{{consulta5_nuevo}}-->
                    <v-container>                                         
                        <v-row>
                            <v-col cols="12">
                                <v-select
                                    :items= "meseros"
                                    v-model= "consulta5_nuevo.ord_mese_num"
                                    label= "Mesero"
                                >
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color='success' @click="consulta5_fun()">Buscar</v-btn>
                    <v-btn color='error' @click="cancelar()">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!--BOTONES PARA CONSULTAS DE FECHAS-->
        <v-app-bar dense height="60%" color="indicador" dark>            
            <v-toolbar-title>
                <h2>
                    <v-icon large>
                        fas fa-server
                    </v-icon>
                    Total de ventas 
                </h2>                                
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <h3>Total de ventas: {{total_ventas.total_ventas}}</h3>
        </v-app-bar>
        <v-spacer></v-spacer>
        <!--MÁS BOTONES PARA SEGUNDA SECCIÓN DE CONSULTAS-->
        <v-container>            
            <v-btn color='success' @click="consulta4 = true" class="mx-3">
                <v-icon class="mx-1">
                    far fa-bell
                </v-icon>
                <h3>Por fecha</h3>
            </v-btn>
            <v-btn color='success' @click="consulta5 = true" class="mx-3">
                <v-icon class="mx-1">
                    far fa-bell
                </v-icon>
                <h3>Por mesero</h3>
            </v-btn>
            <v-spacer></v-spacer>            
            <v-data-table
            :headers="encabezados2"
            :items="consultas2"
            :items-per-page="20"
            class="mt-8"
            height="180px"
            >

            </v-data-table>
        </v-container>
    </v-container>
</template>
<!--COMENZANDO CÓDIGO DEL SCRIPT-->
<script>
    export default {
        name: 'consultas',
        data () {
            return{

                encabezados2: [
                {
                    text: 'No. orden',
                    align: 'end',
                    sortable: false,
                    value: 'ord_num',
                    
                },
                { text: 'No. de mesa', value: 'ord_mes_num', align: 'center'},
                { text: 'Nombre de mesero', value: 'mese_nombre', align: 'start' },
                { text: 'Fecha', value: 'ord_fecha_real', align: 'center', sortable: false},
                { text: 'Activo', value: 'ord_activo', align: 'center', sortable: false  }
                ],

                encabezados: [
                {
                    text: 'No. orden',
                    align: 'end',
                    sortable: false,
                    value: 'ord_num',
                    
                },
                { text: 'No. de mesa', value: 'ord_mes_num', align: 'center'},
                { text: 'Nombre de mesero', value: 'mese_nombre', align: 'start' },
                { text: 'Fecha', value: 'ord_fecha_real', align: 'center', sortable: false},
                { text: 'Activo', value: 'ord_activo', align: 'center', sortable: false  }
                ],

                consultas: [],
                consultas2: [],
                meseros: [],
                fechas: [],
                mesas: [],

                date_picker1: false,
                date_picker2: false,
                date_picker3: false,
                date_picker4: false,

                total_ventas: {
                    total_ventas: 0                    
                },

                consulta1_nuevo: {
                    ord_mese_num: 0,
                    ord_fecha: null
                },

                consulta2_nuevo: {
                    ord_mes_num: 0,
                    ord_fecha: null
                },

                consulta3_nuevo: {
                    ord_fecha: null
                },

                consulta4_nuevo: {
                    ord_fecha: null
                },

                consulta5_nuevo: {
                    ord_mese_num: 0
                },

                consulta1: false,
                consulta2: false,
                consulta3: false,
                consulta4: false,
                consulta5: false,
            }
        },
        //FUNCIONES PARA REFRESCAR LOS DATOS
        created(){
            //this.llenar_ordenes();
            this.llenar_meseros();
            this.llenar_mesas();
            this.llenar_fechas();
        },
        //MÉTODOS PARA VARIAS CUESTIONES 
        methods: {
            async llenar_ordenes(){
                const api_data = await this.axios.get('/ordenes/todas_las_ordenes');
                this.consultas = api_data.data;
            },

            async llenar_consulta4(){
                //console.log(this.consulta4_nuevo);
                const api_data = await this.axios.get('/consultas/consulta4_llenar/'+this.consulta4_nuevo.ord_fecha.toString());                
                this.consultas2 = api_data.data;
                //console.log(this.consultas2);
                this.cancelar();
            },

            async llenar_consulta5(){
                //console.log(this.consulta5_nuevo);
                const api_data = await this.axios.get('/consultas/consulta5_llenar/'+this.consulta5_nuevo.ord_mese_num.toString());                
                this.consultas2 = api_data.data;
                //console.log(this.consultas2);
                this.cancelar();
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

            async llenar_fechas(){
                const api_data = await this.axios.get('/consultas/todas_las_fechas');
                api_data.data.forEach((item) => {
                    this.fechas.push({
                        text: item.ord_fecha_real, 
                        value: item.ord_fecha
                    });
                });
            },

            async consulta1_fun(){
                //console.log(this.consulta1_nuevo);
                //console.log(this.consulta1_nuevo);
                const api_data = await this.axios.get('/consultas/consulta_uno/'+ this.consulta1_nuevo.ord_mese_num.toString()+'/'+this.consulta1_nuevo.ord_fecha.toString());
                //console.log(api_data);
                this.consultas = api_data.data;
                //console.log(this.consultas);
                this.cancelar();
            },

            async consulta2_fun(){
                //console.log(this.consulta2_nuevo);
                const api_data = await this.axios.get('/consultas/consulta_dos/'+ this.consulta2_nuevo.ord_mes_num.toString()+'/'+this.consulta2_nuevo.ord_fecha.toString());
                //console.log(api_data);
                this.consultas = api_data.data;
                //console.log(this.consultas);
                this.cancelar();
            },

            async consulta3_fun(){
                //console.log(this.consulta3_nuevo);
                const api_data = await this.axios.get('/consultas/consulta3/'+this.consulta3_nuevo.ord_fecha.toString());
                this.consultas = api_data.data;
                this.cancelar();
            },

            async consulta4_fun(){
                //console.log(this.consulta4_nuevo);
                const api_data = await this.axios.get('/consultas/consulta4/'+this.consulta4_nuevo.ord_fecha.toString());                
                this.total_ventas = {
                    total_ventas: api_data.data[0].total_ventas,                    
                };
                //console.log(this.total_ventas);
                this.llenar_consulta4();
                //this.consultas = api_data.data;
                this.cancelar();
            },

            async consulta5_fun(){
                //console.log(this.consulta4_nuevo);
                const api_data = await this.axios.get('/consultas/consulta5/'+this.consulta5_nuevo.ord_mese_num.toString());                
                this.total_ventas = {
                    total_ventas: api_data.data[0].total_ventas,                    
                };
                //console.log(this.total_ventas);
                this.llenar_consulta5();
                //this.consultas = api_data.data;
                this.cancelar();
            },

            cancelar(){
                this.consulta1 = false;
                this.consulta2 = false;
                this.consulta3 = false;
                this.consulta4 = false;
                this.consulta5 = false;

                this.consulta1_nuevo = {};
                this.consulta2_nuevo = {};
                this.consulta3_nuevo = {};
                this.consulta4_nuevo = {};
                this.consulta5_nuevo = {};
            },        
        },
        
    }
</script>