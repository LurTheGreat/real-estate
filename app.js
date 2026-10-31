const statusEl = document.getElementById('status');
const btnLoad = document.getElementById('btn-load');

// Hidden file input, created in JS so index.html stays untouched
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = '.json,application/json';

let loadedFile;
let database = createEmptyDatabase();
function setStatus(msg) {
    statusEl.textContent = msg;
}

btnLoad.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0];
    if (!file) return;

    try {
        const text = await file.text();
        database = JSON.parse(text);
        rememberLastFile(file.name);
        cacheDatabase();
        loadedFile = file;
        console.log('Loaded database:', database);
        setStatus(`Loaded ${database.properties.length} properties from ${file.name}`);
    } catch (err) {
        console.error('Load failed:', err);
        setStatus('Load failed: ' + err.message);
    }

    fileInput.value = ''; // lets you pick the same file again
});

const btnNew = document.getElementById('btn-new');

btnNew.addEventListener('click', () => {
    downloadJson(createEmptyDatabase(), 'data.json');
    rememberLastFile(file.name);
    setStatus('Created properties.json in Downloads');
});

const tabButtons = document.querySelectorAll('.tab-btn');
const tabSections = document.querySelectorAll('section');

function showTab(name) {
    showLastFile();
    tabSections.forEach(section => {
        section.hidden = section.id !== 'tab-' + name;
    });
}


const DATABASE_CACHE_KEY = 'databaseCache';

function cacheDatabase() {
    try {
        localStorage.setItem(DATABASE_CACHE_KEY, JSON.stringify(database));
    } catch (err) {
        console.error('Could not cache database:', err);
    }
}

function restoreDatabase() {
    try {
        const saved = localStorage.getItem(DATABASE_CACHE_KEY);
        if (saved) database = JSON.parse(saved);
    } catch (err) {
        console.error('Could not restore database:', err);
    }
}



const LAST_FILE_KEY = 'lastHookFile';

function rememberLastFile(name) {
    try {
        const info = { name: name, savedAt: new Date().toISOString() };
        localStorage.setItem(LAST_FILE_KEY, JSON.stringify(info));
    } catch (err) {
        console.error('Could not remember last file:', err);
    }
}

function showLastFile() {
    try {
        const saved = localStorage.getItem(LAST_FILE_KEY);
        if (!saved) {
                    setStatus(`Last file: ${info.name} (${date}), ${database.properties.length} properties restored`);
            return;
        }

        const info = JSON.parse(saved);
        const date = new Date(info.savedAt).toLocaleString();
        setStatus(`Last file: ${info.name} (${date}). Press Load to pick it`);
    } catch (err) {
        console.error('Could not read last file:', err);
        setStatus('Ready');
    }
}

tabButtons.forEach(button => {
    button.addEventListener('click', () => showTab(button.dataset.tab));
});

showTab('hook');


const btnSave = document.getElementById('btn-save');

function createTimestamp() {
    const now = new Date();
    const pad = number => String(number).padStart(2, '0');

    const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    const time = `${pad(now.getHours())}${pad(now.getMinutes())}`;
    return `${date}-${time}`;
}

btnSave.addEventListener('click', () => {
    const fileName = `data-${createTimestamp()}.json`;
    downloadJson(database, fileName);
    setStatus(`Saved ${database.properties.length} properties as ${fileName}`);
});

restoreDatabase();
showLastFile();