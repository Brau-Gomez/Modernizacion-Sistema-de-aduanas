# Prototipo final Paso Seguro SNA

Versión actual: **0.2.0**

Este prototipo corresponde a la versión final del sistema **Paso Seguro SNA**, una propuesta universitaria para modernizar algunos procesos del Servicio Nacional de Aduanas en pasos fronterizos terrestres.

La idea principal es mostrar cómo podría funcionar una plataforma digital para pasajeros y funcionarios, considerando trámites de viaje, documentación, declaraciones SAG/Aduanas y revisión institucional.

No es un sistema real conectado a servicios externos, pero sí permite probar varios flujos de forma simulada.

## Archivos principales

```text
movil.html
desktop.html
style.css
app.js
assets/Logo-aduanas-mod.png
```

## Cómo abrir el prototipo

Para probar la vista móvil:

```text
prototipo_final/movil.html
```

Para probar la vista desktop o de funcionario:

```text
prototipo_final/desktop.html
```

No se necesita instalar nada. Solo se abre el archivo HTML en el navegador.

## Credenciales de prueba

Para ingresar al prototipo móvil se debe usar:

```text
Correo: usuario@email.com
Contraseña: 12345678
```

Si se ingresan otros datos, el sistema muestra un mensaje de error y no permite entrar al menú principal.

## Vista móvil

La vista móvil está pensada para el pasajero. Incluye las siguientes pantallas:

1. Login
2. Registro de usuario
3. Menú principal
4. Mi cuenta
5. Registro de viaje y documentación
6. Declaraciones SAG/Aduanas
7. Comprobante
8. Preguntas frecuentes

En esta vista se puede probar el ingreso al portal, la navegación principal, el registro de viaje, la carga de documentos y el envío de una declaración.

## Vista desktop

La vista desktop está pensada para funcionarios o personal administrativo. Incluye:

1. Panel general del paso fronterizo
2. Bandeja de trámites
3. Revisión documental
4. Atención pasajero
5. Declaraciones SAG/Aduanas
6. Reportes y métricas
7. Administración

Esta vista sirve para mostrar cómo un funcionario podría revisar trámites, ver estados, consultar métricas y ejecutar una validación externa simulada.

## Funcionalidades implementadas

El prototipo tiene lógica básica en JavaScript para que no sea solo visual. Actualmente permite:

- Validar login con credenciales de prueba.
- Rechazar credenciales incorrectas.
- Bloquear acceso directo a pantallas internas si no hay sesión iniciada.
- Validar declaración SAG/Aduanas.
- Bloquear el envío si no se acepta la declaración de veracidad.
- Registrar viaje terrestre de forma simulada.
- Validar campos obligatorios del viaje.
- Validar documentación obligatoria.
- Aceptar carga de archivo PDF o imagen.
- Mostrar el nombre del archivo seleccionado.
- Registrar caso de menor de edad con autorización notarial.
- Registrar patente de vehículo.
- Mostrar plazo referencial de 180 días para salida temporal.
- Registrar ingreso temporal como pendiente de validación.
- Generar comprobante con código SNA simulado.
- Mostrar QR simulado.
- Validar registro de cuenta y edición de perfil de forma simulada.
- Validar que la fecha de cruce no sea anterior al día actual.
- Validar formato básico de patente chilena.
- Buscar preguntas frecuentes en la vista móvil.
- Filtrar trámites visibles en la bandeja desktop.
- Mostrar feedback simulado en exportación, reportes, resolución y configuración.
- Ejecutar integración simulada con SAG, PDI y Aduana Argentina en desktop.

## Mejoras de la versión 0.2.0

La versión `0.2.0` mantiene el alcance de prototipo funcional simulado, pero mejora la experiencia de prueba con cambios pequeños:

- Corrección de texto visible en el título de la vista móvil.
- Acceso al perfil desde el logo/avatar de la pantalla principal móvil.
- Validación del formulario de registro antes de crear la sesión simulada.
- Mensaje de confirmación al guardar cambios en el perfil.
- Bloqueo de viajes con fecha estimada anterior al día actual.
- Validación básica de patente para formatos como `AB-CD-12` o `AB-1234`.
- Mensaje inmediato cuando se intenta adjuntar un archivo que no es PDF o imagen.
- Ajuste automático de campos cuando el pasajero declara que no porta productos animales o vegetales.
- Buscador funcional para filtrar preguntas frecuentes en la vista móvil.
- Búsqueda y filtro simple de trámites en la bandeja desktop.
- Estados simulados para aprobación documental, corrección, derivación SAG y resolución de declaración.
- Mensajes simulados para exportar listado, generar reporte PDF y guardar configuración.
- Validación externa desktop con estado intermedio `Consultando...` y hora simulada de ejecución.

## Casos de prueba considerados

El prototipo fue ajustado pensando en los casos de prueba principales del proyecto:

- `CP_AUTH_01`: inicio de sesión exitoso con usuario habilitado.
- `CP_AUTH_02`: rechazo de inicio de sesión con credenciales inválidas.
- `CP_DECL_01`: registrar declaración SAG/Aduanas con productos animales o vegetales.
- `CP_DECL_02`: bloquear declaración sin aceptar veracidad.
- `CP_VIAJE_01`: registrar viaje terrestre.
- `CP_DOC_01`: cargar documentación obligatoria.
- `CP_DOC_02`: rechazar trámite cuando falta documentación requerida.
- `CP_MENOR_01`: registrar autorización notarial para menor de edad.
- `CP_VEH_01`: registrar salida temporal de vehículo desde Chile por 180 días.
- `CP_VEH_02`: registrar ingreso temporal de vehículo a Chile desde Argentina.
- `CP_COMP_01`: generar comprobante con código y QR simulado.
- `CP_UI_01`: validar navegación entre pantallas principales.
- `CP_SEC_01`: validar control de acceso simulado.
- `CP_INT_01`: validar integración simulada con SAG, PDI y Aduana Argentina.
- `CP_BRAND_01`: validar identidad visual institucional.

## Identidad visual

Se usaron colores relacionados con Gobierno de Chile y Aduanas:

- Azul Gobierno: `#0F69B4`
- Rojo Gobierno: `#EB3C46`
- Azul oscuro: `#0B4582`
- Fondos claros para formularios y tarjetas

También se incorporó el logo `assets/Logo-aduanas-mod.png` como imagen principal del prototipo.

## Limitaciones

Este prototipo sigue siendo una simulación universitaria. Por ahora no tiene:

- Base de datos real.
- Usuarios reales registrados.
- Conexión real con SAG, PDI o Aduana Argentina.
- Generación real de PDF o Excel.
- Persistencia completa de trámites.
- Seguridad real de producción.

Las validaciones están hechas para demostrar el flujo y apoyar la ejecución de los casos de prueba, no para reemplazar un sistema real.

## Nota para la entrega

Para explicar este prototipo, conviene decir que es una **versión funcional simulada**. Esto significa que permite navegar, validar formularios y revisar estados, pero los datos no se guardan en un servidor real.

En resumen, esta versión sirve para demostrar la idea general del sistema, probar los flujos más importantes y mostrar cómo se podría mejorar la experiencia actual de trámites fronterizos.
