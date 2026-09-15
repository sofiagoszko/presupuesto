# Presupuesto

Aplicación web para llevar un presupuesto personal. Cargás tus ingresos y egresos y ves el dinero que te queda disponible. Está hecha con HTML, CSS y JavaScript, sin frameworks ni dependencias que instalar.

## Funcionalidades

- Muestra el **presupuesto disponible**: ingresos menos egresos.
- Muestra el total de ingresos, el total de egresos y **qué porcentaje de los ingresos se va en egresos**.
- **Agregar movimientos:** elegís `+` (ingreso) o `-` (egreso), escribís una descripción y el importe.
  - La descripción no puede quedar vacía y el importe tiene que ser mayor a 0.
- Cada egreso muestra **qué porcentaje del total de egresos** representa.
- **Eliminar movimientos:** en computadora, pasá el mouse sobre un elemento y hacé clic en ✕. En celular, el botón se ve siempre.
- Montos en pesos argentinos (`$ 1.234,56`).
- Diseño adaptable a celulares.

> Los datos se guardan solo en memoria: al recargar la página vuelven los valores de ejemplo.

## Cómo usarla

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/sofiagoszko/presupuesto.git
   ```
2. Abrí `index.html` en el navegador.


## Estructura

```
presupuesto/
├── index.html     
├── css/
│   ├── styles.css  
│   └── fondo.png   
└── js/
    ├── Dato.js     
    ├── Ingreso.js  
    ├── Egreso.js   
    └── script.js 
```

Los scripts se cargan en ese orden desde `index.html`, porque `Ingreso` y `Egreso` heredan de `Dato`.

## Tecnologías

- HTML5
- CSS3: floats y media queries
- JavaScript (ES6): clases, herencia, getters y setters, template strings, `toLocaleString` para formatear montos
- [Ionicons](https://ionic.io/ionicons) para los íconos

