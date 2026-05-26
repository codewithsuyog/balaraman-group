const fs = require("fs");
const path = require("path");

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if(file.endsWith(".tsx")) results.push(file);
        }
    });
    return results;
}

const files = walk("./app");
for(const file of files) {
    let content = fs.readFileSync(file, "utf8");
    // Replace utilities
    content = content.replace(/text-white/g, "text-foreground");
    content = content.replace(/bg-white/g, "bg-foreground");
    content = content.replace(/border-white/g, "border-foreground");
    content = content.replace(/from-white/g, "from-foreground");
    content = content.replace(/via-white/g, "via-foreground");
    content = content.replace(/to-white/g, "to-foreground");
    // Replace text-[#dce8f5] and similar explicitly light colors if any
    content = content.replace(/text-\\[#dce8f5\\]/gi, "text-foreground");
    fs.writeFileSync(file, content);
    console.log("Updated", file);
}

