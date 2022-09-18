# playwright-swagger
<p>
<a href="https://www.npmjs.com/package/playwright-swagger"><img src="https://img.shields.io/npm/v/playwright-swagger.svg" alt="Stable Release" /></a>
<a href="./LICENSE"><img allt="MIT License" src="https://badgen.now.sh/badge/license/MIT"/></a>
</p>

This projects autogenerates strongly typed methods to easily set up [playwright network](https://playwright.dev/docs/network#handle-requests) mocks for API calls based on Swagger OpenAPI definitions.
So, given that you have a [petstore-like API definition](https://petstore.swagger.io/), you could autogenerate a list of [nock helper methods](https://github.com/Shaddix/playwright-swagger/blob/master/examples/pet-client/src/_tests/nock-helpers.ts), to easily mock methods from the API.

****Note that this library requires [dotnet runtime](https://dotnet.microsoft.com/download/dotnet/6.0) installed on your machine! If you have runtime different from .NET Core 6, please add a [switch](https://github.com/RicoSuter/NSwag/tree/master/src/NSwag.Npm#change-runtime) (e.g. `/runtime:Net50`) to all commands.****
## How to use
Check out [tests](https://github.com/Shaddix/playwright-swagger/blob/963de857fd6abbe42ad1172f47cd118b2efe3a05/examples/pet-client/src/_tests/App.test.tsx#L11) for few examples.
Shortly, mocking GET requests will look like this:
```ts
Nock.getPetById({ id: 1 } /* GET parameters with type & intellisense */)
  .reply({ id:1, name: 'mypet' });
```
It's not that different from the Nock itself, just that:
- you don't have to remember/write the URL (it will be filled in automatically)
- you don't have to remember query parameters & their types (intellisense will help you)
- you will have intellisense for Reply as well (so you know the shape of the object to return)

Don't forget to set the base url by calling `setBaseUrl('https://localhost')`.
Also go read the [nock docs](https://github.com/nock/nock#nock) if you have any problem regarding how Nock works.

### More details:
- You get an autogenerated list of functions (function per API endpoint). E.g. `Nock.getPetById`, `Nock.findPetByStatus`, `Nock.addPet`. The 'Nock' part actually depends on your Swagger definition (it's a Controller name, unless it's not empty).
- Each function has the same typings as `nock.post/get/put`, except that the first parameter is not `uri: string`, but a typed interface with path/query parameters. E.g. 
    ```
  getPetById: (
      queryParams: GetPetByIdNockParameters, /* Strongly typed, not just `url: string`  */
      requestBody?: RequestBodyMatcher,
      interceptorOptions?: Options & { preservePreviousInterceptors?: boolean },
  )
  type GetPetByIdNockParameters = {
      petId: number;
  };
  ```
- Each function returns exactly the same Interceptor as `nock.post(...)`, but typings are different. E.g. `reply` function has the following typing:
```ts
    reply(
      responseCode?: StatusCode,
      body?: IPet, /* strongly typed, not just `Body` */
      headers?: ReplyHeaders,
    ): Scope;
```
  All other `reply` overloads are correctly typed as well. Another example (for POST `/store/order`):
```ts
    reply(
      replyFnWithCallback: (
        this: ReplyFnContext,
        uri: string,
        body: Order, /* body is correctly typed */
        callback: (
          err: NodeJS.ErrnoException | null,
          result: ReplyFnResultGeneric<IOrder>, /* result function is typed as well */
        ) => void,
      ) => void,
    ): Scope;
```
Notice, however, that `uri` is still not typed in all `reply` overloads. If you want the actual values of your query parameters, please use `new URLSearchParams(url)`, or some other parsing library.
`playwright-swagger` might someday implement it as well, but it will require rewriting the `reply` function, while currently only typings are different (the `Interceptor` itself is exactly what is returned from nock).

## How to add
Install the package into your project using yarn/npm (as a dev-dependency). You'll also need to add react-query (which you probably already have if you are interested in this library).
```
yarn add -D playwright-swagger
```
Then create/update your autogenerated hooks by calling (adjusting the URL and output path)
```
yarn playwright-swagger /input:https://petstore.swagger.io/v2/swagger.json /output:__tests__/playwrigth-network-helpers.ts
```
You would probably want to add this script to your package.json to call it every time your API changes.

## Configuration
##### setBaseUrl(baseUrl: string)
Sets base URL for all methods

## How does it work
Under the cover it's just 2 template files for [NSwag](https://github.com/RicoSuter/NSwag) and a small script to easily use them.

## Contributions and support
Issues and Pull Requests are welcome.

For any kind of private consulting or support you could contact [Artur Drobinskiy](https://github.com/Shaddix) directly via email.