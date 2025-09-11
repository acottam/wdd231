const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');
const li = document.createElement('li');
const deleteButton = document.createElement('button');

/* add an event listener to the button that listens for the click event and then creates a new li element with the value of the input and appends it to the list element */
button.addEventListener('click', function() {
    if (input.value.trim() !== '') {
        li.textContent = input.value;
        deleteButton.textContent = '❌';
        deleteButton.setAttribute('aria-label', `Remove ${input.value}`);
        li.append(deleteButton);
        list.append(li);
        input.value = '';
        input.focus();
    } else {
        input.focus();
    }
});

/* add an event listener to the button that removes the li element when clicked */
deleteButton.addEventListener('click', function() {
    list.removeChild(li);
    input.focus();
});

/* add an event listener to the input that listens for the "Enter" key to be pressed */
input.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        button.click();
    }
});

/* add an event listener to the input that listens for the "Escape" key to be pressed */
input.addEventListener('keyup', function(event) {
    if (event.key === 'Escape') {
        input.value = '';
        input.focus();
    }
}
);

/* add an event listener to the document that listens for the DOMContentLoaded event and then focuses the input element */
document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector('#favchap');
    input.focus();
});
