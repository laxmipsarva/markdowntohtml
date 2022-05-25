const tags = {
  '#': 'h1',
  '##': 'h2',
  '###': 'h3',
  '####': 'h4',
  '#####': 'h5',
  '######': 'h6',
}

const replaceWithLink = (line) => {
  const linkDetails = line.match(/\[(.*?)\]\((.*?)\)/);
  if (linkDetails) {
    const href = linkDetails[2];
    const linkText = linkDetails[1];
    line = line.replace(/\[(.*?)\]\((.*?)\)/, `<a href="${href}">${linkText}</a>`);
  }
  return line
}

module.exports = {
  tags,
  replaceWithLink
}