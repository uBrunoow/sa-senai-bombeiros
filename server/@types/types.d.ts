type fastifyNullOpts = object
type fastifyDoneFunction = VoidFunction
interface FastifyRequest {
  body: object
  params: object
}
interface FastifyResponse {
  send: (body: object) => void
  status: (statusCode: number) => FastifyResponse
}
