<script>
  import { onMount } from "svelte";

  onMount(() => {
    const projects = document.querySelectorAll(".projects-container .project");

    if (!projects.length) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          const project = entry.target;
          if (entry.isIntersecting) {
            if (isMobile) {
              project.classList.add("is-active"); // Activate on mobile when visible
            } else {
              project.addEventListener("mouseover", () => {
                project.classList.add("is-active");
              });
              project.addEventListener("mouseout", () => {
                project.classList.remove("is-active");
              });
            }
            observer.unobserve(project);
          } else if (!isMobile) {
            project.classList.remove("is-active"); // Remove on desktop when not visible
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% is visible
    );

    projects.forEach((project) => {
      observer.observe(project);
    });
  });
</script>
