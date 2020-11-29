
export default class AutoComplete {

  options = [];
  loadCallback;

  constructor({ loadCallback }) {
    this.loadCallback = loadCallback;
  }

  filter = async (val, update) => {
    try {
      if(!val) {
        this.options = []
        update()
        return;
      }
      this.options = (await this.loadCallback(val)).list
      update()
    } catch (e) {
      console.log(e)
    }
  }

}
