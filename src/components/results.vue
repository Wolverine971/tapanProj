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
                              <v-card-text style="overflow-wrap: break-word">
                                    {{results}}
                              </v-card-text>
                        </v-card>
                  </v-flex>
                  <v-flex md8 xs12>
                        <v-card color="primary" class="white--text getBig">
                              <v-card-title primary-title>
                                    <div>Spell Check:</div>
                              </v-card-title>
                              <v-card-text style="overflow-wrap: break-word">
                                    {{spellCheck}}
                              </v-card-text>
                        </v-card>
                  </v-flex>
                  <v-flex md8 xs12>
                        <v-card color="primary" class="white--text getBig">
                              <v-card-title primary-title>
                                    <div>Did You Mean:</div>
                              </v-card-title>
                              <v-card-text style="overflow-wrap: break-word">
                                    {{didyoumean}}
                              </v-card-text>
                        </v-card>
                  </v-flex>
                  <v-flex md8 xs12>
                        <v-card color="primary" class="white--text getBig">
                              <v-card-title primary-title>
                                    <div>Synonym:</div>
                              </v-card-title>
                              <v-card-text style="overflow-wrap: break-word">
                                    {{synonym}}
                              </v-card-text>
                        </v-card>
                  </v-flex>
                  </v-layout>
                  </v-container>
                </v-card>

          </v-flex>
        </v-layout>
      </div>


    <!-- footer component -->
    <!-- <page-footer></page-footer> -->
  </div>
</template>

<script>

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

    searchText () {
      return this.$store.state.searchText
    },


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
            return this.$store.getters.getSynonym
      },
  },
  watch: {
  },
  methods: {
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
        min-height: 150px;
        max-width: 50vh;
  }
</style>
