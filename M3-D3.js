// import { createClient } from 'pexels';

// const client = createClient('563492ad6f91700001000001b08d0a9f36b644ac96dfbe0c21553d4e');

// // All requests made with the client will be authenticated

window.onload = () => {

    const showAlert = (numOfImgs) => {
        const mainContainer = document.querySelector('main')
        const bootstrapAlertContainer = document.createElement('div')
        bootstrapAlertContainer.classList.add('alert')
        bootstrapAlertContainer.classList.add('alert-success')
        bootstrapAlertContainer.classList.add('text-center')
        bootstrapAlertContainer.setAttribute('role', 'alert')
        bootstrapAlertContainer.innerText = `${ numOfImgs } images loaded!`
        mainContainer.prepend(bootstrapAlertContainer)
        setTimeout(function () {
            bootstrapAlertContainer.remove()
        }, 5000)
    }

    const showErrorAlert = (errorMessage) => {
        const mainContainer = document.querySelector('main')
        const bootstrapAlertContainer = document.createElement('div')
        bootstrapAlertContainer.classList.add('alert')
        bootstrapAlertContainer.classList.add('alert-danger')
        bootstrapAlertContainer.classList.add('text-center')
        bootstrapAlertContainer.setAttribute('role', 'alert')
        bootstrapAlertContainer.innerText = `Something went wrong. Namely, this: ${ errorMessage }.`
        mainContainer.prepend(bootstrapAlertContainer)
    }

    const loadImages = () => {
        fetch("https://api.pexels.com/v1/search?query=forest", {
            method: "GET",
            headers:
                { Authorization: "563492ad6f91700001000001b08d0a9f36b644ac96dfbe0c21553d4e" }

        })
            .then((response) => {
                console.log(response)
                return response.json()
            })
            .then((body) => {
                console.log(body)
                const cards = document.querySelectorAll('.card:first-child')
                cards.forEach(element => element.firstElementChild.remove())
                const cardImagesContainer = document.querySelectorAll('.card')
                const minsContainers = document.querySelectorAll('small.text-muted')
                for (let i = 0; i < cardImagesContainer.length; i++) {
                    const newCardImage = document.createElement('img')
                    newCardImage.src = body.photos[i].src.original
                    newCardImage.classList.add('w-100')
                    newCardImage.classList.add('img-height')
                    cardImagesContainer[i].prepend(newCardImage)
                    minsContainers[i].innerText = body.photos[i].id
                    const modalFade = document.createElement('div')
                    modalFade.id = 'imageModal'
                    modalFade.classList.add('modal')
                    modalFade.classList.add('fade')
                    modalFade.setAttribute('tabindex', '-1')
                    modalFade.setAttribute('aria-labelledby', 'imageModalLabel')
                    modalFade.setAttribute('aria-hidden', 'true')
                    cardImagesContainer[i].appendChild(modalFade)
                    const modalDialogue = document.createElement('div')
                    modalDialogue.classList.add('modal-dialogue')
                    modalFade.appendChild(modalDialogue)
                    const modalContent = document.createElement('div')
                    modalContent.classList.add('modal-content')
                    modalDialogue.appendChild(modalContent)
                    const modalHeader = document.createElement('div')
                    modalHeader.classList.add('modal-header')
                    modalContent.appendChild(modalHeader)
                    const modalTitle = document.createElement('h5')
                    modalTitle.classList.add('modal-title')
                    modalTitle.id = 'imageModalLabel'
                    modalTitle.innerText = 'image'
                    modalHeader.appendChild(modalTitle)
                    const modalCloseBtn = document.createElement('button')
                    modalCloseBtn.type = 'button'
                    modalCloseBtn.classList.add('close')
                    modalCloseBtn.setAttribute('data-dismiss', 'modal')
                    modalCloseBtn.setAttribute('aria-label', 'Close')
                    modalHeader.appendChild(modalCloseBtn)
                    const spanInsideModalBtn = document.createElement('span')
                    spanInsideModalBtn.setAttribute('aria-hidden', 'true')
                    spanInsideModalBtn.innerHTML = '&times;'
                    modalCloseBtn.appendChild(spanInsideModalBtn)
                    const modalBody = document.createElement('div')
                    modalBody.classList.add('modal-body')
                    modalContent.appendChild(modalBody)
                    const biggerImgForModal = document.createElement('img')
                    biggerImgForModal.classList.add('img-fluid')
                    biggerImgForModal.src = body.photos[i].src.large
                    modalBody.appendChild(biggerImgForModal)
                }
                showAlert(cardImagesContainer.length)
            })
            .catch((error) => {
                showErrorAlert(error)
            })
    }

    const loadSecondaryImages = () => {
        fetch('https://api.pexels.com/v1/search?query=rabbits', {
            method: "GET",
            headers:
                { Authorization: "563492ad6f91700001000001b08d0a9f36b644ac96dfbe0c21553d4e" }
        })
            .then((response) => {
                return response.json()
            })
            .then((body) => {
                console.log(body)
                const cards = document.querySelectorAll('.card:first-child')
                cards.forEach(element => element.firstElementChild.remove())
                const minsContainers = document.querySelectorAll('small.text-muted')
                for (let i = 0; i < cards.length; i++) {
                    const newCardImage = document.createElement('img')
                    newCardImage.src = body.photos[i].src.original
                    newCardImage.classList.add('w-100')
                    newCardImage.classList.add('img-height')
                    cards[i].prepend(newCardImage)
                    minsContainers[i].innerText = body.photos[i].id
                }
                showAlert(cards.length)
            })
            .catch((error) => {
                showErrorAlert(error)
            })
    }




    const searchImages = () => {
        const searchInputValue = document.querySelector('form input').value
        fetch(`https://api.pexels.com/v1/search?query=${ searchInputValue }`, {
            method: "GET",
            headers:
                { Authorization: "563492ad6f91700001000001b08d0a9f36b644ac96dfbe0c21553d4e" }

        })
            .then((response) => {
                return response.json()
            })
            .then((body) => {
                console.log(body)
                const cards = document.querySelectorAll('.card:first-child')
                cards.forEach(element => element.firstElementChild.remove())
                const minsContainers = document.querySelectorAll('small.text-muted')
                for (let i = 0; i < cards.length; i++) {
                    const newCardImage = document.createElement('img')
                    newCardImage.src = body.photos[i].src.original
                    newCardImage.classList.add('w-100')
                    newCardImage.classList.add('img-height')
                    cards[i].prepend(newCardImage)
                    minsContainers[i].innerText = body.photos[i].id
                }
                showAlert(cards.length)
            })
            .catch((error) => {
                showErrorAlert(error)
            })
    }


    const addCarousel = () => {
        fetch('https://api.pexels.com/v1/search?query=lakes', {
            method: "GET",
            headers:
                { Authorization: "563492ad6f91700001000001b08d0a9f36b644ac96dfbe0c21553d4e" }
        })
            .then((response) => {
                return response.json()
            })
            .then((body) => {
                const carouselInner = document.querySelector('.carousel-inner')
                const firstImage = document.querySelector('.carousel-item.active img')
                firstImage.src = body.photos[0].src.original
                for (let i = 1; i < body.photos.length; i++) {
                    const newCarouselItem = document.createElement('div')
                    newCarouselItem.classList.add('carousel-item')
                    const newImg = document.createElement('img')
                    newImg.classList.add('d-block')
                    newImg.classList.add('w-100')
                    newImg.src = body.photos[i].src.original
                    newCarouselItem.appendChild(newImg)
                    carouselInner.appendChild(newCarouselItem)
                }

            })

    }
    addCarousel()

    // < div class="carousel-item active" >
    //     <img src="..." class="d-block w-100" alt="...">
    //   </div>
    //   <div class="carousel-item">
    //     <img src="..." class="d-block w-100" alt="...">
    //   </div>
    //   <div class="carousel-item">
    //     <img src="..." class="d-block w-100" alt="...">
    //   </div>


    const hideCard = (event) => {
        console.log(event)
        const greatGreatGrandParent = event.target.parentNode.parentNode.parentNode.parentNode
        greatGreatGrandParent.classList.add('d-none')
        const bringBackButton = document.createElement('button')
        bringBackButton.classList.add('btn')
        bringBackButton.classList.add('btn-primary')
        bringBackButton.innerText = 'Bring It Back!'
        bringBackButton.addEventListener('click', function () {
            bringBackButton.classList.add('d-none')
            greatGreatGrandParent.classList.remove('d-none')
        })
        greatGreatGrandParent.insertAdjacentElement('beforebegin', bringBackButton)
    }



    const loadImgBtn = document.querySelector('.btn-primary')
    loadImgBtn.addEventListener('click', loadImages)


    const loadSecImgBtn = document.querySelector('.btn-secondary')
    loadSecImgBtn.addEventListener('click', loadSecondaryImages)

    const searchImagesBtn = document.querySelector('form button')
    searchImagesBtn.addEventListener('click', searchImages)

    const addHideCardBtn = () => {
        const btnGroupArr = document.querySelectorAll('.btn-group')
        btnGroupArr.forEach(element => element.lastElementChild.innerText = 'Hide')
        btnGroupArr.forEach(element => element.lastElementChild.addEventListener('click', hideCard))
    }
    addHideCardBtn()

    const addViewBtn = () => {
        const btnGroupArr = document.querySelectorAll('.btn-group')
        btnGroupArr.forEach(element => element.firstElementChild.setAttribute('data-toggle', 'modal'))
        btnGroupArr.forEach(element => element.firstElementChild.setAttribute('data-target', '#imageModal'))
    }
    addViewBtn()

}