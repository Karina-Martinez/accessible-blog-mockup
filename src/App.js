import React from 'react';
import './App.css'; 
import { mockApiResponse } from './data'; 

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


// --- Componente Principal (Punto de Entrada) ---
function App() {
    const { news, services } = mockApiResponse;
    
    return (
        <div className="page-wrapper">
            <header className="site-header">
                {/* <h1> como único encabezado principal del documento */}
                <h1 className="header-title">Inclusión con Equidad A.C.</h1>
                
                {/* Uso de <nav> para la navegación principal (Rol de landmark) */}
                <nav role="navigation" aria-label="Navegación principal del sitio">
                    <a href="#inicio" className="nav-link">Inicio</a>
                    <a href="#servicios" className="nav-link">Servicios</a>
                    <a href="#noticias" className="nav-link">Noticias</a>
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
            
            <ServicesSection services={services} /> {/* Sección de servicios en el footer o parte baja del main */}
            
            <footer className="site-footer" role="contentinfo">
                <p>&copy; 2025 Inclusión con Equidad A.C. | Todos los derechos reservados.</p>
                <a href="#aviso-legal" className="footer-link">Aviso Legal</a>
            </footer>
        </div>
    );
}

export default App;