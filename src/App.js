import React, { useState } from 'react';
import './App.css'; 
import { mockApiResponse, mockApiFormSubmit } from './data'; // Importa la función de simulación de API

// --- Componente 1: Tarjeta de Noticia Accesible ---
const AccessiblePostCard = ({ post }) => {
    // Uso de <article> y encabezados semánticos (<h2>)
    return (
        <article className="post-card" aria-labelledby={`title-${post.id}`}>
            <h2 id={`title-${post.id}`} className="post-title">{post.title}</h2>
            
            <div className="post-image-mockup" 
                 aria-label={post.alt_image_text} 
                 role="img"
            >
                [Imagen o Gráfico]
            </div>

            <p>{post.summary}</p>

            {/* Enlace descriptivo para lectores de pantalla (Criterio 2.4.4) */}
            <a 
                href={`#post-detail-${post.id}`} 
                aria-label={`Leer más sobre: ${post.title}`}
                className="read-more-link"
            >
                Leer Artículo Completo
            </a>
        </article>
    );
};

// --- Componente 2: Sección de Servicios Accesible ---
const ServicesSection = ({ services }) => {
    // Uso de <h2> para jerarquía de la sección
    return (
        <section className="services-section" aria-labelledby="services-heading">
            <h2 id="services-heading" className="section-heading">Nuestros Servicios de Inclusión</h2>
            <div className="services-grid">
                {services.map(service => (
                    <div key={service.id} className="service-item">
                        <h3 className="service-title">{service.name}</h3> {/* Uso de <h3> anidado correctamente */}
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

// --- Componente 3: Llamada a la Acción de Donación (Aside) ---
const DonationCallout = () => {
    // Uso de <aside> para contenido tangencial y role="complementary"
    return (
        <aside role="complementary" className="donation-callout">
            <h3 className="callout-title">¡Únete a la Causa!</h3>
            <p>Tu apoyo nos ayuda a eliminar las barreras digitales. Si deseas colaborar, realiza una transferencia bancaria y registra tu donativo.</p>
            
            {/* Enlace al formulario de registro (simulado) */}
            <a 
                href="#formulario-registro" 
                className="donation-button"
                aria-label="Registra tu transferencia bancaria aquí para apoyar a la asociación."
            >
                Registrar Donativo
            </a>
            
            <p className="donation-note">Verás los datos de la cuenta bancaria en la página de registro.</p>
        </aside>
    );
};

// --- Componente 4: Formulario de Contacto Accesible (Avance Sprint 2) ---
const AccessibleContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [apiResponse, setApiResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Limpia el error localmente al escribir
        if (errors[e.target.name]) {
            setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
        }
        setApiResponse(null); // Borra el mensaje de éxito/error general
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setApiResponse(null);
        setErrors({});

        // Simulación de la llamada POST a la API de Laravel
        const response = await mockApiFormSubmit(formData);

        if (response.status === 'success') {
            setApiResponse({ type: 'success', message: response.message });
            setFormData({ name: '', email: '', message: '' }); // Limpia el formulario
        } else {
            // Manejo de errores de validación del Backend
            setApiResponse({ type: 'error', message: response.message });
            setErrors(response.errors);
        }

        setLoading(false);
    };

    return (
        <section className="contact-section" aria-labelledby="contact-heading">
            <h2 id="contact-heading" className="section-heading">Contáctanos - Formulario Accesible</h2>
            
            {loading && <p className="loading-message" aria-live="assertive">Enviando mensaje...</p>}
            
            {/* Mensaje de éxito/error general (anunciado por aria-live) */}
            {apiResponse && (
                <div 
                    className={`api-message api-message-${apiResponse.type}`} 
                    role={apiResponse.type === 'error' ? 'alert' : 'status'}
                    aria-live="polite"
                >
                    {apiResponse.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="accessible-form" noValidate>
                
                {/* Campo Nombre */}
                <div className="form-group">
                    <label htmlFor="name">Nombre Completo <span className="required-star">*</span></label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        // ARIA: describe el campo con el mensaje de error si existe
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'error-name' : undefined}
                    />
                    {/* Mensaje de error (Referenciado por aria-describedby) */}
                    {errors.name && <p id="error-name" className="input-error" role="alert">{errors.name}</p>}
                </div>

                {/* Campo Email */}
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico <span className="required-star">*</span></label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'error-email' : 'hint-email'}
                    />
                    <small id="hint-email" className="input-hint">No compartiremos tu correo con nadie.</small>
                    {errors.email && <p id="error-email" className="input-error" role="alert">{errors.email}</p>}
                </div>

                {/* Campo Mensaje */}
                <div className="form-group">
                    <label htmlFor="message">Mensaje <span className="required-star">*</span></label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'error-message' : undefined}
                    />
                    {errors.message && <p id="error-message" className="input-error" role="alert">{errors.message}</p>}
                </div>

                <button type="submit" disabled={loading} className="submit-button">
                    {loading ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
            </form>
        </section>
    );
};

// --- Componente Principal (Punto de Entrada) ---
function App() {
    const { news, services } = mockApiResponse;
    
    return (
        <div className="page-wrapper">
            <header className="site-header">
                <h1 className="header-title">Inclusión con Equidad A.C.</h1>
                
                <nav role="navigation" aria-label="Navegación principal del sitio">
                    <a href="#inicio" className="nav-link">Inicio</a>
                    <a href="#servicios" className="nav-link">Servicios</a>
                    <a href="#noticias" className="nav-link">Noticias</a>
                    <a href="#contacto" className="nav-link">Contacto</a> {/* Nuevo enlace */}
                    <a href="#donar" className="nav-link">Donar</a>
                </nav>
            </header>
            
            <main role="main" className="main-content-grid">
                
                <section className="posts-grid" id="noticias" aria-label="Lista de publicaciones recientes">
                    <h2 className="section-heading">Últimas Noticias</h2>
                    {news.map(post => (
                        <AccessiblePostCard key={post.id} post={post} />
                    ))}
                </section>
                
                {/* Contenido complementario */}
                <DonationCallout /> 
                
            </main>
            
            {/* Nueva sección de contacto */}
            <AccessibleContactForm />

            <ServicesSection services={services} /> 
            
            <footer className="site-footer" role="contentinfo">
                <p>&copy; 2025 Inclusión con Equidad A.C. | Todos los derechos reservados.</p>
                <a href="#aviso-legal" className="footer-link">Aviso Legal</a>
            </footer>
        </div>
    );
}

export default App;