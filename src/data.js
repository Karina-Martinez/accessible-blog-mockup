export const mockApiResponse = {
    status: "success",
    count: 3,
    // Datos simulados para las noticias
    news: [
        {
            id: 1,
            title: "Nuestra Guía de Teclado para Navegación Web",
            summary: "Descubre cómo usar atajos de teclado para navegar eficientemente en nuestro sitio, eliminando la dependencia del mouse.",
            alt_image_text: "Persona utilizando un teclado adaptado para navegar en la web.",
            author_id: 101,
            created_at: "2025-09-25T10:00:00Z"
        },
        {
            id: 2,
            title: "Nuevas Herramientas para el Contraste de Color",
            summary: "Hemos implementado una nueva paleta de colores con contraste nivel AA para mejorar la legibilidad del texto en todo el portal.",
            alt_image_text: "Gráfico de paleta de colores con alto contraste.",
            author_id: 101,
            created_at: "2025-09-20T10:00:00Z"
        },
        {
            id: 3,
            title: "Registro de Donativos para la Inclusión",
            summary: "Conoce el nuevo proceso para registrar tus donativos vía transferencia bancaria y ayuda a nuestro programa de becas.",
            alt_image_text: "Manos contando billetes, simbolizando una donación monetaria.",
            author_id: 101,
            created_at: "2025-09-18T10:00:00Z"
        },
    ],
    // Datos estáticos para la sección de servicios
    services: [
        { id: 1, name: "Asesoría Legal", description: "Orientación sobre derechos y obligaciones en temas de accesibilidad." },
        { id: 2, name: "Capacitación Tecnológica", description: "Talleres sobre el uso de tecnologías asistivas y dispositivos móviles." },
        { id: 3, name: "Traducción de Contenido", description: "Servicios de transcripción y subtitulado para material audiovisual." },
    ]
};

/**
 * Simulación de la respuesta de una API de Laravel a un envío de formulario.
 * @param {object} formData - Datos del formulario.
 * @returns {Promise<object>} Objeto simulando la respuesta de la API (200 OK o 422 Validation Error).
 */
export const mockApiFormSubmit = (formData) => {
    return new Promise(resolve => {
        // Simula la latencia de la red
        setTimeout(() => {
            const errors = {};

            // Simulación de las reglas de validación del Backend de Laravel
            if (!formData.name || formData.name.length < 3) {
                errors.name = "El nombre es obligatorio y debe tener al menos 3 caracteres.";
            }
            if (!formData.email || !formData.email.includes('@')) {
                errors.email = "Debe proporcionar un correo electrónico válido.";
            }
            if (!formData.message || formData.message.length < 10) {
                errors.message = "El mensaje es obligatorio y debe tener al menos 10 caracteres.";
            }

            if (Object.keys(errors).length > 0) {
                // Respuesta simulada de error de validación (código HTTP 422)
                resolve({ 
                    status: 'error', 
                    message: 'Hubo errores de validación. Por favor, revise los campos.',
                    errors: errors 
                });
            } else {
                // Respuesta simulada de éxito (código HTTP 200)
                resolve({ 
                    status: 'success', 
                    message: '¡Gracias! Su mensaje ha sido enviado con éxito.' 
                });
            }
        }, 1500); 
    });
};