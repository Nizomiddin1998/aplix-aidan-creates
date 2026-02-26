const https = require("https");
const fs = require("fs");
const path = require("path");

https
  .get("https://aplix.framer.website/", (res) => {
    let chunks = [];
    res.on("data", (d) => chunks.push(d));
    res.on("end", () => {
      let html = Buffer.concat(chunks).toString();

      function extractSvgBefore(text, fileOut, componentName) {
        let idx = html.indexOf(text);
        if (idx === -1) {
          console.log("Not found: " + text);
          return;
        }

        // go up DOM tree roughly by seeing where the container is
        // usually framer packages icon + text in same block
        // the icon is typically in an element before the text
        let slice = html.substring(Math.max(0, idx - 1000), idx + 200);
        let matches = [...slice.matchAll(/<svg[^>]*>.*?<\/svg>/g)];

        if (matches.length > 0) {
          // the last SVG before the text is usually the icon for the card
          let svgStr = matches[matches.length - 1][0];
          // Replace SVG attributes to camelCase
          svgStr = svgStr
            .replace(/<svg /, "<svg {...props} ")
            .replace(/fill-rule/g, "fillRule")
            .replace(/clip-rule/g, "clipRule")
            .replace(/stroke-width/g, "strokeWidth")
            .replace(/stroke-linecap/g, "strokeLinecap")
            .replace(/stroke-linejoin/g, "strokeLinejoin")
            .replace(/stroke-dasharray/g, "strokeDasharray")
            .replace(/stroke-dashoffset/g, "strokeDashoffset")
            .replace(/stroke-opacity/g, "strokeOpacity")
            .replace(/stroke="#(F54900|f54900)"/gi, 'stroke="currentColor"');

          let template = `import React from "react";\n\nexport const ${componentName} = (props: React.SVGProps<SVGSVGElement>) => (\n  ${svgStr}\n);\n`;
          const filePath = path.join(
            __dirname,
            "shared",
            "assets",
            "icons",
            fileOut,
          );
          fs.writeFileSync(filePath, template);
          console.log("Saved " + componentName);
        } else {
          console.log("SVG not found near " + text);
        }
      }

      // Framer sometimes encrypts or escapes texts in different ways, but "Templates &amp; Tools" normally appears in plain HTML
      extractSvgBefore("Templates", "SupportIcon1.tsx", "SupportIcon1");
      extractSvgBefore("Industry Insights", "SupportIcon2.tsx", "SupportIcon2");
      extractSvgBefore("Expert Resources", "SupportIcon3.tsx", "SupportIcon3");
      extractSvgBefore("Downloadables", "SupportIcon4.tsx", "SupportIcon4");
    });
  })
  .on("error", console.error);
