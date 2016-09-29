// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

var localItems = {};

const STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed'
}

$(function() {
  console.log('hello world :o');
  
  subscribeToRemoteItems((remoteItems) => {
    localItems = remoteItems;
    renderItems();
  });

  $('form').submit(function(event) {
    event.preventDefault();
    item = $('input').val();
    
    if (!item) return;
    
    addItem(item);
    $('input').val('');
    $('input').focus();
  });

});


function renderItems() {
  const itemsUl = $('ul#items');
  itemsUl.empty();
  const sortedItems = getSortedItems();
  sortedItems.forEach(function(item) {
    $('<li class="item"></li>').append(`<span class="item__text">${item}</span>`).addClass(localItems[item]).click(()=> {
      toggleItemCompleted(item);
    }).append(buttonToRemove(item)).appendTo(itemsUl);
  });
}

function getSortedItems() {
  return Object.keys(localItems).sort(sortByActiveThenAlphabetically);
}

function sortByActiveThenAlphabetically(a, b) {
  const aIsActive = localItems[a] === STATUS.ACTIVE;
  const bIsActive = localItems[b] === STATUS.ACTIVE;
  
  if (aIsActive && !bIsActive) {
    return -1;
  }
  if (!aIsActive && bIsActive) {
    return 1;
  }
  return a < b ? -1 : 1;
}

function buttonToRemove(item) {
  return $('<button>X</button>').addClass('item__button').click(() => {
    removeItem(item);
  });
}

function removeItem(item) {
  delete localItems[item];
  saveItem(item);
  renderItems();
}

function addItem(item) {
  localItems[item] = STATUS.ACTIVE;
  saveItem(item);
  renderItems();
}

function toggleItemCompleted(item) {
  localItems[item] = localItems[item] === STATUS.COMPLETED ? STATUS.ACTIVE : STATUS.COMPLETED;
  saveItem(item);
  renderItems();
}
