const Koa = require('koa');
const app = new Koa();
//middleware
const bodyParser = require('koa-bodyparser');
const templating = require('./middleware/templating');
const controller = require('./middleware/router');
const formidable = require('./middleware/formidable');
const log = require('./middleware/log');
const setresponsetime = require('./middleware/setresponsetime');

const isProduction = process.env.NODE_ENV === 'production';

// add middleware:
app.use(log());
app.use(setresponsetime());
app.use(formidable({
    uploadDir: "./tmp",
    multiples: true
}));
if (!isProduction) {
    const staticFiles = require('./middleware/static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}
app.use(bodyParser());
app.use(templating('view', {
    noCache: !isProduction,
    watch: !isProduction
}));
app.use(controller());
app.listen(3000);