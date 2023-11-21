<template>
    <v-container>
        <v-app-bar dense height="60%" color="indicador" dark>            
            <v-toolbar-title>
                <h2>
                    <v-icon large>
                        fas fa-utensils
                    </v-icon>
                    Comidas
                </h2>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color='success' @click="nl_dialog = true">
                <v-icon class="mx-1">
                    far fa-plus-square
                </v-icon>
                <h3>Nueva Comida</h3>
            </v-btn>
        </v-app-bar>
        <!--COMENZANDO LA CREACIÓN DE TABLA PARA MOSTRAR DATOS-->
        <v-data-table
        :headers="encabezados"
        :items="comidas"
        :items-per-page="20"
        class="mt-8"
        height="600px"
        >
        <template v-slot:[`item.actions`]="{item}" >
            <v-icon @click="eliminar_comida(item)" small >
                fas fa-trash-alt
            </v-icon>
            <v-icon @click="ver_comida(item)" small class="mx-3">
                fas fa-eye
            </v-icon>
        </template>
        </v-data-table>

        <!--COMENZANDO EL FORMULARIO PARA NUEVA COMIDA-->
        <v-dialog v-model='nl_dialog' max-width="750">
            <v-card>
            <v-card-title>
                Nueva Comida
            </v-card-title>
            <v-card-text>
                <v-container>
                <!--Para imprimir variables actuales (Debug)-->
                <!--{{nuevo_comida}}-->
                <v-row>
                    <v-col cols='4'> 
                    <v-text-field v-model="nuevo_comida.com_codigo" label='Código de comida'>
                    </v-text-field>
                    </v-col>
                    <v-col cols='8'> 
                    <v-text-field v-model="nuevo_comida.com_nombre" label='Nombre de comida'>
                    </v-text-field>
                    </v-col>                
                </v-row>
                <v-row>
                    <v-col cols='2'>
                        <v-text-field v-model="nuevo_comida.com_precio" label='Precio'>
                        </v-text-field>
                    </v-col>
                    <v-col cols='4'>
                        <v-select
                            :items= "items"
                            v-model= "nuevo_comida.com_categoria"
                            label= "Categoría"
                        >
                        </v-select>
                    </v-col>
                    <v-col cols='6'> 
                        <v-text-field v-model="nuevo_comida.com_descripcion" label='Descripción de comida'>
                        </v-text-field>
                    </v-col>
                </v-row>
                <!--Terminan los campos a insertar-->
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color='success' @click="guardar()">Guardar</v-btn>
                <v-btn color='error' @click="cancelar()">Cancelar</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>

        <!--COMENZANDO EL FORMULARIO PARA DETALLES BEBIDAS-->
        <v-dialog v-model='vc_dialog' width="400px">
            <v-card>
            <!--{{comida_vista}}-->
                <v-card-title><h2>{{comida_vista.com_nombre}}</h2></v-card-title>
                <v-spacer></v-spacer>
                <v-card-subtitle><h3>{{comida_vista.com_categoria}}</h3></v-card-subtitle>
                <v-spacer></v-spacer>
                <v-card-text><p>{{comida_vista.com_descripcion}}</p></v-card-text>
            </v-card>
        </v-dialog> 
    </v-container>
</template>

<script>
    export default {
        name: 'Comidas',
            data () {
            return {

                items: ['Ensalada', 'Sopa', 'Carne', 'Pescado', 'Postre'],

                encabezados: [
                {
                    text: 'Código de comida',
                    align: 'start',
                    sortable: false,
                    value: 'com_codigo',
                },
                { text: 'Nombre de comida', value: 'com_nombre', align: 'start' },
                { text: 'Categoría de comida', value: 'com_categoria', align: 'start'},
                { text: 'Precio', value: 'com_precio', align: 'start'},
                { text: 'Descripción', value: 'com_descripcion', align: 'start', sortable: false},
                { text: 'Acciones', value: 'actions', align: 'center', sortable: false}
                ],
                comidas: [],
                categorias:[],
                comida_vista: [],

                vc_dialog: false,
                nl_dialog: false,

                nuevo_comida: {
                    com_nombre: '',
                    com_categoria: '',
                    com_precio: '',
                    com_descripcion: ''
                }

                
            }
    },

    created(){
        this.llenar_comidas();
    },

    methods: {
        async llenar_comidas(){
            const api_data = await this.axios.get('/comidas/todas_las_comidas');
            this.comidas = api_data.data;
            console.log(this.comidas);
        },

        async eliminar_comida(item){
            const body = {
            com_codigo: item.com_codigo
            };
            await this.axios.post('/comidas/eliminar_comida/', body);
            this.llenar_comidas();
        },

        async ver_comida(item){
            this.vc_dialog = true;
            this.comida_vista = item;
        },

        cancelar(){
            this.nuevo_comida = {};
            this.nl_dialog = false;
            this.vc_dialog = false;
        },

        async guardar(){
            await this.axios.post('/comidas/nueva_comida/', this.nuevo_comida);
            this.llenar_comidas();
            this.cancelar();
        },

    },
    }
</script>
