let land = document.querySelector(".landing-page"),
  setIcon = document.querySelector(".setting .toggle"),
  setLis = document.querySelectorAll(".setting-contianer .colors ul li"),
  setRandom = document.querySelectorAll(
    ".setting-contianer .randomChoosing span"
  ),
  imageBox = document.querySelector(".about_Us .img-box img"),
  aboutImgsArr = [
    "petrol_color.png",
    "Deep_Blue.jpeg",
    "purple.png",
    "red.jpg",
    "Defualt_color.png",
    "green.jpg",
  ],
  backArrImgs = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
  backOption = true,
  randomLooping,
  our_skills = document.querySelector(".skills"),
  our_skills_spans = document.querySelectorAll(
    ".skills .skill-progress-box span"
  ),
  imgInlocalStorage = localStorage.getItem("randomBackground"),
  navBullets = document.querySelector(".nav-bullets");
const bulletsSettingBox = document.querySelectorAll(
    ".bullets_setting_box span"
  ),
  resetBtn = document.querySelector(".reset_box .resetBtn");

///////////////////////////////////////////////////////////////////////////////////////////////////////

if (imgInlocalStorage != null) {
  if (imgInlocalStorage == "true") backOption = true;
  else backOption = false;
  setRandom.forEach((el) => {
    el.classList.remove("active");
    if (imgInlocalStorage == "true") {
      setRandom.forEach((el) =>
        el.classList.contains("yes") ? el.classList.add("active") : ""
      );
    } else {
      setRandom.forEach((el) =>
        el.classList.contains("no") ? el.classList.add("active") : ""
      );
    }
  });
}

if (localStorage.getItem("main-color")) {
  aboutCheckerLS();

  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("main-color")
  );
  setLis.forEach((el) => {
    el.classList.remove("active");
    if (el.getAttribute("data-color") === localStorage.getItem("main-color"))
      el.classList.add("active");
  });
}

let bulletsSettingBoxValue = localStorage.getItem("bulletsSettingBox");

if (bulletsSettingBoxValue != null) {
  if (bulletsSettingBoxValue == "true") {
    bulletsSettingBox.forEach((el) => {
      el.classList.remove("active");
      el.dataset.back == "yes" ? el.classList.add("active") : "";
    });
    navBullets.style.display = "block";
  } else {
    bulletsSettingBox.forEach((el) => {
      el.classList.remove("active");
      el.dataset.back == "no" ? el.classList.add("active") : "";
    });
    navBullets.style.display = "none";
  }
}
function randomizeImgs() {
  if (backOption == true) {
    randomLooping = setInterval(() => {
      let randomNum = Math.floor(Math.random() * backArrImgs.length);
      land.style.backgroundImage =
        "url('images/img" + backArrImgs[randomNum] + "')";
    }, 5000);
  }
}

setIcon.onclick = () => {
  setIcon.parentElement.classList.toggle("open");
  setIcon.firstElementChild.classList.toggle("fa-spin");
};

setLis.forEach((el) => {
  el.addEventListener("click", (e) => {
    setLis.forEach((el) => el.classList.remove("active"));
    e.currentTarget.classList.add("active");
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    aboutChecker(e);
    addToLocalStorage(e);
  });
});

setRandom.forEach((el) => {
  el.addEventListener("click", (e) => {
    setRandom.forEach((el) => el.classList.remove("active"));
    if (e.target.dataset.back == "no") {
      e.currentTarget.classList.add("active");
      backOption = false;
      clearInterval(randomLooping);
      localStorage.setItem("randomBackground", false);
    } else {
      e.currentTarget.classList.add("active");
      backOption = true;
      randomizeImgs();
      localStorage.setItem("randomBackground", true);
    }
  });
});

function addToLocalStorage(e) {
  localStorage.setItem("main-color", e.target.dataset.color);
}

function aboutCheckerLS() {
  if (localStorage.getItem("main-color") == "#ff9800") {
    imageBox.src = `images/about-us_${aboutImgsArr[4]}`;
  } else if (localStorage.getItem("main-color") == "#149e9e") {
    imageBox.src = `images/about-us_${aboutImgsArr[5]}`;
  } else if (localStorage.getItem("main-color") == "#f44336") {
    imageBox.src = `images/about-us_${aboutImgsArr[3]}`;
  } else if (localStorage.getItem("main-color") == "#03a9f4") {
    imageBox.src = `images/about-us_${aboutImgsArr[1]}`;
  } else if (localStorage.getItem("main-color") == "#3f51b5") {
    imageBox.src = `images/about-us_${aboutImgsArr[2]}`;
  }
}

function aboutChecker(e) {
  if (e.target.dataset.color == "#ff9800") {
    imageBox.src = `images/about-us_${aboutImgsArr[4]}`;
  } else if (e.target.dataset.color == "#149e9e") {
    imageBox.src = `images/about-us_${aboutImgsArr[5]}`;
  } else if (e.target.dataset.color == "#f44336") {
    imageBox.src = `images/about-us_${aboutImgsArr[3]}`;
  } else if (e.target.dataset.color == "#03a9f4") {
    imageBox.src = `images/about-us_${aboutImgsArr[1]}`;
  } else if (e.target.dataset.color == "#3f51b5") {
    imageBox.src = `images/about-us_${aboutImgsArr[2]}`;
  }
}
randomizeImgs();

window.onscroll = (e) => {
  let skillsOffset = our_skills.offsetTop;

  if (this.pageYOffset > skillsOffset - this.innerHeight + 200) {
    our_skills_spans.forEach((el) => {
      el.style.width = el.dataset.width;
    });
  }
  if (e.target !== icon && e.target !== barsDiv) {
    if (!barsDiv.classList.contains("hidden")) {
      barsDiv.classList.toggle("hidden");
      checker();
    }
  }
};

let gallaryImgArr = document.querySelectorAll(".gallary .photos img");
let gallaryPopup = document.querySelector(".previewer");
let popupDetails = document.querySelector(".previewer .details div");
let popupImg = document.querySelector(".previewer .img-container img");
let popupCloseBtn = document.querySelector(".previewer .close");
let popupNextBtn = document.querySelector(".previewer #right-arrow");
let popupPreBtn = document.querySelector(".previewer #left-arrow");

gallaryImgArr.forEach((imgEl) => {
  imgEl.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    gallaryPopup.classList.add("open");
    popupImg.src = e.currentTarget.src;
    popupImg.alt = e.currentTarget.alt;
    popupDetails.innerHTML = e.currentTarget.alt;
    popupCloseBtn.onclick = () => {
      gallaryPopup.classList.remove("open");
      overlay.style.display = "none";
    };
  });
});

const bullets = document.querySelectorAll(".bullets");
const links = document.querySelectorAll(".header ul li a");

scrollToSection(bullets);
scrollToSection(links);

function scrollToSection(elements) {
  elements.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelector(e.target.dataset.section)
        .scrollIntoView({ behavior: "smooth" });
    });
  });
}

function bulletsVisibillety() {
  bulletsSettingBox.forEach((el) => {
    el.addEventListener("click", (e) => {
      bulletsSettingBox.forEach((el) => el.classList.remove("active"));
      if (e.target.dataset.back == "no") {
        e.currentTarget.classList.add("active");
        navBullets.style.display = "none";
        localStorage.setItem("bulletsSettingBox", false);
      } else {
        e.currentTarget.classList.add("active");
        navBullets.style.display = "block";
        localStorage.setItem("bulletsSettingBox", true);
      }
    });
  });
}
bulletsVisibillety();

resetBtn.onclick = () => {
  localStorage.clear();
  location.reload();
};

let icon = document.querySelector(".header .icon"),
  barsDiv = document.querySelector(".header .barsDiv"),
  barLinks = document.querySelectorAll(".header .barsDiv .links a"),
  closeBtn = document.querySelector(".header .barsDiv .close");

//~ When User Click On Bars Icon The Bars Nav Will Appeare ✔
//~ When User Click On Close Icon Or Press "Escape" The Bars Nav Will Disappeare ✔

icon.addEventListener("click", (e) => {
  e.stopPropagation();
  barsDiv.classList.toggle("hidden");
  checker();
});

function checker() {
  if (!barsDiv.classList.contains("hidden")) {
    icon.classList.toggle("rotated");
  } else icon.classList.toggle("rotated");
}

document.addEventListener("click", (e) => {
  if (e.target !== icon && e.target !== barsDiv) {
    if (!barsDiv.classList.contains("hidden")) {
      barsDiv.classList.toggle("hidden");
      checker();
    }
  }
});

barLinks.forEach((el) => {
  el.addEventListener("click", () => {
    icon.classList.toggle("rotated");
    barsDiv.classList.toggle("hidden");
    scrollToSection(barLinks);
  });
});

barsDiv.onclick = (e) => {
  e.stopPropagation();
};
