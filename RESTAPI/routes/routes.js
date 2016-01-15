var fs = require('fs');
var appRouter = function(app) {

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", function(req, res) {
    fs.readFile('./tasks.json', function(err, data) {
      if (err) 
        throw err;
      res.send(data.toString('utf-8'));
    });
});

app.get("/tasks", function(req, res) {
    fs.readFile('./tasks.json', function(err, data) {
      if (err) 
        throw err;
      res.send(data.toString('utf-8'));
      res.end();
    });
});

app.post("/tasks", function(req, res) {
	var task = req.body;
    var taskObj = {};
    if (!task.id || (task.status != "closed" && task.status != "open")  || !task.name)
    {
        res.status(500).send('Something broke!');
        res.end();
    }
    else
    {
        taskObj['id'] = task.id;
        taskObj['status'] = task.status;
        taskObj['name'] = task.name;
        taskObj['created_at'] = new Date().toLocaleString()
        fs.readFile('./tasks.json', function(err, data) {
            if (err) 
                throw err;
            var list = JSON.parse(data.toString('utf-8'));
            list.push(taskObj);
            fs.writeFile("./tasks.json", JSON.stringify(list), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
            res.status(201).send("Task is created");
            }); 
        });
    }
});

app.get("/tasks/:id", function(req, res) {
    fs.readFile('./tasks.json', function(err, data) {
    if (err) 
        throw err;
    var obj = JSON.parse(data);
    var j = 0;
    for (i = 0; i < obj.length; i++) {
        console.log(obj[i]);
        if (obj[i].id == req.params.id) 
        {
            return res.status(200).send(obj[i]);
        }
        j++;
    }
    })
});

app.put("/tasks/:id", function(req, res) {
    var taskObj = [];
    var task = req.body;
    var j = 0;
    fs.readFile('./tasks.json', function(err, data) {
        if (err) 
            throw err;
        var obj = JSON.parse(data);
        for (i = 0; i < obj.length; i++) {
            if (obj[i].id == req.params.id) 
            {   obj[i]['id'] = req.params.id
                obj[i]['status'] = task.status;
                obj[i]['name'] = task.name;
                obj[i]['created_at'] = new Date().toLocaleString();
                j = i;
            }
        }
        console.log(obj);
        var str = JSON.stringify(obj);
        fs.writeFile("./tasks.json", str,function(err) {
            if(err) {
                return console.log(err);
            }
            res.status(200).send(obj[j]);
            res.end();
        });
    })
});

app.delete("/tasks/:id", function(req, res) {
    var taskObj = [];
    var task = req.body;
    fs.readFile('./tasks.json', function(err, data) {
        if (err) 
            throw err;
        var obj = JSON.parse(data);
        for (i = 0; i < obj.length; i++) {
            if (obj[i].id == req.params.id) 
                obj.splice(i,1);
        }
        console.log(obj);
        var str = JSON.stringify(obj);
        fs.writeFile("./tasks.json", str,function(err) {
            if(err) {
                return console.log(err);
            }
            res.status(200).send("Successfully deleted!");
            res.end();
        });
    })
});
 
}
 
module.exports = appRouter;
