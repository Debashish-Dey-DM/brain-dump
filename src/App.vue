<template>
  <div>
    <LandingPage/>
  </div>
</template>

<script>
import TopNavbar from "./components/TopNavbar.vue";
import TheFooter from "./components/TheFooter.vue";
import LandingPage from "./views/LandingPage.vue";
import JournalList from "./components/Landing/JournalList.vue";

export default {
  components: {
    LandingPage
  },
};
</script>
