<template>
  <div class="max-w-screen-lg mx-auto my-32">
    <main class="mt-10" v-if="loading">
      <p>Loading...</p>
    </main>
    <main class="mt-10" v-else-if="blog">
      <div class="mb-10">
        <div class="mb-4 md:mb-0 w-full mx-auto relative">
          <div class="px-4 lg:px-0">
            <h2 class="text-4xl font-semibold text-gray-800 leading-tight">
              {{ blog.title }}
            </h2>
            <a href="#" class="py-2 text-green-700 inline-flex items-center justify-center mb-2">
              {{ blog.category }}
            </a>
          </div>
          <img :src="blog.image_1" class="w-full object-cover lg:rounded" style="height: 28em" />
        </div>
        <div class="flex flex-col lg:flex-row lg:space-x-12">
          <div class="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
            <p class="pb-6">{{ blog.text_1 }}</p>
            <img :src="blog.image_2" class="w-full object-cover lg:rounded mb-6" style="height: 20em" />
            <p class="pb-6">{{ blog.text_2 }}</p>
            <div class="border-l-4 border-gray-500 pl-4 mb-6 italic rounded">
              {{ blog.text_3 }}
            </div>
            <img :src="blog.image_3" class="w-full object-cover lg:rounded mb-6" style="height: 20em" />
            <p class="pb-6">{{ blog.text_4 }}</p>
          </div>
          
        </div>
        <a class="text-xl font-semibold hover:bg-gray-100 p-2 rounded-xl">← Vezi si alte Bloguri</a>
      </div>
    </main>
    <main v-else>
      <p>No blog found for this ID.</p>
    </main>
  </div>
</template>

<script>
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebase.js";
import { useRoute } from 'vue-router';

export default {
  data() {
    return {
      loading: false,
      blog: null,
    };
  },
  mounted() {
    const route = useRoute();
    const blogId = route.params.id; // Get the blog ID from the route parameters
    this.fetchBlog(blogId);
  },
  methods: {
    async fetchBlog(id) {
      this.loading = true;
      const db = getFirestore(app);
      try {
        const blogRef = doc(db, "blog", id);
        const blogDoc = await getDoc(blogRef);
        if (blogDoc.exists()) {
          this.blog = {
            id: blogDoc.id,
            ...blogDoc.data() // Spread the blog data
          };
        } else {
          console.error("No such document!");
        }
        this.loading = false;
      } catch (error) {
        console.error("Error fetching blog: ", error);
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
/* Add any relevant styles here */
</style>
