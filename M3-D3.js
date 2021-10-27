// import { createClient } from 'pexels';

// const client = createClient('563492ad6f91700001000001b08d0a9f36b644ac96dfbe0c21553d4e');

// // All requests made with the client will be authenticated

window.onload = () => {

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
                const cardImages = document.querySelectorAll('.card svg')
                cardImages.forEach(element => element.remove())
                const cardImagesContainer = document.querySelectorAll('.card')
                const minsContainers = document.querySelectorAll('small.text-muted')
                for (let i = 0; i < body.photos.length; i++) {
                    const newCardImage = document.createElement('img')
                    newCardImage.src = body.photos[i].src.original
                    newCardImage.classList.add('w-100')
                    newCardImage.classList.add('img-height')
                    cardImagesContainer[i].prepend(newCardImage)
                    minsContainers[i].innerText = body.photos[i].id
                }
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
                for (let i = 0; i < body.photos.length; i++) {
                    const newCardImage = document.createElement('img')
                    newCardImage.src = body.photos[i].src.original
                    newCardImage.classList.add('w-100')
                    newCardImage.classList.add('img-height')
                    cards[i].prepend(newCardImage)
                    minsContainers[i].innerText = body.photos[i].id
                }
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
                for (let i = 0; i < body.photos.length; i++) {
                    const newCardImage = document.createElement('img')
                    newCardImage.src = body.photos[i].src.original
                    newCardImage.classList.add('w-100')
                    newCardImage.classList.add('img-height')
                    cards[i].prepend(newCardImage)
                    minsContainers[i].innerText = body.photos[i].id
                }
            })
    }







    const hideCard = (event) => {
        console.log(event)
        event.target.parentNode.parentNode.parentNode.parentNode.classList.add('d-none')
    }

    const loadImgBtn = document.querySelector('.btn-primary')
    loadImgBtn.addEventListener('click', loadImages)


    const loadSecImgBtn = document.querySelector('.btn-secondary')
    loadSecImgBtn.addEventListener('click', loadSecondaryImages)

    const searchImagesBtn = document.querySelector('form button')
    searchImagesBtn.addEventListener('click', searchImages)

    const hideCardBtn = () => {
        const btnGroupArr = document.querySelectorAll('.btn-group')
        btnGroupArr.forEach(element => element.lastElementChild.innerText = 'Hide')
        btnGroupArr.forEach(element => element.lastElementChild.addEventListener('click', hideCard))
    }
    hideCardBtn()

}