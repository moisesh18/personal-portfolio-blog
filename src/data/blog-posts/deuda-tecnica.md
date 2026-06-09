---
title: Lo que aprendí en mis primeros 3 años como gerente de desarrollo
publishDate: 07 Jun 2026
categories:
  - Tecnología
description: Cómo vencer la deuda técnica y no quejarse en el intento
status: published
---

Festejando mis 3 añitos como Gerente de Desarrollo del sector bancario, quisiera compartir consejos con los que pude mejorar la calidad del software que entregamos.

## Consejos Empresariales

### El trabajo nunca se acaba...

Este consejo solo lo aprendes cuando lo experimentas. Debes tener presente que siempre habrá un nuevo requerimiento, una nueva solicitud incluso aunque estés por entregar una funcionalidad increíble... y un día de la nada te darás cuenta que llevas meses sin tomar vacaciones y estás más irritable de lo normal.

Mi recomendación es que por más emocionado que estés por tu trabajo, no olvides priorizarte. Ejercicio, meditación, religión, relaciones sociales... recuerda siempre quién eres y qué es lo que te hace ser tú.

Cada uno pasa por su proceso, en mi caso me ayudó mucho conseguir una relación estable y regresar a la natación!

### Dedícate a lo que realmente importa

Recuerda que a nivel gerencial solo importan los resultados. No puedes estar todo tu tiempo refactorizando, deprecando ni mucho menos trabajar en funcionalidades inútiles.

Si vas a llegar al burnout, procura que sea por algo en tu lista de pendientes importantes.

Esto es especialmente difícil para los geeks, pero es la diferencia entre un desarrollador experimentado y un un desarrollador ocasional.

### El 80/20

Ya que elegiste priorizarte y dedicarte a algo realmente importante, lo más seguro es que no tengas tiempo de realizarlo al 100%. 😂

La idea general de este consejo es identificar las veces donde desarrollar el 80% de una tarea puede llevarte menos tiempo que desarrollar el 20% restante.

Por ejemplo:

- Dividir las instalaciones complejas en X fases intermedias.
- Automatizar un proceso hasta cierto punto y que lo demás se haga manual.
- Refactorizar por dentro un stored procedure pero no tocar los parámetros de entrada ni salida, para no afectar el backend.
- Hacer una consola que automatice el envío de un archivo, pero descargarlo y procesarlo manualmente.

Este sin duda es el mejor consejo que me ha dado mi jefe, porque representa el balance entre priorizar el trabajo pero priorizarte como persona... pero cuidado! olvidar ese 20% puede convertirlo en una deuda técnica.

### La deuda técnica

Desde mi punto de vista:

1. dejar deudas técnicas no es malo, lo malo es no documentarlas.
2. Hay que aprender a vivir con ellas, porque NUNCA se acaban.

Ten en cuenta que no siempre es culpa de los desarrolladores, a veces una simple decisión operativa puede convertir todo nuestro código en una deuda técnica.

Mi recomendación es simplemente ser agradecido con el código que nos entregan y tratar de ser empático con la deuda que nos encontramos. Considera que en algún momento le tocará a alguien lidiar con las deudas técnicas que dejaste por enfocarte en otras cosas.

Estoy consciente que hay veces donde el código anterior es imposible de justificar, pero en ese caso te recomiendo ponerlo en tu lista de pendientes futuros y seguir con tu vida... porque tampoco es sano ni se ve bien estar culpando siempre al desarrollador anterior.

Por cierto! Resolver deuda técnica es satisfactorio, pero procura hacerlo hasta que la entiendas por completo; a veces no se trata de una deuda técnica, sino de un proceso que cambió o desconocimiento del flujo completo.

## Consejos Técnicos

Todo esto es en base a mi experiencia y al stack que manejo, pero intentaré hablar de manera general.

### Logs

Se debe crear una cultura de desarrollo donde se priorice el uso correcto de los `TRY CATCH`. Considero que es imposible escalar una empresa de software sin utilizar correctamente esa función en cada área del desarrollo:

#### Base de datos

Depende el stack. Para procedimientos almacenados, lo mínimo que te recomiendo es que todos ellos:

- implementen un `TRY CATCH`
- guarden sus parámetros de entrada en una tabla.
- guarden sus errores en una tabla.
- entreguen Códigos de Validación alfanuméricos.

#### Backend

Depende el tipo de proyecto (web, consola, worker) pero en general mi recomendación obvia es enviar todos tus exception.toString() a un lugar seguro como slack, un chat de google, base de datos centralizada o servicios de terceros como DataDog.

Considera también que cada proyecto debe tener su Exception Handle Middleware el cual simplifique la acción que decidas implementar y no tengas que escribirla en cada uno de tus endpoints... si no nunca acabarías!

#### Frontend

En esta área debes prestar especial atención ya que lo que presentes al cliente será lo único con lo que puedas debuggear a futuro.

Mi recomendación es mostrar un swal con un GUID. Ese GUID te lo responderá un API tuya en la cual resguardarás información útil para el error (url, parámetros, código de error, mensaje de error... etc)

![Ejemplo de un swal útil](/assets/deuda-tecnica/swal.png)

Considera también que cada proyecto debe tener un `defaults.js` el cual dicte las configuraciones de loading, colores y swals de errores.

### Ambientes de prueba!

Depende el tipo de gerencia, pero en una gerencia de desarrollo considero que el principal trabajo es proveer un ambiente sano para desarrollar.

Si tus desarrolladores comentan el código para probar cierta funcionalidad o tienen que probar directamente en producción... algo está mal.

En mi caso, yo recomiendo 3 ambientes:

- **DEV**: donde los desarrolladores tienen permisos ilimitados para trabajar a gusto.
- **PREPROD**: donde los desarrolladores tienen información un poco más actualizada, pero no pueden ejecutar nada.
- **SANDBOX**: donde los clientes pueden probar las APIs y puedes certificar sus implementaciones.

Tus desarrolladores deben conocer plenamente los permisos que tienen en cada ambiente y cada IP que lo conforman.

Estoy consciente que tener actualizado los ambientes es un dolor de cabeza, pero es la mejor manera de prevenir bugs en producción.

### Redactar documentación de conocimiento general

No me refiero a la documentación de los sistemas que ya existen, sino a la documentación para crear nuevos sistemas. Por ejemplo:

#### Flujo de desarrollo

Definir el ciclo de vida y quién es el encargado de validarlo en cada una de sus fases: análisis, desarrollo, pruebas, instalación

#### Estándares

- Tipos de datos en base de datos (bloquear `NVARCHAR`, por ejemplo)
- Definir el naming (PascalCase para controladores, camelCase para bases de datos, kebab-case para archivos js... etc)
- Contenido de los paquetes de instalación (dónde se guardan, estructura de los scripts, orden de instalación... etc)

#### Documentación a nivel infraestructura

Para que los desarrollos fluyan lo más rápido posible, considero que los desarrolladores no pueden mantenerse ajenos a los temas de infraestructura.
Procura redactar documentos donde expliques las IPs de los servidores y servicios que alojan, la lista de puertos abiertos en cada servidor, diagramas de interconexión entre ambientes, formatos para solicitar acceso... etc.

#### URLs útiles dentro de la empresa

Redactar esta información te permitirá no repetirla cada vez que entre alguien nuevo al equipo.

---

Todas estas recomendaciones son solo para estabilizar el negocio y dependiendo el caso podrían llegar a tomar años en implementarse. Mi consejo final es que procures hacerlo en una empresa que se preocupe por tu desarrollo profesional y rodearte de personas que te motiven a seguir adelante, como me pasó a mi.

El reto siempre será seguir innovando y automatizando la mayor cantidad de cosas mientras resuelves deudas técnicas 🫡
