
import Parser from '../src/lib/slideCompile/Parser'


const slide1 = "Slide 1"
const slide2 = "Slide 2"
const dummyMaterial = "<slide>" + slide1 +"</slide><slide>" + slide2 + "</slide>"

test('has correct slide delimiters', () => {
  expect(Parser.slideOpener).toBe("<slide>")
  expect(Parser.slideCloser).toBe("</slide>")
})

test('get correct material in first slide', () => {
  expect(Parser.isolateSlide(0, dummyMaterial)).toBe(slide1)
})

test('gets correct next slide position', () => {
  expect(Parser.getNextSlidePosition(0, dummyMaterial)).toBe(
      dummyMaterial.lastIndexOf("<slide>"))
})

test('gets correct previous slide position', () => {
  let slide2Pos = dummyMaterial.lastIndexOf("<slide>") 
  expect(Parser.getPreviousSlidePosition(slide2Pos, dummyMaterial)).toBe(0)
})

const simpleTag = "<text>"

test('can correctly parse a simple tag', () => {
  let result = Parser.parseOpeningTag(simpleTag)
})

const complexTag = "<interaction type=\"multiple_choice_quiz\" answer=\"To prevent dehydration\" evaluator=\"1a2b3c\"></interaction>"

test('can correctly parse a complex tag', () => {
  let result = Parser.parseOpeningTag(complexTag)
  console.log(result)
})
