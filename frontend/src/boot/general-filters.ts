import { boot } from 'quasar/wrappers';

export default boot(({ Vue }) => {
  Vue.filter("money", (value: string): string => {
    return (value.toLocaleString as any)("pt-BR", { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' });
  })
});
