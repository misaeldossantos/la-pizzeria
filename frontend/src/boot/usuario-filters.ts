import { nivelAcessoLabels } from './../core/model/Usuario';
import { boot } from 'quasar/wrappers';

export default boot(({ Vue }) => {
  Vue.filter("nivelAcesso", (value: string): string => {
    return nivelAcessoLabels[value]
  })
});
