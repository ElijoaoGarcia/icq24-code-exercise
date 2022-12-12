
const sh = require('child_process').execSync
const author = sh('git config --get user.email').toString().trim()
const commits = sh(`git log --author=${author}`).toString().trim()

if (!commits) {
  console.error('This repo has no commits from the current Git user. Did you commit your changes?')
  process.exit(1)
}

sh('git bundle create ICQ24-take-home.bundle HEAD master')
console.log('Nice work, you created ICQ24-take-home.bundle.')
