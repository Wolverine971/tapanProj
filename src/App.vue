<template>
  <v-app id="app" :class="{'no-searchbar' : landingPage, 'is-profile-page' : profilePanel, 'has-sidepanel': sidePanel, 'has-bottomsheet' : showingBottomSheet}">
    <!-- <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      id="app-menu"
    >
      To be integrated...
    </v-navigation-drawer> -->
    
    <!-- blur page content when searchbar has focus -->
    <div :class="{overlay: displayOverlay }"></div>

    <!-- 508 - top skipnav link (hidden unless the user tabs to it) -->
    <!-- <skipnav-link v-if="topSkipnav"></skipnav-link> -->

    <div id="header-flex-container">
      <v-toolbar
        color="primary"
        dark
        flat
        id="app-header"
        v-if="showToolbar"
        :class="{navShow: displayOverlay }"
      >
        <!-- header census logo, click to navigate to landing page -->
        <v-toolbar-title id="header-title" class="ml-0 pl-3">
          <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
          <a href="javascript:void(0)" @click="onClickLogo()" id="census-home-link"><img src="./assets/images/census-logo-white.svg" alt="United States Census Bureau - Census Data Homepage"></a>
        </v-toolbar-title>

        <!-- searchbar for normal view -->
        <search-bar id="searchbar" @searchBarFocus="showOverlay" v-if="!landingPage" placeholder="Search" toolbar></search-bar>
        
        <!-- searchbar for mobile view -->
        <search-bar id="mobile-searchbar" @searchBarFocus="showOverlay" v-if="!landingPage" placeholder="Search" toolbar mobile slot="extension"></search-bar>
      </v-toolbar>

      <v-content id="app-content">
        <v-container fluid>
          <v-layout id="app-container">
            <v-flex id="app-sidepanel" v-if="sidePanel">
              <!-- display side panel -->
              <side-panel></side-panel>
            </v-flex>

            <v-flex>
              <!-- router-view for profile page
                  includes unique :key attribute which causes all
                  profile components to be refreshed when url params are changed
               -->
              <router-view v-if="profilePanel" :key="$route.fullPath" fill-height></router-view>
              
              <!-- normal router-view -->
              <router-view v-else fill-height></router-view>

            </v-flex>
          </v-layout>
        </v-container>
      </v-content>

      <!-- 508 - bottom skipnav link (hidden unless the user tabs to it) -->
      <!-- <skipnav-link v-if="bottomSkipnav"></skipnav-link> -->

    </div>
    <!-- <dialogs></dialogs>
    <bottom-sheets></bottom-sheets> -->
  </v-app>
</template>

<script>
//import SkipnavLink from './components/common/SkipnavLink.vue'
//import SidePanel from './components/common/sidePanel/SidePanel'
// import BottomSheets from './components/common/BottomSheets.vue'
//import Dialogs from '@/components/common/Dialogs.vue'
import _ from 'underscore'
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  components: {
    //SidePanel,
    // BottomSheets,
    // Dialogs,
    // SkipnavLink
  },
  data: () => ({
    drawer: false, // a
    displayOverlay: false // determines if page content is blurred out
  }),
  
  computed: {
    // determines if page includes a sidepanel
    sidePanel () {
      return this.$route.name === 'Map' 
      || (this.$route.name === 'Table'  && this.$store.getters['showSidePanel'])
      || this.$route.name === 'ProfileHome'
    },

    // determines if there is an active bottom sheet
    showingBottomSheet () {
      return false
      // return this.$store.getters['bottomSheets/sheet'].name
    },

    // determines if on profile page (includes profile sidepanel)
    profilePanel () {
      return this.$route.name === 'ProfileHome'
    },

    // determines if on landing page
    landingPage () {
      return this.$route.name === 'Landing'
    },

    // determines if page needs to display the toolbar
    showToolbar () {
      return this.$route.name !== 'PageNotFound' && this.$route.name !== 'ProfileChartWidget'
        && this.$route.name !== 'ProfileMapWidget'
    },

    // topSkipnav () {
    //   return !this.landingPage && !(this.$route.name === 'Table' && !this.$store.getters['showSidePanel'])
    // },

    // bottomSkipnav () {
    //   return this.$route.name !== 'Map' && this.$route.name !== 'Table'
    // }
  },
  methods:{
    // determines if page content needs to be blurred
    showOverlay (value) {
      if (value == true) {
        this.displayOverlay = true;
      } else {
        this.displayOverlay = false;
      }
    },

    // navigate to landing page when census header logo is clicked
    onClickLogo () {
      // this.$store.dispatch("clearSelections")
      // this.$store.commit("setSearchText", "")
      this.$router.push({name: 'Landing'})
    }
  }
})
</script>


<style lang="scss">

  #app {
    max-height: 100vh;
  }

  @media screen and (max-width: $breakpoint-mobile) {
    #app-container {
      @include flex-direction(column);
    }
  }

  #app-content {
    flex: 1;
  }

  #app-header {
    flex: 0;
    -ms-flex-preferred-size: auto;
    height: $header-height;
  }

  #app-header .v-toolbar__content {
    min-height: $header-height !important; // Keep Vuetify from shrinking the v-toolbar height at smaller screen sizes
    padding: 0px;
  }

  // Hijack the height and padding of the v-toolbar extension slot
  #app-header .v-toolbar__extension {
    height: 0 !important;
    padding: 0;
    @media screen and (max-width: $breakpoint-mobile) {
      height: $toolbar-extension-height !important;
    }
  }

  #app-sidepanel {
    flex: 0 0 $side-panel-width;
    max-height: calc(100vh - #{$header-height});
    max-width: $side-panel-width;
    @media screen and (max-width: $breakpoint-mobile) {
      max-height: calc(100vh - #{$header-height-mobile});
      max-width: 100%;
    }
  }

  @media screen and (max-width: $breakpoint-mobile-with-sidepanel) {
    #app.is-profile-page #app-sidepanel {
      display: none;
    }
  }

  #header-flex-container {
    display: flex;
    @include flex-direction(column);
  }

  #header-title {
    min-width: $side-panel-width;
    width: $side-panel-width;
  }

  // Center the census icon on the landing page on mobile
  @media screen and (max-width: $breakpoint-mobile) {
    #app #header-title {
      width: 100%;
      text-align: center;
    }
  }

  #header-title img {
    width: 70px;
    align-items: center;
    vertical-align: text-bottom;
    margin-left: 15px;
    @media screen and (max-width: $breakpoint-mobile) {
      margin-left: 0;
    }
  }

  #mobile-searchbar {
    display: none;
    @media screen and (max-width: $breakpoint-mobile) {
      display: block;
    }
  }

  .navShow {
    z-index: $z-index-global-search-focus !important;
  }

  .overlay {
    background: #302f2f;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0.5;
    z-index: $z-index-app-blur;
  }

  #searchbar {
    display: none;
    @media screen and (min-width: $breakpoint-mobile-plus-one) {
      display: block;
    }
  }

</style>