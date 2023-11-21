<template>
    <v-container>
        <v-app-bar dense height="60%" color="indicador" dark>            
            <v-toolbar-title>
                <h2>
                    <v-icon large>
                        fas fa-chair
                    </v-icon>
                    Mesas
                </h2>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color='success' @click="nl_dialog = true">
                <v-icon class="mx-1">
                    far fa-plus-square
                </v-icon>
                <h3>Nueva Mesa</h3>
            </v-btn>
        </v-app-bar>
        <!---CREACIÓN DE LA TABLA PARA MOSTRAR LOS DATOS-->
        <v-data-table
        :headers="encabezados"
        :items="mesas"
        :items-per-page="20"
        class="mt-8"
        height="600px"
        >
            <template v-slot:[`item.actions`]="{item}" >
            <v-icon @click="eliminar_mesa(item)" small >
                fas fa-trash-alt
            </v-icon>
        </template>
        </v-data-table>
        <!--COMENZANDO EL FORMULARIO PARA NUEVAS MESAS-->
        <v-dialog v-model='nl_dialog' max-width="500px">
            <v-card>
            <v-card-title>
                Nueva Mesa
            </v-card-title>
            <v-card-text>
                <v-container>
                <!--Para imprimir variables actuales (Debug)-->
                <!--{{nuevo_mesa}}-->
                <v-row>
                    <v-col cols='4'> 
                        <v-text-field v-model="nuevo_mesa.mes_num" label='Número de mesa'>
                        </v-text-field>
                    </v-col>
                    <v-col cols='4'> 
                        <v-text-field v-model="nuevo_mesa.mes_capacidad" label='Capacidad de mesa'>
                        </v-text-field>
                    </v-col>
                    <v-col cols='3'>
                        <v-select
                            :items= "items"
                            v-model= "nuevo_mesa.mes_sala"
                            label= "Sala"
                        >
                        </v-select>
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
        name: 'Mesas',
            data () {
            return {

                items: ['Interior', 'Exterior', 'Terraza'],

                encabezados: [
                {
                    text: 'Numero de mesa',
                    align: 'end',
                    sortable: false,
                    value: 'mes_num',
                },
                { text: 'Capacidad de mesa', value: 'mes_capacidad', align: 'start' },
                { text: 'Ubicación de mesa', value: 'mes_sala', align: 'start' },
                { text: 'Acciones', value: 'actions', align: 'center', sortable: false }
                ],
                mesas: [
                ],

                nl_dialog: false,
                nuevo_mesa: {
                    mes_num: '',
                    mes_capacidad: '',
                    mes_sala: '',                    
                }
            }
    },

    created(){
        this.llenar_mesas();
    },

    methods: {
        async llenar_mesas(){
            const api_data = await this.axios.get('/mesas/todas_las_mesas');
            this.mesas = api_data.data;
        },
        
        async eliminar_mesa(item){
            const body = {
            mes_num: item.mes_num
            };
            await this.axios.post('/mesas/eliminar_mesa/', body);
            this.llenar_mesas();
        },

        cancelar(){
        this.nuevo_mesa = {};
        this.nl_dialog = false;
        },

        async guardar(){
            await this.axios.post('/mesas/nueva_mesa/', this.nuevo_mesa);
            this.llenar_mesas();
            this.cancelar();
        }
    },
    }
</script>
