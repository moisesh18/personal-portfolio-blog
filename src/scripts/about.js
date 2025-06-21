document.addEventListener("DOMContentLoaded", () => {
    const projects = document.querySelectorAll(".project");

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