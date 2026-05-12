// Hamburger Menu
const hamburger = document.getElementById("hamburger")
const navLinks = document.getElementById("navLinks")
const pageScroller = document.getElementById("pageScroller")
const isDesktopScroll = () => window.matchMedia("(min-width: 769px)").matches

if (pageScroller) {
    pageScroller.addEventListener("wheel", (e) => {
        if (!isDesktopScroll()) {
            return
        }

        if (e.target.closest(".carousel-scene")) {
            return
        }

        const horizontalArea = e.target.closest(".proyectos-grid, .servicios-grid, .empresas-grid")

        if (horizontalArea && horizontalArea.scrollWidth > horizontalArea.clientWidth) {
            e.preventDefault()
            horizontalArea.scrollBy({
                left: e.deltaY,
                behavior: "smooth",
            })
            return
        }

        if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) {
            return
        }

        e.preventDefault()
        pageScroller.scrollBy({
            left: e.deltaY,
            behavior: "smooth",
        })
    }, { passive: false })
}

const carouselScene = document.querySelector(".carousel-scene")
const carouselRing = document.querySelector(".carousel-ring")
let carouselAngle = 0
let carouselVelocity = -0.08
let isCarouselDragging = false
let lastPointerX = 0
let lastPointerTime = 0
let carouselAnimationFrame = null

const renderCarousel = () => {
    if (!carouselRing) {
        return
    }

    carouselRing.style.transform = `rotateX(-8deg) rotateY(${carouselAngle}deg)`
}

const animateCarousel = () => {
    if (!isCarouselDragging) {
        carouselAngle += carouselVelocity
        carouselVelocity *= 0.985

        if (Math.abs(carouselVelocity) < 0.08) {
            carouselVelocity = carouselVelocity < 0 ? -0.08 : 0.08
        }

        renderCarousel()
    }

    carouselAnimationFrame = requestAnimationFrame(animateCarousel)
}

if (carouselScene && carouselRing) {
    carouselRing.style.animation = "none"
    renderCarousel()
    animateCarousel()

    carouselScene.addEventListener("pointerdown", (e) => {
        isCarouselDragging = true
        lastPointerX = e.clientX
        lastPointerTime = performance.now()
        carouselVelocity = 0
        carouselScene.classList.add("dragging")
        carouselScene.setPointerCapture(e.pointerId)
    })

    carouselScene.addEventListener("pointermove", (e) => {
        if (!isCarouselDragging) {
            return
        }

        const now = performance.now()
        const deltaX = e.clientX - lastPointerX
        const deltaTime = Math.max(now - lastPointerTime, 16)

        carouselAngle += deltaX * 0.45
        carouselVelocity = (deltaX / deltaTime) * 18
        lastPointerX = e.clientX
        lastPointerTime = now
        renderCarousel()
    })

    const stopCarouselDrag = (e) => {
        if (!isCarouselDragging) {
            return
        }

        isCarouselDragging = false
        carouselScene.classList.remove("dragging")

        if (e.pointerId !== undefined && carouselScene.hasPointerCapture(e.pointerId)) {
            carouselScene.releasePointerCapture(e.pointerId)
        }
    }

    carouselScene.addEventListener("pointerup", stopCarouselDrag)
    carouselScene.addEventListener("pointercancel", stopCarouselDrag)
    carouselScene.addEventListener("wheel", (e) => {
        e.preventDefault()
        e.stopPropagation()
        carouselVelocity += e.deltaY * -0.015
        carouselAngle += e.deltaY * -0.08
        renderCarousel()
    }, { passive: false })
}

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active")
})

// Cerrar menú cuando se hace click en un link
document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active")
    })
})

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href")

        if (targetId === "#") {
            return
        }

        const target = document.querySelector(targetId)

        if (!target) {
            return
        }

        e.preventDefault()

        if (isDesktopScroll() && pageScroller) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start",
            })
            return
        }

        target.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    })
})

// Cerrar menú cuando se hace click fuera
document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar")) {
        navLinks.classList.remove("active")
    }
})

// WhatsApp Button - Reemplaza 'YOUR_PHONE_NUMBER' con tu número
// Ejemplo: +34123456789 (incluye el código del país)
const whatsappPhone = "573007515484"
const whatsappBtn = document.querySelector(".whatsapp-btn")
whatsappBtn.href = `https://wa.me/${whatsappPhone}?text=Estoy%20interesado%20en%20sus%20servicios`
