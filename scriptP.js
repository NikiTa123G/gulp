// window.location.search = "?p=1"

console.log(window.location.search)
console.log(window.location)

let pags = document.querySelectorAll('.pagination')

let pagActive = 1
let pagLast = 15
if (window.location.search != "") {
    let page = window.location.search.replace("?", "").split("=")
    console.log(page[1])
}
for (let i = 0; i < pags.length; i++) {
    let el = pags[i]
    el.addEventListener("click", e => {
        pageSet(i)
    })
}

function pageSet(page) {
    let el = pags[page]
    rA()
    el.classList.add('active')
    pagActive = +el.dataset.index
    console.log(pagActive)
    document.querySelector('.bg').classList.add('a')

    if ((pagActive >= 3) && (pagActive + 3 <= pagLast)) {
        for (let a = 2; a < pags.length - 2; a++) {
            let elm = pags[a]
            el.dataset.index = pagActive - 4 + a
            elm.innerHTML =
                `
                    <a href="#" class="linck">${pagActive - 4 + a}</a>
                `
        }
        rA()
        pags[4].classList.add('active')
        pags[1].dataset.index = pagActive - 3
        pags[1].innerHTML =
            `
            <a href="#" class="linck">...</a>
            `
        pags[7].dataset.index = pagActive + 3
        pags[7].innerHTML =
            `
            <a href="#" class="linck">...</a>
            `
        console.log(pagActive);
    }
    if (pagActive < 3) {
        pags[1].dataset.index = 2
        pags[1].innerHTML =
            `
            <a href="#" class="linck">2</a>
            `
        pags[7].dataset.index = 8
        pags[7].innerHTML =
            `
            <a href="#" class="linck">...</a>
            `
    }
    window.location.search = "?p=" + +el.dataset.index
}

let rA = () => {
    let a = document.querySelector('.pagination.active')
    a.classList.remove('active')
}

let lincks = document.querySelectorAll('.linck')

for (let i = 0; i < lincks.length; i++) {
    let el = lincks[i]
    el.addEventListener("click", e => {
        e.preventDefault()
    })
}