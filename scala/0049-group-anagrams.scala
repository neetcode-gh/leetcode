import scala.collection.mutable.{Map => MMap}
object Solution {
  def groupAnagrams(strs: Array[String]): List[List[String]] = {
    val resultMap = MMap[MMap[Char, Int], List[String]]()
    strs
      .map(str => (str, letterCountMap(str)))
      .foreach { tupled =>
        tupled match {
          case (str, aMap) => {
            resultMap.updateWith(aMap) {
              case Some(listOfStrings) => Some(listOfStrings :+ str)
              case None => Some(List(str))
            }
          }
        }
      }
      resultMap.values.toList
  }

  def letterCountMap(str: String): MMap[Char, Int] = {
    val map = MMap[Char, Int]()
    str.foreach{ char =>
      map.updateWith(char){
        case Some(value) => Some(value + 1)
        case None => Some(1)
      }
    }
    map
  }
}
