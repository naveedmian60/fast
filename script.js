document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Mobile Menu Toggle Logic ---
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const toggleIcon = menuToggle.querySelector("i");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        if (navLinks.classList.contains("active")) {
            toggleIcon.classList.replace("fa-bars", "fa-xmark");
            document.body.style.overflow = "hidden"; // Prevent scroll when menu is open
        } else {
            toggleIcon.classList.replace("fa-xmark", "fa-bars");
            document.body.style.overflow = "";
        }
    });

    // --- 2. Smooth Scrolling with Offset & Manual Click Active ---
    const allLinks = document.querySelectorAll("#nav-links a, .btn-primary, .btn-secondary, .order-now-btn");
    
    allLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#' || !targetId.startsWith('#')) return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Mobile menu close on click
                navLinks.classList.remove("active");
                if (toggleIcon) toggleIcon.classList.replace("fa-xmark", "fa-bars");
                document.body.style.overflow = "";

                // Premium layout height offset check
                const navHeight = 90; 
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update active line instantly on click
                const navMenuLinks = document.querySelectorAll("#nav-links a");
                navMenuLinks.forEach(link => link.classList.remove("active"));
                const dynamicActiveLink = document.querySelector(`#nav-links a[href="${targetId}"]`);
                if (dynamicActiveLink) {
                    dynamicActiveLink.classList.add("active");
                }
            }
        });
    });

    // --- 3. Dynamic Active Line Mover (Intersection Observer API) ---
    // Jab user manually mouse se scroll karega tab bhi line automatic shift hogi!
    const sections = document.querySelectorAll("section, header, footer");
    const navMenuLinks = document.querySelectorAll("#nav-links a");

    const observerOptions = {
        root: null,
        rootMargin: "-90px 0px -60% 0px", // Active standard line focus threshold
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                if (!id) return;

                navMenuLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section.getAttribute("id")) {
            sectionObserver.observe(section);
        }
    });

    // --- 4. Instant Menu Integration Engine (Order Now Buttons) ---
    let cartCount = 0;
    const cartCountBadge = document.getElementById("cart-count");
    const orderFoodInput = document.getElementById("orderFood");
    const orderButtons = document.querySelectorAll(".order-now-btn");
    
    orderButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const cardElement = e.target.closest(".menu-card");
            if (cardElement) {
                const foodName = cardElement.querySelector(".menu-inf h2").innerText;
                cartCount++;
                if (cartCountBadge) cartCountBadge.innerText = cartCount;
                if (orderFoodInput) orderFoodInput.value = foodName;
            }
        });
    });

    // --- 5. Reservation Dispatch Matrix ---
    const orderForm = document.getElementById("orderForm");
    if (orderForm) {
        orderForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("orderName").value;
            const food = document.getElementById("orderFood").value;
            const qty = document.getElementById("orderQuantity").value;

            alert(`Reservation Confirmed!\nThank you ${name}, your private table booking with (${qty}x) ${food} has been securely reserved.`);
            orderForm.reset();
        });
    }

    // --- 6. Heart Wishlist Micro-toggle ---
    const wishlistBtns = document.querySelectorAll(".small-card-btn");
    wishlistBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const heartIcon = btn.querySelector("i");
            if (heartIcon) {
                heartIcon.classList.toggle("fa-solid");
                heartIcon.classList.toggle("fa-regular");
                heartIcon.style.color = heartIcon.classList.contains("fa-solid") ? "#C5A880" : "";
            }
        });
    });
});