<script>
  import { onMount } from "svelte";

  onMount(() => {
    const projects = document.querySelectorAll(".projects-container .project");

    if (!projects.length) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const observer = new IntersectionObserver(
      (entries, observer) => {
        // Helpers para separar la lógica de móvil y escritorio y evitar anidaciones
        const handleMobile = (isIntersecting, project) => {
          if (isIntersecting) {
            if (project._hideTimeout) {
              clearTimeout(project._hideTimeout);
              project._hideTimeout = null;
            }
            project.classList.add("is-active");
          } else {
            if (project._hideTimeout) clearTimeout(project._hideTimeout);
            project._hideTimeout = setTimeout(() => {
              project.classList.remove("is-active");
              project._hideTimeout = null;
            }, 2000);
          }
        };

        const handleDesktop = (isIntersecting, project) => {
          if (isIntersecting) {
            project.addEventListener("mouseover", () =>
              project.classList.add("is-active")
            );
            project.addEventListener("mouseout", () =>
              project.classList.remove("is-active")
            );
            observer.unobserve(project);
          } else {
            project.classList.remove("is-active");
          }
        };

        entries.forEach(({ target: project, isIntersecting }) => {
          isMobile
            ? handleMobile(isIntersecting, project)
            : handleDesktop(isIntersecting, project);
        });
      },
      { threshold: 1 }
    );

    projects.forEach((project) => {
      observer.observe(project);
    });
  });
</script>
