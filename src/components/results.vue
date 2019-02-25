<template>
  <div class="AllResults">
    <!-- navigation bar component -->
    <!-- <nav-bar></nav-bar> -->

      <!-- No Results Found during search -->
      <div v-if="(!results)" class="no-results">
        <br><br>
        <h2>Nothing found for "{{searchText}}"</h2>
        <br>

        <a @click="onClickAdvancedSearch()" href="javascript:void(0)">
          <strong>Try our advanced search</strong>
        </a>
        <br><br><br><br>
      </div>

      <!-- Display search results -->
      <div v-else>
        <v-layout row justify-space-around>
            

          <!-- MAIN CONTENT AREA -->
          <v-flex md8 xs12>
                <v-spacer></v-spacer>
                
                <v-spacer></v-spacer>
                <v-card auto>
                      <v-spacer></v-spacer>
                      <v-card style="margin-top: 50px;">
                      <v-card-title>
                            You searched for {{searchText}}
                      </v-card-title>
                </v-card>
                  <v-container
                  fluid
                  grid-list-lg
                  auto
                  style="margin-top: 20px;">
                  <v-spacer></v-spacer>
                  <v-layout row>
                  <v-flex md8 xs12>
                        <v-card color="primary" class="white--text getBig">
                              <v-card-title primary-title>
                                    <div>Results:</div>
                              </v-card-title>
                              <v-card-text>
                                    {{results}}
                              </v-card-text>
                        </v-card>
                  </v-flex>
                  <v-flex md8 xs12>
                        <v-card color="primary" class="white--text getBig">
                              <v-card-title primary-title>
                                    <div>Spell Check:</div>
                              </v-card-title>
                              <v-card-text>
                                    {{spellCheck}}
                              </v-card-text>
                        </v-card>
                  </v-flex>
                  <v-flex md8 xs12>
                        <v-card color="primary" class="white--text getBig">
                              <v-card-title primary-title>
                                    <div>Did You Mean:</div>
                              </v-card-title>
                              <v-card-text>
                                    {{didyoumean}}
                              </v-card-text>
                        </v-card>
                  </v-flex>
                  <v-flex md8 xs12>
                        <v-card color="primary" class="white--text getBig">
                              <v-card-title primary-title>
                                    <div>Synonyms:</div>
                              </v-card-title>
                              <v-card-text>
                                    {{synonym}}
                              </v-card-text>
                        </v-card>
                  </v-flex>
                  </v-layout>
                  </v-container>
                </v-card>





            <!-- <v-layout column justify-start ma-2>
                  <div>
                        <label>Results:</label>
                        <span>{{results}}</span>
                  </div>
                  <div>
                        <label>Spell Check:</label>
                        <span>{{spellCheck}}</span>
                  </div>
                  <div>
                        <label>Did You Mean:</label>
                        <span>{{didyoumean}}</span>
                  </div>
                  <div>
                        <label>Synonyms:</label>
                        <span>{{synonym}}</span>
                  </div>
            </v-layout> -->
          </v-flex>
        </v-layout>
      </div>


    <!-- footer component -->
    <!-- <page-footer></page-footer> -->
  </div>
</template>

<script>
// import AgGridTable from './table/CAgGrid'
// import FeaturedResultCard from '@/components/common/patternLibrary/FeaturedResultCard'
// import MapboxMap from '@/components/map/MapboxMap'
// import MapBottomLegend from '@/components/map/MapBottomLegend'
// import NavBar from './common/NavBar'
// import PageFooter from '@/components/common/PageFooter'
// import RightRailCard from '@/components/common/patternLibrary/RightRailCard'
// import TableListItem from '@/components/common/TableListItem'
// import { DP_GLOBAL } from '../services/deepLinkConstants';
// import { SupportedGeoProfile } from '@/services/mixins/supportedGeoProfile.js'
// import { WebpageParsing } from '@/services/mixins/webpageParsing.js'
// import GeoDescription from '@/components/common/GeoDescription.vue'

export default {
  name: 'AllResults',
  components: {
//     NavBar, 
//     MapboxMap, MapBottomLegend, AgGridTable, TableListItem,
//     FeaturedResultCard, RightRailCard, PageFooter, GeoDescription
  },
//   mixins: [SupportedGeoProfile, WebpageParsing],
  data () {
    return {
      featuredResultValue: 0, // value displayed for featured result
      featuredResultTable: '', // table containing featured result value
      request: {
            "type" : "object",
            "id" : "urn:jsonschema:com:app:search:application:model:SearchTermRequest",
            "properties" : {
                  "advancedAll" : {
                        "type" : "string"
                  },
                  "advancedNone" : {
                        "type" : "string"
                  },
                  "spellCheck" : {
                        "type" : "boolean"
                  },
                  "synonym" : {
                        "type" : "boolean"
                  }
            }
      },
      response: {
            "results": null,
            "didyoumean": null,
            "spellCheck": null,
            "synonym": "age demographics"
      }
    }
  },	

  mounted () {
  },
  computed: {
//     currentSelections () {
//       return this.$store.state.currentSelections
//     },

//     currentGeo () {
//       return this.currentSelections[DP_GLOBAL.GEOS][0]
//     },

//     currentGeographyName () {
//       return this.currentGeo ? this.currentGeo.displayName : 'United States'
//     },

//     currentGeoId () {
//       return this.currentGeo.id
//     },

//     featuredResult () {
//       var result = this.$store.state.featuredResult ? this.$store.state.featuredResult[0] : null
      
//       if (result) {
//         this.featuredResultValue = result.stats[0].value
//         this.featuredResultTable = result.tableName

//         // format as a 'percent'
//         if (result.format === 'percent') {
//           // must multiply by 100 since value is returned as a decimal
//           this.featuredResultValue = Number(this.featuredResultValue)
//             * 100 + '%'
//         } else {
//           // use filter service to format
//           this.featuredResultValue = this.$options.filters
//             .formatValue(this.featuredResultValue, result.format)
//         }

//         return result
//       }
//     },

//     inTableSearch () {
//       return this.$store.state.inTableSearch
//     },

//     inWebpagesSearch () {
//       return this.$store.state.inWebpagesSearch
//     },

//     maps () {
//       if (this.onlyMapsSection) {
//         // Show all results if this is the only section returned
//         return this.$store.state.tables
//       }
//       // else show 3 results
//       return this.$store.state.tables ? this.$store.state.tables.slice(0, 3) : []
//     },

//     mapCount () {
//       return this.tableCount
//     },

//     onlyPagesSection () {
//       return Number(this.tableCount) === 0 && Number(this.mapCount) === 0
//         && Number(this.pageCount) > 0
//     },

//     onlyTablesSection () {
//       return Number(this.pageCount) === 0 && Number(this.mapCount) === 0
//         && Number(this.tableCount) > 0
//     },

//     onlyMapsSection () {
//       return Number(this.pageCount) === 0 && Number(this.tableCount) === 0
//         && Number(this.mapCount) > 0
//     },

//     pages () {
//         if (this.onlyPagesSection) {
//           // Show all results if this is the only section returned
//           return this.$store.state.webpages.availableWebPages
//         }

//         // else show 3 results
//         return this.$store.state.webpages.availableWebPages ? this.$store.state.webpages.availableWebPages.slice(0, 3) : []      
//     }, 

//     pageCount () {
//       return this.$store.state.webpages.availableWebPagesCount
//     },

//     relatedSearches () {
//       if (this.$store.state.relatedSearches) {
//         return this.$store.state.relatedSearches
//       }
//     },

    searchText () {
      return this.$store.state.searchText
    },

//     showProfile () {
//       if (this.currentGeo && this.supported(this.currentGeo.id)) {
//         return true
//       } else {
//         return false
//       }
//     },

//     spellCheck () {
//       if (this.$store.state.spellCheck === "" || this.$store.state.spellCheck === undefined) {
//         return ''
//       } else {
//         return this.$store.state.spellCheck
//       }
//     },

//     tableCount () {
//       return this.$store.state.tableResultsCount
//     },

//     tables () {
//       if (this.onlyTablesSection) {
//         // Show all results if this is the only section returned
//         return this.$store.state.tables
//       }

//       // else show 3 results
//       return this.$store.state.tables ? this.$store.state.tables.slice(0, 3) : []
//     },

//     totalResults () {
//       return Number(this.pageCount) + Number(this.tableCount) + Number(this.mapCount)
//     }


      results(){
            return this.$store.getters.getResults
      },
      didyoumean(){
            return this.$store.getters.getDidYouMean
      },
      spellCheck(){
            return this.$store.getters.getSpellCheck
      },
      synonym(){
            return this.$store.getters.getSynonyms
      },
  },
  watch: {
    /**
     * Watch for change in available tables
     */
    tables (newTables, oldTables) {
      /* default to first table if no table selected or 
      selected table isn't in table list */
      if (newTables.length > 0) {
        if (!this.$store.getters.selectedTable) {
          this.$store.dispatch('setDataSet', newTables[0])
        } 
      }
    },
  },
  methods: {
    /**
     * Reload page replacing previous search term with spell checked search term
     */
    didYouMeanSearch () {
      this.$store.dispatch('search/unifiedSearch', {q: this.spellCheck}).then(() => {
        this.$router.push({path: '/all', query: {q: this.spellCheck}})
      })
    },

    /**
     * Reload page replacing previous search term with clicked link value
     * @param value clicked search term
     */
    onClickRelatedSearch (value) {
      this.$store.dispatch('search/unifiedSearch', {q: value}).then(() => {
        this.$router.push({path: '/all', query: {q: value}})
      })
    },

    /**
     * Navigate to Advanced Search page
     */
    onClickAdvancedSearch () {
      this.$router.push({path: '/advanced'})
    },

    /**
     * Navigate to Webpages page
     */
    onViewAllPages () {
      this.$router.push({path: '/webpages'})
    },

    /**
     * Navigate to Tables page
     */
    onViewAllTables () {
      // to be implemented: remove all params unrelated to tables page 

      this.$router.replace({path: 'table', query: this.$route.query })
    },

    /**
     * Navigate to Maps page
     */
    onViewAllMaps () {
      this.$router.replace({path: 'map', query: this.$route.query})
    },

    /**
     * Navigate to selected external webpage
     * @param page link clicked on
     * @param event click event
     */
    onPageClick (page, event) {
      window.location = page.url
    },

    /**
     * Navigate to profile page
     */
    onProfileClick () {
      this.$router.push({
        path: '/profile',
        query: Object.assign({}, this.$route.query,
          { g: this.currentGeo.id,
            q: this.currentGeo.displayName})
      })
    },

    /**
     * Navigate to view of selected table
     * @param dataSet object containing selected table data
     * @param event click event
     */
    onTableClick (dataSet, event) {
      let tableName = dataSet.table
      let tableId = dataSet.instances[0].id

      this.$store.dispatch('setDataSet', dataSet)
      this.$router.push({path: '/table', query: Object.assign({}, this.$route.query, {table: tableName, tid: tableId})})
    },

    /**
     * Navigate to view of selected map
     * @param dataSet object containing selected map data
     * @param event click event
     */
    onMapClick (dataSet, event) {
      let tableName = dataSet.table
      let tableId = dataSet.instances[0].id
      let vintage = dataSet.instances[0].vintage

      this.$store.dispatch('setDataSet', dataSet)
      this.$router.push({path: '/map', 
        query: {table: tableName, tid: tableId, vintage: vintage}})
    },

    onClickFeaturedResult() {
      this.$router.push({path: '/table', 
        query: {tid: this.featuredResultTable, table: this.featuredResultTable.split('.')[1]}})
    }
  }
}
</script>

<style scoped lang="scss">

  /* COMPONENT STYLES */

  .AllResults {
    width: 100%;
    color: $color-primary;
    background-color: $color-page-background;
    @include scrollable-page();
  }

  .featured-results {
    margin-bottom: 24px;
  }

  .page-section {
    margin-bottom: 40px;
  }

  .section-title {
    margin-left: 16px;
    margin-right: 16px;
  }
  
  .view-all-button {
    margin-top: 10px;
    margin-right: 16px;
    text-align: right;
  }

  .total-results {
    font-size: 12px;
    margin-bottom: 40px;
    margin-top: 10px;
    margin-left: 16px;
  }

  .no-results {
    text-align: center;
  }

  .loading-container {
    text-align: center;
    margin: 40px 0;
  }

  .geo-description {
    color: $color-white;
    font-size: 14px;
    margin-right: 20px;
  }

  /* ENTRY STYLES */

  .entry {
    cursor: pointer;
  }

  .entry:hover {
    background-color: $color-primary-9;
  }

  .entry-content {
    border-bottom: 1px solid $color-secondary-8;
    padding: 16px;
  }

  .entry-desc {
    color: $color-primary;
    padding-bottom: 3px;
    font-family: $font-secondary;
    font-weight: bold;
    font-size: 16px;
  }

  .entry-info-page {
    color: $color-secondary;
    font-size: 12px;
    font-weight: bold;
  }

  .entry-info-page {
    font-weight: normal;
  }

  .entry-value {
    color: $color-secondary;
    font-size: 12px;
    font-weight: lighter;
  }

  /* PREVIEW STYLES */

  .table-entry-preview,
  .map-entry-preview {
    width: 100%;
    height: auto;
    margin-top: 10px;
  }

  /* RIGHT RAIL */
  .right-rail {
    margin-top: 40px;
  }

  .related-searches-title {
    margin-top: 24px;
  }
  
  .related-search {
    display: block;
    margin-top: 10px;
  }
  .getBig{
        height: 150px;
  }
</style>
