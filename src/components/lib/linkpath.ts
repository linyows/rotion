export const getLinkPathAndLinkKey = (link: string): [string, string] => {
  const linkArray = link.split('[')
  if (link === '') {
    return ['/', '']
  } else if (linkArray.length < 2) {
    console.log('link format is wrong, example: /path/to/[slug]')
    return ['', '']
  }
  return [linkArray[0], linkArray[1].split(']')[0]]
}
