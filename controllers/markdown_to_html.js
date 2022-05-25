const express = require('express')
const router = express.Router()
const readLine = require('readline')
const { tags, replaceWithLink } = require('../helpers')
const dots = '...';

router.post('/', (req, res) => {
  req.setEncoding('utf8');
  const lineReader = readLine.createInterface({
    input: req
  });
  let htmlFormat = '';
  let pTagFlag = false;
  lineReader.on('line', function (line) {
    line = replaceWithLink(line);
    const prefixDetails = line.match(/^([\S]+)/);
    if (prefixDetails) { // check if line is not empty
      const prefix = prefixDetails[0];
      const hTag = tags[prefix]
      if (hTag) { // if line starts with # add heading tag
        if (pTagFlag) { // if paragraph tag is open close it
          htmlFormat += '</p>';
          pTagFlag = false
        }
        line = line.replace(/^([\S]+)/, '').trim();
        htmlFormat += `<${hTag}>${line}</${hTag}>`
      } else if (prefix === dots) { // if prefix === dots add dots to output 
        if (pTagFlag) {
          htmlFormat += '</p>';
          pTagFlag = false
        }
        htmlFormat += line + '\n';
      } else if (!pTagFlag) { // if line starts with words or numbers add paragraph tag
        htmlFormat += `<p>${line}\n`;
        pTagFlag = true
      } else {
        htmlFormat += line;
      }
    } else if (pTagFlag) {// if paragraph tag is open close it
      htmlFormat += '</p>'
      pTagFlag = false
    }
  });
  lineReader.on('close', () => {
    if (pTagFlag) {// if paragraph tag is open close it
      htmlFormat += '</p>';
    }
    res.send(htmlFormat)
  })
})

module.exports = router