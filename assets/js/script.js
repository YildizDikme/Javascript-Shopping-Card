const dots = document.querySelectorAll('.dot');
        const images = document.querySelectorAll('.image');


        const slides = document.querySelectorAll('.slide');
        const slider = document.querySelectorAll('.slider');
        const arrows = document.querySelectorAll('[data-action="arrow"]');
        let currentSlideIndex = 0;

        function hasClass(elem, className) {
            return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
        }

        function removeAllClass(elements,className){
            elements.forEach((el) => {
                if (hasClass(el, className)) {
                    el.classList.remove(className);
                }
            });


        }
        function removeClass(el,className){
            if (hasClass(el, className)) {
                el.classList.remove(className);
            }
        }
        function addClass(el,className){
            el.classList.add(className);

        }
        function nextSiblingClass(node, cls) {
            while (node = node.nextSibling) {
                if (hasClass(node, cls)) {
                    return node;
                }
            }
            return null;
        }

        function prevSiblingClass(node, cls) {
            while (node = node.previousSibling) {
                if (hasClass(node, cls)) {
                    return node;
                }
            }
            return null;
        }

        function showSlide(index){

            const dotElement = document.querySelector(`.dot[data-byte-slider][data-index='${index}']`);
            const sliderElement = document.querySelector(`.slide[data-byte-slider][data-index='${index}']`);

            // Dot Class Update
            removeAllClass(dots,'active');
            addClass(dotElement,'active');

            // Slide Change
            removeAllClass(slides,'active');

            addClass(sliderElement,'active')


            // Active Slide Index Update
            document.querySelector('.slider-counter').textContent = index;

        }


        // Slide Dot Click Function
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const slideIndex = dot.getAttribute("data-index");
                showSlide(slideIndex);

            });
        });

        arrows.forEach(arrow => {
            arrow.addEventListener('click', () => {
                const currentSlide = document.querySelector(`.slide.active[data-byte-slider]`);
                const slideIndex = currentSlide.getAttribute("data-index");
                const actionType = arrow.getAttribute("data-action-type");
                var nextIndex = nextSiblingClass(currentSlide,"slide");
                var prevIndex = prevSiblingClass(currentSlide,"slide");

                var targetIndex = nextIndex;
                switch(actionType){
                    case 'next':
                        if(!nextIndex){
                            targetIndex = 1;
                        }else{
                            targetIndex = nextIndex.getAttribute("data-index");
                        }
                    break;
                    case 'prev':
                        if(!prevIndex) {
                            targetIndex = slides.length;
                        }else{
                            targetIndex = prevIndex.getAttribute("data-index");
                        }
                    break;
                }
                showSlide(targetIndex);
            });
        });

