window.database = firebase.database();

function saveItem(item) {
  database.ref('items/' + item).set(localItems[item] || null);
}

function subscribeToRemoteItems(callback) {
  database.ref('items').on('value', snapshot => {
    callback(snapshot.val() || {});
  });
}
