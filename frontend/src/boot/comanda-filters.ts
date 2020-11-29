import { boot } from 'quasar/wrappers';
import { statusComandaLabels } from './../core/model/Comanda';

export default boot(({ Vue }) => {
  Vue.filter("statusComanda", (value: string): string => {
    return statusComandaLabels[value]
  })
});
