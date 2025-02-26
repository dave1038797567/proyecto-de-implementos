document.addEventListener("DOMContentLoaded", function() {
    document.body.classList.add("fade-in");

    const googleButton = document.querySelector(".g_id_signin");

    if (googleButton) {
        googleButton.addEventListener("click", function() {
            googleButton.classList.add("click-effect");

            setTimeout(() => {
                googleButton.classList.remove("click-effect");
            }, 500);
        });
    }
});

function handleCredentialResponse(response) {
    const responsePayload = parseJwt(response.credential);
    const email = responsePayload.email;

    if (email.endsWith("@amigo.edu.co")) {
        alert("✅ Acceso aprobado: " + email);
    } else {
        alert("❌ Acceso denegado: Debes usar un correo @amigo.edu.co");
    }
}

function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}
