import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Define las traducciones
const resources = {
  es: {
    translation: {
        navBar: {
            home: 'Inicio',
            articles: 'Artículos',
            pages: {
                main: 'Páginas',
                about: 'Sobre nosotros',
                contact: 'Contáctanos',
            },
            pricing: 'Precios',
            faq: 'FAQ',
            account: {
                main: 'Cuenta',
                admin: 'Administración',
                login: 'Iniciar sesión',
                logout: 'Cerrar sesión',
                register: 'Registrarse',
                profile: 'Perfil',
            },
        },
        hero: {
            welcomeMessage: 'Inspira y colabora con los estudiantes de Diseño Multimedia de ORT en nuestra red social. ¡Únase hoy para crear juntos el diseño del mañana!',
            searchPlaceholder: 'Buscar artículos',
            searchBtn: 'Buscar',
            searchSuggestions: 'Etiquetas populares',
            altHeroImg: 'Imagen de bienvenida',
        },
        profile: {
            deletePicture: "Eliminar",
            name: "Nombre",
            email: "Email",
            newPassword: "Nueva contraseña (opcional)",
            update: "Actualizar",
            placeholders: {
                name: "Ingrese su nombre",
                email: "Ingrese su email",
                password: "Ingrese nueva contraseña",
            },
            errors: {
                name: {
                    required: "El nombre es requerido",
                    length: "El nombre debe tener al menos 1 caracter",
                },
                email: {
                    required: "El email es requerido",
                    pattern: "Ingrese un email válido",
                },
                password: {
                    required: "La contraseña es requerida",
                    length: "La contraseña debe tener al menos 6 caracteres",
                },
            }
        }
      // Agrega más traducciones aquí
    },
  },
  en: {
    translation: {
        navBar: {
            home: 'Home',
            articles: 'Articles',
            pages: {
                main: 'Pages',
                about: 'About us',
                contact: 'Contact us',
            },
            pricing: 'Prices',
            faq: 'FAQ',
            account: {
                main: 'Account',
                admin: 'Admin dashboard',
                signin: 'Sign In',
                logout: 'Logout',
                register: 'Register',
                profile: 'Profile Page',
            },
        },
        hero: {
            welcomeMessage: "Inspire and collaborate with ORT Multimedia Design students on our social network. Join today to create tomorrow's design together!",
            searchPlaceholder: "Search articles",
            searchBtn: "Search",
            searchSuggestions: "Popular tags",
            altHeroImg: "Welcome image",
        },
        profile: {
            deletePicture: "Delete",
            name: "Name",
            email: "Email",
            newPassword: "New password (optional)",
            update: "Update",
            placeholders: {
                name: "Enter name",
                email: "Enter email",
                password: "Enter new password",
            },
            errors: {
                name: {
                    required: "Name is required",
                    length: "Name must be at least 1 character long",
                },
                email: {
                    required: "Email is required",
                    pattern: "Enter a valid email address",
                },
                password: {
                    required: "Password is required",
                    length: "Password must be at least 6 characters long",
                },
            }
        }
      // Agrega más traducciones aquí
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es', // idioma predeterminado
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
