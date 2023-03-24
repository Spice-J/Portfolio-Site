const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.controlls');
const sectBtn = document.querySelectorAll('.control');
const allSections = document.querySelector('.main-content');

function PageTransitions() {
    //button click active class
    for (let i = 0; i< sectBtn.length; i++){
        sectBtn[i].addEventListener('click', function(){
            let currentBtn = document.querySelectorAll('.active-btn');
            currentBtn[0].className = currentBtn[0].className.replace('active-btn', '')
            this.className += ' active-btn';
        })
    }

    //sections active class
    allSections.addEventListener('click', (e) =>{
        const id = e.target.dataset.id;
        if(id){
            //remove selected from the other buttons
            sectBtns.forEach((btn) =>{
                btn.classList.remove('active')
            })
            e.target.classList.add('active')

            //hide other sections
            sections.forEach((section)=>{
                section.classList.remove('active')
            })

            const element = document.getElementById(id);
            element.classList.add('active');
        }
    })

    //toggle theme
    const themeBtn = document.querySelector('.theme-btn');
    themeBtn.addEventListener('click', () =>{
        let element = document.body;
        element.classList.toggle('light-mode')
    })

    //porfolio icon link descriptions
    //show source code description
    let sourceCode = document.querySelectorAll('.active-icon');

    const activeIcon = document.querySelectorAll('.code-icon')

    for (let i = 0; i < activeIcon.length; i++) {
        for (let j = 0; j < sourceCode.length; j++) {
        activeIcon[i].addEventListener("mouseenter", function() {
          sourceCode[j].innerHTML = "source code";
        })};
    }

    //hide source code desctription
    const removeDesc = document.querySelectorAll('.code-icon')

    for (let i = 0; i < removeDesc.length; i++) {
        for (let j = 0; j < sourceCode.length; j++) {
        removeDesc[i].addEventListener("mouseleave", function() {
          sourceCode[j].innerHTML = "";
        })};
    }

    //show live website descrtiption
    const activeIcon2 = document.querySelectorAll('.code-icon2')

    for (let i = 0; i < activeIcon2.length; i++) {
        for (let j = 0; j < sourceCode.length; j++) {
        activeIcon2[i].addEventListener("mouseenter", function() {
          sourceCode[j].innerHTML = "live website";
        })};
    }

    //hide live website description
    const removeDesc2 = document.querySelectorAll('.code-icon2')

    for (let i = 0; i < removeDesc2.length; i++) {
        for (let j = 0; j < sourceCode.length; j++) {
        removeDesc2[i].addEventListener("mouseleave", function() {
          sourceCode[j].innerHTML = "";
        })};
    }
}

PageTransitions();