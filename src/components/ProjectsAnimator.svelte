<script>
  import { onMount } from "svelte";

  onMount(() => {
    const projects = document.querySelectorAll(".projects-container .project");

    if (!projects.length) return;

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const project = entry.target;
            project.addEventListener("mouseover", () => {
              project.classList.add("is-active");
            });
            project.addEventListener("mouseout", () => {
              project.classList.remove("is-active");
            });
            observer.unobserve(project);
          }
        });
      },
      { threshold: 0.1 }
    );

    projects.forEach((project) => {
      observer.observe(project);
    });
  });
</script>
