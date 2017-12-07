/* global afterEach, beforeEach, describe, expect, jasmine, it, xit, spyOn,
   jQuery, getNode */
// specs code
describe('getNode', function () {
  var elConstructor

  describe('basic asumptions', function () {
    var domApi = {
      createElement: function (tag) {
        var children = []
        var _textContent = ''
        var _appendChild = function (child) {
          _textContent += child
        }
        var element = {
          tagName: tag,
          textContent: _textContent,
          children: children,
          appendChild: _appendChild
        }
        return element
      }
    }

    beforeEach(function () {
      spyOn(domApi, 'createElement').and.callThrough()
      elConstructor = getNode(domApi)
    })

    it('is a function until a parameter is received', function () {
      expect(elConstructor).toEqual(jasmine.any(Function))
    })

    it('calls domApi to create an Element', function () {
      var element = elConstructor('span')

      expect(element).toBeDefined()
      expect(domApi.createElement).toHaveBeenCalledWith('span')
    })

    it('assigns attributes passed to it', function () {
      var attrs = {
        'className': 'test',
        'id': 'time'
      }
      var element = elConstructor('p', attrs)

      expect(domApi.createElement).toHaveBeenCalledWith('p')
      expect(element).toEqual(jasmine.objectContaining(attrs))
    })

    describe('inserts children into the element as requested', function () {
      var child1 = 'hey'
      var child2 = 'you'
      var child3 = (new Date()).toISOString()
      var element
      beforeEach(function () {
        element = elConstructor('div', {}, [child1, child2])
      })

      it('inserts several children at once on creation', function () {
        expect(domApi.createElement).toHaveBeenCalledWith('div')
        expect(element.textContent).toEqual(child1 + child2)
      })

      it('appends children through API when called', function () {
        spyOn(element, 'appendChild').and.callThrough()
        element.appendChild(child3)

        expect(element.appendChild).toHaveBeenCalledWith(child3)
      })

      xit('keeps previous children when API called', function () {
        element.appendChild(child3)

        expect(element.textContent).toContain(child3)
        expect(element.textContent).toEqual(child1 + child2 + child3)
      })
    })
  })

  describe('tests against document fixture', function () {
    beforeEach(function () {
      elConstructor = getNode(document)
    })

    afterEach(function () {
      jQuery('#fixtures').html('')
    })

    it('attaches handlers to onclick attribute', function () {
      var callToSpy = jasmine.createSpy('clickin')

      var element = elConstructor('div', {
        className: 'interactive',
        onclick: callToSpy
      })

      document.getElementById('fixtures').appendChild(element)
      jQuery('#fixtures .interactive').trigger('click')

      expect(callToSpy).toHaveBeenCalled()
    })

    it('attaches handlers to onkeypress attribute', function () {
      var keypressHandler = jasmine.createSpy('keypress')
      var keypressEvent = jQuery.Event('keypress')
      keypressEvent.key = 'K'

      var element = elConstructor('input', {
        type: 'text',
        id: 'keysInput',
        onkeypress: keypressHandler
      })

      document.getElementById('fixtures').appendChild(element)
      jQuery('#fixtures #keysInput').trigger(keypressEvent)

      expect(keypressHandler).toHaveBeenCalledWith(keypressEvent)
    })

    it('creates children elements', function () {
      spyOn(document, 'createElement').and.callThrough()
      var element = elConstructor('div', {
        className: 'container'
      }, elConstructor('p', { className: 'smooth' }, 'jazz'))

      expect(element.innerHTML).toEqual('<p class="smooth">jazz</p>')
      expect(document.createElement).toHaveBeenCalledWith('div')
      expect(document.createElement).toHaveBeenCalledWith('p')
    })
  })
})
