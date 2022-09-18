/* eslint-disable */

type UploadFilePWMockPathParameters = {
  petId: number;
};
type UploadFilePWMockParameters = {} & UploadFilePWMockPathParameters;

type FindPetsByStatusPWMockParameters = {
  status?: Status[];
};

type FindPetsByTagsPWMockParameters = {
  tags?: string[];
};

type GetPetByIdPWMockPathParameters = {
  petId: number;
};
type GetPetByIdPWMockParameters = {} & GetPetByIdPWMockPathParameters;

type UpdatePetWithFormPWMockPathParameters = {
  petId: number;
};
type UpdatePetWithFormPWMockParameters =
  {} & UpdatePetWithFormPWMockPathParameters;

type DeletePetPWMockPathParameters = {
  petId: number;
};
type DeletePetPWMockParameters = {} & DeletePetPWMockPathParameters;

type GetOrderByIdPWMockPathParameters = {
  orderId: number;
};
type GetOrderByIdPWMockParameters = {} & GetOrderByIdPWMockPathParameters;

type DeleteOrderPWMockPathParameters = {
  orderId: number;
};
type DeleteOrderPWMockParameters = {} & DeleteOrderPWMockPathParameters;

type GetUserByNamePWMockPathParameters = {
  username: string;
};
type GetUserByNamePWMockParameters = {} & GetUserByNamePWMockPathParameters;

type UpdateUserPWMockPathParameters = {
  username: string;
};
type UpdateUserPWMockParameters = {} & UpdateUserPWMockPathParameters;

type DeleteUserPWMockPathParameters = {
  username: string;
};
type DeleteUserPWMockParameters = {} & DeleteUserPWMockPathParameters;

type LoginUserPWMockParameters = {
  username?: string;
  password?: string;
};

export const PWMock = {
  /*
   * uploads an image
   */
  uploadFile: (
    context: ObjectWithRouteFn,
    routeParams: UploadFilePWMockPathParameters,
    handler: (
      route: Route & {
        fulfillBody: (
          params: Omit<Parameters<Route['fulfill']>[0], 'body'> & {
            body: IApiResponse;
          },
        ) => void;
      },
      request: Request & {
        queryParams: UploadFilePWMockParameters;
      },
    ) => void,
  ) => {
    let url_ = '/pet/{petId}/uploadImage';
    if (routeParams.petId !== null && routeParams.petId !== undefined)
      url_ = url_.replace(
        '{petId}',
        encodeURIComponent('' + routeParams.petId),
      );
    else url_ = url_.replace('{petId}', '[^/^?]*?');
    context.route(
      new RegExp(getBaseUrl() + url_ + '([?]|$)'),
      (route, request) => {
        const url = new URL(request.url());
        const urlParams = PWMock.parseUploadFileUrl(url);
        (route as any).fulfillBody = (params: any) => {
          route.fulfill({
            ...params,
            body: JSON.stringify(params.body),
          });
        };
        handler(route as any, {
          ...request,
          queryParams: urlParams,
        });
      },
    );
  },

  parseUploadFileUrl(url: URL): UploadFilePWMockParameters {
    let regex = '/pet/{petId}/uploadImage([?]|$)';
    regex = regex.replace('{petId}', '(?<petId>.*?)');
    const match = new RegExp(regex).exec(url.pathname);

    const queryParams = {
      petId: match?.groups?.['petId'],
    };

    return {
      petId: !queryParams.petId
        ? queryParams.petId
        : (parseInt(queryParams.petId) as any),
    };
  },

  /*
   * Add a new pet to the store
   */
  addPet: (
    context: ObjectWithRouteFn,
    handler: (
      route: Route & {
        fulfillBody: (
          params: Omit<Parameters<Route['fulfill']>[0], 'body'> & {
            body: void;
          },
        ) => void;
      },
      request: Request & {
        body: Pet;
      },
    ) => void,
  ) => {
    let url_ = '/pet';
    context.route(
      new RegExp(getBaseUrl() + url_ + '([?]|$)'),
      (route, request) => {
        (route as any).fulfillBody = (params: any) => {
          route.fulfill({
            ...params,
            body: JSON.stringify(params.body),
          });
        };
        handler(route as any, {
          ...request,
          body: request.postDataJSON(),
        });
      },
    );
  },

  /*
   * Update an existing pet
   */
  updatePet: (
    context: ObjectWithRouteFn,
    handler: (
      route: Route & {
        fulfillBody: (
          params: Omit<Parameters<Route['fulfill']>[0], 'body'> & {
            body: void;
          },
        ) => void;
      },
      request: Request & {
        body: Pet;
      },
    ) => void,
  ) => {
    let url_ = '/pet';
    context.route(
      new RegExp(getBaseUrl() + url_ + '([?]|$)'),
      (route, request) => {
        (route as any).fulfillBody = (params: any) => {
          route.fulfill({
            ...params,
            body: JSON.stringify(params.body),
          });
        };
        handler(route as any, {
          ...request,
          body: request.postDataJSON(),
        });
      },
    );
  },

  /*
   * Finds Pets by status
   */
  findPetsByStatus: (
    context: ObjectWithRouteFn,
    handler: (
      route: Route & {
        fulfillBody: (
          params: Omit<Parameters<Route['fulfill']>[0], 'body'> & {
            body: Pet[];
          },
        ) => void;
      },
      request: Request & {
        queryParams: FindPetsByStatusPWMockParameters;
      },
    ) => void,
  ) => {
    let url_ = '/pet/findByStatus';
    context.route(
      new RegExp(getBaseUrl() + url_ + '([?]|$)'),
      (route, request) => {
        const url = new URL(request.url());
        const urlParams = PWMock.parseFindPetsByStatusUrl(url);
        (route as any).fulfillBody = (params: any) => {
          route.fulfill({
            ...params,
            body: JSON.stringify(params.body),
          });
        };
        handler(route as any, {
          ...request,
          queryParams: urlParams,
        });
      },
    );
  },

  parseFindPetsByStatusUrl(url: URL): FindPetsByStatusPWMockParameters {
    const queryParams = {
      status: url.searchParams.getAll('status'),
    };

    return {
      status: !queryParams.status
        ? queryParams.status
        : (queryParams.status as any),
    };
  },

  /*
   * Finds Pets by tags
   * @deprecated
   */
  findPetsByTags: (
    context: ObjectWithRouteFn,
    handler: (
      route: Route & {
        fulfillBody: (
          params: Omit<Parameters<Route['fulfill']>[0], 'body'> & {
            body: Pet[];
          },
        ) => void;
      },
      request: Request & {
        queryParams: FindPetsByTagsPWMockParameters;
      },
    ) => void,
  ) => {
    let url_ = '/pet/findByTags';
    context.route(
      new RegExp(getBaseUrl() + url_ + '([?]|$)'),
      (route, request) => {
        const url = new URL(request.url());
        const urlParams = PWMock.parseFindPetsByTagsUrl(url);
        (route as any).fulfillBody = (params: any) => {
          route.fulfill({
            ...params,
            body: JSON.stringify(params.body),
          });
        };
        handler(route as any, {
          ...request,
          queryParams: urlParams,
        });
      },
    );
  },

  parseFindPetsByTagsUrl(url: URL): FindPetsByTagsPWMockParameters {
    const queryParams = {
      tags: url.searchParams.getAll('tags'),
    };

    return {
      tags: !queryParams.tags ? queryParams.tags : (queryParams.tags as any),
    };
  },

  /*
   * Find pet by ID
   */
  getPetById: (
    context: ObjectWithRouteFn,
    routeParams: GetPetByIdPWMockPathParameters,
    handler: (
      route: Route & {
        fulfillBody: (
          params: Omit<Parameters<Route['fulfill']>[0], 'body'> & {
            body: IPet;
          },
        ) => void;
      },
      request: Request & {
        queryParams: GetPetByIdPWMockParameters;
      },
    ) => void,
  ) => {
    let url_ = '/pet/{petId}';
    if (routeParams.petId !== null && routeParams.petId !== undefined)
      url_ = url_.replace(
        '{petId}',
        encodeURIComponent('' + routeParams.petId),
      );
    else url_ = url_.replace('{petId}', '[^/^?]*?');
    context.route(
      new RegExp(getBaseUrl() + url_ + '([?]|$)'),
      (route, request) => {
        const url = new URL(request.url());
        const urlParams = PWMock.parseGetPetByIdUrl(url);
        (route as any).fulfillBody = (params: any) => {
          route.fulfill({
            ...params,
            body: JSON.stringify(params.body),
          });
        };
        handler(route as any, {
          ...request,
          queryParams: urlParams,
        });
      },
    );
  },

  parseGetPetByIdUrl(url: URL): GetPetByIdPWMockParameters {
    let regex = '/pet/{petId}([?]|$)';
    regex = regex.replace('{petId}', '(?<petId>.*?)');
    const match = new RegExp(regex).exec(url.pathname);

    const queryParams = {
      petId: match?.groups?.['petId'],
    };

    return {
      petId: !queryParams.petId
        ? queryParams.petId
        : (parseInt(queryParams.petId) as any),
    };
  },

  /*
   * Updates a pet in the store with form data
   */
  updatePetWithForm: (
    context: ObjectWithRouteFn,
    routeParams: UpdatePetWithFormPWMockPathParameters,
    handler: (
      route: Route & {
        fulfillBody: (
          params: Omit<Parameters<Route['fulfill']>[0], 'body'> & {
            body: void;
          },
        ) => void;
      },
      request: Request & {
        queryParams: UpdatePetWithFormPWMockParameters;
      },
    ) => void,
  ) => {
    let url_ = '/pet/{petId}';
    if (routeParams.petId !== null && routeParams.petId !== undefined)
      url_ = url_.replace(
        '{petId}',
        encodeURIComponent('' + routeParams.petId),
      );
    else url_ = url_.replace('{petId}', '[^/^?]*?');
    context.route(
      new RegExp(getBaseUrl() + url_ + '([?]|$)'),
      (route, request) => {
        const url = new URL(request.url());
        const urlParams = PWMock.parseUpdatePetWithFormUrl(url);
        (route as any).fulfillBody = (params: any) => {
          route.fulfill({
            ...params,
            body: JSON.stringify(params.body),
          });
        };
        handler(route as any, {
          ...request,
          queryParams: urlParams,
        });
      },
    );
  },

  parseUpdatePetWithFormUrl(url: URL): UpdatePetWithFormPWMockParameters {
    let regex = '/pet/{petId}([?]|$)';
    regex = regex.replace('{petId}', '(?<petId>.*?)');
    const match = new RegExp(regex).exec(url.pathname);

    const queryParams = {
      petId: match?.groups?.['petId'],
    };

    return {
      petId: !queryParams.petId
        ? queryParams.petId
        : (parseInt(queryParams.petId) as any),
    };
  },

  /*
   * Deletes a pet
   */
  deletePet: (
    context: ObjectWithRouteFn,
    routeParams: DeletePetPWMockPathParameters,
    handler: (
      route: Route & {
        fulfillBody: (
          params: Omit<Parameters<Route['fulfill']>[0], 'body'> & {
            body: void;
          },
        ) => void;
      },
      request: Request & {
        queryParams: DeletePetPWMockParameters;
      },
    ) => void,
  ) => {
    let url_ = '/pet/{petId}';
    if (routeParams.petId !== null && routeParams.petId !== undefined)
      url_ = url_.replace(
        '{petId}',
        encodeURIComponent('' + routeParams.petId),
      );
    else url_ = url_.replace('{petId}', '[^/^?]*?');
    context.route(
      new RegExp(getBaseUrl() + url_ + '([?]|$)'),
      (route, request) => {
        const url = new URL(request.url());
        const urlParams = PWMock.parseDeletePetUrl(url);
        (route as any).fulfillBody = (params: any) => {
          route.fulfill({
            ...params,
            body: JSON.stringify(params.body),
          });
        };
        handler(route as any, {
          ...request,
          queryParams: urlParams,
        });
      },
    );
  },

  parseDeletePetUrl(url: URL): DeletePetPWMockParameters {
    let regex = '/pet/{petId}([?]|$)';
    regex = regex.replace('{petId}', '(?<petId>.*?)');
    const match = new RegExp(regex).exec(url.pathname);

    const queryParams = {
      petId: match?.groups?.['petId'],
    };

    return {
      petId: !queryParams.petId
        ? queryParams.petId
        : (parseInt(queryParams.petId) as any),
    };
  },

  /*
   * Place an order for a pet
   */
  placeOrder: (
    context: ObjectWithRouteFn,
    handler: (
      route: Route & {
        fulfillBody: (
          params: Omit<Parameters<Route['fulfill']>[0], 'body'> & {
            body: IOrder;
          },
        ) => void;
      },
      request: Request & {
        body: Order;
      },
    ) => void,
  ) => {
    let url_ = '/store/order';
    context.route(
      new RegExp(getBaseUrl() + url_ + '([?]|$)'),
      (route, request) => {
        (route as any).fulfillBody = (params: any) => {
          route.fulfill({
            ...params,
            body: JSON.stringify(params.body),
          });
        };
        handler(route as any, {
          ...request,
          body: request.postDataJSON(),
        });
      },
    );
  },

  /*
   * Find purchase order by ID
   */
  getOrderById: (
    context: ObjectWithRouteFn,
    routeParams: GetOrderByIdPWMockPathParameters,
    handler: (
      route: Route & {
        fulfillBody: (
          params: Omit<Parameters<Route['fulfill']>[0], 'body'> & {
            body: IOrder;
          },
        ) => void;
      },
      request: Request & {
        queryParams: GetOrderByIdPWMockParameters;
      },
    ) => void,
  ) => {
    let url_ = '/store/order/{orderId}';
    if (routeParams.orderId !== null && routeParams.orderId !== undefined)
      url_ = url_.replace(
        '{orderId}',
        encodeURIComponent('' + routeParams.orderId),
      );
    else url_ = url_.replace('{orderId}', '[^/^?]*?');
    context.route(
      new RegExp(getBaseUrl() + url_ + '([?]|$)'),
      (route, request) => {
        const url = new URL(request.url());
        const urlParams = PWMock.parseGetOrderByIdUrl(url);
        (route as any).fulfillBody = (params: any) => {
          route.fulfill({
            ...params,
            body: JSON.stringify(params.body),
          });
        };
        handler(route as any, {
          ...request,
          queryParams: urlParams,
        });
      },
    );
  },

  parseGetOrderByIdUrl(url: URL): GetOrderByIdPWMockParameters {
    let regex = '/store/order/{orderId}([?]|$)';
    regex = regex.replace('{orderId}', '(?<orderId>.*?)');
    const match = new RegExp(regex).exec(url.pathname);

    const queryParams = {
      orderId: match?.groups?.['orderId'],
    };

    return {
      orderId: !queryParams.orderId
        ? queryParams.orderId
        : (parseInt(queryParams.orderId) as any),
    };
  },

  /*
   * Delete purchase order by ID
   */
  deleteOrder: (
    context: ObjectWithRouteFn,
    routeParams: DeleteOrderPWMockPathParameters,
    handler: (
      route: Route & {
        fulfillBody: (
          params: Omit<Parameters<Route['fulfill']>[0], 'body'> & {
            body: void;
          },
        ) => void;
      },
      request: Request & {
        queryParams: DeleteOrderPWMockParameters;
      },
    ) => void,
  ) => {
    let url_ = '/store/order/{orderId}';
    if (routeParams.orderId !== null && routeParams.orderId !== undefined)
      url_ = url_.replace(
        '{orderId}',
        encodeURIComponent('' + routeParams.orderId),
      );
    else url_ = url_.replace('{orderId}', '[^/^?]*?');
    context.route(
      new RegExp(getBaseUrl() + url_ + '([?]|$)'),
      (route, request) => {
        const url = new URL(request.url());
        const urlParams = PWMock.parseDeleteOrderUrl(url);
        (route as any).fulfillBody = (params: any) => {
          route.fulfill({
            ...params,
            body: JSON.stringify(params.body),
          });
        };
        handler(route as any, {
          ...request,
          queryParams: urlParams,
        });
      },
    );
  },

  parseDeleteOrderUrl(url: URL): DeleteOrderPWMockParameters {
    let regex = '/store/order/{orderId}([?]|$)';
    regex = regex.replace('{orderId}', '(?<orderId>.*?)');
    const match = new RegExp(regex).exec(url.pathname);

    const queryParams = {
      orderId: match?.groups?.['orderId'],
    };

    return {
      orderId: !queryParams.orderId
        ? queryParams.orderId
        : (parseInt(queryParams.orderId) as any),
    };
  },

  /*
   * Returns pet inventories by status
   */
  getInventory: (
    context: ObjectWithRouteFn,
    handler: (
      route: Route & {
        fulfillBody: (
          params: Omit<Parameters<Route['fulfill']>[0], 'body'> & {
            body: { [key: string]: number };
          },
        ) => void;
      },
      request: Request,
    ) => void,
  ) => {
    let url_ = '/store/inventory';
    context.route(
      new RegExp(getBaseUrl() + url_ + '([?]|$)'),
      (route, request) => {
        (route as any).fulfillBody = (params: any) => {
          route.fulfill({
            ...params,
            body: JSON.stringify(params.body),
          });
        };
        handler(route as any, {
          ...request,
        });
      },
    );
  },

  /*
   * Creates list of users with given input array
   */
  createUsersWithArrayInput: (
    context: ObjectWithRouteFn,
    handler: (
      route: Route & {
        fulfillBody: (
          params: Omit<Parameters<Route['fulfill']>[0], 'body'> & {
            body: void;
          },
        ) => void;
      },
      request: Request & {
        body: User[];
      },
    ) => void,
  ) => {
    let url_ = '/user/createWithArray';
    context.route(
      new RegExp(getBaseUrl() + url_ + '([?]|$)'),
      (route, request) => {
        (route as any).fulfillBody = (params: any) => {
          route.fulfill({
            ...params,
            body: JSON.stringify(params.body),
          });
        };
        handler(route as any, {
          ...request,
          body: request.postDataJSON(),
        });
      },
    );
  },

  /*
   * Creates list of users with given input array
   */
  createUsersWithListInput: (
    context: ObjectWithRouteFn,
    handler: (
      route: Route & {
        fulfillBody: (
          params: Omit<Parameters<Route['fulfill']>[0], 'body'> & {
            body: void;
          },
        ) => void;
      },
      request: Request & {
        body: User[];
      },
    ) => void,
  ) => {
    let url_ = '/user/createWithList';
    context.route(
      new RegExp(getBaseUrl() + url_ + '([?]|$)'),
      (route, request) => {
        (route as any).fulfillBody = (params: any) => {
          route.fulfill({
            ...params,
            body: JSON.stringify(params.body),
          });
        };
        handler(route as any, {
          ...request,
          body: request.postDataJSON(),
        });
      },
    );
  },

  /*
   * Get user by user name
   */
  getUserByName: (
    context: ObjectWithRouteFn,
    routeParams: GetUserByNamePWMockPathParameters,
    handler: (
      route: Route & {
        fulfillBody: (
          params: Omit<Parameters<Route['fulfill']>[0], 'body'> & {
            body: IUser;
          },
        ) => void;
      },
      request: Request & {
        queryParams: GetUserByNamePWMockParameters;
      },
    ) => void,
  ) => {
    let url_ = '/user/{username}';
    if (routeParams.username !== null && routeParams.username !== undefined)
      url_ = url_.replace(
        '{username}',
        encodeURIComponent('' + routeParams.username),
      );
    else url_ = url_.replace('{username}', '[^/^?]*?');
    context.route(
      new RegExp(getBaseUrl() + url_ + '([?]|$)'),
      (route, request) => {
        const url = new URL(request.url());
        const urlParams = PWMock.parseGetUserByNameUrl(url);
        (route as any).fulfillBody = (params: any) => {
          route.fulfill({
            ...params,
            body: JSON.stringify(params.body),
          });
        };
        handler(route as any, {
          ...request,
          queryParams: urlParams,
        });
      },
    );
  },

  parseGetUserByNameUrl(url: URL): GetUserByNamePWMockParameters {
    let regex = '/user/{username}([?]|$)';
    regex = regex.replace('{username}', '(?<username>.*?)');
    const match = new RegExp(regex).exec(url.pathname);

    const queryParams = {
      username: match?.groups?.['username'],
    };

    return {
      username: !queryParams.username
        ? queryParams.username
        : (queryParams.username as any),
    };
  },

  /*
   * Updated user
   */
  updateUser: (
    context: ObjectWithRouteFn,
    routeParams: UpdateUserPWMockPathParameters,
    handler: (
      route: Route & {
        fulfillBody: (
          params: Omit<Parameters<Route['fulfill']>[0], 'body'> & {
            body: void;
          },
        ) => void;
      },
      request: Request & {
        queryParams: UpdateUserPWMockParameters;
      } & {
        body: User;
      },
    ) => void,
  ) => {
    let url_ = '/user/{username}';
    if (routeParams.username !== null && routeParams.username !== undefined)
      url_ = url_.replace(
        '{username}',
        encodeURIComponent('' + routeParams.username),
      );
    else url_ = url_.replace('{username}', '[^/^?]*?');
    context.route(
      new RegExp(getBaseUrl() + url_ + '([?]|$)'),
      (route, request) => {
        const url = new URL(request.url());
        const urlParams = PWMock.parseUpdateUserUrl(url);
        (route as any).fulfillBody = (params: any) => {
          route.fulfill({
            ...params,
            body: JSON.stringify(params.body),
          });
        };
        handler(route as any, {
          ...request,
          body: request.postDataJSON(),
          queryParams: urlParams,
        });
      },
    );
  },

  parseUpdateUserUrl(url: URL): UpdateUserPWMockParameters {
    let regex = '/user/{username}([?]|$)';
    regex = regex.replace('{username}', '(?<username>.*?)');
    const match = new RegExp(regex).exec(url.pathname);

    const queryParams = {
      username: match?.groups?.['username'],
    };

    return {
      username: !queryParams.username
        ? queryParams.username
        : (queryParams.username as any),
    };
  },

  /*
   * Delete user
   */
  deleteUser: (
    context: ObjectWithRouteFn,
    routeParams: DeleteUserPWMockPathParameters,
    handler: (
      route: Route & {
        fulfillBody: (
          params: Omit<Parameters<Route['fulfill']>[0], 'body'> & {
            body: void;
          },
        ) => void;
      },
      request: Request & {
        queryParams: DeleteUserPWMockParameters;
      },
    ) => void,
  ) => {
    let url_ = '/user/{username}';
    if (routeParams.username !== null && routeParams.username !== undefined)
      url_ = url_.replace(
        '{username}',
        encodeURIComponent('' + routeParams.username),
      );
    else url_ = url_.replace('{username}', '[^/^?]*?');
    context.route(
      new RegExp(getBaseUrl() + url_ + '([?]|$)'),
      (route, request) => {
        const url = new URL(request.url());
        const urlParams = PWMock.parseDeleteUserUrl(url);
        (route as any).fulfillBody = (params: any) => {
          route.fulfill({
            ...params,
            body: JSON.stringify(params.body),
          });
        };
        handler(route as any, {
          ...request,
          queryParams: urlParams,
        });
      },
    );
  },

  parseDeleteUserUrl(url: URL): DeleteUserPWMockParameters {
    let regex = '/user/{username}([?]|$)';
    regex = regex.replace('{username}', '(?<username>.*?)');
    const match = new RegExp(regex).exec(url.pathname);

    const queryParams = {
      username: match?.groups?.['username'],
    };

    return {
      username: !queryParams.username
        ? queryParams.username
        : (queryParams.username as any),
    };
  },

  /*
   * Logs user into the system
   */
  loginUser: (
    context: ObjectWithRouteFn,
    handler: (
      route: Route & {
        fulfillBody: (
          params: Omit<Parameters<Route['fulfill']>[0], 'body'> & {
            body: string;
          },
        ) => void;
      },
      request: Request & {
        queryParams: LoginUserPWMockParameters;
      },
    ) => void,
  ) => {
    let url_ = '/user/login';
    context.route(
      new RegExp(getBaseUrl() + url_ + '([?]|$)'),
      (route, request) => {
        const url = new URL(request.url());
        const urlParams = PWMock.parseLoginUserUrl(url);
        (route as any).fulfillBody = (params: any) => {
          route.fulfill({
            ...params,
            body: JSON.stringify(params.body),
          });
        };
        handler(route as any, {
          ...request,
          queryParams: urlParams,
        });
      },
    );
  },

  parseLoginUserUrl(url: URL): LoginUserPWMockParameters {
    const queryParams = {
      username: url.searchParams.get('username'),
      password: url.searchParams.get('password'),
    };

    return {
      username: !queryParams.username
        ? queryParams.username
        : (queryParams.username as any),
      password: !queryParams.password
        ? queryParams.password
        : (queryParams.password as any),
    };
  },

  /*
   * Logs out current logged in user session
   */
  logoutUser: (
    context: ObjectWithRouteFn,
    handler: (
      route: Route & {
        fulfillBody: (
          params: Omit<Parameters<Route['fulfill']>[0], 'body'> & {
            body: void;
          },
        ) => void;
      },
      request: Request,
    ) => void,
  ) => {
    let url_ = '/user/logout';
    context.route(
      new RegExp(getBaseUrl() + url_ + '([?]|$)'),
      (route, request) => {
        (route as any).fulfillBody = (params: any) => {
          route.fulfill({
            ...params,
            body: JSON.stringify(params.body),
          });
        };
        handler(route as any, {
          ...request,
        });
      },
    );
  },

  /*
   * Create user
   */
  createUser: (
    context: ObjectWithRouteFn,
    handler: (
      route: Route & {
        fulfillBody: (
          params: Omit<Parameters<Route['fulfill']>[0], 'body'> & {
            body: void;
          },
        ) => void;
      },
      request: Request & {
        body: User;
      },
    ) => void,
  ) => {
    let url_ = '/user';
    context.route(
      new RegExp(getBaseUrl() + url_ + '([?]|$)'),
      (route, request) => {
        (route as any).fulfillBody = (params: any) => {
          route.fulfill({
            ...params,
            body: JSON.stringify(params.body),
          });
        };
        handler(route as any, {
          ...request,
          body: request.postDataJSON(),
        });
      },
    );
  },
};

export class ApiResponse implements IApiResponse {
  code?: number | undefined;
  type?: string | undefined;
  message?: string | undefined;

  constructor(data?: IApiResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.code = _data['code'];
      this.type = _data['type'];
      this.message = _data['message'];
    }
  }

  static fromJS(data: any): ApiResponse {
    data = typeof data === 'object' ? data : {};
    let result = new ApiResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['code'] = this.code;
    data['type'] = this.type;
    data['message'] = this.message;
    return data;
  }
}

export interface IApiResponse {
  code?: number | undefined;
  type?: string | undefined;
  message?: string | undefined;
}

export class Category implements ICategory {
  id?: number | undefined;
  name?: string | undefined;

  constructor(data?: ICategory) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data['id'];
      this.name = _data['name'];
    }
  }

  static fromJS(data: any): Category {
    data = typeof data === 'object' ? data : {};
    let result = new Category();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['id'] = this.id;
    data['name'] = this.name;
    return data;
  }
}

export interface ICategory {
  id?: number | undefined;
  name?: string | undefined;
}

export class Pet implements IPet {
  id?: number | undefined;
  category?: Category | undefined;
  name!: string;
  photoUrls!: string[];
  tags?: Tag[] | undefined;
  /** pet status in the store */
  status?: PetStatus | undefined;

  constructor(data?: IPet) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    if (!data) {
      this.photoUrls = [];
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data['id'];
      this.category = _data['category']
        ? Category.fromJS(_data['category'])
        : <any>undefined;
      this.name = _data['name'];
      if (Array.isArray(_data['photoUrls'])) {
        this.photoUrls = [] as any;
        for (let item of _data['photoUrls']) this.photoUrls!.push(item);
      }
      if (Array.isArray(_data['tags'])) {
        this.tags = [] as any;
        for (let item of _data['tags']) this.tags!.push(Tag.fromJS(item));
      }
      this.status = _data['status'];
    }
  }

  static fromJS(data: any): Pet {
    data = typeof data === 'object' ? data : {};
    let result = new Pet();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['id'] = this.id;
    data['category'] = this.category ? this.category.toJSON() : <any>undefined;
    data['name'] = this.name;
    if (Array.isArray(this.photoUrls)) {
      data['photoUrls'] = [];
      for (let item of this.photoUrls) data['photoUrls'].push(item);
    }
    if (Array.isArray(this.tags)) {
      data['tags'] = [];
      for (let item of this.tags) data['tags'].push(item.toJSON());
    }
    data['status'] = this.status;
    return data;
  }
}

export interface IPet {
  id?: number | undefined;
  category?: Category | undefined;
  name: string;
  photoUrls: string[];
  tags?: Tag[] | undefined;
  /** pet status in the store */
  status?: PetStatus | undefined;
}

export class Tag implements ITag {
  id?: number | undefined;
  name?: string | undefined;

  constructor(data?: ITag) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data['id'];
      this.name = _data['name'];
    }
  }

  static fromJS(data: any): Tag {
    data = typeof data === 'object' ? data : {};
    let result = new Tag();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['id'] = this.id;
    data['name'] = this.name;
    return data;
  }
}

export interface ITag {
  id?: number | undefined;
  name?: string | undefined;
}

export class Order implements IOrder {
  id?: number | undefined;
  petId?: number | undefined;
  quantity?: number | undefined;
  shipDate?: Date | undefined;
  /** Order Status */
  status?: OrderStatus | undefined;
  complete?: boolean | undefined;

  constructor(data?: IOrder) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data['id'];
      this.petId = _data['petId'];
      this.quantity = _data['quantity'];
      this.shipDate = _data['shipDate']
        ? new Date(_data['shipDate'].toString())
        : <any>undefined;
      this.status = _data['status'];
      this.complete = _data['complete'];
    }
  }

  static fromJS(data: any): Order {
    data = typeof data === 'object' ? data : {};
    let result = new Order();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['id'] = this.id;
    data['petId'] = this.petId;
    data['quantity'] = this.quantity;
    data['shipDate'] = this.shipDate
      ? this.shipDate.toISOString()
      : <any>undefined;
    data['status'] = this.status;
    data['complete'] = this.complete;
    return data;
  }
}

export interface IOrder {
  id?: number | undefined;
  petId?: number | undefined;
  quantity?: number | undefined;
  shipDate?: Date | undefined;
  /** Order Status */
  status?: OrderStatus | undefined;
  complete?: boolean | undefined;
}

export class User implements IUser {
  id?: number | undefined;
  username?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  phone?: string | undefined;
  /** User Status */
  userStatus?: number | undefined;

  constructor(data?: IUser) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data['id'];
      this.username = _data['username'];
      this.firstName = _data['firstName'];
      this.lastName = _data['lastName'];
      this.email = _data['email'];
      this.password = _data['password'];
      this.phone = _data['phone'];
      this.userStatus = _data['userStatus'];
    }
  }

  static fromJS(data: any): User {
    data = typeof data === 'object' ? data : {};
    let result = new User();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['id'] = this.id;
    data['username'] = this.username;
    data['firstName'] = this.firstName;
    data['lastName'] = this.lastName;
    data['email'] = this.email;
    data['password'] = this.password;
    data['phone'] = this.phone;
    data['userStatus'] = this.userStatus;
    return data;
  }
}

export interface IUser {
  id?: number | undefined;
  username?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  phone?: string | undefined;
  /** User Status */
  userStatus?: number | undefined;
}

export enum Status {
  Available = 'available',
  Pending = 'pending',
  Sold = 'sold',
}

export enum PetStatus {
  Available = 'available',
  Pending = 'pending',
  Sold = 'sold',
}

export enum OrderStatus {
  Placed = 'placed',
  Approved = 'approved',
  Delivered = 'delivered',
}

import { Page, Route, Request } from 'playwright-core';

type ObjectWithRouteFn = Pick<Page, 'route'>;

let _baseUrl = '';
/*
Returns the base URL for http requests
*/
export function getBaseUrl(): string {
  return _baseUrl;
}

/*
Sets the base URL for http requests
*/
export function setBaseUrl(baseUrl: string) {
  _baseUrl = baseUrl;
}

type IFileResponse = {
  data: Blob;
  status: number;
  fileName?: string;
  headers?: { [name: string]: any };
};
type Iany = any;
