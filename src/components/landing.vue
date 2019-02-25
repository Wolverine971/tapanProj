<template>
  <div class="Landing">

    <div class="contents">

      <!-- HERO AND SEARCH -->
      <section class="hero-section clearfix">

            <img class="hero-image" src="@/assets/images/landing/landing-hero.svg" align="right" alt="Hero Image">

            <h1 class="page-heading hero-heading">Explore Census Data</h1>
            <p>The Census Bureau is the leading source of quality data about the nation's people and economy.</p>

            <div id="search-input">
              <Search-Bar @searchBarFocus="onSearchFocus()" placeholder="I'm looking for ..."></Search-Bar>
            </div>
		
            <!-- <a id="Landing-advanced-search" href="javascript:void(0)" class="advanced-search" @click="onClickAdvancedSearch()">Advanced Search</a> -->

      </section>
      <br>


      <!-- SUBJECT TILES -->
      <h2 class="section-title subjects-title">Subjects</h2><br>
      <v-container class="page-section" grid-list-xl text-xs-left>

        <v-layout row wrap>
          
          <v-flex class="subject-tile-flex" v-for="(topic, index) in subjectTiles" :key="index">

            <!-- <teal-inline-card class="subject-tile" :aria-label="topic" :key="index" :id="'subject-tile-' + index" :primary-text="topic" @click="onClickSubjectTile(topic)"></teal-inline-card> -->

          </v-flex>

        </v-layout>

      </v-container>


      <!-- SUGGESTION TILES -->
      <v-container class="page-section" grid-list-xl text-xs-left>

        <v-layout row wrap>
          
          <v-flex class="suggestion-flex" v-for="(tile, index) in suggestionTiles" :key="index">

            <h2 class="section-title">{{tile.title}}</h2>
            <hr class="suggestion-hr">
            <!-- <img :src="getImagePath(tile.image)" class="suggestion-image" :alt="tile.title"/> -->
            <div class="suggestion-link" v-for="(item, index2) in tile.items" :key="index2">
              <a href="javascript:void(0)" @click="onClickSuggestion(item)" :id="'suggestion-item-' + index + '-' + index2">{{item.text}}</a>
            </div>

          </v-flex>

        </v-layout>

      </v-container>
    

      <!-- FEEDBACK SECTION -->
      <v-container class="page-section" grid-list-md text-xs-center>
        <v-layout row>

          <v-flex xs4>
            <!-- <img class="feedback-image" src="@/assets/images/landing/feedback.svg" alt="Feedback"> -->
          </v-flex>

          <v-flex xs6 class="feedback-area">
            <h2 class="feedback-heading">Help us build this experience</h2>
            <p>Your input is important as we develop this platform. Start searching and let us know how we can make your experience better.</p>
            <a href="https://ask.census.gov/prweb/PRServletCustom/YACFBFye-rFIz_FoGtyvDRUGg1Uzu5Mn*/!STANDARD" target="_blank" id="feedback-link">
              <v-btn secondary flat class="feedback-button pri" tabindex="-1">Send us Feedback</v-btn>
            </a>
          </v-flex>

        </v-layout>
      </v-container>

    </div>

    <!-- <page-footer></page-footer> -->

  </div>
</template>

<script>
import SearchBar from './searchbar'

export default {
  name: 'Landing',
  components: {
    SearchBar
  },
  mixins: [],
  computed: {
    subjectTiles() {
      return [
        'Population',
        'Economic',
        'Education',
        'Business',
        'Emergency Preparedness',
        'Employment',
        'Families & Living Arrangements',
        'Health',
        'Housing',
        'Income & Poverty',
        'International Trade',
        'Public Sector'
      ]
    },
    suggestionTiles() {
      return [
        {
          title: 'Data Profiles',
          image: 'landing/data-profiles.svg',
          items: [
            {text: 'United States Profile', type: 'profile', geoid: '0100000US'},
            {text: 'Los Angeles County Profile', type: 'profile', geoid: '0500000US06037'},
            {text: 'New York City Profile', type: 'profile', geoid: '1600000US3651000'}
          ]
        },
        {
          title: 'Maps and Visualizations',
          image: 'landing/maps-and-visualizations.svg',
          items: [
            {text: 'Total Population in the United States', type: 'query'},
            {text: 'Educational Attainment in the United States', type: 'query'},
            {text: 'Median Household Income in the United States', type: 'query'},
            {text: 'Employment Status in the United States', type: 'query'},
            {text: 'Housing Units in the United States', type: 'query'}
          ]
        },
        {
          title: 'Industry and NAICS codes',
          image: 'landing/industry.svg',
          items: [
            {text: '31-33: Manufacturing', type: 'naics', naics: '31-33'},
            {text: '42: Wholesale Trade', type: 'naics', naics: '42'},
            {text: '44-45: Retail Trade', type: 'naics', naics: '44-45'},
            {text: '48-49: Transportation and Warehousing', type: 'naics', naics: '48-49'},
            {text: '72: Accommodation and Food Services', type: 'naics', naics: '72'}
          ]
        }
      ]
    } 
  },
  methods: {
    /**
     * navigate to advanced search page
     */
    onClickAdvancedSearch() {
      this.$router.push({name: 'FilterHome'});
    },

    /**
     * search for given topic, then navigate to all results page
     * @param topic a topic to search
     */
    onClickSubjectTile(topic) {
      this.$store.dispatch('search/unifiedSearch', { 't': topic}).then(() => {
        this.$router.push({path: '/all', query: {t: topic}})
      })
    },

    /**
     * navigate to other pages based on type of clicked tile
     * @param item clicked suggestion tile
     */
    onClickSuggestion(item) {

      // Profile page navigation
      if (item.type === 'profile') {
        this.$router.push({path: '/profile', query: {q: item.text, g: item.geoid}})
      }

      // NAICS search
      else if (item.type === 'naics') {
        this.$store.dispatch('search/unifiedSearch', { n : item.text}).then(() => {
          this.$router.push({path: '/all', query: {n: item.text}})
        })
      }

      // Generic search
      else {
        this.$store.dispatch('search/unifiedSearch', {q:item.text}).then(() => {
          this.$router.push({path: '/all', query: {q: item.text}})
        })
      }
    },

    /**
     * If on mobile then scroll the search input to the top of the
     * screen on focus so that there is room for the keyboard.
     */
    onSearchFocus() {
      const mobileBreakpoint = 600
      if (document.body.clientWidth <= mobileBreakpoint) {
        this.scrollToElement('#search-input')
      }
    }
  }
}
</script>


<style scoped lang="scss">

  /* PAGE COMPONENT */

  .Landing {
    width: 100%;
    color: $color-primary;
    background-color: $color-page-background;
    @include scrollable-page(true);
  }

  .contents {
    padding: $page-padding-desktop;

    @media only screen and (max-width: $breakpoint-mobile) {
      padding: $page-padding-mobile;
    }
  }

  /* PAGE STYLES */

  .page-section {
    width: 100%;
    max-width: 100%;
    margin: 0 0 80px 0;
  }

  .section-title {
    font-family: $font-primary;
    font-size: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
  }

  .page-heading,
  .feedback-heading {
    font-family: $font-primary;
    font-size: 32px;
  }

  /* HERO SECTION */

  .hero-section {
    margin-bottom: 0;

    @media only screen and (max-width: 1024px) {
      margin-bottom: 60px;
    }
  }

  .hero-heading {
    margin-top: auto;
    white-space: pre-wrap;
    overflow: visible;
    padding: 0;

    @media only screen and (max-width: $breakpoint-mobile) {
      margin-top: 50px;
    }
  }

  .advanced-search {
    margin-top: 14px;
    float: left;
  }

  .hero-image {
    width: 50%;
    position: relative;
    margin-left: 40px;
    margin-bottom: 40px;

    @media only screen and (max-width: $breakpoint-mobile) {
      width: 300px;
      right: -40px;
      margin-top: -50px;
      margin-left: 0;
      margin-bottom: 0;
    }
  }

  /* SUBJECT TILES SECTION */

  .subjects-title {
    margin-bottom: -12px;
  }

  .subject-tile {
    width: 100%;
  }

  .subject-tile-flex {

    @include flex-grow(0);

    /* 6 columns */
    @include flex-basis($flex-6-column);
    max-width: $flex-6-column;

    @media only screen and (max-width: 1340px) {
      /* 4 columns */
      @include flex-basis($flex-4-column);
      max-width: $flex-4-column;
    }

    @media only screen and (max-width: 940px) {
      /* 3 columns */
      @include flex-basis($flex-3-column);
      max-width: $flex-3-column;
    }

    @media only screen and (max-width: 740px) {
      /* 2 columns */
      @include flex-basis($flex-2-column);
      max-width: $flex-2-column;
    }

  }

  .subject-tile-text {
    color: $color-primary;
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* SUGGESTIONS SECTION */

  .suggestion-flex {

    @include flex-grow(0);

    /* 3 columns */
    @include flex-basis($flex-3-column);
    max-width: $flex-3-column;

    @media only screen and (max-width: 1100px) {
      /* 1 column */
      @include flex-basis($flex-1-column);
      max-width: $flex-1-column;
    }
  }

  .suggestion-hr {
    margin: 10px 0 20px 0;
  }

  .suggestion-image {
    width: 100%;
    margin: 10px 0 30px 0;
  }

  .suggestion-link {
    margin-bottom: 20px;
  }

  /* FEEDBACK SECTION */

  .feedback-image {
    width: 95%;
    max-width: 358px;
  }

  .feedback-area {
    margin-top: 100px;
    margin-left: 20px;
    text-align: left;

    @media only screen and (max-width: 1024px) {
      margin-top: 40px;
    }
  }

  .feedback-button {
    margin: 0 !important;
  }

</style>
