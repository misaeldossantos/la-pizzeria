import { Dialog } from "quasar";

export async function confirmExclusao() {
  return new Promise((resolve, reject) =>
    Dialog.create({
      title: "Atenção!",
      message: "Deseja realmente excluir?",
      cancel: true,
      persistent: true
    })
      .onOk(() => resolve(true))
      .onCancel(() => resolve(false))
  );
}
