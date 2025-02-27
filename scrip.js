function handleCredentialResponse(response) {
    console.log("✅ Función handleCredentialResponse ejecutada");

    if (!response || !response.credential) {
        console.error("❌ No se recibió el token de autenticación.");
        alert("Error en la autenticación. Intenta nuevamente.");
        return;
    }

    try {
        const responsePayload = parseJwt(response.credential);
        console.log("📩 Payload decodificado:", responsePayload);

        if (responsePayload && responsePayload.email) {
            const email = responsePayload.email;
            console.log("📧 Email recibido:", email);

            if (email.endsWith("@amigo.edu.co")) {
                alert("✅ Acceso aprobado: " + email);
            } else {
                alert("❌ Acceso denegado: Debes usar un correo @amigo.edu.co");
            }
        } else {
            console.error("⚠️ El payload no contiene un email válido.");
            alert("Error en la autenticación. Intenta nuevamente.");
        }
    } catch (error) {
        console.error("❌ Error al decodificar el token:", error);
        alert("Error en la autenticación.");
    }
}
