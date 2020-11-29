
export class Loader {
  data = []
  loading = false
  params = {

  }
  callback;
  constructor(callback: Function = () => null) {
    this.callback = callback
  }

  async load(params = {}) {
    this.loading = true
    this.data = (await this.callback({ ...this.params, ...params })).list
    this.loading = false
  }
}
