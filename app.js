const fs = require('fs');
const { Clickup } = require('clickup.js');

// Function to read the content from the markdown file
function readMarkdownFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
        process.exit(1);
    }
}

// Function to create a ClickUp task
async function createClickUpTask(apiKey, listId, taskContent) {
    const clickup = new Clickup(apiKey);

    try {
        // Create a task in ClickUp
        const task = await clickup.lists.createTask(
            listId,
            {
                name: 'Task from Markdown',
                description: taskContent,
            }
        );

        console.log(`Task created successfully! Task ID: ${task.id}`);
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.body);
            console.log(error.response.statusCode);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.options);
    }
}

// Replace these values with your ClickUp API key, list ID, and markdown file path
const apiKey = 'pk_3221593_IKOOL1JIHA7X30BFHTTUBUMBQTVSMN3L';
const listId = '901301428031';
const spaceId = '3282030';
const markdownFilePath = '/Users/guilherme.pinheiro/Library/Mobile Documents/iCloud~md~obsidian/Documents/Personal/🧠 Psychoanalyse/Notes/14. Aug 2023.md';

// Read content from the markdown file
const markdownContent = readMarkdownFile(markdownFilePath);

// Create a ClickUp task with the content from the markdown file
createClickUpTask(apiKey, listId, markdownContent);

