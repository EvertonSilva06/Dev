document.addEventListener('DOMContentLoaded', function() {

    var valorUsuario;

    var btnHamburguer = document.getElementById("btn-hamburguer");
    var navHeader = document.querySelector("#nav-header ul");

    // Adiciona evento de clique no botão hamburguer para alternar o menu
    btnHamburguer.addEventListener('click', function(evento) {
        evento.preventDefault();

        navHeader.classList.toggle('ativo');
        btnHamburguer.classList.toggle('ativo');
    });

    var carrossel = document.querySelector('.carrossel');
    var carrosselContent = document.querySelector('.carrossel-content');
    var slides = document.querySelectorAll('.slide');
    var arrayOfSlides = Array.prototype.slice.call(slides); // Transformando NodeList em array
    var carrosselDisplaying;
    var screenSize;
    
    setScreenSize(); // Inicializa o tamanho da tela
    var lengthOfSlide;

    // Função para adicionar um clone do último slide no início
    function addClone() {
        var lastSlide = carrosselContent.lastElementChild.cloneNode(true);
        lastSlide.style.left = (-lengthOfSlide) + 'px';
        carrosselContent.insertBefore(lastSlide, carrosselContent.firstChild);
    }

    // Função para remover o primeiro slide (clone)
    function removeClone() {
        var firstSlide = carrosselContent.firstChild;
        firstSlide.parentNode.removeChild(firstSlide);
    }

    // Movimenta os slides para a direita
    function moveSlideRight() {
        var slides = document.querySelectorAll('.slide');
        var slideArray = Array.prototype.slice.call(slides);
        var width = 0;

        slideArray.forEach(function(elemento) {
            elemento.style.left = width + 'px';
            width += lengthOfSlide;
        });
        addClone();
    }
    moveSlideRight(); // Move os slides ao carregar a página

    // Movimenta os slides para a esquerda
    function moveSlideLeft() {
        var slides = document.querySelectorAll('.slide');
        var slideArray = Array.prototype.slice.call(slides);
        slideArray = slideArray.reverse();
        var maxWidth = (slideArray.length - 1) * lengthOfSlide;

        slideArray.forEach(function(elemento) {
            maxWidth -= lengthOfSlide;
            elemento.style.left = maxWidth + 'px';
        });
    }

    // Atualiza o layout conforme o tamanho da tela
    window.addEventListener('resize', setScreenSize);

    // Define quantos slides serão exibidos de acordo com o tamanho da tela
    function setScreenSize() {
        if (window.innerWidth >= 500) {
            carrosselDisplaying = 3;
        } else if (window.innerWidth >= 300) {
            carrosselDisplaying = 2;
        } else {
            carrosselDisplaying = 1;
        }
        getScreenSize();
    }

    // Ajusta o tamanho e posição de cada slide
    function getScreenSize() {
        var slides = document.querySelectorAll('.slide');
        var slideArray = Array.prototype.slice.call(slides);
        lengthOfSlide = (carrossel.offsetWidth / carrosselDisplaying);
        var initialWidth = -lengthOfSlide;

        slideArray.forEach(function(elemento) {
            elemento.style.width = lengthOfSlide + 'px';
            elemento.style.left = initialWidth + 'px';
            initialWidth += lengthOfSlide;
        });
    }

    var rightNav = document.querySelector('.nav-right');
    rightNav.addEventListener('click', moveLeft);

    var moving = true;

    // Move os slides para a direita
    function moveRight() {
        if (moving) {
            moving = false;
            var lastSlide = carrosselContent.lastElementChild;
            lastSlide.parentNode.removeChild(lastSlide);
            carrosselContent.insertBefore(lastSlide, carrosselContent.firstChild);
            removeClone();
            var firstSlide = carrosselContent.firstElementChild;
            firstSlide.addEventListener('transitionend', activateAgain);
            moveSlideRight();
        }
    }

    // Reativa a movimentação após a transição
    function activateAgain() {
        var firstSlide = carrosselContent.firstElementChild;
        moving = true;
        firstSlide.removeEventListener('transitione nd', activateAgain);
    }

    var leftNav = document.querySelector('.nav-left');
    leftNav.addEventListener('click', moveRight);

    // Move os slides para a esquerda
    function moveLeft() {
        if (moving) {
            moving = false;
            removeClone();
            var firstSlide = carrosselContent.firstElementChild;
            firstSlide.addEventListener('transitionend', replaceToEnd);
            moveSlideLeft();
        }
    }

    // Move o primeiro slide para o fim e adiciona o clone
    function replaceToEnd() {
        var firstSlide = carrosselContent.firstElementChild;
        firstSlide.parentNode.removeChild(firstSlide);
        carrosselContent.appendChild(firstSlide);
        firstSlide.style.left = ((arrayOfSlides.length - 1) * lengthOfSlide) + 'px';
        addClone();
        moving = true;
        firstSlide.removeEventListener('transitionend', replaceToEnd);
    }

    // Detecta o movimento do mouse
    carrosselContent.addEventListener('mousedown', seeMovement);

    var initialX;
    var initialPos;

    function seeMovement(evento) {
        initialX = evento.clientX;
        getInitialPos();
        carrosselContent.addEventListener('mousemove', slightMove);
        document.addEventListener('mouseup', moveBasedOnMouse);
    }

    function slightMove(evento) {
        if (moving) {
            var movingX = evento.clientX;
            var difference = initialX - movingX;
            if (Math.abs(difference) < (lengthOfSlide / 4)) {
                slightMoveSlides(difference);
            }
        }
    }

    // Captura a posição inicial dos slides
    function getInitialPos() {
        var slides = document.querySelectorAll('.slide');
        var slidesArray = Array.prototype.slice.call(slides);
        initialPos = [];

        slidesArray.forEach(function(elemento) {
            var left = Math.floor(parseInt(elemento.style.left.slice(0, -2), 10));
            initialPos.push(left);
        });
    }

    // Move os slides conforme a posição do mouse
    function slightMoveSlides(newX) {
        var slides = document.querySelectorAll('.slide');
        var slidesArray = Array.prototype.slice.call(slides);

        slidesArray.forEach(function(elemento, i) {
            var oldLeft = initialPos[i];
            elemento.style.left = (oldLeft + newX) + 'px';
        });
    }

    // Move os slides com base no movimento do mouse
    function moveBasedOnMouse(evento) {
        var finalX = evento.clientX;
        if (initialX - finalX > 0) {
            moveRight();
        } else if (initialX - finalX < 0) {
            moveLeft();
        }

        document.removeEventListener('mouseup', moveBasedOnMouse);
        carrosselContent.removeEventListener('mousemove', slightMove);
    }

});