# L&R Pedidos

App mobile de pedidos de comida a domicilio, hecha con React Native y [Expo](https://expo.dev) (SDK 57) usando Expo Router.

## Qué incluye

- **Inicio**: buscador, filtro por categorías y listado de locales.
- **Local**: menú por secciones, con alta y baja de productos al carrito.
- **Carrito**: detalle del pedido, dirección, medio de pago y total con envío.
- **Pedidos**: historial y seguimiento del estado de cada pedido.
- **Perfil**: datos del usuario.

Todavía no hay backend: los locales y menús están en `src/data/restaurants.ts`, el carrito y los pedidos viven en memoria (se pierden al cerrar la app) y el estado del pedido avanza solo, por tiempo, para poder probar el seguimiento.

## Cómo correrla

```bash
npm install
npx expo start
```

Desde la terminal de Expo se puede abrir en un emulador de Android, en el simulador de iOS, en el navegador (`w`) o escaneando el QR con la app Expo Go.

## Estructura

```
src/
  app/          Pantallas (cada archivo es una ruta de Expo Router)
  components/   Componentes reutilizables
  constants/    Tema (colores, espaciados) y datos del usuario
  context/      Estado del carrito y de los pedidos
  data/         Locales, categorías y menús de ejemplo
  hooks/
  utils/
```

## Chequeos

```bash
npx tsc --noEmit
npx expo lint
```
