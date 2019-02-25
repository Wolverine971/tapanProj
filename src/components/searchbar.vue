
<template>
  <v-layout row justify-center class="searchbar-container">
    <!-- allow-overflow  -->
    
    <v-combobox
    id="landingSearch"
    solo 
    flex 
    no-filter
    attach
    @keydown.enter.native.prevent="handleSearch"
    v-model="model" 
    :placeholder="placeholder"
    flat
    :menu-props="{ closeOnClick: true, closeOnContentClick: true }"
    appendIcon=false 
    solo-inverted
    ref="search"
    :style={}
    height="-webkit-fill-available"
    clearable
    return-object
    class="searchBar"
    @click:clear="clearURL"
    :class="{blury: blur, toolbar: toolbar, mobile: mobile }"
    :search-input.sync="typedText"
    
    label="Search Bar"
    >
    </v-combobox>

    </v-layout>
	 <!-- NO CATEGORIES ACCORDING TO UX DESIGNS, IS THIS RIGHT?
              <template v-else-if="searchSuggestions.item.category" class="blocky">
                    <div ref='category' class="category">{{searchSuggestions.item.category}}</div>
            </template> -->

</template>

<script>
import _ from 'underscore'
import 'vuetify/dist/vuetify.min.css'
import API from '../api/generic.js'
import router from '@/router'

export default {
  name: "SearchBar",
  props: {
    // navigateToAll: Boolean, // a
    // numCharLength: String, // minimum character length of searchText to retrieve suggestions
    // overlay: Boolean,
    placeholder: String,
    toolbar: Boolean,
    mobile: Boolean
  },
  data () {
    return {
      category: "",
      suggestions: [], // list of suggestions based off of searchText
      suggestionsVar: false, // a
      searchCategory: "",
      typedText: null,
      blur:false
    }
  },
  mounted () {
    //this prevents the typeahead dropdown from applying the style of theme dark,
    //it does this because the prop "attach" on the comboBox inherits the styles from its parent. And the parent
    //is the toolbar in App.vue and the navbar has a theme--dark applied from the prop "dark"
    // this.$refs.search.$children[0].$refs.content.children[0].children[0].className += " theme--light";
    // //needed for 508
    
  },
  methods: {
    /**
     * Called when a key is pressed while in searchbar
     */
    handleSearch() {
        this.$store.dispatch("search", this.typedText)
 
          this.handleNavigation();

    },

    handleNavigation() {
      router.push({
          path: '/results' 
        })
        this.$router.go(1)
    },

   
    clearURL () {
      router.replace({
        query: {q: null}
      })
      this.$store.commit('setSearchText', '');
      this.$router.go(1)

    },
    
    
  },
  computed: {
   
    model:{
       get () {
        return this.$store.state.searchText;
      },
      set: _.debounce(function (val) {
        this.$store.commit('setSearchText', val)
      },1),
    }
  },
  watch: {

  }
}
</script>


<style lang="scss">

$searchbar-height-toolbar: 64px;
$searchbar-height: 50px;
$searchbar-height-mobile: 48px;

.searchBar  {
  height:  calc(100%);
  width:  calc(100% - #{$side-panel-width});
  height: $searchbar-height-toolbar;
}
.searchBar:not(.toolbar) {
  height: $searchbar-height;
}
.searchBar.mobile {
  height: $searchbar-height-mobile;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

/* not used*/
.searchBar .searchBtn {
  color: white;
  background-color: $color-teal !important;
  cursor: pointer !important;
}
.searchBar .searchBtn > * {
  cursor: pointer !important;
  font-weight: 700;
  font-family: $font-secondary, sans-serif;
}
.searchBar .blocky {
  display: inline-block;
  height: auto;
  white-space: normal;
  overflow: visible;
}
.searchBar .success--text {
  align-self: center;
  margin-top: 0;
  margin-bottom: 0;
  color: #fafafa !important;
}
.searchBar .adv {
  cursor: pointer;
  color: $color-teal;
}
.searchBar .tile {
  height: calc(100%) !important;
  min-height: 48px;
}
.searchBar .suggestionheading {
  font-weight: 700 !important;
  font-size: 18px !important;
  padding: 5px !important;
  color: $color-primary;
  // font-size: 1em;
  // padding:0;
}
.searchBar .suggestionFont {
  //font-size: .8em;
  font-weight: 400 !important;
  font-size: 16px !important;
  padding-left: 10px !important;
}
.searchBar .geoProfile {
  font-size: 12px !important;
}
.searchBar .suggestionDiv {
  flex: 1;
  line-height: 48px;
}
.searchBar .geoDiv {
  flex: 1;
}
.searchBar .v-input__control {
  min-height: none !important;
  height: $searchbar-height-toolbar;
  min-height: $searchbar-height-toolbar !important;
}
.searchBar:not(.toolbar) .v-input__control {
  height: $searchbar-height;
}
.searchBar.mobile .v-input__control {
  height: $searchbar-height-mobile;
}

.searchBar .v-input__control .v-input__slot {
  margin-bottom: 0;
  border-radius: unset !important;
  border: none !important;
  height: $searchbar-height-toolbar;
  min-height: $searchbar-height-toolbar;
}
.searchBar:not(.toolbar) .v-input__control .v-input__slot {
  background-color: $color-white !important;
  border: 1px solid #dce0e9 !important;
  border-radius: $border-radius !important;
  height: $searchbar-height;
  min-height: $searchbar-height;
  transition: border 500ms;
}
.searchBar.mobile .v-input__control .v-input__slot {
  height: $searchbar-height-mobile;
  min-height: $searchbar-height-mobile;
}
.searchBar:hover.toolbar .v-input__control .v-input__slot {
  border: none !important;
}
.searchBar:hover:not(.toolbar) .v-input__control .v-input__slot {
  border: 1px solid $color-teal !important;
}
.searchBar.blury:not(.toolbar) .v-input__control .v-input__slot {
  border: 1px solid $color-teal !important;
}

.searchBar.mobile .v-input__control .v-input__slot {
  background: none !important;
  background-color: none !important;
}

.searchBar.toolbar:not(.mobile) .v-input__control .v-input__slot {
  background: #37506d !important;
  background-color: #37506d !important;
}
.searchBar.toolbar.blury .v-input__control .v-input__slot {
  background: $color-white !important;
  background-color: $color-white !important;
}

.searchBar.mobile.blury .v-input__control .v-input__slot {
  background: $color-white !important;
  background-color: $color-white !important;
}

.searchBar .v-list__tile {
  white-space: normal;
}

.searchBar .v-list__tile.v-list__tile--link {
  min-height: 48px;
  height: calc(100%) !important;
}
.searchBar .v-list__tile.v-list__tile--link.v-list__tile--highlighted {
  background: $color-secondary-6;
}
.searchBar .v-menu__content.v-autocomplete__content {
  max-height: none !important;
}
.searchBar .v-icon.theme--dark.material-icons {
  color: #112e51 !important;
}
.searchBar.mobile .v-icon {
  color: $color-white !important;
}
.searchBar .v-text-field__details {
  display: none !important;
}
.searchBar .expandable {
  height: -webkit-fill-available -moz-available;
  width: -webkit-fill-available -moz-available;
}
.blury .v-input__icon--clear .material-icons:first-child {
  color: black;
}

// .searchBar:not(.toolbar) .v-input__icon--clear {
//   display: none; // Don't show the clear icon on the landing page(?)
// }
.searchBar.mobile .v-input__icon--clear {
  display: none; // Don't show the clear icon on mobile(?)
}

.searchBar.toolbar {
  @include input-placeholder-color($color-white);
}

.searchBar.toolbar input:not(:focus) {
  color: $color-white !important;
}

.searchBar .clear-button {
  margin-right: 10px;
  margin-top: 6px;
}

.v-input__control>.v-input__slot input{
  color: $color-white !important;
}

</style>
