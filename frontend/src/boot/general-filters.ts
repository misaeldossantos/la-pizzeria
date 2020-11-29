import { boot } from 'quasar/wrappers';

export default boot(({ Vue }) => {
  Vue.filter("money", (value: string): string => {
    if(!value) {
      return "R$ 0,00"
    }
    return (value.toLocaleString as any)("pt-BR", { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' });
  })
  Vue.filter("booleanLabel", bool => bool? "Sim": "Não")

  Vue.filter("fileUrl", (str) => {
    return `http://10.0.1.102:8083${str}?authorization=${localStorage.getItem("token")}`
  })
});
