const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');
const li = document.createElement('li');
const deleteButton = document.createElement('button');

let chaptersArray = getChaptersList() || [];

function getChaptersList() {
    const chapters = localStorage.getItem('chapters');
    return chapters ? JSON.parse(chapters) : [];
}

function saveChaptersList() {
    localStorage.setItem('chapters', JSON.stringify(chaptersArray));
}

/* add an event listener to the button that listens for the click event and then creates a new li element with the value of the input and appends it to the list element */
button.addEventListener('click', function() {
    if (input.value.trim() !== '') {
        chaptersArray.push(input.value);
        saveChaptersList();
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

    const index = chaptersArray.indexOf(li.textContent.replace('❌', '').trim());
    if (index > -1) {
        chaptersArray.splice(index, 1);
        saveChaptersList();
    }
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

    chaptersArray = getChaptersList();
    chaptersArray.forEach(function(chapter) {
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');
        li.textContent = chapter;
        deleteButton.textContent = '❌';
        deleteButton.setAttribute('aria-label', `Remove ${chapter}`);
        li.append(deleteButton);
        list.append(li);

        deleteButton.addEventListener('click', function() {
            list.removeChild(li);
            const index = chaptersArray.indexOf(chapter);
            if (index > -1) {
                chaptersArray.splice(index, 1);
                saveChaptersList();
            }
            input.focus();
        });
    });
}); 
