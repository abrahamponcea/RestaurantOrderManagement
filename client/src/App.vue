<template>
  <v-app dark style="background-color: #FFEDBB;">
    <v-navigation-drawer app color="#1E1E1E" >
      <v-container>
        <!-- <v-img
        outlined
        max-height="400"
        src="https://www.kpops.net/wp-content/uploads/2021/05/twice-e3838ae383a8e383b3e38081e788bde38284e3818be381aae8a1a3e8a385e3818ce9ad85e58a9be79a84e381aae8bf91e6b381e38292e585ace9968b-1.jpg"        
        ></v-img>-->
        <v-img
        outlined
        max-height="400"
        src="./assets/SideBarImg.svg"        
        ></v-img>
        <v-spacer></v-spacer>
        <v-btn
          depressed
          color="#FCBF00"
          :to="{name: 'Ordenes'}"
          width="100%"
          class="mt-5"

        >
          <v-icon class="mx-3">
            fas fa-concierge-bell
          </v-icon>
            Órdenes
        </v-btn>      
        <v-spacer></v-spacer>
        <v-btn
          depressed
          color="#FCBF00"
          :to="{name: 'Meseros'}"
          width="100%"
          class="mt-5"
        >
          <v-icon class="mx-3">
            fas fa-users
          </v-icon>
          Meseros
        </v-btn> 
        <v-spacer></v-spacer>                    
        <v-btn
          depressed
          color="#FCBF00"
          :to="{name: 'Comidas'}"
          width="100%"
          class="mt-5"
        >
          <v-icon class="mx-3">
            fas fa-utensils
          </v-icon>
          Comidas
        </v-btn>      
        <v-spacer></v-spacer>
        <v-btn
          depressed
          color="#FCBF00"
          :to="{name: 'Bebidas'}"
          width="100%"
          class="mt-5"
        >
          <v-icon class="mx-3">
            fas fa-cocktail
          </v-icon>
            Bebidas
        </v-btn>      
        <v-spacer></v-spacer>
        <v-btn
          depressed
          color="#FCBF00"
          :to="{name: 'Mesas'}"
          width="100%"
          class="mt-5"
        >
          <v-icon class="mx-3">
            fas fa-chair
          </v-icon>
            Mesas
        </v-btn> 
        <v-spacer></v-spacer>
        <v-btn
          depressed
          color="#FCBF00"
          :to="{name: 'Consultas'}"
          width="100%"
          class="mt-5"
        >
          <v-icon class="mx-3">
            fas fa-database
          </v-icon>
            Consultas
        </v-btn> 
    </v-container>
  </v-navigation-drawer>

  <v-app-bar app color="#FCBF00" dark>
    <v-row class="my-5 rounded-lg"> <!--mx= en x / mt= arriba / my= en y-->
      <v-icon class="mx-5" x-large>
        fas fa-torii-gate
      </v-icon>
      <h2>FINAL PROJECT: THE GAME</h2>
    </v-row>
  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-main>

    <!-- Provides the application the proper gutter -->
    <v-container fluid>

      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-main>

  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>


