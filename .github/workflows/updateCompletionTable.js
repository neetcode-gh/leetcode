const { readdirSync } = require('fs');
const fs = require('fs');
const path = require('path');

const IGNORE_DIRS = ['.github', '.git'];
const FOLDER_TO_LANG = {
    javascript: 'JS',
    typescript: 'TS',
    csharp: 'C#',
    c: 'C',
    go: 'GO',
    java: 'Java',
    python: 'Python',
    ruby: 'Ruby',
    rust: 'Rust',
    scala: 'Scala',
    swift: 'Swift',
    cpp: 'C++',
    kotlin: 'Kotlin',
};
const PREPEND_PATH = process.argv[2] || './';
const TEMPLATE_PATH = process.argv[3] || './README_template.md';
const WRITE_PATH = process.argv[3] || './README.md';

const PROBLEMS_OBJ = JSON.parse(fs.readFileSync('./.problemList.json', 'utf8'));

const getDirectories = (source) =>
    readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

function* walkSync(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        if (file.isDirectory()) {
            yield* walkSync(path.join(dir, file.name));
        } else {
            yield path.join(dir, file.name);
        }
    }
}

function nestedFiles(dir) {
    files = [];
    for (const filePath of walkSync(dir)) {
        files.push(filePath);
    }
    return files;
}

const directories = getDirectories(PREPEND_PATH).filter(
    (dir) => !IGNORE_DIRS.includes(dir)
);
const nestedFilesInDir = directories.reduce((acc, dir) => {
    acc[dir] = nestedFiles(dir);
    return acc;
}, {});

const tableHeader =
    [
        'Problem',
        ...directories.map((folder) => FOLDER_TO_LANG[folder] || folder),
    ]
        .map((el) => `<sub>${el}</sub>`)
        .join(' | ') + '\n';

const tableSep =
    Array.from({ length: tableHeader.split('|').length })
        .map((el) => '----')
        .join(' | ') + '\n';

let fullOutput = '';

for (const problemCategory in PROBLEMS_OBJ) {
    fullOutput += `### ${problemCategory}\n\n`;
    fullOutput += tableHeader;
    fullOutput += tableSep;

    for (const [problemName, problemUrl, problemNumber] of PROBLEMS_OBJ[
        problemCategory
    ]) {
        let problemRow = [
            `<sub>[${problemNumber} - ${problemName}](${problemUrl})</sub>`,
        ];
        for (const dir of directories) {
            let filePath = nestedFilesInDir[dir].find((file) =>
                file
                    .match(/[\w-]+\..+/)?.[0]
                    ?.startsWith(problemNumber)
            );
            if (filePath) {
                problemRow.push(
                    `<sub><div align='center'>[✔️](${encodeURIComponent(
                        filePath
                    )})</div></sub>`
                );
            } else {
                problemRow.push("<sub><div align='center'>❌</div></sub>");
            }
        }

        fullOutput += problemRow.join(' | ') + '\n';
    }
    fullOutput += '\n';
}

const template = fs.readFileSync(TEMPLATE_PATH, { encoding: 'utf8' });
const toWrite = template.replaceAll('<completion-tables />', fullOutput);
console.log(toWrite);
fs.writeFileSync(WRITE_PATH, toWrite, {
    encoding: 'utf8',
});
