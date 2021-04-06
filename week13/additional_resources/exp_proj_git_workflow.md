# Git Basics For Working On Your First Group Project

## To checkout a new branch:
* `git checkout -b branch-name`

## To move from one branch to another:
* `git checkout branch-name`

## To check which branch you're on (and a list of available branches):
* `git branch`

## When you're ready to add your code to the main branch:
* `git add .`
* `git commit -m "commit message"`
* `git push`

## When someone else has merged code into main:
#### On your working branch:
* `git add .`
* `git commit -m "commit message"`
* `git checkout main`
* `git pull`
* `git checkout working-branch`
* `git merge main`