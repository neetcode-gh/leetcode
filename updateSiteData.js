/** Script to update ./.problemSiteData.json contains code for solutions hosted on neetcode.io */

const fs = require('fs');

const PROBLEMS_SITE_DATA = JSON.parse(fs.readFileSync('./.problemSiteData.json', 'utf8'));

const languages = [
    {
        name: 'C',
        directory: 'c',
        extension: 'c'
    },
    {
        name: 'C++',
        directory: 'cpp',
        extension: 'cpp'
    },
    {
        name: 'C#',
        directory: 'csharp',
        extension: 'cs'
    },
    {
        name: 'Java',
        directory: 'java',
        extension: 'java'
    },
    {   
        name: 'Python',
        directory: 'python',
        extension: 'py'
    },
    {
        name: 'JavaScript',
        directory: 'javascript',
        extension: 'js'
    },
    {
        name: 'TypeScript',
        directory: 'typescript',
        extension: 'ts'
    },
    {
        name: 'Go',
        directory: 'go',
        extension: 'go'
    },
    {
        name: 'Ruby',
        directory: 'ruby',
        extension: 'rb'
    },
    {
        name: 'Swift',
        directory: 'swift',
        extension: 'swift'
    },
    {
        name: 'Kotlin',
        directory: 'kotlin',
        extension: 'kt'
    },
    {
        name: 'Rust',
        directory: 'rust',
        extension: 'rs'
    },
    {
        name: 'Scala',
        directory: 'scala',
        extension: 'scala'
    },
    {
        name: 'Dart',
        directory: 'dart',
        extension: 'dart'
    },
]

// Rename files to match leetcode url path, and normalize problem number to four digits.
for (const lang of languages) {
    const langDir = lang.directory;
    const langExt = lang.extension;

    // Get list of all files in the current lang directory
    const files = fs.readdirSync(langDir, { withFileTypes: true });
    console.log(`This many files in ${langDir}: ${files.length}`);

    let counter = 0;
    for (const problem of PROBLEMS_SITE_DATA) {
        let problemName = problem['link'].replace('/', '').toLowerCase();

        // Use problem number to find code file
        const problemNumber = problem['code'].split('-')[0];
        const foundFile = files.find(file => file.name.startsWith(`${problemNumber.toString()}-`));
        
        if (foundFile && foundFile.isFile()) {
            // rename file to match leetcode url path
            const oldFile = `${langDir}/${foundFile.name}`;
            const newFile = `${langDir}/${problemNumber}-${problemName}.${langExt}`;
            if (oldFile !== newFile) {
                fs.renameSync(oldFile, newFile);
                counter++;
            }
            problem[langDir] = true; // add language to problemSiteData
        }
    }
    console.log(`Renamed ${counter} files in ${langDir}, which had ${files.length} total files.`);
}

// Write updated problemSiteData to file
fs.writeFile('./.problemSiteData.json', JSON.stringify(PROBLEMS_SITE_DATA), function (err) {
    if (err) throw err;
    console.log('Saved!');
});
