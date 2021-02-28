### To host this project you need Node.js server. For learning purposes Heroku free hosting can be used.

**All of the steps bellow explain how**

1. Push this project as new repository to [github](https://github.com/)
1. Create your account on [heroku](https://signup.heroku.com/)
1. Install [`Heroku CLI`](https://devcenter.heroku.com/articles/heroku-cli)
1. Run `heroku login` in your terminal to login via `CLI`
1. After pushing initial commit to your `master`/`main` branch run `heroku create`
1. Once you push any changes (or initial commit) to your `master`/`main` branch run `git push heroku main` or `git push heroku master` (based on which is the primary branch in your repository)

**Note:** any time you do new changes and merge them to `master`/`main` branch don't forget tu run `git push heroku main`.
In detail `heroku` explanation about deploying `Node.js` projects can be found [here](https://devcenter.heroku.com/articles/deploying-nodejs)
