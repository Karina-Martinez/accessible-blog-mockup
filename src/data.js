export const mockApiResponse = {
    status: "success",
    count: 3,
    // Datos simulados para las noticias (como si vinieran de Laravel)
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