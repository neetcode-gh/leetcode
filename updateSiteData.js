/** Script to update ./.problemSiteData.json contains code for solutions hosted on neetcode.io */

const fs = require('fs');

const PROBLEMS_OBJ = JSON.parse(fs.readFileSync('./.problemList.json', 'utf8'));
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
]

// Rename files to match leetcode url path, and normalize problem number to four digits.
for (const lang of languages) {
    const langDir = lang.directory;
    const langExt = lang.extension;

    // Get list of all files in the current lang directory
    const files = fs.readdirSync(langDir, { withFileTypes: true });
    console.log(`This many files in ${langDir}: ${files.length}`);

    let counter = 0;
    for (const category in PROBLEMS_OBJ) {
        for (const problem of PROBLEMS_OBJ[category]) {
            const url = problem[1];

            // Use leetcode url path to rename each problem for consistency
            let problemName = problem[1].replace('https://leetcode.com/problems/', '');
            problemName = problemName.replace('/', '').toLowerCase();

            // Use problem number to find each problem
            const problemNumber = problem[2];
            const newProblemNumber = updateProblemNumber(problem[2]);

            const foundFile = files.find(file => file.name.startsWith(`${problemNumber.toString()}-`));
            if (foundFile && foundFile.isFile()) {
                // rename file to match leetcode url path
                const oldFile = `${langDir}/${foundFile.name}`;
                const newFile = `${langDir}/${newProblemNumber}-${problemName}.${langExt}`;
                fs.renameSync(oldFile, newFile);
                counter++;

                updateSiteData(url, `${newProblemNumber}-${problemName}`, langDir);
            }
        }
    }
    console.log(`Renamed ${counter} files in ${langDir}, which had ${files.length} total files.`);
}

// Add leading zeros to make four digits long (24 -> 0024)
function updateProblemNumber(problemNumberInt) {
    let problemNumber = problemNumberInt.toString();
    while (problemNumber.length < 4) {
        problemNumber = '0' + problemNumber;
    }
    return problemNumber;
}

function updateSiteData(problemUrl, newCodeLink, langName) {
    for (const p of PROBLEMS_SITE_DATA) {
        // TODO: Bug here where some problem names are too similar (e.g. LC 300 and LC 673)
        if (problemUrl.includes(p.link)) {
            p.code = newCodeLink;
            p[langName] = true;
            return;
        }
    }
    console.log(`Could not find ${problemUrl} in PROBLEMS_SITE_DATA.`);
}


fs.writeFile('./.problemSiteData.json', JSON.stringify(PROBLEMS_SITE_DATA), function (err) {
    if (err) throw err;
    console.log('Saved!');
});


/** Update problem numbers in .problemList.json */

// for (const category in PROBLEMS_OBJ) {
//     for (const problem of PROBLEMS_OBJ[category]) {
//         problem[2] = updateProblemNumber(problem[2]);    
//     }
// }

// fs.writeFile('./.problemList.json', JSON.stringify(PROBLEMS_OBJ), function (err) {
//     if (err) throw err;
//     console.log('Saved!');
// });
