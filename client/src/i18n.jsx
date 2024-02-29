import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Define las traducciones
const resources = {
    es: {
        translation: {
            admin: {
                common: {
                    optional: "(opcional)",
                    select: 'Seleccionar...',
                    filter: 'Filtrar',
                    loading: 'Cargando...',
                    noData: 'No hay datos',
                    actions: {
                        cancel: 'Cancelar',
                        update: 'Actualizar',
                        publish: 'Publicar',
                        delete: 'Eliminar',
                        edit: 'Editar',
                        reply: 'Responder',
                    },
                    verified: 'Verificado',
                    notVerified: 'No verificado',
                    table: {
                        author: 'Autor',
                        title: 'Título',
                        userName: 'Nombre',
                        mail: 'Email',
                        verified: 'Verificado',
                        admin: 'Admin',
                        category: 'Categoría',
                        tags: 'Etiquetas',
                        comment: 'Comentario',
                        inResponseTo: 'En respuesta a',
                        createdAt: 'Creado el',
                        actions: {
                            title: "",
                            approve: 'Aprobar',
                            unapprove: 'Desaprobar',
                            delete: 'Eliminar',
                            edit: 'Editar',
                            show: 'Mostrar',
                            hide: 'Ocultar',
                        },
                        replyOn: 'En respuesta a',
                    }
                },
                mainMenu: {
                    title: 'Menú principal',
                },
                dashboard: {
                    title: 'Panel de admin',
                    paragraph: '¡Bienvenid@ al gestor de contenido de MSM! Aquí podrás administrar los comentarios en tus posts, editar, crear y eliminar posts, así como también crear y eliminar categorías, y gestionar usuarios de la red.',
                },
                comments: {
                    title: 'Comentarios',
                    manage: 'Administrar Comentarios',
                    filterPlaceholder: 'Buscar comentarios...',
                },
                posts: {
                    title: 'Posts',
                    manage: {
                        title: 'Administrar Posts',
                        filterPlaceholder: 'Buscar posts...',
                        noTags: 'No hay etiquetas',
                        uncategorized: 'Sin categoría',
                    },
                    new: {
                        title: 'Editar Post',
                        create: 'Nuevo Post',
                        inputs: {
                            deleteImage: 'Eliminar imágen',
                            url: 'URL del Proyecto',
                            slug: 'Slug',
                            title: 'Título',
                            caption: 'Subtítulo',
                            categories: 'Categorías',
                            tags: 'Etiquetas',
                            select: 'Seleccionar',
                        },
                        placeholders: {
                            url: 'www.link-a-tu-proyecto.com',
                        }


                    },
                    categories: {
                        title: 'Categorías',
                        manage: 'Administrar Categorías',
                        add: 'Agregar Categoría Nueva',
                        addPlaceholder: 'Título de la categoría...',
                        addBtn: 'Agregar',
                        filterPlaceholder: 'Buscar categorías...',
                        update: 'Actualizar Categor',

                    },
                },
                users: {
                    title: 'Usuarios',
                    manage: 'Administrar Usuarios',
                    filterPlaceholder: 'Buscar usuario...',
                },
            },
            alerts: {
                invalidUrl: 'URL no válida (http:// o https://)',
                underConstruction: 'Sitio bajo construcción, algunas características aún no funcionan',
                somethingWentWrong: 'Oops! Algo salió mal',
                couldNotFetchPostDetails: 'No se pudieron obtener los detalles del post',
                nothingHere: '¡Oops! No hay nada aquí',
            },
            navBar: {
                home: 'Inicio',
                blog: 'Blog',
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
                    signin: 'Iniciar sesión',
                    logout: 'Cerrar sesión',
                    register: 'Registrarse',
                    profile: 'Perfil',
                },
            },
            hero: {
                welcomeMessage: 'Inspírate y colabora con los estudiantes de Diseño Multimedia de ORT en nuestra red social. ¡Únase hoy para crear juntos el diseño del mañana!',
                searchPlaceholder: 'Buscar artículos',
                searchBtn: 'Buscar',
                searchSuggestions: 'Etiquetas populares',
                altHeroImg: 'Imagen de bienvenida',
            },
            profile: {
                deletePictureConfirmation: '¿Estás seguro de que quieres eliminar tu foto de perfil?',
                user: "Usuario",
                cancel: "Cancelar",
                specializedIn: "Especialización",
                noAnswer: "No especificado",
                role: "Rol",
                information: "Información",
                contact: "Contacto",
                personal: "Personal",
                phone: "Teléfono",
                deletePicture: "Eliminar",
                aboutMe: "Sobre mí",
                name: "Nombre",
                email: "Email",
                newPassword: "Nueva contraseña (opcional)",
                update: "Actualizar",
                placeholders: {
                    name: "Ingrese su nombre",
                    email: "Ingrese su email",
                    password: "Ingrese nueva contraseña",
                    specializedIn: "Ingrese su especialización",
                    phone: "Ingrese su teléfono",
                    bio: "Ingrese su biografía",
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
            },
            articles: {
                moreArticles: "Más artículos",
                projectLink: "Link al proyecto",
            },
            blog: {
                categoryFilter: 'Filtrar por categoría',
            },
            cta: {
                title: "¡Conviertete en creador de contenido!",
                success: "Gracias por tu interés! Nos pondremos en contacto pronto.",
                inputMailPlaceholder: "Tu Email",
                inputNamePlaceholder: "Tu Nombre",
                button: "Empezar",
                response: "Recibe una respuesta mañana si envías antes de las 9pm hoy. Si recibimos después de las 9pm, recibiremos una respuesta al día siguiente.",
                future: "El futuro del trabajo",
                futureDescription: "La mayoría de las personas trabajarán en empleos que hoy no existen."

            },
            footer: {
                shortDescription: "Inspirate y colabora con los estudiantes de Diseño Multimedia de ORT en nuestra red social.",
                product: {
                    title: "Producto",
                    landingPage: "Página de inicio",
                    features: "Características",
                    documentation: "Documentación",
                    referalProgram: "Programa de referidos",
                    pricing: "Precios",
                },
                services: {
                    title: "Servicios",
                    documentation: "Documentación",
                    design: "Diseño",
                    themes: "Temas",
                    illustrations: "Ilustraciones",
                    uiKit: "UI Kit",
                },
                company: {
                    title: "Compañía",
                    about: "Acerca de",
                    terms: "Términos",
                    privacyPolicy: "Política de privacidad",
                    careers: "Carreras",
                },
                more: {
                    title: "Más",
                    documentation: "Documentación",
                    license: "Licencia",
                    changelog: "Changelog",
                },
            },
            article: {
                suggestedPosts: "Últimos artículos",
                share: "Compartir",
                tags: "Etiquetas",
                noTags: "No hay etiquetas",
                comments: {
                    placeholder: "Escribe un comentario...",
                    send: "Enviar",
                    reply: "Responder",
                    edit: "Editar",
                    delete: "Eliminar",
                    update: "Actualizar",
                    cancel: "Cancelar",
                }
            },
            login: {
                title: "Iniciar sesión",
                email: "Email",
                emailPlaceholder: "Ingrese su email",
                passwordPlaceholder: "Ingrese su contraseña",
                password: "Contraseña",
                button: "Iniciar sesión",
                noAccount: "¿No tienes cuenta?",
                register: "Regístrate aquí",
                forgetPassword: "¿Olvidaste tu contraseña?",
                errors: {
                    email: {
                        required: "El email es requerido",
                        pattern: "Ingrese un email válido",
                    },
                    password: {
                        required: "La contraseña es requerida",
                        length: "La contraseña debe tener al menos 6 caracteres",
                    },
                }
            },
            register: {
                title: "Registrarse",
                name: "Nombre",
                namePlaceholder: "Ingrese su nombre",
                email: "Email",
                emailPlaceholder: "Ingrese su email",
                passwordPlaceholder: "Ingrese su contraseña",
                password: "Contraseña",
                confirmPassword: "Confirmar contraseña",
                confirmPasswordPlaceholder: "Confirme su contraseña",
                button: "Registrarse",
                haveAccount: "¿Ya tienes una cuenta?",
                login: "Inicia sesión aquí",
                errors: {
                    email: {
                        required: "El email es requerido",
                        pattern: "Ingrese un email válido",
                    },
                    password: {
                        required: "La contraseña es requerida",
                        length: "La contraseña debe tener al menos 6 caracteres",
                    },
                    confirmPassword: {
                        required: "La confirmación de la contraseña es requerida",
                        validate: "Las contraseñas no coinciden",
                    },
                    name: {
                        required: "El nombre es requerido",
                        length: "El nombre debe tener al menos 1 caracter",
                    }
                }
            },
            // Agrega más traducciones aquí
        },
    },
    en: {
        translation: {
            admin: {
                common: {
                    optional: "(optional)",
                    select: 'Select...',
                    filter: 'Filter',
                    loading: 'Loading...',
                    noData: 'No data',
                    verified: 'Verified',
                    notVerified: 'Unverified',
                    actions: {
                        cancel: 'Cancel',
                        update: 'Update',
                        publish: 'Publish',
                        delete: 'Delete',
                        edit: 'Edit',

                    },
                    table: {
                        author: 'Author',
                        title: 'Title',
                        userName: 'Username',
                        mail: 'Email',
                        verified: 'Verified',
                        admin: 'Admin',
                        category: 'Category',
                        tags: 'Tags',
                        comment: 'Comment',
                        inResponseTo: 'In response to',
                        createdAt: 'Created at',
                        actions: {
                            title: "",
                            approve: 'Approve',
                            unapprove: 'Unapprove',
                            delete: 'Delete',
                            edit: 'Edit',
                            show: 'Show',
                            hide: 'Hide',
                        },
                        replyOn: 'In response to',
                    }
                },
                mainMenu: {
                    title: 'Main Menu',
                },
                dashboard: {
                    title: 'Admin Panel',
                    paragraph: 'Welcome to the MSM content manager! Here you can manage comments on your posts, edit, create and delete posts, as well as create and delete categories, and manage network users.',
                },
                comments: {
                    title: 'Comments',
                    manage: 'Manage Comments',
                    filterPlaceholder: 'Search comments...',
                },
                posts: {
                    title: 'Posts',
                    manage: {
                        title: 'Manage Posts',
                        filterPlaceholder: 'Search posts...',
                        noTags: 'No tags',
                        uncategorized: 'Uncategorized',
                    },
                    new: {
                        title: 'Edit Post',
                        create: 'New Post',
                        inputs: {
                            deleteImage: 'Delete image',
                            url: 'Project URL',
                            slug: 'Slug',
                            title: 'Title',
                            caption: 'Caption',
                            categories: 'Categories',
                            tags: 'Tags',
                            select: 'Select',
                        },
                        placeholders: {
                            url: 'www.link-to-your-project.com',
                        }

                    },
                    categories: {
                        title: 'Categories',
                        manage: 'Manage Categories',
                        add: 'Add New Category',
                        addPlaceholder: 'Category title...',
                        addBtn: 'Add',
                        filterPlaceholder: 'Search categories...',
                        update: 'Update Category',
                    },
                },
                users: {
                    title: 'Users',
                    manage: 'Manage Users',
                    filterPlaceholder: 'Search user...',
                },
            },
            alerts: {
                invalidUrl: 'URL is not valid (http:// or https://)',
                underConstruction: ' Site under construction, some features are not working yet',
                somethingWentWrong: 'Oops! Something went wrong',
                couldNotFetchPostDetails: 'Could not fetch post details',
                nothingHere: 'Oops! Nothing here',

            },
            navBar: {
                home: 'Home',
                blog: 'Blog',
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
                welcomeMessage: "Get inspired and collaborate with ORT Multimedia Design students on our social network. Join today to create tomorrow's design together!",
                searchPlaceholder: "Search articles",
                searchBtn: "Search",
                searchSuggestions: "Popular tags",
                altHeroImg: "Welcome image",
            },
            profile: {
                deletePictureConfirmation: "Are you sure you want to delete your profile picture?",
                user: "User",
                cancel: "Cancel",
                specializedIn: "Specialization",
                role: "Role",
                information: "Information",
                contact: "Contact",
                personal: "Personal",
                phone: "Phone",
                noPhone: "Not specified",
                deletePicture: "Delete",
                aboutMe: "About me",
                name: "Name",
                email: "Email",
                newPassword: "New password (optional)",
                update: "Update",
                placeholders: {
                    name: "Enter name",
                    email: "Enter email",
                    password: "Enter new password",
                    specializedIn: "Enter specialization",
                    phone: "Enter phone",
                    bio: "Enter bio",
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
            },
            articles: {
                moreArticles: "More articles",
                projectLink: "Project link",
            },
            blog: {
                categoryFilter: 'Filter by category',
            },
            cta: {
                title: "Become a content creator today!",
                success: "Thank you for your interest! We'll be in touch soon.",
                inputMailPlaceholder: "Your Email",
                inputNamePlaceholder: "Your Name",
                button: "Get started",
                response: "Get a response tomorrow if you submit by 9pm today. If we received after 9pm will get a reponse the following day.",
                future: "Future of Work",
                futureDescription: "Majority of peole will work in jobs that don’t exist today."
            },
            footer: {
                shortDescription: "Get inspired and collaborate with ORT Multimedia Design students on our social network.",
                product: {
                    title: "Product",
                    landingPage: "Landing Page",
                    features: "Features",
                    documentation: "Documentation",
                    referalProgram: "Referal Program",
                    pricing: "Pricing",
                },
                services: {
                    title: "Services",
                    documentation: "Documentation",
                    design: "Design",
                    themes: "Themes",
                    illustrations: "Illustrations",
                    uiKit: "UI Kit",
                },
                company: {
                    title: "Company",
                    about: "About",
                    terms: "Terms",
                    privacyPolicy: "Privacy Policy",
                    careers: "Careers",
                },
                more: {
                    title: "More",
                    documentation: "Documentation",
                    license: "License",
                    changelog: "Changelog",
                },
            },
            article: {
                suggestedPosts: "Latest articles",
                share: "Share",
                tags: "Tags",
                noTags: "No tags",
                comments: {
                    placeholder: "Write a comment...",
                    send: "Send",
                    reply: "Reply",
                    edit: "Edit",
                    delete: "Delete",
                    update: "Update",
                    cancel: "Cancel",
                }
            },
            login: {
                title: "Sign In",
                email: "Email",
                emailPlaceholder: "Enter your email",
                passwordPlaceholder: "Enter your password",
                password: "Password",
                button: "Sign In",
                noAccount: "Don't have an account?",
                register: "Register here",
                forgetPassword: "Forgot your password?",
                errors: {
                    email: {
                        required: "Email is required",
                        pattern: "Enter a valid email address",
                    },
                    password: {
                        required: "Password is required",
                        length: "Password must be at least 6 characters long",
                    },
                }
            },
            register: {
                title: "Register",
                name: "Name",
                namePlaceholder: "Enter your name",
                email: "Email",
                emailPlaceholder: "Enter your email",
                passwordPlaceholder: "Enter your password",
                password: "Password",
                confirmPassword: "Confirm password",
                confirmPasswordPlaceholder: "Confirm your password",
                button: "Register",
                haveAccount: "Already have an account?",
                login: "Sign in here",
                errors: {
                    email: {
                        required: "Email is required",
                        pattern: "Enter a valid email address",
                    },
                    password: {
                        required: "Password is required",
                        length: "Password must be at least 6 characters long",
                    },
                    confirmPassword: {
                        required: "Password confirmation is required",
                        validate: "Passwords do not match",
                    },
                    name: {
                        required: "Name is required",
                        length: "Name must be at least 1 character long",
                    }
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
