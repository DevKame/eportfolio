"use strict";
/** There are a few values that will make a gross display after user resized that picture.
 * to make sure to maintain the correct values, i marked the important ones with:
 * adjust after resize:*/


//------------------------------------------HANDLING SIZE OF MY PICTURE WHEN SCROLLING--------START
window.scrollBy(0,0);
let firstHeadline = document.querySelector("#hl-con .hl-prim-rows:nth-child(1)");
let secondHeadline = document.querySelector("#hl-con .hl-prim-rows:nth-child(2)");
firstHeadline.style.transform = "translateY(0)";
firstHeadline.style.opacity = "1";
secondHeadline.style.transform = "translateY(0)";
secondHeadline.style.opacity = "1";

//---------------------------------------------MEDIA QUERRIES-----------START
let screen_smaller_than_1200px = window.matchMedia("(max-width:1200px)").matches;
//---------------------------------------------MEDIA QUERRIES-----------END

let body = document.querySelector("body");

let header = document.querySelector("header");
let hamburger = document.getElementById("hamburger-con");
let navbar = document.getElementById("nav-bar");
let navbarData = navbar.getBoundingClientRect();

let navLinks = document.querySelectorAll("#nav-bar > ul > li > span");

//adjust after resize:
let navHeight = navbar.offsetHeight;
//adjust after resize:
let headerHeight = header.offsetHeight;
let header_sticky_top = -(headerHeight - navHeight - 1);
header.style.top = header_sticky_top + "px";


//adjust after resize:
let switchPoint = +((headerHeight / 2).toFixed(0));

let img_me = document.getElementById("header-img-con");
let is_big = true;

let allPs = [...document.querySelectorAll("#section-about-me .text-box p")];
let allSpans = [...document.querySelectorAll("#section-about-me .text-box .hover-accent")];
// let headline = document.querySelector("#section-about-me .text-box h3");


let linkInfo = document.querySelector(".link-info");


let sidebar = document.getElementById("side-bar");


let section_aboutMe = document.getElementById("section-about-me");
let section_myWork = document.getElementById("section-my-work");
let section_techStack = document.getElementById("section-tech-stack");
let section_contact = document.getElementById("section-contact");



window.addEventListener("resize", () => {
    header = document.querySelector("header");
    navbar = document.getElementById("nav-bar");
    navHeight = navbar.offsetHeight;
    headerHeight = header.offsetHeight;
    switchPoint = +((headerHeight / 2).toFixed(0));

});
window.addEventListener("scroll", () => {
    // WHERE IS THE SWITCHING SIZES POINT?
    if(hamburger.classList.contains("clicked"))
    {
        hamburger.classList.remove("clicked");
    }
    if(navbar.classList.contains("clicked"))
    {
        navbar.classList.remove("clicked");
    }
    let abMeBox = section_aboutMe.getBoundingClientRect();
    let mWrkBox = section_myWork.getBoundingClientRect();
    let tStackBox = section_techStack.getBoundingClientRect();
    let ctBox = section_contact.getBoundingClientRect();

    // WHERE IS THE SWITCHING SIZES POINT?

    let svgTexts = document.querySelectorAll(".svg-text-cons text");
    
    let newnavData = navbar.getBoundingClientRect();

    if(newnavData.top <= switchPoint && newnavData.top > 0)
    {
        //ist das bild groß?
        if(is_big)
        {
            //wenn ja....
            is_big = false;
            img_me.classList.replace("header-img-con-big", "header-img-con-small");

            svgTexts.forEach(text => {
                text.classList.toggle("svg-texts-big");
                text.classList.toggle("svg-texts-small");
            });
        }
    }
    else if(newnavData.top > switchPoint)
    {
        if(!is_big)
        {
            //wenn nein...
            is_big = true;
            img_me.classList.replace("header-img-con-small", "header-img-con-big");

            svgTexts.forEach(text => {
                text.classList.toggle("svg-texts-small");
                text.classList.toggle("svg-texts-big");
            });
        }
    }

    

    // ------------------------------------------SIDEBAR FADE IN AND OUT----------START
    
    if(abMeBox.top <= 200)
    {
        sidebar.style.opacity = "1";
        sidebar.style.pointerEvents = "auto";
    }
    else if(abMeBox.top > 200)
    {
        sidebar.style.opacity = "0";
        sidebar.style.pointerEvents = "none";
    }
    // ------------------------------------------SIDEBAR FADE IN AND OUT----------END
    // ------------------------------------------FOCUSSING THE LINKS OF NAVBAR ONSCROLL----------START
    navLinks.forEach(link => {
        link.classList.remove("focus");
    });

    if(!screen_smaller_than_1200px)
    {
        if(abMeBox.top <= (navHeight * 1.1) && abMeBox.bottom > navHeight)
        {
            navLinks[0].classList.add("focus");
        }
        else if(mWrkBox.top <= (navHeight * 1.1) && mWrkBox.bottom > navHeight)
        {
            navLinks[1].classList.add("focus");
        }
        else if(tStackBox.top <= (navHeight * 1.1) && tStackBox.bottom > navHeight * 1.2)
        {
            navLinks[2].classList.add("focus");
        }
        else if(ctBox.top <= (navHeight * 1.1) && ctBox.bottom > navHeight)
        {
            navLinks[3].classList.add("focus");
        }
    }
    if(screen_smaller_than_1200px)
    {
        if(abMeBox.top <= 50 && abMeBox.bottom >= 100)
        {
            navLinks[0].classList.add("focus");
        }
        else if(mWrkBox.top <= 50 && mWrkBox.bottom >= 100)
        {
            navLinks[1].classList.add("focus");
        }
        else if(tStackBox.top <= 50 && tStackBox.bottom >= 100)
        {
            navLinks[2].classList.add("focus");
        }
        else if(ctBox.top <= 50 && ctBox.bottom >= 0)
        {
            navLinks[3].classList.add("focus");
        }
    }
    
    // ------------------------------------------FOCUSSING THE LINKS OF NAVBAR ONSCROLL----------END
});
//------------------------------------------HANDLING SIZE OF MY PICTURE WHEN SCROLLING--------END
//------------------------------------------3D EFFECT WHEN HOVERING WITH MOUSE--------START

const abMe_textBox_hover = function(e) {
    if(allPs && allSpans)
    {

        allPs.forEach(p => {
            let bound = p.getBoundingClientRect();
            if(e.clientY > (bound.top - 10) && e.clientY < (bound.bottom +10))
            {
                if(e.clientX > bound.left && e.clientX < bound.right)
                {
                    p.classList.add("text-box-ps-are-hovered");
                }
                else
                {
                    p.classList.remove("text-box-ps-are-hovered");
                }
            }
            else
            {
                p.classList.remove("text-box-ps-are-hovered");
            }
        });

        allSpans.forEach(p => {
            let spanBound = p.getBoundingClientRect();
            if(e.clientY > (spanBound.top - 10) && e.clientY < (spanBound.bottom +10))
            {
                if(e.clientX > spanBound.left && e.clientX < spanBound.right)
                {
                    p.classList.add("hovered-accent-color");
                }
                else
                {
                    p.classList.remove("hovered-accent-color");
                }
            }
            else
            {
                p.classList.remove("hovered-accent-color");
            }
        });
    }


    let height = e.target.offsetHeight;
    let width = e.target.offsetWidth;
    let xRotate, yRotate;

    let relativeMouseX = (e.offsetX *100) / width;
    let relativeMouseY = (e.offsetY *100) / height;


    if(relativeMouseX < 50)
    {
        yRotate = -(7 - ((14 / 100) * relativeMouseX));
    }
    else if(relativeMouseX >= 50)
    {
        yRotate = -(7 - ((14 / 100) * relativeMouseX));
    }
    if(relativeMouseY < 50)
    {
        xRotate = 7 - ((14 / 100) * relativeMouseY);
    }
    else if(relativeMouseY >= 50)
    {
        xRotate = 7 - ((14 / 100) * relativeMouseY);

    }
    e.target.style.transform = `rotateX(${xRotate}deg) rotateY(${yRotate}deg)`;
}

//array with every element that has to have a mousemove-effect:
let textBox = document.querySelector("section#section-about-me .text-box");


textBox.addEventListener("mouseenter", e => {
    e.target.style.transition = "";
});
textBox.addEventListener("mousemove", abMe_textBox_hover);
textBox.addEventListener("mouseleave", e => {
    e.target.style.transition = "transform .3s";
    e.target.style.transform = "";
    // headline.classList.remove("text-box-ps-are-hovered");
    allPs.forEach(p => {
        p.classList.remove("text-box-ps-are-hovered");
    });
});

//Hover effect for the work-example buttons:
const ex_btns_hover = function(e) {
    let height = e.target.offsetHeight;
    let width = e.target.offsetWidth;
    let xRotate, yRotate;

    let relativeMouseX = (e.offsetX *100) / width;
    let relativeMouseY = (e.offsetY *100) / height;


    if(relativeMouseX < 50)
    {
        yRotate = -(7 - ((14 / 100) * relativeMouseX));
    }
    else if(relativeMouseX >= 50)
    {
        yRotate = -(7 - ((14 / 100) * relativeMouseX));
    }
    if(relativeMouseY < 50)
    {
        xRotate = 7 - ((14 / 100) * relativeMouseY);
    }
    else if(relativeMouseY >= 50)
    {
        xRotate = 7 - ((14 / 100) * relativeMouseY);

    }
    e.target.style.transform = `rotateX(${xRotate}deg) rotateY(${yRotate}deg)`;


    let example_link = e.target.querySelector(".links-to-examples");
    let ex_bound = example_link.getBoundingClientRect();
    let git_link = e.target.querySelector(".links-to-git");
    let git_bound = git_link.getBoundingClientRect();
    let body = document.querySelector("body");

    //makes the link to the particular example hover:
    if(e.clientY > ex_bound.top && e.clientY < ex_bound.bottom && e.clientY > git_bound.top && e.clientY < git_bound.bottom)
    {
        if(e.clientX > ex_bound.left && e.clientX < ex_bound.right)
        {
            body.style.cursor = "pointer";
            example_link.style.transform = "translateZ(150px)";
            example_link.style.filter = "drop-shadow(0 0 5px black)";

            linkInfo.style.display = "block";
            linkInfo.style.top = scrollY + e.clientY + 30 + "px";
            linkInfo.style.left = scrollX + e.clientX + 50 + "px";
            if(e.target.classList.contains("vocab-trainer-button"))
            {
                linkInfo.innerText = "Open 'vocabs.kamed.in'";
            }
            else if(e.target.classList.contains("money-tracker-button"))
            {
                linkInfo.innerText = "Open 'money.kamed.in'";
            }
        }
        //makes the link to the particular git-repository hover:
        else if(e.clientX > git_bound.left && e.clientX < git_bound.right)
        {
            body.style.cursor = "pointer";
            git_link.style.transform = "translateZ(150px)";
            git_link.style.filter = "drop-shadow(0 0 5px black)";
            linkInfo.style.display = "block";
            linkInfo.style.top = scrollY + e.clientY + 30 + "px";
            linkInfo.style.left = scrollX + e.clientX + 50 + "px";
            linkInfo.innerText = "Open GitHub - Repository";
        }
        else
        {
            body.style.cursor = "auto";
            example_link.style.transform = "";
            example_link.style.filter = "";
            git_link.style.transform = "";
            git_link.style.filter = "";
            linkInfo.style.display = "none";

        }
    }
    else
    {
        body.style.cursor = "auto";
        example_link.style.transform = "";
        example_link.style.filter = "";
        git_link.style.transform = "";
        git_link.style.filter = "";
        linkInfo.style.display = "none";
    }


    

}

let des_box = document.querySelector("#section-my-work .description-box");
let des_headline = des_box.querySelector("h3");
let des_Ps = des_box.querySelectorAll("p");
let all_example_buttons = document.querySelectorAll(".example-buttons");

all_example_buttons.forEach(el => {
    el.addEventListener("mouseenter", e => {
        el.style.transition = "";
        des_headline.style.transform = "translateZ(0)";
        des_headline.style.opacity = "1";
        des_Ps.forEach(p => {
            p.style.transform = "translateZ(0)";
            p.style.opacity = "1";
        });
        if(e.target.classList.contains("vocab-trainer-button"))
        {
            des_headline.innerText = "Vocabulary - Trainer";
            des_Ps[0].innerText = "Everybody knows the feeling, when learning a new language or any other topic:";
            des_Ps[1].innerText = "As soon as you have vocabulary cards, they increase to an amount where its nasty to bring hundreds of them everywhere you go.";
            des_Ps[2].innerText = "Take all of your cards into your pocket with this digital vocabulary trainer!!";
        }
        else if(e.target.classList.contains("money-tracker-button"))
        {
            des_headline.innerText = "Money - Tracker";
            des_Ps[0].innerText = "Have an alltime overview about your finances wherever you go, whenever you want. No nasty Excell sheets!!";
            des_Ps[1].innerText = "The Moneytracker dashboard instantly shows you your budget for the end of the month,";
            des_Ps[2].innerText = "the resulting weekly and daily budget, as far as all you fixed and single-time costs!";
        }
    });
    el.addEventListener("mousemove", ex_btns_hover);
    el.addEventListener("mouseleave", () => {
        el.style.transition = "all.4s";
        el.style.transform = "";
        des_headline.style.transform = "translateZ(50px)";
        des_headline.style.opacity = "0";
        des_Ps.forEach(p => {
            p.style.transform = "translateZ(50px)";
            p.style.opacity = "0";
        });
    });
    el.addEventListener("click", e => {
        let example_link = e.target.querySelector(".links-to-examples");
        let ex_bound = example_link.getBoundingClientRect();
        let git_link = e.target.querySelector(".links-to-git");
        let git_bound = git_link.getBoundingClientRect();
        let targetElement;
        let title = document.querySelector("title");
        if(e.clientY > ex_bound.top && e.clientY < ex_bound.bottom && e.clientY > git_bound.top && e.clientY < git_bound.bottom)
        {
            if(e.clientX > ex_bound.left && e.clientX < ex_bound.right)
            {
                targetElement = e.target.querySelector(".links-to-examples");
                if(targetElement.classList.contains("link-to-vocab"))
                {
                    example_link.style.transform = "";
                    example_link.style.filter = "";
                    linkInfo.style.display = "none";
                    open("http://vocabs.kamed.in", "_blank");
                }
                else if(targetElement.classList.contains("link-to-money"))
                {
                    example_link.style.transform = "";
                    example_link.style.filter = "";
                    linkInfo.style.display = "none";
                    open("http://money.kamed.in", "_blank");
                }
            }
            else if(e.clientX > git_bound.left && e.clientX < git_bound.right)
            {
                targetElement = e.target.querySelector(".links-to-git");
                if(targetElement.classList.contains("link-to-vocab-git"))
                {
                    example_link.style.transform = "";
                    example_link.style.filter = "";
                    linkInfo.style.display = "none";
                    open("https://github.com/DevKame/vocabs", "_blank");
                }
                else if(targetElement.classList.contains("link-to-money-git"))
                {
                    example_link.style.transform = "";
                    example_link.style.filter = "";
                    linkInfo.style.display = "none";
                    open("https://github.com/DevKame/vocabs", "_blank");
                }
            }
        }

    });
});
let back_to_top = document.getElementById("back-to-top-button");
back_to_top.addEventListener("click", () => {
    window.scrollTo(0, 0);
});
navLinks.forEach(link => {
    link.addEventListener("click", e => {
        let scrollToValue;
        switch(e.target.innerText)
        {
            case "ABOUT ME":
                scrollToValue = (scrollY + section_aboutMe.getBoundingClientRect().top) - navHeight;
                if(screen_smaller_than_1200px)
                {
                    scrollToValue = scrollY + section_aboutMe.getBoundingClientRect().top;
                }
                scrollTo(0, scrollToValue);
                break;
            case "MY WORK":
                scrollToValue = (scrollY + section_myWork.getBoundingClientRect().top) - navHeight;
                if(screen_smaller_than_1200px)
                {
                    scrollToValue = scrollY + section_myWork.getBoundingClientRect().top;
                }
                scrollTo(0, scrollToValue);
                break;
            case "TECH STACK":
                scrollToValue = (scrollY + section_techStack.getBoundingClientRect().top) - navHeight;
                if(screen_smaller_than_1200px)
                {
                    scrollToValue = scrollY + section_techStack.getBoundingClientRect().top;
                }
                scrollTo(0, scrollToValue);
                break;
            case "CONTACT":
                scrollToValue = (scrollY + section_contact.getBoundingClientRect().top) - navHeight;
                if(screen_smaller_than_1200px)
                {
                    scrollToValue = scrollY + section_contact.getBoundingClientRect().top;
                }
                scrollTo(0, scrollToValue);
                break;
        }
    });
});
//------------------------------------------3D EFFECT WHEN HOVERING WITH MOUSE--------END

//EVERYTHING UNDER 1200px WIDTH:
const toggleHamburger = function(e) {
    if(e.target.classList.contains("clicked"))
    {
        e.target.classList.remove("clicked");
        navbar.classList.remove("clicked");
    }
    else
    {
        e.target.classList.add("clicked");
        navbar.classList.add("clicked");
    }
}
hamburger.addEventListener("click", toggleHamburger);