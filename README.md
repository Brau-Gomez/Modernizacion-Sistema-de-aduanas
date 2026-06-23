# Paso Seguro SNA

Versión actual: **0.2.1**

Paso Seguro SNA es un prototipo funcional orientado a digitalizar y ordenar procesos asociados a trámites fronterizos terrestres. El sistema considera flujos para pasajeros y funcionarios, incluyendo registro de viaje, carga documental, declaraciones SAG/Aduanas, revisión institucional y seguimiento operativo.

El prototipo no está conectado a servicios externos reales. Su objetivo es representar la experiencia de uso, las validaciones principales y la interacción entre módulos mediante datos y estados simulados.

## Archivos principales

```text
movil.html
desktop.html
style.css
app.js
assets/Logo-aduanas-mod.png
```

## Ejecución

No requiere instalación ni servidor local. Para utilizarlo, abrir directamente los archivos HTML en un navegador web moderno.

Vista móvil para pasajeros:

```text
prototipo_final/movil.html
```

Vista desktop para funcionarios:

```text
prototipo_final/desktop.html
```

## Credenciales de prueba

La vista móvil incluye autenticación simulada. Para ingresar al portal se deben usar las siguientes credenciales:

```text
Correo: usuario@email.com
Contraseña: 12345678
```

Si se ingresan credenciales distintas, el sistema muestra un mensaje de error y bloquea el acceso a las pantallas internas.

## Alcance funcional

El prototipo implementa dos experiencias principales:

- **Vista móvil:** orientada al pasajero, permite iniciar sesión, crear una cuenta de prueba, revisar datos personales, registrar viaje y documentación, completar declaraciones SAG/Aduanas, consultar preguntas frecuentes y visualizar un comprobante con código y QR simulado.
- **Vista desktop:** orientada a funcionarios, permite revisar un panel operativo, gestionar trámites, consultar documentación, atender pasajeros, revisar declaraciones, observar métricas y ejecutar validaciones externas simuladas.

## Funcionalidades implementadas

- Validación de inicio de sesión con credenciales de prueba.
- Bloqueo de acceso directo a pantallas internas sin sesión activa.
- Registro de cuenta de prueba con validaciones mínimas.
- Edición de perfil con mensaje de confirmación simulado.
- Registro de viaje terrestre con validación de campos obligatorios.
- Validación de fecha estimada de cruce para evitar fechas pasadas.
- Validación básica de patente chilena en formatos como `AB-CD-12` o `AB-1234`.
- Validación de documentación obligatoria para pasajeros, menores y vehículos.
- Carga de documentos en formato PDF o imagen.
- Visualización del nombre del archivo seleccionado.
- Declaración SAG/Aduanas con control de productos animales o vegetales.
- Bloqueo de envío cuando no se acepta la declaración de veracidad.
- Ajuste automático de campos cuando el pasajero declara que no porta productos sujetos a declaración.
- Generación de comprobante con código SNA y QR simulado.
- Buscador funcional de preguntas frecuentes en la vista móvil.
- Filtro simple de trámites por código, pasajero y estado en la vista desktop.
- Feedback simulado para exportación, generación de reportes y guardado de configuración.
- Estados simulados para aprobación documental, solicitud de corrección, derivación SAG y resolución de declaraciones.
- Validación externa simulada con SAG, PDI y Aduana Argentina.

## Cambios de la versión 0.2.0

La versión `0.2.0` incorpora mejoras incrementales sobre la experiencia de usuario, validaciones y feedback operativo:

- Corrección de textos visibles en la interfaz móvil.
- Acceso directo al perfil desde el avatar de la pantalla principal.
- Validación del formulario de registro antes de crear la sesión simulada.
- Confirmación visual al guardar cambios en el perfil.
- Bloqueo de viajes con fecha estimada anterior al día actual.
- Validación básica de patente vehicular.
- Mensaje inmediato al adjuntar archivos con formato no permitido.
- Desactivación automática de campos no aplicables en declaraciones SAG/Aduanas.
- Buscador funcional para preguntas frecuentes.
- Búsqueda y filtro de trámites en la bandeja desktop.
- Mensajes de resultado para acciones administrativas simuladas.
- Estados visuales para resolución documental y derivación institucional.
- Estado intermedio `Consultando...` durante la validación externa simulada.

## Identidad visual

La interfaz mantiene una línea visual institucional basada en colores asociados a Gobierno de Chile y Servicio Nacional de Aduanas:

- Azul Gobierno: `#0F69B4`
- Rojo Gobierno: `#EB3C46`
- Azul oscuro: `#0B4582`
- Fondos claros para formularios, tarjetas y paneles de revisión

El prototipo utiliza el recurso `assets/Logo-aduanas-mod.png` como imagen principal de identidad.

## Datos y seguridad

Todos los datos incluidos son ficticios y se usan únicamente para representar flujos de interacción. No se deben utilizar datos personales reales, documentos oficiales reales ni credenciales productivas dentro del prototipo.

## Limitaciones

Esta versión corresponde a un prototipo funcional simulado. Actualmente no incluye:

- Base de datos real.
- Persistencia completa de trámites.
- Usuarios reales registrados.
- Integración real con SAG, PDI, Aduana Argentina u otros servicios externos.
- Generación real de PDF, Excel u otros documentos descargables.
- Seguridad, auditoría o control de acceso de nivel productivo.

Las validaciones implementadas permiten representar reglas de negocio y escenarios de uso principales, pero no reemplazan controles técnicos ni normativos requeridos para una plataforma en producción.
