<template>
    <v-container>
        <v-app-bar dense height="60%" color="#FCBF00" dark>            
            <v-toolbar-title>
                <h2>
                    <v-icon large>
                        fas fa-cocktail
                    </v-icon>
                    Bebidas
                </h2>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color='#1E1E1E' @click="nl_dialog = true">
                <v-icon class="mx-1">
                    far fa-plus-square
                </v-icon>
                <h3>Nueva Bebida</h3>
            </v-btn>
        </v-app-bar>
        <v-data-table
        :headers="encabezados"
        :items="bebidas"
        :items-per-page="20"
        class="mt-8"
        height="600px"
        style="background-color: #FFF9E9;"
        >
            <template v-slot:[`item.actions`]="{item}" >
            <v-icon @click="eliminar_bebida(item)" small >
                fas fa-trash-alt
            </v-icon>
        </template>
        </v-data-table>
        <!--COMENZANDO EL FORMULARIO PARA NUEVA BEBIDA-->
        <v-dialog v-model='nl_dialog' max-width="500px">
            <v-card>
            <v-card-title>
                Nueva Bebida
            </v-card-title>
            <v-card-text>
                <v-container>
                <!--Para imprimir variables actuales (Debug)-->            
                <!--{{nuevo_bebida}}-->
                <v-row>
                    <v-col cols='5'> 
                    <v-text-field v-model="nuevo_bebida.beb_codigo" label='Código de bebida'>
                    </v-text-field>
                    </v-col>
                    <v-col cols='7'> 
                    <v-text-field v-model="nuevo_bebida.beb_nombre" label='Nombre de bebida'>
                    </v-text-field>
                    </v-col>                
                </v-row>
                <v-row>
                    <v-col cols='4'> 
                        <v-text-field v-model="nuevo_bebida.beb_precio" label='Precio'>
                        </v-text-field>
                    </v-col>
                    <v-col cols='4'> 
                        <v-select
                            :items= "items"
                            v-model= "nuevo_bebida.beb_categoria"
                            label= "Categoría"
                        >
                        </v-select>
                    </v-col>
                    <v-col cols='4'> 
                        <v-select
                            :items= "items2"
                            v-model= "nuevo_bebida.beb_tamanio"
                            label= "Tamaño"
                        >
                        </v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols='12'> 
                        <v-text-field v-model="nuevo_bebida.beb_descripcion" label='Descripción de bebida'>
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
    </v-container>
</template>

<script>
    export default {
        name: 'Bebidas',
            data () {
            return {
                items: ['Refresco', 'Agua', 'Cerveza', 'Cafe'],
                items2: ['Chico','Mediano','Grande'],

                encabezados: [
                {
                    text: 'Código de bebida',
                    align: 'end',
                    sortable: false,
                    value: 'beb_codigo'
                },
                { text: 'Nombre de bebida', value: 'beb_nombre', align: 'start'},
                { text: 'Categoría de bebida', value: 'beb_categoria', align: 'start'},
                { text: 'Tamaño', value: 'beb_tamanio', align: 'start'},
                { text: 'Precio', value: 'beb_precio', align: 'start'},
                { text: 'Descripción', value: 'beb_descripcion', align: 'start', sortable: false},
                { text: 'Acciones', value: 'actions', align: 'center', sortable: false}
                ],
                bebidas: [
                ],

                nl_dialog: false,
                nuevo_bebida: {
                    beb_nombre: '',
                    beb_categoria: '',
                    beb_precio: '',
                    beb_descripcion: ''
                }
            }
    },

    created(){
        this.llenar_bebidas();
    },

    methods: {
        async llenar_bebidas(){
            const api_data = await this.axios.get('/bebidas/todas_las_bebidas');
            this.bebidas = api_data.data;
        },
        
        async eliminar_bebida(item){
            const body = {
            beb_codigo: item.beb_codigo
            };
            await this.axios.post('/bebidas/eliminar_bebida/', body);
            this.llenar_bebidas();
        },

        cancelar(){
        this.nuevo_bebida = {};
        this.nl_dialog = false;
        },

        async guardar(){
            await this.axios.post('/bebidas/nueva_bebida/', this.nuevo_bebida);
            this.llenar_bebidas();
            this.cancelar();
        }
    },
    }
</script>
