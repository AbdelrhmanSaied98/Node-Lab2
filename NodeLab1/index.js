const {program} = require('commander');
const fs = require('fs');
const { json } = require('stream/consumers');

program
.command('add')
.requiredOption('-t, --title <title>','title to use before name')
.action((options ) => {
    const res = fs.readFileSync("./today.json", {encoding: "utf8"});
    const arrayRes = JSON.parse(res);
    var newID = arrayRes[arrayRes.length - 1]["id"] + 1;
    var newObj = {
        status:"to-do",
        title:options["title"],
        id : newID 
    };
    arrayRes.push(newObj);
    fs.writeFileSync("./today.json", JSON.stringify(arrayRes), {
        encoding: "utf8",
    });
});

program
.command('list')
.option('-s, --status <status>','status to use before name')
.action((options)=>{
    if(options['status'])
    {
        if(checkValue(options["status"]))
        {
            const res = fs.readFileSync("./today.json", {encoding: "utf8"});
            const arrayRes = JSON.parse(res);
            for(userIndex in arrayRes)
            {
                if(options["status"] == arrayRes[userIndex]["status"])
                {
                    console.log(arrayRes[userIndex]);
                }
             }
        }else
        {
            console.log("invalid Status");
        }
        
    }else
    {
        const res = fs.readFileSync("./today.json", {encoding: "utf8"});
        const arrayRes = JSON.parse(res);
        console.log(arrayRes);
    }
    
});

program
.command('edit')
.option('-s, --status <status>','status to use before name')
.option('-t, --title <title>','title to use before name')
.requiredOption('-i, --id <id>','id to use before name')
.action((options)=>{
    if(options["status"] && options["title"])
    {
        if(checkValue(options["status"]))
        {
            const res = fs.readFileSync("./today.json", {encoding: "utf8"});
            const arrayRes = JSON.parse(res);
            for(userIndex in arrayRes)
            {
                if(options["id"] == arrayRes[userIndex]["id"])
                {
                    arrayRes[userIndex]["status"] = options["status"];
                    arrayRes[userIndex]["title"] = options["title"];
                    break;
                }
            }
            fs.writeFileSync("./today.json", JSON.stringify(arrayRes), {
            encoding: "utf8",
            });
        }else
        {
            console.log("invalid Status");
        }
        
    }else if(options["status"])
    {
        if(checkValue(options["status"]))
        {
            const res = fs.readFileSync("./today.json", {encoding: "utf8"});
            const arrayRes = JSON.parse(res);
            for(userIndex in arrayRes)
            {
                if(options["id"] == arrayRes[userIndex]["id"])
                {
                    arrayRes[userIndex]["status"] = options["status"];
                    break;
                }
            }
            fs.writeFileSync("./today.json", JSON.stringify(arrayRes), {
            encoding: "utf8",
            });
        }else
        {
            console.log("invalid Status");
        }
        
    }else if(options["title"])
    {
        const res = fs.readFileSync("./today.json", {encoding: "utf8"});
        const arrayRes = JSON.parse(res);
        for(userIndex in arrayRes)
        {
             if(options["id"] == arrayRes[userIndex]["id"])
            {
                arrayRes[userIndex]["title"] = options["title"];
                break;
            }
        }
        fs.writeFileSync("./today.json", JSON.stringify(arrayRes), {
        encoding: "utf8",
        });
    }
});

program
.command('delete')
.requiredOption('-i, --id <id>','id to use before name')
.action((options)=>{
    const res = fs.readFileSync("./today.json", {encoding: "utf8"});
    const arrayRes = JSON.parse(res);
    var newArr = new Array();
    for(user of arrayRes)
    {
        if(user["id"] != options["id"])
        {
            newArr.push(user);
        }
    }
    fs.writeFileSync("./today.json", JSON.stringify(newArr), {
        encoding: "utf8",
    });
});

program.parse(process.argv);



function checkValue(str)
{
    if(str == "to-do" || str == "in progress" || str == "done")
    {
        return true;
    }else
    {
        return false;
    }
}