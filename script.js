document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Curtain Navigation Logic ---
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const toggleIcon = menuToggle.querySelector("i");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        if (navLinks.classList.contains("active")) {
            toggleIcon.classList.replace("fa-bars", "fa-xmark");
            document.body.style.overflow = "hidden";
        } else {
            toggleIcon.classList.replace("fa-xmark", "fa-bars");
            document.body.style.overflow = "";
        }
    });

    document.querySelectorAll("#nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            toggleIcon.classList.replace("fa-xmark", "fa-bars");
            document.body.style.overflow = "";
        });
    });

    // --- 2. Accurate Navigation Scroller Offset ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 90;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
                
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // --- 3. Instant Menu Integration Engine ---
    let cartCount = 0;
    const cartCountBadge = document.getElementById("cart-count");
    const orderFoodInput = document.getElementById("orderFood");
    const orderButtons = document.querySelectorAll(".order-now-btn");
    
    orderButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const cardElement = e.target.closest(".menu-card");
            const foodName = cardElement.querySelector(".menu-inf h2").innerText;

            cartCount++;
            cartCountBadge.innerText = cartCount;
            orderFoodInput.value = foodName;

            // Direct smooth snap to Reservation Block
            const targetElement = document.getElementById("Order");
            const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 90;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
            
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        });
    });

    // --- 4. Luxury Submissions Dispatches ---
    const orderForm = document.getElementById("orderForm");
    orderForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("orderName").value;
        const food = document.getElementById("orderFood").value;
        const qty = document.getElementById("orderQuantity").value;

        alert(`Reservation Confirmed!\nThank you ${name}, your private table booking with (${qty}x) ${food} has been securely reserved.`);
        orderForm.reset();
    });

    // --- 5. Heart Wishlist Micro-toggle ---
    const wishlistBtns = document.querySelectorAll(".small-card-btn");
    wishlistBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const heartIcon = btn.querySelector("i");
            heartIcon.classList.toggle("fa-solid");
            heartIcon.classList.toggle("fa-regular");
            heartIcon.style.color = heartIcon.classList.contains("fa-solid") ? "#C5A880" : "";
        });
    });
});