// src/App.js

import React from 'react';
import './App.css'; // Importa los estilos
import { postsData } from './data'; // Importa los datos simulados

// --- 1. Componente del Post Accesible ---
const AccessiblePostCard = ({ post }) => {
    // Uso de <article> y encabezados semánticos (<h2>)
    return (
        <article className="post-card" aria-labelledby={`title-${post.id}`}>
            <h2 id={`title-${post.id}`} className="post-title">{post.title}</h2>
            
            {/* Si hubiera imagen, usaríamos el alt_image_text */}
            <div className="post-image-mockup" 
                 aria-label={post.altText} 
                 role="img"
            >
                [Imagen de Referencia]
            </div>

            <p>{post.summary}</p>

            {/* Enlace descriptivo para lectores de pantalla (WCAG 2.1 - Criterio 2.4.4) */}
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

// --- 2. Componente de la Lista de Noticias (Punto de Entrada) ---
function App() {
    return (
        // Uso de <main> como rol de landmark principal
        <main role="main" className="app-container">
            <header className="site-header">
                {/* <h1> como único encabezado principal del documento (Criterio 1.3.1) */}
                <h1 className="header-title">Noticias de Inclusión con Equidad A.C.</h1>
            </header>
            
            <section className="posts-grid" aria-label="Lista de publicaciones recientes">
                {postsData.map(post => (
                    <AccessiblePostCard key={post.id} post={post} />
                ))}
            </section>
        </main>
    );
}

export default App;