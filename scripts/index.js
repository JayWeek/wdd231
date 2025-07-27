const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.nav-bar');

const currentYearEl = document.querySelector("#currentyear");
const lastModifiedEl = document.querySelector("#last-Modified");

// Set current year
if (currentYearEl) {
  const today = new Date();
  currentYearEl.textContent = today.getFullYear();
}

// Set last modified date in MM/DD/YYYY/ HH:mm:ss format
if (lastModifiedEl) {
  const lastmod = new Date(document.lastModified);

  const twoDigits = (num) => String(num).padStart(2, '0');

  const formattedDate = 
    `${twoDigits(lastmod.getMonth() + 1)}/` +
    `${twoDigits(lastmod.getDate())}/` +
    `${lastmod.getFullYear()}/ ` +
    `${twoDigits(lastmod.getHours())}:` +
    `${twoDigits(lastmod.getMinutes())}:` +
    `${twoDigits(lastmod.getSeconds())}`;

  lastModifiedEl.textContent = `Last modification: ${formattedDate}`;
}


hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbar.classList.toggle('show');
});


// CERTIFICATE SECTIONS
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

// selecting the div container

const courseGrid = document.querySelector('.course-grid');
const creditInformation = document.getElementById("creditInfo");

// looping through the courses object and event listener

document.getElementById("allCourses").addEventListener('click', () =>{
  displayCourses(courses);
})

// WDD courses

const wddCourses = courses.filter((wdd) =>{
  return wdd.subject == 'WDD';
})

document.getElementById("wddCourses").addEventListener('click', () =>{
  displayCourses(wddCourses);
})

// CSE courses
const cseCourses = courses.filter((cse) => {
  return cse.subject == "CSE";
})

document.getElementById("cseCourses").addEventListener('click', () =>{
  displayCourses(cseCourses);
})


// function to loop through course arrays 
function displayCourses(courseArray){
  courseGrid.innerHTML= '';

  // using reduce 
  const total = courseArray.reduce((acc, curr) =>{
    return acc + curr.credits;
  },0)

  courseArray.forEach((course) => {
    const p = document.createElement('p');
    if (course.completed) {
      p.textContent = `✔️${course.subject} ${course.number}`;
    }
    else{
      p.textContent = `${course.subject} ${course.number}`;
    }
    // total += course.credits;
    
    courseGrid.appendChild(p);
    creditInformation.textContent = `The total credits listed above is ${total}`;

    p.addEventListener("click", () => popupCourse(course));

  })
}

// displaying courses at render
displayCourses(courses);

const mydialog = document.querySelector("#course-details");
const myTitle = document.querySelector("#course-details h2");
const closeButton = document.querySelector("#closeButton");
const showHere = document.querySelector("#showHere");


// Event listener to close dialog
closeButton.addEventListener("click", () =>{
  mydialog.close();
})

// function to display dialog
function popupCourse(course) {
  myTitle.innerHTML = `${course.subject} ${course.number}`;

  const contentBox = document.getElementById("course-content");
  contentBox.innerHTML = ''; // 🔥 Clear previous content

  const subTitle = document.createElement('p');
  subTitle.innerHTML = `${course.title}`;

  const creditInfo = document.createElement("p");
  creditInfo.innerHTML = `${course.credits} credits`;

  const certificate = document.createElement("p");
  certificate.innerHTML = `Certificate: ${course.certificate}`;

  const description = document.createElement("p");
  description.innerHTML = `${course.description}`;

  const technology = document.createElement("p");
  technology.innerHTML = `Technology: ${course.technology}`;

  // Add them inside the course-content div
  contentBox.appendChild(subTitle);
  contentBox.appendChild(creditInfo);
  contentBox.appendChild(certificate);
  contentBox.appendChild(description);
  contentBox.appendChild(technology);

  mydialog.showModal(); // ✅ Correct method to show a modal
}
