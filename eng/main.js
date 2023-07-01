import { Categories } from './categories.js';
import { categoriesConfig } from './categories-config.js';

document
  .querySelector('#app')
  .appendChild(new Categories(categoriesConfig).render());
