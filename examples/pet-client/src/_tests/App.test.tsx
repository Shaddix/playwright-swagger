import { expect, test } from '@playwright/experimental-ct-react';
import { PWMock, Pet, setBaseUrl, Status } from './pwmock';

setBaseUrl('https://localhost');

test('url params test', async ({ page, mount }) => {
  PWMock.getPetById(page, { petId: 2 }, (route, request) => {
    route.fulfillBody({
      body: {
        id: 2,
        name: 'qwe',
        photoUrls: ['1', '2'],
      },
    });
  });
  const result1 = await page.evaluate(async () => {
    return await fetch('https://localhost/pet/2').then((x) => x.json());
  });
  expect(result1.id).toBe(2);
});

test('POST simple', async ({ page }) => {
  let q = 0;
  PWMock.addPet(page, (route, request) => {
    q = request.body.id!;
    route.fulfill({});
  });
  const result = await page.evaluate(async () => {
    return await fetch('https://localhost/pet', {
      method: 'post',
      body: JSON.stringify({ id: 2, name: 'qwe' }),
    });
  });
  expect(q).toBe(2);
});
test('POST with body matcher', async ({ page }) => {
  let q = 0;
  PWMock.addPet(page, (route, request) => {
    if (request.body.name === 'qwe') {
      q = 2;
    }
    route.fulfill();
  });
  const result = await page.evaluate(async () => {
    return await fetch('https://localhost/pet', {
      method: 'post',
      body: JSON.stringify({ id: 2, name: 'qwe' }),
    });
  });
  expect(q).toBe(2);
});
test('parameters not specified - mock is still used', async ({ page }) => {
  PWMock.findPetsByStatus(page, (route, request) => {
    route.fulfillBody({
      body: [new Pet({ id: 1, name: 'asd', photoUrls: ['1'] })],
    });
  });
  const result: Pet[] = await page.evaluate(async () => {
    return await fetch(
      'https://localhost/pet/findByStatus?status=available',
    ).then((x) => x.json());
  });
  expect(result.length).toBe(1);
  expect(result[0].name).toBe('asd');
});

test('array parameter with 2 items', async ({ page }) => {
  PWMock.findPetsByStatus(page, (route, request) => {
    if (
      request.queryParams.status?.includes(Status.Available) &&
      request.queryParams.status?.includes(Status.Sold)
    )
      route.fulfillBody({
        body: [new Pet({ id: 1, name: 'asd1', photoUrls: ['1'] })],
      });
  });
  const result: Pet[] = await page.evaluate(async () => {
    return await fetch(
      'https://localhost/pet/findByStatus?status=available&status=sold',
    ).then((x) => x.json());
  });
  expect(result[0].name).toBe('asd1');
});
//
//   test('array parameter with 1 item', async ({page}) => {
//     PWMock.findPetsByStatus({
//       status: [Status.Available],
//     }).reply(200, [
//       new Pet({
//         name: 'asd2',
//         photoUrls: [],
//       }),
//     ]);
//     const result = await QueryFactory.Query.Client.findPetsByStatus([
//       Status.Available,
//     ]);
//     expect(result[0].name).toBe('asd2');
//   });
//
//   test('#3: set up response depending on query params GET request - simple', async ({page}) => {
//     PWMock.getPetById({ petId: 1 }).reply(200, (uri, body) => {
//       console.log(uri, body);
//       return {
//         name: 'oo',
//         id: 2,
//       };
//     });
//     const result = await QueryFactory.Query.Client.getPetById(1);
//     expect(result.id).toBe(2);
//   });
//
//   test('#3: set up response depending on query params GET request - advanced', async ({page}) => {
//     PWMock.getPetById({} as any)
//       .reply(200, (uri, body) => {
//         const petId = parseInt(uri.replace('/pet/', ''));
//         return {
//           name: 'oo',
//           id: petId + 1,
//         };
//       })
//       .persist();
//     const result = await QueryFactory.Query.Client.getPetById(1);
//     expect(result.id).toBe(2);
//
//     const result2 = await QueryFactory.Query.Client.getPetById(3);
//     expect(result2.id).toBe(4);
//   });
//
//   test('#3: any querystring param GET request', async ({page}) => {
//     PWMock.findPetsByStatus({})
//       .reply(200, (uri, body) => {
//         return [
//           {
//             name: uri,
//           },
//         ];
//       })
//       .persist();
//     const result = await QueryFactory.Query.Client.findPetsByStatus([
//       Status.Available,
//     ]);
//     expect(result[0].name).toBe('/pet/findByStatus?status=available');
//   });
//
//   test('#3: set up response depending on body POST request', async ({page}) => {
//     PWMock.placeOrder()
//       .reply(200, (uri, body) => {
//         return {
//           name: 'oo',
//           id: body.id! + 1,
//         };
//       })
//       .persist();
//     const result = await QueryFactory.Query.Client.placeOrder(
//       new Order({
//         id: 123,
//       }),
//     );
//     expect(result.id).toBe(124);
//   });
//
//   test('overlapping urls', async ({page}) => {
//     ProductPWMock.search({}).reply(200, (uri, body) => {
//       return [
//         {
//           title: 'oo',
//         },
//       ];
//     });
//     ProductPWMock.get({ id: 1 }).reply(200, (uri, body) => {
//       return {
//         title: '123',
//       };
//     });
//     const e = PWMock.pendingMocks();
//     console.log(e);
//     const result = await QueryFactory2.ProductQuery.Client.get(1);
//     expect(result.title).toBe('123');
//   });
// });
//

test('no queryparams', () => {
  const parsed = PWMock.parseGetPetByIdUrl(new URL('http://mail.ru/pet/1'));
  expect(parsed.petId).toBe(1);
});
test('template without queryparams, url contains them', () => {
  const parsed = PWMock.parseGetPetByIdUrl(
    new URL('http://mail.ru/pet/12?asd=qwe'),
  );
  expect(parsed.petId).toBe(12);
});
test('with queryparams', () => {
  const parsed = PWMock.parseFindPetsByStatusUrl(
    new URL('http://mail.ru/?status=123'),
  );
  expect(parsed.status).toStrictEqual(['123']);
});
test('with queryparams - no parameter', () => {
  const parsed = PWMock.parseFindPetsByStatusUrl(new URL('http://mail.ru/'));
  expect(parsed.status).toStrictEqual([]);
});

test('with queryparams - array', () => {
  const parsed = PWMock.parseFindPetsByStatusUrl(
    new URL('http://mail.ru/?status=1&status=2'),
  );
  expect(parsed.status).toStrictEqual(['1', '2']);
});
