<template>
    <v-container>
        <v-app-bar dense height="60%" color="#FCBF00" dark>            
            <v-toolbar-title>
                <h2>
                    <v-icon large>
                        fas fa-users
                    </v-icon>
                    Meseros
                </h2>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color='#1E1E1E' @click="nl_dialog = true">
                <v-icon class="mx-1">
                    far fa-plus-square
                </v-icon>
                <h3>Nuevo Mesero</h3>
            </v-btn>
        </v-app-bar>
        <!---CREACIÓN DE LA TABLA PARA MOSTRAR LOS DATOS-->
        <v-data-table
        :headers="encabezados"
        :items="meseros"
        :items-per-page="20"
        class="mt-8"
        height="600px"
        style="background-color: #FFF9E9;"
        >
            <template v-slot:[`item.actions`]="{item}" >
            <v-icon @click="eliminar_mesero(item)" small >
                fas fa-trash-alt
            </v-icon>
        </template>
        </v-data-table>
        <!--COMENZANDO EL FORMULARIO PARA NUEVOS MESEROS-->
        <v-dialog v-model='nl_dialog' max-width="500px">
            <v-card>
            <v-card-title>
                Nuevo Mesero
            </v-card-title>
            <v-card-text>
                <v-container>
                <!--Para imprimir variables actuales (Debug)-->
                <!--{{nuevo_mesero}}-->
                <v-row>
                    <v-col cols='6'> 
                    <v-text-field v-model="nuevo_mesero.mese_num" label='Número de mesero'>
                    </v-text-field>
                    </v-col>
                    <v-col cols='6'> 
                    <v-text-field v-model="nuevo_mesero.mese_nombre" label='Nombre del mesero'>
                    </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols='6'> 
                        <v-text-field v-model="nuevo_mesero.mese_salario" label='Salario mesero'>
                        </v-text-field>
                    </v-col>
                    <v-col cols='6'> 
                        <v-text-field v-model="nuevo_mesero.mese_dia" label='Dias de trabajo' hint="Ejemplo: Lun,Mar,Mie,Jue,Vie,Sab,Dom">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols='6'>
                        <v-select
                            :items= "items"
                            v-model= "nuevo_mesero.mese_turno"
                            label= "Turno"
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
        name: 'Meseros',
            data () {
            return {

                items: ['Matutino', 'Vespertino', 'Completo'],
                dias: ['Lun','Mar','Mier','Jue','Vie','Sab','Dom'],

                encabezados: [
                {
                    text: 'Numero de mesero',
                    align: 'end',
                    sortable: false,
                    value: 'mese_num'
                },
                { text: 'Nombre del mesero', value: 'mese_nombre', align: 'start' },
                { text: 'Salario mesero', value: 'mese_salario', align: 'start' },
                { text: 'Dias de trabajo', value: 'mese_dia', align: 'start' },
                { text: 'Turno de mesero', value: 'mese_turno', align: 'start' },
                { text: 'Acciones', value: 'actions', align: 'center' }
                ],
                meseros: [
                ],

                nl_dialog: false,
                nuevo_mesero: {
                    mese_num: '',
                    mese_nombre: '',
                    mese_salario: '',
                    mese_dia: '',
                    mese_turno: ''
                }
            }
    },

    created(){
        this.llenar_meseros();
    },

    methods: {
        async llenar_meseros(){
            const api_data = await this.axios.get('/meseros/todos_los_meseros');
            this.meseros = api_data.data;
        },
        
        async eliminar_mesero(item){
            const body = {
            mese_num: item.mese_num
            };
            await this.axios.post('/meseros/eliminar_mesero/', body);
            this.llenar_meseros();
        },

        cancelar(){
        this.nuevo_mesero = {};
        this.nl_dialog = false;
        },

        async guardar(){
            await this.axios.post('/meseros/nuevo_mesero/', this.nuevo_mesero);
            this.llenar_meseros();
            this.cancelar();
        }
    },
}
</script>
