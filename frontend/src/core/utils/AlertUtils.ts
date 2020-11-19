import { Dialog } from "quasar";

export async function confirmExclusao() {
  return showConfirm("Deseja realmente excluir?")
}

export async function showConfirm(message) {
  return new Promise((resolve, reject) =>
    Dialog.create({
      title: "Atenção!",
      message,
      cancel: true,
      persistent: true
    })
      .onOk(() => resolve(true))
      .onCancel(() => resolve(false))
  );
}
