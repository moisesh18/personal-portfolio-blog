<script>
  import { onMount } from "svelte";

  onMount(() => {
    const posts = document.querySelectorAll(".post-item");
    const categoryButtons = document.querySelectorAll(".category");

    if (!posts.length || !categoryButtons.length) return;

    categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        categoryButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const selectedCategory = button.dataset.category;

        posts.forEach((post) => {
          const categories = (post.dataset.categories || "")
            .split(",")
            .map((c) => c.trim());

          if (
            selectedCategory === "all" ||
            categories.includes(selectedCategory)
          ) {
            post.classList.remove("hidden");
          } else {
            post.classList.add("hidden");
          }
        });
      });
    });
  });
</script>
