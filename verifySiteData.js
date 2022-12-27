/** Script to verify code links in ./.problemSiteData.json */

const fs = require('fs');
const https = require('/opt/homebrew/lib/node_modules/sync-request');

const PROBLEMS_SITE_DATA = JSON.parse(fs.readFileSync('./.problemSiteData.json', 'utf8'));

const languageMap = {
    c: {
        name: 'C',
        directory: 'c',
        extension: 'c'
    },
    cpp: {
        name: 'C++',
        directory: 'cpp',
        extension: 'cpp'
    },
    csharp: {
        name: 'C#',
        directory: 'csharp',
        extension: 'cs'
    },
    java: {
        name: 'Java',
        directory: 'java',
        extension: 'java'
    },
    python: {   
        name: 'Python',
        directory: 'python',
        extension: 'py'
    },
    javascript: {
        name: 'JavaScript',
        directory: 'javascript',
        extension: 'js'
    },
    typescript: {
        name: 'TypeScript',
        directory: 'typescript',
        extension: 'ts'
    },
    go: {
        name: 'Go',
        directory: 'go',
        extension: 'go'
    },
    ruby: {
        name: 'Ruby',
        directory: 'ruby',
        extension: 'rb'
    },
    swift: {
        name: 'Swift',
        directory: 'swift',
        extension: 'swift'
    },
    kotlin: {
        name: 'Kotlin',
        directory: 'kotlin',
        extension: 'kt'
    },
    rust: {
        name: 'Rust',
        directory: 'rust',
        extension: 'rs'
    },
    scala: {
        name: 'Scala',
        directory: 'scala',
        extension: 'scala'
    },
};

const GITHUB_BASE_URL = 'https://github.com/neetcode-gh/leetcode/blob/main';

for (const problem of PROBLEMS_SITE_DATA) {
    for (const language in languageMap) {
        if (problem[language] !== true) continue;

        const { directory, extension } = languageMap[language];
        const codeUrl = `${GITHUB_BASE_URL}/${directory}/${problem.code}.${extension}`;

        const res = https('GET', codeUrl).statusCode;
        if (res !== 200) {
            console.log(codeUrl)
            console.log(res)
        }
    }
}
