document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById("botao");
    var navHeader = document.querySelector("#nav-header ul");

    btn.addEventListener('click', function (evento) {
        evento.preventDefault();

        navHeader.classList.toggle('ativo');
        btn.classList.toggle('ativo')
    });

    var car = document.querySelector('.carrossel');
    var carro = document.querySelector('.carrossel-content');
    var slides = document.querySelectorAll('.slide');
    var arrayOFSlides = Array.prototype.slice.call(slides);
    var carrDisplaying;
    var screenSize;

    setScreenSize();
    var lenghtOFSlides;

    function addClone() {
        var lastSlide = carro.lastElementChild.cloneNode(true);
        lastSlide.style.left = (-lenghtOFSlides) + 'px';
        carro.insertBefore(lastSlide, carro.firstChild);

    }
    function removeClone() {
        var firstSlide = carro.firstChild;
        firstSlide.parentNode.removeChild(firstSlide);
    }
    function moveSlideRight() {
        var slides = document.querySelector('.slide');
        var slideArray = Array; prototype.slice.call(slides);
        var width = 0

        slideArray.forEach(function (elemento, i) {
            elemento.style.left = width + 'px'
            width += lenghtOFSlides
        });
        addClone();

    }
    moveSlideRight();

    function moveSlideLeft() {
        var slides = document.querySelector('.slide');
        var slideArray = Array; prototype.slice.call(slides);
        slideArray = slideArray.reverse();
        var maxWidth = (slideArray.length - 1) * lenghtOFSlides;

        slideArray.forEach(function (elemento, i) {
            maxWidth -= lenghtOFSlides;
            elemento.style.left = maxWidth + 'px';
        })

    }

    window.addEventListener('resize', setScreenSize);

    function setScreenSize() {
        if (window.innerWidth >= 500) {
            carrDisplaying = 3
        } else if (window.innerWidth >= 300) {
            carrDisplaying = 2
        } else {
            carrDisplaying = 1
        }
        getScreenSize();

    }

    function getScreenSize() {
        var slides = document.querySelectorAll('.slide')
        var slideArray = Array.prototype.slice.call(slides);
        lenghtOFSlides = (car.offsetWidth / carrDisplaying);
        var initialWidth = -lenghtOFSlides

        slideArray.forEach(function (elemento) {
            elemento.style.width = lenghtOFSlides + 'px'
            elemento.style.left = lenghtOFSlides + 'px'
            initialWidth += lenghtOFSlides;

        })

        
    }
    function getscreensize (){
        var slides = document.querySelectorAll('.slide');
        var slideArray =  Array.prototype.slice.call(slides);
        lengthOfSlides = (carrosel.offsetwidth / carroseldisplay);
        var initialwidth = -lengthOfSlides;

        slideArray.forEach(function(){
            elemento.style.width = lengthOfSlides + 'px';
            elemento.style.width = initialwidth + 'px';
            initialwidth += lengthOfSlides;
        });
    }

    var rigthNav = document.querySelector('.nav-rigth');
    rigthNav.addEventListener('click', moveleft);

    var moving = true;

    function moverigth(){
        if (moving){
            moving = false;
            var lastSlide = carroselcont.lastElementChild;
            lastSlide.parentNode.removeChild(lastSlide);
            carroselcont.insertBefore(lastSlide, carroselcont.firstChild);
            removeClone();
            var firstChild =  carroselcont.firstElementChild;
            firstSlide.addEventListener('transitioned', activateAgain);
            moveSlideRigth();
        }
    }

    function activateAgain(){
        var firstChild = carroselcont.firstElementChild;
        moving = true;
        firstSlide.removeEventListener('transitioned', activateAgain);
    }

    var leftnav = document.querySelector('.nav-left');
    leftnav.addEventListener('click', moverigth);

    function moveleft(){
        if(moving){
            moving = false;
            removeClone();
            var firstChild = carroselcont.firstElementChild;
            firstSlide.addEventListener('transitioned', replaceToEnd);
            moveSlideLeft();
        }
    }

    function replaceToEnd(){
        var firstSlide = carroselcont.firstElementChild;
        firstSlide.parentNode.removeChild(firstSlide);
        carroselcont.appendChild(firstSlide);
        firstSlide.style.left = ((arrayOfSlides.length -1) * lengthOfSlides) + 'px';
        addClone();
        moving = true;
        firstSlide.removeEventListener('transitioned', replaceToEnd);
    }

    carroselcont.addEventListener('mousedown', seeMovement);
   
    var initialX;
    var initialPos;

    function seeMovement(elemento){
        initialX = elemento.clientX
        getInitialPos();
        carroselcont.addEventListener('mousemove', slightMove);
        document.addEventListener('mouseup', moveBasedOnMouse);
    }

    function slightMove (elemento){
        if(moving){
            var movingx = elemento.clientX;
            var difference = initalX - movingx;
            if(Math.abs(difference) < (lengthOfSlides / 4)){
                slightMoveSlides(difference);
            }
        }
    }

    function getInitialPos (){
        var slides = document.querySelectorAll('.slides');
        var slideArray =  Array.prototype.slice.call(slides);

        initialPos = [];
        slideArray.forEach(function(elemento){
            var left = Math.floor(parseInt(elemento.style.slice(0, -2)));
        });
    }

    function slightMoveSlides(newX){
        var slides = document.querySelectorAll('.slides');
        var slideArray =  Array.prototype.slice.call(slides);

        slideArray.forEach(function(elemento, i){
            var oldleft = initialPos[i];
            elemento.style.left = (oldleft + newX) + 'px';
        });
    }

    function moveBasedOnMouse(elemento){
        var finalX = elemento.clientX;
        if(initalX - finalX > 0){
            moverigth();
        }
        else if (initialX - finalX < 0){
            moveleft();
        }

        document.removeEventListener('mouseup', moveBasedOnMouse);
        carroselcont.removeEventListener('mousemove', slightMove);
    }
});