var getNode = function (domApi) {
  return function (tagName, attributes, children) {
    var element = domApi.createElement(tagName)
    if (typeof attributes === 'object') {
      var keys = Object.keys(attributes)
      for (var idx = 0; idx < keys.length; idx++) {
        console.log(keys[idx], attributes[keys[idx]])
        element[keys[idx]] = attributes[keys[idx]]
      }
    }
    if (typeof children !== 'undefined') {
      for (var child = 0; child < children.length; child++) {
        element.appendChild(children[idx])
      }
    }
    return element
  }
}
export default getNode
