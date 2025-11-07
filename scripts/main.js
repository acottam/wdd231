/* ========== Nav: hamburger toggle, active state ========== */
const menuBtn = document.getElementById("menu-toggle");
const nav = document.getElementById("primary-nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.classList.toggle("is-open", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

/* ========== Courses ========== */
(function initCourses() {

  // Course data
  const courses = [
    {
      subject: "CSE",
      number: 110,
      title: "Introduction to Programming",
      credits: 2,
      certificate: "Web and Computer Programming",
      description: "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
      technology: ["Python"],
      completed: true,
    },
    {
      subject: "WDD",
      number: 130,
      title: "Web Fundamentals",
      credits: 2,
      certificate: "Web and Computer Programming",
      description: "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.",
      technology: ["HTML", "CSS"],
      completed: true,
    },
    {
      subject: "CSE",
      number: 111,
      title: "Programming with Functions",
      credits: 2,
      certificate: "Web and Computer Programming",
      description: "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.",
      technology: ["Python"],
      completed: true,
    },
    {
      subject: "CSE",
      number: 210,
      title: "Programming with Classes",
      credits: 2,
      certificate: "Web and Computer Programming",
      description: "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
      technology: ["C#"],
      completed: false,
    },
    {
      subject: "WDD",
      number: 131,
      title: "Dynamic Web Fundamentals",
      credits: 2,
      certificate: "Web and Computer Programming",
      description: "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.",
      technology: ["HTML", "CSS", "JavaScript"],
      completed: true,
    },
    {
      subject: "WDD",
      number: 231,
      title: "Frontend Web Development I",
      credits: 2,
      certificate: "Web and Computer Programming",
      description: "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
      technology: ["HTML", "CSS", "JavaScript"],
      completed: false,
    },
  ];

  // DOM elements
  const grid = document.getElementById("course-grid");
  const totals = document.getElementById("credit-total");
  const filterBtns = document.querySelectorAll(".filter");

  // Render function
  const render = (subject = "ALL") => {
    
    const list = subject === "ALL" ? courses : courses.filter(course => course.subject === subject);

    grid.innerHTML = list.map(course => {
      const done = course.completed === true;
      
      // Return course card HTML
      return `
        <article class="card course-card ${done ? "is-completed" : ""}" aria-label="${course.subject} ${course.number}${done ? " (completed)" : ""}">
          <div class="card__body">
            <h3 class="course-card__title">${course.subject} ${course.number} - ${course.title}</h3>
            <p class="card__meta">${course.credits} credits • ${course.certificate}</p>
            <p>${course.description ?? ""}</p>
            ${course.technology ? `<p class="card__meta">Tech: ${course.technology.join(", ")}</p>` : ""}
          </div>
        </article>
      `;
    }).join("");

    // Display 
    totals.textContent = `The total number of courses listed below is ${list.length}.`;
  };

  // Default: render all courses
  render("ALL");

  // Filter button events
  filterBtns.forEach(btn => btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    render(btn.dataset.filter);
  }));

})();

/* ========== Footer ========== */
// use the date object
let today = new Date();

// set the text content of the span element with the current year
document.getElementById("currentyear").innerHTML = `&copy;${today.getFullYear()}`;

// set the text content of the span element with the last modified date
document.querySelector('#lastmodified').textContent = `Last Modification: ${document.lastModified}`;
