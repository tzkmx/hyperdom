var getNode = function (domApi) {
  function isVnode (obj) {
    return (typeof obj === 'object' &&
      typeof obj.tagName === 'string' &&
      typeof obj.length === 'undefined')
  }
  function appendChild (element, child) {
    if (typeof element.innerHTML !== 'undefined' &&
      typeof child.innerHTML !== 'undefined') {
      element.appendChild(child)
      return
    }
    if (isVnode(child)) {
      element.appendChild(getNode(domApi)(child))
      return
    }

    if (typeof child === 'number' || typeof child === 'string') {
      element.textContent += child.toString()
    }
  }

  return function (tagName, attributes, children) {
    var element = domApi.createElement(tagName)

    if (typeof attributes === 'object') {
      var keys = Object.keys(attributes)
      for (var idx = 0; idx < keys.length; idx++) {
        element[keys[idx]] = attributes[keys[idx]]
      }
    }

    if (typeof children === 'object' && typeof children.length === 'number') {
      for (var child = 0; child <= children.length; child++) {
        appendChild(element, children[child])
      }
    } else {
      if (typeof children !== 'undefined') {
        appendChild(element, children)
      }
    }

    return element
  }
}
