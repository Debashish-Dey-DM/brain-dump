<template>
  <div>
    <TopNavbar /> <!-- Navbar stays on all pages -->
   
    <div class="flex justify-center min-h-[calc(100vh-64px)] p-4" id="LandingPage">
  <div class="flex w-full max-w-6xl gap-0"> 
    <!-- Left Section (Journal) -->
    <div class="w-1/2 min-h-screen min-w-[350px] bg-white flex flex-col items-center" id="Journal">
      <p class="text-gray-600">
        <router-view /> <!-- This will load pages dynamically based on the route -->
      </p>
    </div>

    <!-- Right Section (Something Else) -->
    <div class="w-1/2 min-h-screen min-w-[350px] bg-white  flex flex-col  items-center" id="SomethingElse">
     
       <SideBar/>
       <SocialsList/>
     
    </div>
  </div>

</div>
   
  </div>
</template>

<script>
import TopNavbar from "./components/TopNavbar.vue";
import SideBar from "./components/Landing/SideBar.vue";
import SocialsList from "./components/Landing/SocialsList.vue";
export default {
  components: {
    TopNavbar,
    SideBar,
    SocialsList
    
  },
};
</script>
