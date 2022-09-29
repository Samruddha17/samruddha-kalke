import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.room;
    this.camera = this.experience.camera;
    this.time = this.experience.time;

    GSAP.registerPlugin(ScrollTrigger);

    this.onLoad();

    if (window.innerWidth > 900) {
      this.projectsTitle();
      this.gsapAboutSection();
      this.gsapProjectsTitle();
      this.gsapQuoteSection();
      this.cursorTrasitions();
      this.cursor1();
      this.cursor2();
    } else {
      document
        .getElementsByClassName("project-wrapper")[1]
        .classList.remove("fade-in-element");
      document
        .getElementsByClassName("project-wrapper")[1]
        .classList.remove("delay-2");
    }
  }

  cursorTrasitions() {
    var c1 = document.getElementsByClassName("ball")[0];
    var c2 = document.getElementsByClassName("ball-2")[0];

    c1.style.display = "block";
    c2.style.display = "block";

    document.querySelectorAll(".project-container").forEach((container) => {
      container.addEventListener("mouseover", () => {
        c1.style.border = "5px solid white";
        c2.style.border = "3px solid black";
        c2.style.background = "black";
      });
      container.addEventListener("mouseout", () => {
        c1.style.border = "5px solid #03fafe";
        c2.style.border = "3px solid #ff1dce";
        c2.style.background = "#ff1dce";
      });
    });

    document.querySelectorAll(".proj-content button").forEach((button) => {
      button.addEventListener("mouseover", () => {
        c1.style.opacity = 0;
        c2.style.opacity = 0;
      });
      button.addEventListener("mouseout", () => {
        c1.style.opacity = 1;
        c2.style.opacity = 1;
      });
    });

    ////////////// about icons
    document.querySelectorAll(".aboutIcons i").forEach((icon) => {
      icon.addEventListener("mouseover", () => {
        c1.style.opacity = 0;
        c2.style.opacity = 0;
      });
      icon.addEventListener("mouseout", () => {
        c1.style.opacity = 1;
        c2.style.opacity = 1;
      });
    });

    ///////////chnage cursor on contact page
    document
      .getElementsByClassName("page-3")[0]
      .addEventListener("mouseover", () => {
        c1.style.border = "5px solid white";
        c2.style.border = "3px solid black";
        c2.style.background = "black";
      });
    document
      .getElementsByClassName("page-3")[0]
      .addEventListener("mouseout", () => {
        c1.style.border = "5px solid #03fafe";
        c2.style.border = "3px solid #ff1dce";
        c2.style.background = "#ff1dce";
      });

    ////////////////// contact page text transition
    document
      .getElementsByClassName("contact-info")[0]
      .children[1].addEventListener("mousemove", () => {
        c2.style.display = "none";
        c1.classList.add("grow");
        c1.style.border = "none";
      });
    document
      .getElementsByClassName("contact-info")[0]
      .children[1].addEventListener("mouseleave", () => {
        c2.style.display = "block";
        c1.classList.remove("grow");
        c1.style.border = "5px solid #03fafe";
      });

    /////////////////// contact page buttons
    document.querySelectorAll(".contact-buttons button").forEach((button) => {
      button.addEventListener("mouseover", () => {
        c1.style.opacity = 0;
        c2.style.opacity = 0;
      });
      button.addEventListener("mouseout", () => {
        c1.style.opacity = 1;
        c2.style.opacity = 1;
      });
    });

    ///////////////// footer social icons
    document.querySelectorAll(".socials i").forEach((icon) => {
      icon.addEventListener("mouseover", () => {
        c1.style.opacity = 0;
        c2.style.opacity = 0;
      });
      icon.addEventListener("mouseout", () => {
        c1.style.opacity = 1;
        c2.style.opacity = 1;
      });
    });
  }

  cursor2() {
    GSAP.set(".ball-2", { xPercent: -50, yPercent: -50 });

    const ball = document.querySelector(".ball-2");
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 1;

    const xSet = GSAP.quickSetter(ball, "x", "px");
    const ySet = GSAP.quickSetter(ball, "y", "px");

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    GSAP.ticker.add(() => {
      // adjust speed for higher refresh monitors
      const dt = 1.0 - Math.pow(1.0 - speed, GSAP.ticker.deltaRatio());

      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      // pos.x = mouse.x;
      // pos.y = mouse.y;
      xSet(pos.x);
      ySet(pos.y);
    });
  }

  cursor1() {
    GSAP.set(".ball", { xPercent: -50, yPercent: -50 });

    const ball = document.querySelector(".ball");
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.15;

    const xSet = GSAP.quickSetter(ball, "x", "px");
    const ySet = GSAP.quickSetter(ball, "y", "px");

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    GSAP.ticker.add(() => {
      // adjust speed for higher refresh monitors
      const dt = 1.0 - Math.pow(1.0 - speed, GSAP.ticker.deltaRatio());

      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);
    });
  }

  gsapAboutSection() {
    GSAP.to(".aboutImage", {
      scrollTrigger: {
        trigger: ".imageSection",
        scrub: true,
        start: "top bottom",
        end: "bottom bottom",
        ease: "none",
      },
      ease: "none",
      scale: 1,
    });
  }

  gsapQuoteSection() {
    document.getElementsByClassName("quoteSection")[0].style.height =
      document.getElementsByClassName("quote")[0].clientHeight + "px";

    GSAP.to(".quote", {
      scrollTrigger: {
        // markers: true,
        trigger: ".quote",
        scrub: 2.5,
        start: `top 55%`,
        end: "top 100px",
        ease: "none",
      },
      ease: "none",
      left: `${
        window.innerWidth -
        document.getElementsByClassName("quote")[0].clientWidth
      }`,
    });
  }

  gsapProjectsTitle() {
    var timeline = new GSAP.timeline();
    timeline
      .to(".main-projects-title-wrapper", {
        scrollTrigger: {
          // markers: true,
          trigger: ".page-2",
          scrub: 0,
          start: "top 75%",
          end: "top 5%",
        },
        ease: "power0.none",
        top: "-399px",
      })
      .to(".main-projects-title", {
        scrollTrigger: {
          // markers: true,
          trigger: ".page-2",
          scrub: true,
          start: "top 100%",
          end: "top 50%",
        },
        // top: "-400px",
        opacity: 0.5,
      })
      .to(".main-projects-particles", {
        scrollTrigger: {
          // markers: true,
          trigger: ".page-2",
          scrub: true,
          start: "top 70%",
          end: "top 50%",
        },
        // top: "-400px",
        opacity: 0,
      });
  }

  projectsTitle() {
    document.getElementsByClassName(
      "main-projects-title-wrapper"
    )[0].style.top =
      window.innerHeight / 2 -
      document.getElementsByClassName("main-projects-title-wrapper")[0]
        .clientHeight /
        2;

    var mainTitle = document.getElementsByClassName("main-projects-title")[0];

    mainTitle.addEventListener("mouseout", (e) => {
      mainTitle.style.transform = "rotate3d(0, 1, 0, 0) scale(1)";
    });

    mainTitle.addEventListener("mousemove", (e) => {
      var degress =
        (e.clientX -
          document.getElementsByClassName("main-projects-title")[0]
            .clientWidth /
            2) /
        25;

      mainTitle.style.transform =
        "translateZ(50px) rotate3d(0, 1, 0," + -degress + "deg" + ")";
      // console.log(mainTitle.style.transform);
    });
  }

  onLoad() {
    var elements;
    var windowHeight;

    function init() {
      elements = document.querySelectorAll(".project-wrapper");
      windowHeight = window.innerHeight;

      Particles.init({
        selector: ".main-projects-particles",
        color: "#ffffff",
        maxParticles: 45,
        sizeVariations: 3,
        speed: 0.5,
        connectParticles: true,
        responsive: [
          {
            breakpoint: 500,
            options: {
              maxParticles: 20,
              connectParticles: true,
            },
          },
        ],
      });
    }

    function checkPosition() {
      var index = 0;
      for (var i = 0; i < elements.length; i++) {
        index += 1000;
        var element = elements[i];
        var positionFromTop = elements[i].getBoundingClientRect().top;

        if (positionFromTop - windowHeight <= 0) {
          element.classList.add("fade-in-element");
        }
      }
    }

    window.addEventListener("scroll", checkPosition);
    window.addEventListener("resize", init);

    init();
    checkPosition();
  }
}
