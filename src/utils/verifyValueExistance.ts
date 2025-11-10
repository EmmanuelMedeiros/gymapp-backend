import { HttpResponse } from "../utils/httpResponses";

export function verifyValueExistance(obj: any) {
  Object.entries(obj).forEach((value) => {
    if (!value[1]) {
      throw HttpResponse.badRequest({
        message: `The parameter ${value[0]} must be passed`,
      });
    }
  });
}
