export class Require{
  public static thatParameterIsDefined(object, errorMessage: string) {
    if(!object || object === undefined) {
      throw Error(errorMessage);
    }
  }
}