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

  static async saveCourse(courseId, courseName, courseMaterial){
    try {
      let courseObj = {}
      courseObj[courseId] = {
        "name": courseName,
        "material": courseMaterial
      }
      await AsyncStorage.mergeItem('courses', JSON.stringify(courseObj))
    } catch (e) {
      console.log(e)
    }
  }

  static async evaluatorsToDownload(idList) {
    try {
      const loaded = await AsyncStorage.getItem('evaluators')
      var evaluators = JSON.parse(loaded) || []
      // Filter out evaluators we already have downloaded
      let neededEvaluators = idList.filter((evalId) => {
        return evaluators.indexOf(evalId) < 0
      })
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
    eval(evalScript)
  }

  static async loadEvaluator(evaluatorId) {
    try {
      const loadedEvals = await AsyncStorage.getItem('evaluators')
      let evaluators = JSON.parse(loadedEvals)
      return evaluators[evaluatorId].script
    } catch (e) {
      console.log(e) 
    }
  }
}

export default Storage
