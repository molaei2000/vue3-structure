// Storage Class
// this class handle local storage

const storage = {
  // This method get a data from database
  // by a key.
  get(key) {
    try {
      let value = window.localStorage.getItem(key);
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  },

  // This method set a data on database
  // by a key and value.
  set(key, value) {
    try {
      value = JSON.stringify(value);
    } catch (e) {
      console.log(e);
    }
    window.localStorage.setItem(key, value);
  },

  // This method remove a data on database
  // by a key .
  remove(key) {
    window.localStorage.removeItem(key);
  },
};

export default storage;
