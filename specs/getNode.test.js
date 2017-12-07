
// specs code
describe('getNode', function() {
  var elConstructor

  describe('basic asumptions', function() {
    var domApi = {
      createElement: function(tag) {
        var children = []
        return {
          tagName: tag,
          children: children,
          appendChild: function(child) {
            children.push(child)
          }
        }
      }
    }
    beforeEach(function() {
      spyOn(domApi, 'createElement').and.callThrough()
      elConstructor = getNode(domApi)
    })

    it('is a function until a parameter is received', function() {
      expect(elConstructor).toEqual(jasmine.any(Function))
    })
    it('calls domApi to create an Element', function() {
      var element = elConstructor('span')
      expect(element).toBeDefined()
      expect(domApi.createElement).toHaveBeenCalledWith('span')
    })
    it('assigns attributes passed to it', function() {
      var attrs = {
        'className': 'test',
        'id': 'time'
      }
      var element = elConstructor('p', attrs)
      expect(domApi.createElement).toHaveBeenCalledWith('p')
      expect(element).toEqual(jasmine.objectContaining(attrs))
    })
  })
});
