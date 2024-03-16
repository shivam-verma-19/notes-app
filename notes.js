const fs = require('fs');
const chalk = require('chalk');


const addNotes = (title, body) => {
    const notes = loadNotes()

    const duplicateTitle = notes.find((note) => note.title === title)

    if (!duplicateTitle) {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)
        console.log('New note added!');
    }
    else {
        console.log('Title already taken!');
    }
}

const saveNotes = (notes) => {
    const JSONdata = JSON.stringify(notes);
    fs.writeFileSync('notes.json', JSONdata)
}

const removeNotes = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed'));
        saveNotes(notesToKeep);
    }
    else {
        console.log(chalk.red.inverse('No note found!'))
    }

}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse('Your notes'))

    notes.forEach((note) => {
        console.log(note.title);
    });
}

const readNotes = (title) => {
    const notes = loadNotes();

    const findingNote = notes.find((note) => note.title === title)
    if (findingNote) {
        console.log(findingNote.title)
        console.log(findingNote.body)
    }
    else {
        console.log(chalk.red.inverse('No note found'))
    }
}
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('./notes.json');
        const convertedData = dataBuffer.toString();
        return JSON.parse(convertedData);
    } catch (e) {
        return [];
    }
}

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
} 