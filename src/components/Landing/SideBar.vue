<template>
  <div class="p-16">
    <!-- Sidebar Container -->
    <div class="relative border-2 border-black w-36 md:w-52 lg:w-64 h-auto bg-[#EFEFEF] flex flex-col">
      <!-- Navigation Box -->
      <div class="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-lime-300 px-4 py-2 border border-black font-extrabold">
        NAVIGATION
      </div>

      <!-- Buttons Container (Flex Column) -->
      <div class="flex flex-col p-6 mt-10 space-y-6">
        <!-- Generate tags dynamically with random colors -->
        <div
          v-for="(tag, index) in tags"
          :key="index"
          @mouseover="hoveredTagIndex = index"
          @mouseleave="hoveredTagIndex = null"
          class="inline-flex items-center justify-center px-6 py-2 text-black font-extrabold border-2 border-black bg-white shadow-[4px_4px_0px_black] hover:shadow-none transition-all duration-200 cursor-pointer"
          
          :style="{ backgroundColor: hoveredTagIndex === index ? randomColors[index] : 'white' }"
        >
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      tags: [
        "Tag 1",
        "Tag 2",
        "Tag 3",
        "Tag 4",
        "Tag 5",
        "Tag 6",
        "Tag 7",
        "Tag 8"
      ],
      randomColors: [], // Stores generated random colors
      hoveredTagIndex: null // Keeps track of which tag is hovered
    };
  },
  created() {
    // Generate random colors when component is created
    this.randomColors = this.tags.map(() => this.getRandomLightColor());
  },
  methods: {
    getRandomLightColor() {
      // Generate a light, smooth pastel color
      const r = Math.floor(Math.random() * 100) + 155; // 155 - 255
      const g = Math.floor(Math.random() * 100) + 155;
      const b = Math.floor(Math.random() * 100) + 155;
      return `rgb(${r}, ${g}, ${b})`; // Convert to RGB format
    }
  }
};
</script>
