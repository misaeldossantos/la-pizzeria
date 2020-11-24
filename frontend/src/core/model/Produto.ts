export enum UnidadeMedidaEnum {
  GRAMA = "GRAMA",
  QUILOGRAMA = "QUILOGRAMA",
  LITRO = "LITRO",
  MILILITRO = "MILILITRO",
}

export const unidadeMedidaLabels = {
  [UnidadeMedidaEnum.QUILOGRAMA]: "Quilograma",
  [UnidadeMedidaEnum.LITRO]: "Litro",
  [UnidadeMedidaEnum.MILILITRO]: "Mililitro",
  [UnidadeMedidaEnum.GRAMA]: "Grama"
};

export const unidadeMedidaOptions = [
  {
    label: "Quilograma",
    value: UnidadeMedidaEnum.QUILOGRAMA
  },
  {
    label: "Litro",
    value: UnidadeMedidaEnum.LITRO
  },
  {
    label: "Mililitro",
    value: UnidadeMedidaEnum.MILILITRO
  },
  {
    label: "Grama",
    value: UnidadeMedidaEnum.GRAMA
  }
];

export enum CategoriaEnum {
    COMIDA = "COMIDA",
    BEBIDA = "BEBIDA"
}

export const categoriaLabels = {
  [CategoriaEnum.COMIDA]: "Comida",
  [CategoriaEnum.BEBIDA]: "Bebida"
};

export const categoriaOptions = [
    {
      label: "Comida",
      value: CategoriaEnum.COMIDA
    },
    {
      label: "Bebida",
      value: CategoriaEnum.BEBIDA
    }
  ];

export class Produto {
  id?: number;
  descricao: string = "";
  unidadeMedida: UnidadeMedidaEnum;
  preco: number = 0.00;
  categoria: CategoriaEnum;
  foto: any;
  ingredientes = []
}
