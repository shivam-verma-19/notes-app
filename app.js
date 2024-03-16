const chalk = require('chalk');
const notes = require('./notes');
const yargs = require('yargs');

yargs.version('1.0.1');

//Create a add command
yargs.command({
    command: 'add',
    describe: 'Add a note.',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body of the note.',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNotes(argv.title, argv.body);
    }
})

//Create a remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note.',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNotes(argv.title);
    }
})

//Create a list command
yargs.command({
    command: 'list',
    describe: 'Listing all notes.',
    handler(argv) {
        notes.listNotes();
    }
})

//Create a read command
yargs.command({
    command: 'read',
    describe: 'Reading the note.',
    builder: {
        title: {
            describe: 'Reading note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNotes(argv.title)
    }
})

yargs.parse();