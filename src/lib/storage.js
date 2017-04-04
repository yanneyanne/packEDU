import { AsyncStorage } from 'react-native'

/*
* Storage can stora and load locally using AsyncStorage
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
      await AsyncStorage.mergeItem('courses', JSON.stringify(courseObj)
      )
    } catch (e) {
      console.log(e)
    }

  }

}

export default Storage
