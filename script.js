document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Mobile Menu Toggle ---
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll("#nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });

    // --- 2. Dynamic Order Interaction ---
    let cartCount = 0;
    const cartCountBadge = document.getElementById("cart-count");
    const orderFoodInput = document.getElementById("orderFood");
    const orderButtons = document.querySelectorAll(".order-now-btn");
    
    orderButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const cardElement = e.target.closest(".menu-inf");
            const foodName = cardElement.querySelector("h2").innerText;

            cartCount++;
            cartCountBadge.innerText = cartCount;
            orderFoodInput.value = foodName;

            // Smooth snap to Booking Section
            document.getElementById("Order").scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- 3. Form Validation Display ---
    const orderForm = document.getElementById("orderForm");
    orderForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("orderName").value;
        const food = document.getElementById("orderFood").value;
        const qty = document.getElementById("orderQuantity").value;

        alert(`Reservation Confirmed!\nThank you ${name}, your private table booking with (${qty}x) ${food} has been securely reserved.`);
        orderForm.reset();
    });

    // --- 4. Card Wishlist Toggle Animation ---
    const wishlistBtns = document.querySelectorAll(".small-card-btn");
    wishlistBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const heartIcon = btn.querySelector("i");
            heartIcon.classList.toggle("fa-solid");
            heartIcon.classList.toggle("fa-regular");
            
            if(heartIcon.classList.contains("fa-solid")) {
                heartIcon.style.color = "#D4AF37";
            } else {
                heartIcon.style.color = "";
            }
        });
    });
});