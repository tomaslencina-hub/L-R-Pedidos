export type Category = {
  id: string;
  name: string;
  emoji: string;
  color: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
};

export type MenuSection = {
  title: string;
  data: Product[];
};

export type Restaurant = {
  id: string;
  name: string;
  emoji: string;
  /** Fill of the restaurant's card and hero, there are no photos yet */
  color: string;
  categoryIds: string[];
  rating: number;
  /** Estimated delivery time in minutes: [min, max] */
  deliveryTime: [number, number];
  deliveryFee: number;
  menu: MenuSection[];
};

export const categories: Category[] = [
  { id: 'burgers', name: 'Burgers', emoji: '🍔', color: '#FFC98A' },
  { id: 'pizza', name: 'Pizzas', emoji: '🍕', color: '#FFA69E' },
  { id: 'empanadas', name: 'Empanadas', emoji: '🥟', color: '#BFE3A1' },
  { id: 'sushi', name: 'Sushi', emoji: '🍣', color: '#FFB3C7' },
  { id: 'ice-cream', name: 'Helados', emoji: '🍦', color: '#A9D8FF' },
  { id: 'coffee', name: 'Café', emoji: '☕', color: '#D9B99B' },
];

export const restaurants: Restaurant[] = [
  {
    id: 'la-parrilla-burger',
    name: 'La Parrilla Burger',
    emoji: '🍔',
    color: '#FFC98A',
    categoryIds: ['burgers'],
    rating: 4.7,
    deliveryTime: [25, 40],
    deliveryFee: 1200,
    menu: [
      {
        title: 'Hamburguesas',
        data: [
          {
            id: 'lpb-clasica',
            name: 'Clásica',
            description: 'Medallón de 150 g, cheddar, lechuga, tomate y salsa de la casa.',
            price: 9500,
            emoji: '🍔',
          },
          {
            id: 'lpb-doble-bacon',
            name: 'Doble Bacon',
            description: 'Doble medallón, doble cheddar, panceta crocante y cebolla caramelizada.',
            price: 12800,
            emoji: '🥓',
          },
          {
            id: 'lpb-veggie',
            name: 'Veggie',
            description: 'Medallón de lentejas, queso, rúcula y tomates secos.',
            price: 9900,
            emoji: '🥬',
          },
        ],
      },
      {
        title: 'Acompañamientos',
        data: [
          {
            id: 'lpb-papas',
            name: 'Papas fritas',
            description: 'Porción grande con sal marina.',
            price: 4200,
            emoji: '🍟',
          },
          {
            id: 'lpb-gaseosa',
            name: 'Gaseosa 500 ml',
            description: 'Línea Coca-Cola.',
            price: 2500,
            emoji: '🥤',
          },
        ],
      },
    ],
  },
  {
    id: 'don-napoli',
    name: 'Don Nápoli',
    emoji: '🍕',
    color: '#FFA69E',
    categoryIds: ['pizza', 'empanadas'],
    rating: 4.5,
    deliveryTime: [30, 45],
    deliveryFee: 900,
    menu: [
      {
        title: 'Pizzas',
        data: [
          {
            id: 'dn-muzzarella',
            name: 'Muzzarella',
            description: 'Salsa de tomate, muzzarella y aceitunas. 8 porciones.',
            price: 11000,
            emoji: '🍕',
          },
          {
            id: 'dn-napolitana',
            name: 'Napolitana',
            description: 'Muzzarella, rodajas de tomate, ajo y orégano.',
            price: 12500,
            emoji: '🍅',
          },
          {
            id: 'dn-fugazzeta',
            name: 'Fugazzeta rellena',
            description: 'Doble masa rellena de muzzarella con cebolla dorada.',
            price: 14900,
            emoji: '🧅',
          },
        ],
      },
      {
        title: 'Empanadas',
        data: [
          {
            id: 'dn-emp-carne',
            name: 'Empanada de carne',
            description: 'Carne cortada a cuchillo, al horno.',
            price: 1600,
            emoji: '🥟',
          },
          {
            id: 'dn-emp-jyq',
            name: 'Empanada de jamón y queso',
            description: 'Jamón cocido y muzzarella.',
            price: 1600,
            emoji: '🧀',
          },
        ],
      },
    ],
  },
  {
    id: 'el-noble-norte',
    name: 'Empanadas del Norte',
    emoji: '🥟',
    color: '#BFE3A1',
    categoryIds: ['empanadas'],
    rating: 4.8,
    deliveryTime: [20, 35],
    deliveryFee: 800,
    menu: [
      {
        title: 'Empanadas',
        data: [
          {
            id: 'edn-saltena',
            name: 'Salteña',
            description: 'Carne, papa, huevo y verdeo. Jugosa.',
            price: 1700,
            emoji: '🥟',
          },
          {
            id: 'edn-humita',
            name: 'Humita',
            description: 'Choclo cremoso con queso.',
            price: 1700,
            emoji: '🌽',
          },
          {
            id: 'edn-pollo',
            name: 'Pollo',
            description: 'Pollo desmenuzado con morrón y cebolla.',
            price: 1700,
            emoji: '🍗',
          },
        ],
      },
      {
        title: 'Promos',
        data: [
          {
            id: 'edn-docena',
            name: 'Docena surtida',
            description: '12 empanadas a elección del chef.',
            price: 17500,
            emoji: '📦',
          },
        ],
      },
    ],
  },
  {
    id: 'sakura-sushi',
    name: 'Sakura Sushi',
    emoji: '🍣',
    color: '#FFB3C7',
    categoryIds: ['sushi'],
    rating: 4.6,
    deliveryTime: [40, 55],
    deliveryFee: 1500,
    menu: [
      {
        title: 'Combinados',
        data: [
          {
            id: 'ss-combo-15',
            name: 'Combinado 15 piezas',
            description: 'Rolls de salmón, palta y queso, más niguiris.',
            price: 18900,
            emoji: '🍣',
          },
          {
            id: 'ss-combo-30',
            name: 'Combinado 30 piezas',
            description: 'Selección del sushiman para compartir.',
            price: 34500,
            emoji: '🍱',
          },
        ],
      },
      {
        title: 'Entradas',
        data: [
          {
            id: 'ss-gyozas',
            name: 'Gyozas de cerdo',
            description: '5 unidades a la plancha con salsa ponzu.',
            price: 7200,
            emoji: '🥠',
          },
        ],
      },
    ],
  },
  {
    id: 'heladeria-polo',
    name: 'Heladería Polo',
    emoji: '🍦',
    color: '#A9D8FF',
    categoryIds: ['ice-cream'],
    rating: 4.9,
    deliveryTime: [15, 30],
    deliveryFee: 700,
    menu: [
      {
        title: 'Helado',
        data: [
          {
            id: 'hp-cuarto',
            name: '1/4 kg',
            description: 'Hasta 3 gustos.',
            price: 5500,
            emoji: '🍨',
          },
          {
            id: 'hp-kilo',
            name: '1 kg',
            description: 'Hasta 4 gustos.',
            price: 17000,
            emoji: '🍦',
          },
        ],
      },
      {
        title: 'Postres',
        data: [
          {
            id: 'hp-bombon',
            name: 'Bombón escocés',
            description: 'Dulce de leche y crema bañados en chocolate.',
            price: 3800,
            emoji: '🍫',
          },
        ],
      },
    ],
  },
  {
    id: 'cafe-del-centro',
    name: 'Café del Centro',
    emoji: '☕',
    color: '#D9B99B',
    categoryIds: ['coffee'],
    rating: 4.4,
    deliveryTime: [15, 25],
    deliveryFee: 600,
    menu: [
      {
        title: 'Cafetería',
        data: [
          {
            id: 'cdc-flat-white',
            name: 'Flat white',
            description: 'Doble espresso con leche texturizada.',
            price: 3900,
            emoji: '☕',
          },
          {
            id: 'cdc-latte',
            name: 'Latte grande',
            description: 'Espresso y leche vaporizada, 350 ml.',
            price: 4300,
            emoji: '🥛',
          },
        ],
      },
      {
        title: 'Para acompañar',
        data: [
          {
            id: 'cdc-medialunas',
            name: 'Medialunas x3',
            description: 'De manteca, recién horneadas.',
            price: 3300,
            emoji: '🥐',
          },
          {
            id: 'cdc-tostado',
            name: 'Tostado de jamón y queso',
            description: 'En pan de miga.',
            price: 5200,
            emoji: '🥪',
          },
        ],
      },
    ],
  },
];

export function getRestaurant(id: string) {
  return restaurants.find((restaurant) => restaurant.id === id);
}
