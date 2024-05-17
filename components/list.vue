<template>
  <!-- component -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 my-24">
    <article>
      <h2 class="text-2xl font-extrabold text-gray-900">BLOG</h2>
      <section class="mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8">
        <!-- Loop through blogs -->
        <article 
          v-for="blog in blogs" 
          :key="blog.id" 
          :href="`/blog/${blog.id}`" 
          class="relative w-full h-64 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
          :style="{ backgroundImage: `url(${blog.image})` }">
          <div class="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out"></div>
          <div class="relative w-full h-full px-4 sm:px-6 lg:px-4 flex justify-center items-center">
            <h3 class="text-center">
              <a :href="`/blog/${blog.id}`" class="text-white text-2xl font-bold text-center">
                <span class="absolute inset-0"></span>
                {{ blog.title }}
              </a>
            </h3>
          </div>
        </article>
      </section>
    </article>
  </section>
</template>

<script>
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firebase.js";

export default {
  data() {
    return {
      loading: false,
      blogs: [],
    };
  },
  mounted() {
    this.fetchBlogs();
  },
  methods: {
    async fetchBlogs() {
      this.loading = true;
      const db = getFirestore(app);
      try {
        const querySnapshot = await getDocs(collection(db, "blog"));
        this.blogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title, // Assuming 'title' is a field in your Firestore document
          date: doc.data().date.toDate(), // Convert Firestore Timestamp to JavaScript Date object
          image: doc.data().image_1, // Assuming 'image' is a field in your Firestore document containing the image URL
        }));
        this.loading = false;
      } catch (error) {
        console.error("Error fetching blogs: ", error);
        this.loading = false;
      }
    },
    formatDate(date) {
      const options = { month: 'long', day: 'numeric', year: 'numeric' };
      return new Date(date).toLocaleDateString('en-US', options);
    }
  },
};
</script>
