import { AsyncStorage } from 'react-native'

/*
* Storage can store and load locally using AsyncStorage
* To call a function you must await answer
* For example Storage.getCourses().then( courses => console.log(courses) )
* Otherwise the function calling it won't get response before Async is handled
*/
class Storage{

  static async getCourse(courseId){
    try {
      const value = await AsyncStorage.getItem('courses')
      var course = JSON.parse(value)[courseId]
      course.courseId = courseId
      return course
    } catch (e){
      console.log(e)
    }
  }

  static async getCourses(){
    try {
      const value = await AsyncStorage.getItem('courses')
      var courses = JSON.parse(value)
      return courses
    } catch (e) {
      console.log(e)
    }
  }

  static async saveCourse(courseId, courseName, lessons){
    try {
      let courseObj = {}
      courseObj[courseId] = {
        "name": courseName,
        "lessons": lessons
      }
      await AsyncStorage.mergeItem('courses', JSON.stringify(courseObj))
    } catch (e) {
      console.log(e)
    }
  }

  static async removeCourse(courseId) {
    try {
      let courseList = JSON.parse(await AsyncStorage.getItem('courses'))
      delete courseList[courseId]
      await AsyncStorage.setItem('courses', JSON.stringify(courseList))
    } catch (e) {
      console.log(e)
    }
  }

  static async evaluatorsToDownload(idList) {
    try {
      const loaded = await AsyncStorage.getItem('evaluators')
      var evaluators = JSON.parse(loaded) || []
      // Filter out duplicate evaluators in the course
      let nonDuplicateIdList = idList.filter((evalId, pos) => {
        return idList.indexOf(evalId)===pos
      })
      // Filter out evaluators we already have downloaded
      let neededEvaluators = nonDuplicateIdList.filter((evalId) => {
        return !evaluators.hasOwnProperty(evalId)
      })
      console.log("The evaluators needed are " + neededEvaluators)
      return neededEvaluators
    } catch (e) {
      console.log(e)
    }
  }

  static async saveEvaluator(evaluatorId, evaluatorScript) {
    try {
      console.log("Storing evaluator")
      let evalObj = {}
      evalObj[evaluatorId] = {
        "script": evaluatorScript
      }
      await AsyncStorage.mergeItem('evaluators', JSON.stringify(evalObj))
    } catch (e) {
      console.log(e)
    }
  }

  static async evaluate(evaluatorId, choice, key) {
    let evalScript = await this.loadEvaluator(evaluatorId)
    let param = choice
    let isCorrect = eval(evalScript)
    return isCorrect
  }

  // "Private"-ish function only to be used by class itself
  static async loadEvaluator(evaluatorId) {
    try {
      const loadedEvals = await AsyncStorage.getItem('evaluators')
      let evaluators = JSON.parse(loadedEvals)
      return evaluators[evaluatorId].script
    } catch (e) {
      console.log(e)
    }
  }

  static async saveSlidePos(courseId, lessonName, pos) {
    try {
      const value = await AsyncStorage.getItem('courses')
      const allCourses = JSON.parse(value)
      allCourses[courseId].lessons.forEach((lesson) => {
        if (lesson.name === lessonName)
          lesson["savedPos"] = pos
      })
      await AsyncStorage.mergeItem('courses', JSON.stringify(allCourses))
    } catch(e) {
      console.log(e)
    }
  }

  static async getSavedLessonProgress(courseId, lessonName) {
    try {
      const value = await AsyncStorage.getItem('courses')
      const allCourses = JSON.parse(value)
      let pos
      let length
      allCourses[courseId][lessons].forEach((lesson) => {
        if (lesson.name === lessonName)
          pos = lesson.savedPos
          length = lesson.material.length
      })
      return pos/length
    } catch(e) {
      console.log(e)
    }
  }

  static async loadLastSession(){
    try {
      const session = await AsyncStorage.getItem('lastSession')
      console.log("Loading the last session")
      console.log(session)
      return JSON.parse(session)
    } catch(e) {
      console.log(e)
    }
  }

  static async saveLastSession(courseId, lessonName, currentSlidePos){
    try {
      let session = {
        courseId,
        lessonName
      }
      await AsyncStorage.setItem('lastSession', JSON.stringify(session))
    } catch(e) {
      console.log(e)
    }
  }

  static async removeLastSession(){
    try {
      let session = {}
      await AsyncStorage.setItem('lastSession', JSON.stringify(session))
    } catch(e) {
      console.log(e)
    }
  }

}

export default Storage
