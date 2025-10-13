import React, { useState } from 'react';
import './App.css'; 
import { mockApiResponse, mockApiFormSubmit } from './data'; 

// --- Componente: Logo Accesible (Actualizado con imagen) ---
const AccessibleLogo = () => (
    <div className="site-logo">
        <img 
            // 🔑 SOLUCIÓN PARA GITHUB PAGES: 
            // Usamos process.env.PUBLIC_URL para garantizar que la ruta sea relativa al directorio del repositorio.
            // Ejemplo de ruta generada: /nombre-del-repo/images/logo.png
            src={process.env.PUBLIC_URL + "/images/logo.png"} 
            alt="Logo de Inclusión con Equidad A.C., simbolizando la inclusión digital."
            className="logo-image"
        />
    </div>
);

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

// --- Componente 2: Llamada a la Acción de Donación (Aside) ---
const DonationCallout = ({ navigate }) => {
    // Uso de <aside> para contenido tangencial y role="complementary"
    return (
        <aside role="complementary" className="donation-callout">
            <h3 className="callout-title">¡Únete a la Causa!</h3>
            <p>Tu apoyo nos ayuda a eliminar las barreras digitales. Si deseas colaborar, realiza una transferencia bancaria y registra tu donativo.</p>
            
            {/* El enlace cambia la vista usando el router de estado */}
            <a 
                href="#donar" 
                onClick={(e) => { e.preventDefault(); navigate('donar'); }}
                className="donation-button"
                aria-label="Registra tu transferencia bancaria aquí para apoyar a la asociación."
            >
                Registrar Donativo
            </a>
            
            <p className="donation-note">Verás los datos de la cuenta bancaria en la página de registro.</p>
        </aside>
    );
};

// --- Componente 3: Formulario de Contacto Accesible (Avance Sprint 2) ---
const AccessibleContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [apiResponse, setApiResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
        }
        setApiResponse(null); 
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
            setFormData({ name: '', email: '', message: '' }); 
        } else {
            // Manejo de errores de validación del Backend
            setApiResponse({ type: 'error', message: response.message });
            setErrors(response.errors);
        }

        setLoading(false);
    };

    return (
        <section className="contact-section page-view" id="contacto" aria-labelledby="contact-heading">
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
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'error-name' : undefined}
                    />
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

// --- VISTAS DE PÁGINA COMPLETAS ---

const BlogPage = ({ navigate }) => { 
    const { news } = mockApiResponse;
    return (
        <main role="main" className="main-content-grid" tabIndex="-1">
            <section className="posts-grid" id="blog" aria-label="Lista de publicaciones recientes">
                <h2 className="section-heading">Blog: Inclusión y Tecnología</h2>
                {news.map(post => (
                    <AccessiblePostCard key={post.id} post={post} />
                ))}
            </section>
            <DonationCallout navigate={navigate} /> 
        </main>
    );
};

const ServicesPage = () => {
    const { services } = mockApiResponse;
    return (
        <main role="main" className="page-view services-page-container" tabIndex="-1">
            <section className="contact-section" aria-labelledby="services-heading">
                <h2 id="services-heading" className="section-heading">Nuestros Servicios de Inclusión y Apoyo</h2>
                <p>Nuestro compromiso es eliminar las barreras. Aquí están los pilares de nuestro trabajo:</p>
                <div className="services-grid">
                    {services.map(service => (
                        <div key={service.id} className="service-item service-item-expanded">
                            <h3 className="service-title">{service.name}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

const DonationPage = ({ navigate }) => {
    return (
        <main role="main" className="page-view donation-page-container" tabIndex="-1">
            <section className="contact-section" aria-labelledby="donation-heading">
                <h2 id="donation-heading" className="section-heading">Colabora con Inclusión con Equidad A.C.</h2>
                <div className="donation-instructions">
                    <p>Gracias por tu interés en apoyar nuestra causa. Siguiendo nuestro compromiso con la transparencia y simplicidad, el proceso de donación se realiza mediante transferencia bancaria y posterior registro en nuestra plataforma.</p>
                    
                    <h3 className="sub-heading">Instrucciones Paso a Paso:</h3>
                    <ol className="accessible-list">
                        <li>**Realiza la Transferencia:** Utiliza los datos de la cuenta que se muestran a continuación para enviar tu donativo.</li>
                        <li>**Guarda el Comprobante:** Asegúrate de tener el folio o comprobante de la transferencia.</li>
                        <li>**Registra tu Donativo:** Haz clic en el botón de abajo para llenar nuestro formulario. Esto nos permite generar tu recibo y dar seguimiento a los fondos.</li>
                    </ol>

                    <h3 className="sub-heading">Datos Bancarios:</h3>
                    <div className="bank-details" role="group" aria-label="Información de cuenta bancaria para donaciones">
                        <p><strong>Banco:</strong> BANCOMEXT</p>
                        <p><strong>Titular:</strong> Inclusión con Equidad A.C.</p>
                        <p><strong>CLABE:</strong> 0000 1234 5678 9012 34</p>
                        <p><strong>Referencia:</strong> DonativoWeb</p>
                    </div>

                    <p className="callout-note">Una vez hecha la transferencia, necesitamos tus datos para emitir tu recibo deducible de impuestos.</p>
                    
                    <a 
                        href="#contacto" 
                        onClick={(e) => { e.preventDefault(); navigate('contacto'); }}
                        className="submit-button large-button"
                        aria-label="Ir al formulario de registro de donativos"
                    >
                        Ir al Formulario de Registro
                    </a>
                </div>
            </section>
        </main>
    );
};

const LegalPage = () => {
    return (
        <main role="main" className="page-view legal-page-container" tabIndex="-1">
            <section className="contact-section" aria-labelledby="legal-heading">
                <h2 id="legal-heading" className="section-heading">Aviso Legal y Políticas de Accesibilidad</h2>
                <div className="legal-content">
                    {/* El texto legal se divide en párrafos para renderizado accesible */}
                    {mockApiResponse.legal_text.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
                
                <h3 className="sub-heading">Política de Privacidad</h3>
                <p>Nuestra política es no compartir datos. La información de contacto y donativos se mantiene bajo estricta confidencialidad, cumpliendo con la legislación vigente de protección de datos personales.</p>
            </section>
        </main>
    );
};

// --- Componente Principal (App Router) ---
function App() {
    const [currentPage, setCurrentPage] = useState('blog');

    const navigate = (page) => {
        setCurrentPage(page);
        // WCAG 2.4.3 Focus Order: Mueve el foco al contenido principal al cambiar de vista
        setTimeout(() => {
            const mainContent = document.querySelector('main[role="main"]');
            if (mainContent) {
                mainContent.focus(); 
            }
        }, 0);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'servicios':
                return <ServicesPage />;
            case 'contacto':
                return <AccessibleContactForm />;
            case 'donar':
                return <DonationPage navigate={navigate} />;
            case 'legal':
                return <LegalPage />;
            case 'blog':
            default:
                // Ahora la vista por defecto es el blog
                return <BlogPage navigate={navigate} />; 
        }
    };
    
    return (
        <div className="page-wrapper">
            {/* Header y Navegación (Compartidos en todas las páginas) */}
            <header className="site-header">
                {/* Se reemplaza <h1> por el Componente Logo */}
                <AccessibleLogo />
                
                <nav role="navigation" aria-label="Navegación principal del sitio">
                    <a href="#blog" className="nav-link" onClick={(e) => { e.preventDefault(); navigate('blog'); }}>Blog</a>
                    <a href="#servicios" className="nav-link" onClick={(e) => { e.preventDefault(); navigate('servicios'); }}>Servicios</a>
                    <a href="#contacto" className="nav-link" onClick={(e) => { e.preventDefault(); navigate('contacto'); }}>Contacto</a>
                    <a href="#donar" className="nav-link" onClick={(e) => { e.preventDefault(); navigate('donar'); }}>Donar</a>
                </nav>
            </header>
            
            {/* Renderizado de la Página Actual */}
            {renderPage()}
            
            {/* Footer Mejorado */}
            <footer className="site-footer" role="contentinfo">
                <div className="footer-section">
                    <h4 className="footer-section-title">Contáctanos</h4>
                    <p>Email: <a href="mailto:contacto@inclu-equidad.org" className="footer-link">contacto@inclu-equidad.org</a></p>
                    <p>Tel: (55) 5555-1234</p>
                </div>

                <div className="footer-section">
                    <h4 className="footer-section-title">Navegación</h4>
                    <a href="#blog" className="footer-link" onClick={(e) => { e.preventDefault(); navigate('blog'); }}>Blog</a>
                    <a href="#servicios" className="footer-link" onClick={(e) => { e.preventDefault(); navigate('servicios'); }}>Servicios</a>
                    <a href="#contacto" className="footer-link" onClick={(e) => { e.preventDefault(); navigate('contacto'); }}>Contacto</a>
                </div>

                <div className="footer-section">
                    <h4 className="footer-section-title">Legal</h4>
                    <a 
                        href="#aviso-legal" 
                        className="footer-link"
                        onClick={(e) => { e.preventDefault(); navigate('legal'); }}
                    >
                        Aviso Legal
                    </a>
                    <a href="#privacidad" className="footer-link" onClick={(e) => { e.preventDefault(); navigate('legal'); }}>Política de Privacidad</a>
                </div>

                <p className="footer-copyright">&copy; 2025 Inclusión con Equidad A.C. | Sitio desarrollado bajo WCAG 2.1.</p>
            </footer>
        </div>
    );
}

export default App;