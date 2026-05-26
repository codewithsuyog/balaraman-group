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
    
    // Replace hardcoded dark backgrounds
    content = content.replace(/bg-\\[#0d1117\\]/gi, "bg-background");
    content = content.replace(/bg-\\[#090c10\\]/gi, "bg-background");
    
    // Fix buttons that should have light text on dark background
    // e.g. bg-foreground text-black -> bg-foreground text-background
    content = content.replace(/bg-foreground text-black/gi, "bg-foreground text-background");
    
    // Fix active tabs in publications
    content = content.replace(/bg-amber-600 text-foreground/gi, "bg-amber-600 text-background");
    
    fs.writeFileSync(file, content);
}
console.log("Fixed colors in TSX files.");

