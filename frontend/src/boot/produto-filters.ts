import { boot } from 'quasar/wrappers';
import {categoriaLabels} from '../core/model/Produto';

export default boot(({ Vue }) => {
  Vue.filter("categoriaProduto", (value: string): string => {
    return categoriaLabels[value]
  })
});
